/* tslint:disable triple-equals */
namespace we {
  export namespace ui {
    export class LiveSidePanel extends SidePanel {
      protected _bettedScroller: ui.Scroller;
      protected _goodroadScroller: ui.Scroller;
      protected _allgamesScroller: ui.Scroller;

      protected betTableList: TableList;
      protected goodRoadTableList: TableList;
      protected allTableList: TableList;

      protected _dropdown: SidePanelGameGroupDropdown;
      protected _subdropdown: SidePanelGameDropdown;
      protected _label: ui.RunTimeLabel;

      protected _paddingHeight: number = 67;

      protected _noBettedLabel: ui.RunTimeLabel;
      protected _noGoodRoadLabel: ui.RunTimeLabel;

      protected allGameList: string[];

      protected extendHeight: number = 500;

      constructor() {
        super();
        this.skinName = 'LiveSidePanelSkin';
      }

      protected mount() {
        super.mount();
        this.addEventListeners();
      }

      protected initTabs() {
        // create bet table list
        this.betTableList = new TableList();
        this.betTableList.isFreezeScrolling = true;
        this.betTableList.extendHeight = this.extendHeight;
        this.betTableList.isAnimateItemTransition = true;
        this.betTableList.layout = this.getLayout();
        this.betTableList.itemRendererFunction = item => {
          const tableInfo = env.tableInfos[item];
          switch (tableInfo.gametype) {
            case we.core.GameType.BAC:
            case we.core.GameType.BAI:
            case we.core.GameType.BAS:
            case we.core.GameType.BAB:
              return ba.SideListBetItemHolder;

            case we.core.GameType.BAM:
              return bam.SideListBetItemHolder;
            case we.core.GameType.RO:
            case we.core.GameType.ROL:
              return ro.SideListBetItemHolder;
            case we.core.GameType.DI:
              return di.SideListBetItemHolder;
            case we.core.GameType.DIL:
              return dil.SideListBetItemHolder;
            case we.core.GameType.LW:
              return lw.SideListBetItemHolder;
            case we.core.GameType.DT:
              return dt.SideListBetItemHolder;
            case we.core.GameType.LO:
              return ro.SideListBetItemHolder;
            case we.core.GameType.RC:
              return ro.SideListBetItemHolder;
            default:
              throw new Error('Invalid Game Type: ' + tableInfo.gametype);
          }
        };
        this._bettedScroller.viewport = this.betTableList;
        this._bettedScroller.addEventListener(TableList.LOCK, this.onLockChanged, this, false, 10);
        this._bettedScroller.addEventListener(TableList.UNLOCK, this.onLockChanged, this, false, 10);

        // create good road list
        this.goodRoadTableList = new TableList();
        this.goodRoadTableList.isFreezeScrolling = true;
        this.goodRoadTableList.extendHeight = this.extendHeight;
        this.goodRoadTableList.isAnimateItemTransition = true;
        this.goodRoadTableList.layout = this.getLayout();
        this.goodRoadTableList.itemRendererFunction = item => {
          const tableInfo = env.tableInfos[item];
          switch (tableInfo.gametype) {
            case we.core.GameType.BAC:
            case we.core.GameType.BAI:
            case we.core.GameType.BAS:
            case we.core.GameType.BAM:
            case we.core.GameType.BAB:
              return ba.SideListItemHolder;
            default:
              throw new Error('Invalid Game Type: ' + tableInfo.gametype);
          }
        };
        this._goodroadScroller.viewport = this.goodRoadTableList;
        this.goodRoadTableList.addEventListener(TableList.LOCK, this.onLockChanged, this, false, 10);
        this.goodRoadTableList.addEventListener(TableList.UNLOCK, this.onLockChanged, this, false, 10);

        // create all game list
        this.allTableList = new TableList();
        this.allTableList.isFreezeScrolling = true;
        this.allTableList.extendHeight = this.extendHeight;
        this.allTableList.isAnimateItemTransition = true;
        this.allTableList.layout = this.getLayout();
        this.allTableList.itemRendererFunction = item => {
          const tableInfo = env.tableInfos[item];
          switch (tableInfo.gametype) {
            case we.core.GameType.BAC:
            case we.core.GameType.BAI:
            case we.core.GameType.BAS:
            case we.core.GameType.BAM:
              return ba.SideListItemHolder;
            case we.core.GameType.BAB:
              return ba.SideListItemHolder;
            case we.core.GameType.RO:
            case we.core.GameType.ROL:
              return ro.SideListItemHolder;
            case we.core.GameType.DI:
              return di.SideListItemHolder;
            case we.core.GameType.DIL:
              return dil.SideListItemHolder;
            case we.core.GameType.LW:
              return lw.SideListItemHolder;
            case we.core.GameType.DT:
              return dt.SideListItemHolder;
            case we.core.GameType.LO:
              return lo.SideListItemHolder;
            case we.core.GameType.RC:
              return rc.SideListItemHolder;
            default:
              throw new Error('Invalid Game Type: ' + tableInfo.gametype);
          }
        };
        this._allgamesScroller.viewport = this.allTableList;
        this.allTableList.addEventListener(TableList.LOCK, this.onLockChanged, this, false, 10);
        this.allTableList.addEventListener(TableList.UNLOCK, this.onLockChanged, this, false, 10);

        this._tabbar.dataProvider = this._viewStack;
        this._tabbar.validateNow();
      }

      protected getLayout() {
        const layout = new eui.VerticalLayout();
        layout.paddingLeft = 20;
        layout.paddingRight = 20;
        layout.paddingBottom = 16;
        layout.gap = 12;
        layout.useVirtualLayout = true;
        return layout;
      }

      protected addEventListeners() {
        // listen to table list update
        dir.evtHandler.addEventListener(core.Event.TABLE_LIST_UPDATE, this.onTableListUpdate, this);
        // listen to good road list update
        dir.evtHandler.addEventListener(core.Event.MATCH_GOOD_ROAD_TABLE_LIST_UPDATE, this.onGoodRoadTableListUpdate, this);
        // listen to bet list update
        dir.evtHandler.addEventListener(core.Event.BET_TABLE_LIST_UPDATE, this.onBetTableListUpdate, this);

        this._dropdown.addEventListener(eui.UIEvent.CHANGE, this.onGroupChanged, this);
        this._subdropdown.addEventListener(eui.UIEvent.CHANGE, this.onFilterChanged, this);
      }

      protected destroy() {
        super.destroy();
        // listen to table list update
        dir.evtHandler.removeEventListener(core.Event.TABLE_LIST_UPDATE, this.onTableListUpdate, this);
        // listen to good road list update
        dir.evtHandler.removeEventListener(core.Event.MATCH_GOOD_ROAD_TABLE_LIST_UPDATE, this.onGoodRoadTableListUpdate, this);
        // listen to bet list update
        dir.evtHandler.removeEventListener(core.Event.BET_TABLE_LIST_UPDATE, this.onBetTableListUpdate, this);

        this._dropdown.removeEventListener(eui.UIEvent.CHANGE, this.onGroupChanged, this);
        this._subdropdown.removeEventListener(eui.UIEvent.CHANGE, this.onFilterChanged, this);
      }

      protected onGroupChanged(evt: egret.Event) {
        this._subdropdown.gamegroup = evt.data;
      }

      protected onFilterChanged(evt: egret.Event) {
        this.allTableList.setGameFilters(evt.data);
        this.allTableList.setTableList(this.allGameList, true);
      }

      protected onTableListUpdate(evt: egret.Event) {
        const tableList = evt.data;
        this.allGameList = tableList;
        this.allTableList.setTableList(tableList);
      }

      protected onGoodRoadTableListUpdate(evt: egret.Event) {
        const tableList = evt.data;
        this.goodRoadTableList.setTableList(tableList);
        const count = tableList.length;
        const tabItem = <ImageTabItemWithBadge> this._tabbar.getElementAt(1);
        if (tabItem) {
          tabItem.onBadgeUpdate('goodroad', count);
        }
        this._noGoodRoadLabel.visible = this.goodRoadTableList.getTableList().length === 0;
        if (!this.isCollapsed) {
          (async () => {
            this.betTableList.invalidateSize();
            await we.utils.sleep(200);
            this.updateTargetHeight();
            this.tweenExpand(200);
          })();
        }
      }

      protected onBetTableListUpdate(evt: egret.Event) {
        const tableList = evt.data;
        this.betTableList.setTableList(tableList);
        const count = tableList.length;
        const tabItem = <ImageTabItemWithBadge> this._tabbar.getElementAt(0);
        if (tabItem) {
          tabItem.onBadgeUpdate('bet', count);
        }
        this._noBettedLabel.visible = this.betTableList.getTableList().length === 0;
        if (!this.isCollapsed) {
          (async () => {
            this.betTableList.invalidateSize();
            await we.utils.sleep(200);
            this.updateTargetHeight();
            this.tweenExpand(200);
          })();
        }
      }

      protected onClearSelection() {
        super.onClearSelection();
        this._dropdown.visible = false;
        this._dropdown.hide();
        this._subdropdown.hide();
        egret.Tween.get(this).to({ width: 185, height: 56 }, 200);
      }

      protected getListHeight(list: TableList) {
        if (!list) {
          return 138;
        }
        const tableArr = list.getTableList();
        if (!tableArr || tableArr.length === 0) {
          return 138;
        }
        if (list.contentHeight > this._maxPanelHeight) {
          return this._maxPanelHeight;
        }
        return list.contentHeight;
      }

      protected updateTargetHeight() {
        switch (this._viewStack.selectedIndex) {
          case 0:
            this._targetHeight = this.getListHeight(this.betTableList) + 15;
            break;
          case 1:
            this._targetHeight = this.getListHeight(this.goodRoadTableList) + 15;
            break;
          case 2:
            this._targetHeight = this._maxPanelHeight;
            break;
        }
      }

      protected onSelected() {
        this.isLock = false;
        console.log('sidepanel _targetHeight :', this._viewStack.selectedIndex, this._targetHeight);
        super.onSelected();

        switch (this._viewStack.selectedIndex) {
          case 0:
          case 1:
            this._dropdown.visible = false;
            this._label.visible = true;
            this._label.renderText = () => `${i18n.t(`sidePanel.${this._viewStack.getChildAt(this._viewStack.selectedIndex).name}`)}`;
            break;
          case 2:
            this._label.visible = false;
            this._dropdown.visible = true;
            break;
        }
      }

      protected tweenExpand(interval: number) {
        egret.Tween.removeTweens(this);
        egret.Tween.removeTweens(this._tweenGroup);
        egret.Tween.removeTweens(this._tabBarGroup);
        egret.Tween.removeTweens(this._viewStack);
        egret.Tween.removeTweens(this._bg);

        const height = this._targetHeight + this._paddingHeight + (this.isLock ? 500 : 0);
        egret.Tween.get(this).to({ width: 385, height }, interval);
        egret.Tween.get(this._viewStack)
          .wait(interval)
          .to({ height: this._targetHeight + (this.isLock ? 500 : 0) }, interval);
        egret.Tween.get(this._tweenGroup)
          .to({ scaleX: 1 }, interval)
          .set({ visible: true })
          .to({ scaleY: 1, alpha: 1 }, interval);
        egret.Tween.get(this._tabBarGroup)
          .wait(interval)
          .to({ y: 8 }, interval);
        egret.Tween.get(this._bg)
          .wait(interval)
          .to({ ellipseHeight: 28, ellipseWidth: 28 }, interval);
      }

      protected isLock: boolean = true;
      protected onLockChanged(evt: egret.Event) {
        if (evt.type === TableList.LOCK) {
          const diff = this._maxPanelHeight - this._targetHeight;
          if (diff>=this.extendHeight) {
            evt.stopPropagation();
          }
          this.isLock = true;
          this.tweenExpand(200);
        } else {
          this.isLock = false;
          this.tweenExpand(200);
        }
        return false;
      }
    }
  }
}
