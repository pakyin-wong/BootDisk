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

      protected allGameList: string[];

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
        this.betTableList.extendHeight = 500;
        this.betTableList.isAnimateItemTransition = true;
        this.betTableList.layout = this.getLayout();
        this.betTableList.itemRendererFunction = item => {
          const tableInfo = env.tableInfos[item];
          switch (tableInfo.gametype) {
            case we.core.GameType.BAC:
            case we.core.GameType.BAI:
            case we.core.GameType.BAS:
            case we.core.GameType.BAM:
              return ba.SideListBetItemHolder;
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
            default:
              throw new Error('Invalid Game Type');
          }
        };
        this._bettedScroller.viewport = this.betTableList;

        // create good road list
        this.goodRoadTableList = new TableList();
        this.goodRoadTableList.isFreezeScrolling = true;
        this.goodRoadTableList.extendHeight = 500;
        this.goodRoadTableList.isAnimateItemTransition = true;
        this.goodRoadTableList.layout = this.getLayout();
        this.goodRoadTableList.itemRendererFunction = item => {
          const tableInfo = env.tableInfos[item];
          switch (tableInfo.gametype) {
            case we.core.GameType.BAC:
            case we.core.GameType.BAI:
            case we.core.GameType.BAS:
            case we.core.GameType.BAM:
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
            default:
              throw new Error('Invalid Game Type');
          }
        };
        this._goodroadScroller.viewport = this.goodRoadTableList;

        // create all game list
        this.allTableList = new TableList();
        this.allTableList.isFreezeScrolling = true;
        this.allTableList.extendHeight = 500;
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
            default:
              throw new Error('Invalid Game Type');
          }
        };
        this._allgamesScroller.viewport = this.allTableList;

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
      }

      protected onBetTableListUpdate(evt: egret.Event) {
        const tableList = evt.data;
        this.betTableList.setTableList(tableList);
        const count = tableList.length;
        const tabItem = <ImageTabItemWithBadge> this._tabbar.getElementAt(0);
        if (tabItem) {
          tabItem.onBadgeUpdate('bet', count);
        }
      }

      protected onClearSelection() {
        super.onClearSelection();
        this._dropdown.visible = false;
        this._dropdown.hide();
        this._subdropdown.hide();
        egret.Tween.get(this).to({ width: 185, height: 56 }, 200);
      }

      protected onSelected() {
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
        egret.Tween.get(this).to({ width: 385, height: 1220 }, 200);
      }
    }
  }
}
