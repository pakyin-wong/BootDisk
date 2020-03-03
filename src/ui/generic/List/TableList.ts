// Generic table list that handle table list update and table focus handling
namespace we {
  export namespace ui {
    export class TableList extends List {
      public static LOCK: string = 'LOCK';
      public static UNLOCK: string = 'UNLOCK';

      protected tableList: string[];
      protected nextTableList: string[];
      protected _isFocus: any;
      protected collection: eui.ArrayCollection;

      public isFreezeScrolling: boolean = false;
      public isGlobalLock: boolean = false;
      public extendHeight: number = 0;
      protected _isScrollOffset: boolean = false;
      protected _originalV: number;

      protected _scroller: eui.Scroller = null;

      protected gameFilters: core.GameType[] = [];

      constructor() {
        super();
        this.addEventListener(TableList.LOCK, this.onLockChanged, this);
        this.addEventListener(TableList.UNLOCK, this.onLockChanged, this);
      }

      public get tableCount() {
        return this.tableList.length;
      }

      public setTableList(tableList: string[], isOverride: boolean = false) {
        if (this._isFocus) {
          this.nextTableList = tableList;
          return;
        }
        const filteredList = this.invalidateTableList(tableList);
        if (!this.tableList || isOverride) {
          // this.tableList = tableList;
          this.tableList = filteredList;
          this.collection = new eui.ArrayCollection(this.tableList);
          this.dataProvider = this.collection;
        } else {
          // check new and removed
          const added = utils.arrayDiff(filteredList, this.tableList);
          const removed = utils.arrayDiff(this.tableList, filteredList);
          added.forEach(item => {
            // find item index and add to collection
            const idx: number = filteredList.indexOf(item);
            this.collection.addItemAt(item, idx);
          });
          removed.forEach(item => {
            const idx: number = this.collection.getItemIndex(item);
            if (idx >= 0) {
              this.collection.removeItemAt(idx);
            }
          });
          // this.tableList = tableList;
          // this.tableList.forEach((x, inx) => {
          //   this.collection.replaceItemAt(x, inx);
          // });
        }
      }

      public setGameFilters(tab: core.LiveGameTab) {
        switch (tab) {
          case core.LiveGameTab.ba:
            this.gameFilters = [core.GameType.BAC, core.GameType.BAI, core.GameType.BAS];
            break;
          case core.LiveGameTab.other:
            this.gameFilters = [core.GameType.DT, core.GameType.RO, core.GameType.DI];
            break;
        }
      }
      public setGameFiltersByTabIndex(idx: number) {
        if (idx < 0) {
          this.gameFilters = [];
        }
        const items = utils.EnumHelpers.values(core.LiveGameTab);
        const key = utils.EnumHelpers.getKeyByValue(core.LiveGameTab, items[idx]);
        this.setGameFilters(core.LiveGameTab[key]);
      }

      protected invalidateTableList(tableList: string[]) {
        return tableList.filter(tableid => {
          const tableInfo = env.tableInfos[tableid];
          return this.invalidateFilters(tableInfo);
        });
      }
      protected invalidateFilters(tableInfo: data.TableInfo) {
        if (!this.gameFilters || this.gameFilters.length === 0) {
          return true;
        }

        for (const filter of this.gameFilters) {
          if (filter === tableInfo.gametype) {
            return true;
          }
        }
        return false;
      }

      public addTable(tableid: string) {
        if (!this.tableList) {
          this.tableList = [];
          this.collection = new eui.ArrayCollection(this.tableList);
          this.dataProvider = this.collection;
        }
        if (this.tableList.indexOf(tableid) < 0) {
          if (this._isFocus) {
            if (!this.nextTableList) {
              this.nextTableList = this.tableList;
            }
            this.nextTableList.push(tableid);
            return;
          }
          // this.tableList.push(tableid);
          this.collection.addItem(tableid);
        }
      }
      public addTableAt(tableid: string, idx: number) {
        if (!this.tableList) {
          this.tableList = [];
          this.collection = new eui.ArrayCollection(this.tableList);
          this.dataProvider = this.collection;
        }
        if (this.tableList.indexOf(tableid) < 0) {
          if (this._isFocus) {
            if (!this.nextTableList) {
              this.nextTableList = this.tableList;
            }
            this.nextTableList.splice(idx, 0, tableid);
            return;
          }
          // this.tableList.splice(idx, 0, tableid);
          this.collection.addItemAt(tableid, idx);
        }
      }

      public removeTable(tableid: string) {
        if (!this.tableList) {
          this.tableList = [];
          this.collection = new eui.ArrayCollection(this.tableList);
          this.dataProvider = this.collection;
        }
        const idx = this.tableList.indexOf(tableid);
        if (idx >= 0) {
          if (this._isFocus) {
            if (!this.nextTableList) {
              this.nextTableList = this.tableList;
            }
            this.nextTableList.splice(idx, 1);
            return;
          }
          // this.tableList.splice(idx, 1);
          this.collection.removeItemAt(idx);
        }
      }

      public get isFocus() {
        return this._isFocus;
      }

      public get isLocked() {
        return !!this._isFocus;
      }

      protected onFocusChanged(isFocus: any) {
        this._isFocus = isFocus;
        if (this.isGlobalLock) {
          dir.evtHandler.dispatch(core.Event.LIVE_PAGE_LOCK, !!isFocus);
        }
        if (this.isFreezeScrolling) {
          const scroller: ui.Scroller = this.getParentScroller();
          scroller.touchEnabled = !isFocus;
          if (isFocus) {
            scroller.disableVScroller();
            scroller.disableWheel();
            const focusY = isFocus.y;
            const focusHeight = isFocus.height;
            this._originalV = scroller.viewport.scrollV;
            const targetV = focusY + focusHeight + this.extendHeight - scroller.height;
            if (targetV > this._originalV) {
              this._isScrollOffset = true;
              egret.Tween.get(scroller.viewport).to({ scrollV: targetV }, 300);
            }
          } else {
            if (this._isScrollOffset) {
              this._isScrollOffset = false;
              egret.Tween.get(scroller.viewport)
                .to({ scrollV: this._originalV }, 300)
                .call(() => {
                  scroller.enableVScroller();
                  scroller.enableWheel();
                });
            } else {
              scroller.enableVScroller();
              scroller.enableWheel();
              scroller.invalidateDisplayList();
            }
          }
        }
        if (!isFocus && this.nextTableList) {
          this.setTableList(this.nextTableList);
          this.nextTableList = null;
        }
      }

      protected onLockChanged(evt: egret.Event) {
        const focusItem: TableListItemHolder = evt.data;
        let listItem: TableListItemHolder;
        if (this.isFocus) {
          listItem = this._isFocus as TableListItemHolder;
        }
        switch (evt.type) {
          case TableList.LOCK:
            this.onFocusChanged(focusItem);
            break;
          case TableList.UNLOCK:
            this.onFocusChanged(null);
            break;
        }
        if (listItem) {
          listItem.onOutFocus();
        }
      }

      public getParentScroller() {
        if (this._scroller) {
          return this._scroller;
        }
        let target: any = this;
        while (target.parent) {
          if (target.parent instanceof eui.Scroller) {
            this._scroller = target.parent;
            return target.parent;
          } else {
            target = target.parent;
          }
        }
        return null;
      }
    }
  }
}
