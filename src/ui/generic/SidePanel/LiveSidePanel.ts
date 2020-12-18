/* tslint:disable triple-equals */
namespace we {
  export namespace ui {
    export class LiveSidePanel extends SidePanel {
      protected _bettedScroller: ui.Scroller;
      protected _goodroadScroller: ui.Scroller;
      protected _allgamesScroller: ui.Scroller;

      protected betTableData: string[];
      protected goodRoadTableData: string[];
      protected allTableData: string[];

      protected betTableList: TableList;
      protected goodRoadTableList: TableList;
      protected allTableList: TableList;

      protected _dropdown: SidePanelGameGroupDropdown;
      protected _subdropdown: SidePanelGameDropdown;
      protected _label: ui.RunTimeLabel;

      protected _paddingHeight: number = 67;

      protected _noBettedLabel: ui.RunTimeLabel;
      protected _noGoodRoadLabel: ui.RunTimeLabel;


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
        this.createAllGameList();
        this.createGoodRoadList();
        this.createAlreadyBetList();

        this._subdropdown.gamegroup = env.sideGameCategories.length > 0 ? env.sideGameCategories[0] : 'live';

        this._tabbar.dataProvider = this._viewStack;
        this._tabbar.validateNow();
      }

      protected _currentDisplayIndex = -1;
      protected destroyCurrentTableList() {
        if (this._currentDisplayIndex == -1) return;
        switch (this._currentDisplayIndex) {
          case 0:
          this._bettedScroller.viewport = new Group();
          this.betTableList.removeEventListener(TableList.LOCK, this.onLockChanged, this);
          this.betTableList.removeEventListener(TableList.UNLOCK, this.onLockChanged, this);
          break;
          case 1:
          this._goodroadScroller.viewport = new Group();
          this.goodRoadTableList.removeEventListener(TableList.LOCK, this.onLockChanged, this);
          this.goodRoadTableList.removeEventListener(TableList.UNLOCK, this.onLockChanged, this);
          break;
          case 2:
          this._allgamesScroller.viewport = new Group();
          this.allTableList.removeEventListener(TableList.LOCK, this.onLockChanged, this);
          this.allTableList.removeEventListener(TableList.UNLOCK, this.onLockChanged, this);
          break;
          default:
          throw new Error('Wrong tab index');
        }
        this._currentDisplayIndex = -1;
      } 

      protected createTableList(idx: number) {
        this._currentDisplayIndex = idx;
        switch (idx) {
          case 0:
          this.createAlreadyBetList();
          break;
          case 1:
          this.createGoodRoadList();
          break;
          case 2:
          this.createAllGameList();
          break;
          default:
          throw new Error('Wrong tab index');
        }
      }

      protected createAllGameList() {
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
            case we.core.GameType.BAB:
            case we.core.GameType.BASB:
            case we.core.GameType.BAMB:
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
            case we.core.GameType.DTB:
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
        this.allTableList.setGameFilters(this._subdropdown.getSelectedItem().key);

        if (this.allTableData) this.allTableList.setTableList(this.allTableData);
      }

      protected createGoodRoadList() {
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
            case we.core.GameType.BASB:
            case we.core.GameType.BAMB:
              return ba.SideListItemHolder;
            default:
              throw new Error('Invalid Game Type: ' + tableInfo.gametype);
          }
        };
        this._goodroadScroller.viewport = this.goodRoadTableList;
        this.goodRoadTableList.addEventListener(TableList.LOCK, this.onLockChanged, this, false, 10);
        this.goodRoadTableList.addEventListener(TableList.UNLOCK, this.onLockChanged, this, false, 10);

        if (this.goodRoadTableData) this.goodRoadTableList.setTableList(this.goodRoadTableData);

        this.goodRoadTableList.validateNow();
      }

      protected createAlreadyBetList() {
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
            case we.core.GameType.BASB:
              return ba.SideListBetItemHolder;
            case we.core.GameType.BAM:
            case we.core.GameType.BAMB:
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
            case we.core.GameType.DTB:
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
        this.betTableList.addEventListener(TableList.LOCK, this.onLockChanged, this, false, 10);
        this.betTableList.addEventListener(TableList.UNLOCK, this.onLockChanged, this, false, 10);

        if (this.betTableData) this.betTableList.setTableList(this.betTableData);
        this.betTableList.validateNow();
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
        this.allTableList.setTableList(this.allTableData, true);
      }

      protected onTableListUpdate(evt: egret.Event) {
        const tableList = evt.data;
        this.allTableData = tableList;

        if (this.allTableList) {
          this.allTableList.setTableList(tableList);
        }
      }

      protected onGoodRoadTableListUpdate(evt: egret.Event) {
        const tableList = evt.data;

        const count = tableList.length;
        const tabItem = <ImageTabItemWithBadge>this._tabbar.getElementAt(1);
        if (tabItem) {
          tabItem.onBadgeUpdate('goodroad', count);
        }

        this._noGoodRoadLabel.visible = count === 0;

        this.goodRoadTableData = tableList;
        if (this.goodRoadTableList) {
          this.goodRoadTableList.setTableList(tableList);
          this.goodRoadTableList.validateNow();
        }

        this.invalidateHeight();
      }

      protected onBetTableListUpdate(evt: egret.Event) {
        const tableList = evt.data;
        const count = tableList.length;
        const tabItem = <ImageTabItemWithBadge>this._tabbar.getElementAt(0);
        if (tabItem) {
          tabItem.onBadgeUpdate('bet', count);
        }
        this._noBettedLabel.visible = count === 0;

        this.betTableData = tableList;
        if (this.betTableList) {
          this.betTableList.setTableList(tableList);
          this.betTableList.validateNow();
        }

        this.invalidateHeight();
      }

      protected onClearSelection() {
        super.onClearSelection();
        // this.destroyCurrentTableList();
        env.isShowingAlreadyBetPanel = false;
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
        // this.destroyCurrentTableList();
        this.isLock = false;
        console.log('sidepanel _targetHeight :', this._viewStack.selectedIndex, this._targetHeight);
        super.onSelected();
        env.isShowingAlreadyBetPanel = this._viewStack.selectedIndex == 0;
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
        // this.createTableList(this._tabbar.selectedIndex);
        this.invalidateHeight();
      }

      protected invalidateHeight() {
        if (!this.isCollapsed) {
          this.updateTargetHeight();
          this.tweenExpand(200);
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
        egret.Tween.get(this._tweenGroup).to({ scaleX: 1 }, interval).set({ visible: true }).to({ scaleY: 1, alpha: 1 }, interval);
        egret.Tween.get(this._tabBarGroup).wait(interval).to({ y: 8 }, interval);
        egret.Tween.get(this._bg).wait(interval).to({ ellipseHeight: 28, ellipseWidth: 28 }, interval);
      }

      protected isLock: boolean = true;
      protected onLockChanged(evt: egret.Event) {
        if (evt.type === TableList.LOCK) {
          const diff = this._maxPanelHeight - this._targetHeight;
          if (diff >= this.extendHeight) {
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
