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

      protected _scroller: eui.Scroller = null;

      constructor() {
        super();
        this.addEventListener(TableList.LOCK, this.onLockChanged, this);
        this.addEventListener(TableList.UNLOCK, this.onLockChanged, this);
      }

      public setTableList(tableList: string[]) {
        if (this._isFocus) {
          this.nextTableList = tableList;
          return;
        }
        if (!this.tableList) {
          this.tableList = tableList;
          this.collection = new eui.ArrayCollection(tableList);
          this.dataProvider = this.collection;
        } else {
          // check new and removed
          const added = utils.arrayDiff(tableList, this.tableList);
          const removed = utils.arrayDiff(this.tableList, tableList);
          added.forEach(item => {
            // find item index and add to collection
            const idx: number = tableList.indexOf(item);
            this.collection.addItemAt(item, idx);
          });
          removed.forEach(item => {
            this.collection.removeItemAt(this.collection.getItemIndex(item));
          });
          this.tableList = tableList;
          this.tableList.forEach((x, inx) => {
            this.collection.replaceItemAt(x, inx);
          });
        }
      }

      public addTable(tableid: string) {
        if (!this.tableList) {
          this.tableList = [];
          this.collection = new eui.ArrayCollection();
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
          this.tableList.push(tableid);
          this.collection.addItem(tableid);
        }
      }
      public addTableAt(tableid: string, idx: number) {
        if (!this.tableList) {
          this.tableList = [];
          this.collection = new eui.ArrayCollection();
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
          this.tableList.splice(idx, 0, tableid);
          this.collection.addItemAt(tableid, idx);
        }
      }

      public removeTable(tableid: string) {
        if (!this.tableList) {
          this.tableList = [];
          this.collection = new eui.ArrayCollection();
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
          this.tableList.splice(idx, 1);
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
          } else {
            scroller.enableVScroller();
            scroller.enableWheel();
          }
        }
        if (!isFocus && this.nextTableList) {
          this.setTableList(this.nextTableList);
          this.nextTableList = null;
        }
      }

      protected onLockChanged(evt: egret.Event) {
        const focusItem: TableListItemHolder = evt.data;
        switch (evt.type) {
          case TableList.LOCK:
            this.onFocusChanged(focusItem);
            break;
          case TableList.UNLOCK:
            this.onFocusChanged(null);
            break;
        }
      }

      protected getParentScroller() {
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