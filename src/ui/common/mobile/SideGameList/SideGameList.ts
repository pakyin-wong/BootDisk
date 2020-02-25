namespace we {
  export namespace ui {
    export class MobileSideGameList extends Panel {
      private _tabButtonGroup: eui.Group;
      private _btnAlreadyBet: ui.GamePanelTabButton;
      private _btnGoodRoad: ui.GamePanelTabButton;
      private _btnAllGame: ui.GamePanelTabButton;
      // private _btnClose: eui.Component;
      private _viewStack: eui.ViewStack;

      protected _betTableList: TableList;
      protected _goodRoadTableList: TableList;
      protected _allTableList: TableList;
      protected _allGameList: string[];

      protected _filterList: ui.List;
      protected _lblBetHint: ui.RunTimeLabel;

      private _selectedIndex: number;

      protected _filter: core.GameType;

      constructor() {
        super('sidegamelist/GamePanelSkin');
        this.poppableAddon = new PoppableAddonBottomSilder(this);
      }

      protected mount() {
        super.mount();
        this.initTabs();
        this.initFilterTabs();

        this._lblBetHint.renderText = () => i18n.t('mobile_game_panel_bet_hint_label');

        this.addEventListeners();
      }

      protected destroy() {
        super.destroy();
        this.removeEventListeners();
      }
      protected addEventListeners() {
        // listen to table list update
        dir.evtHandler.addEventListener(core.Event.TABLE_LIST_UPDATE, this.onTableListUpdate, this);
        // listen to good road list update
        dir.evtHandler.addEventListener(core.Event.MATCH_GOOD_ROAD_TABLE_LIST_UPDATE, this.onGoodRoadTableListUpdate, this);
        // listen to bet list update
        dir.evtHandler.addEventListener(core.Event.BET_TABLE_LIST_UPDATE, this.onBetTableListUpdate, this);

        this._filterList.addEventListener(eui.UIEvent.CHANGE, this.onFilterChanged, this);
      }

      protected removeEventListeners() {
        // listen to table list update
        dir.evtHandler.removeEventListener(core.Event.TABLE_LIST_UPDATE, this.onTableListUpdate, this);
        // listen to good road list update
        dir.evtHandler.removeEventListener(core.Event.MATCH_GOOD_ROAD_TABLE_LIST_UPDATE, this.onGoodRoadTableListUpdate, this);
        // listen to bet list update
        dir.evtHandler.removeEventListener(core.Event.BET_TABLE_LIST_UPDATE, this.onBetTableListUpdate, this);

        this._filterList.removeEventListener(eui.UIEvent.CHANGE, this.onFilterChanged, this);
      }

      protected initTabs() {
        // create bet table list
        this._betTableList.isFreezeScrolling = true;
        this._betTableList.extendHeight = 250;
        this._betTableList.isAnimateItemTransition = true;
        this._betTableList.itemRenderer = MobileSideListItemHolder;
        this._betTableList.layout = this.getLayout();

        // create good road list
        this._goodRoadTableList.isFreezeScrolling = true;
        this._goodRoadTableList.extendHeight = 250;
        this._goodRoadTableList.isAnimateItemTransition = true;
        this._goodRoadTableList.itemRenderer = MobileSideListItemHolder;
        this._goodRoadTableList.layout = this.getLayout();

        // create all game list
        this._allTableList.isFreezeScrolling = true;
        this._allTableList.extendHeight = 250;
        this._allTableList.isAnimateItemTransition = true;
        this._allTableList.itemRenderer = MobileSideListItemHolder;
        this._allTableList.layout = this.getLayout();
      }

      protected initFilterTabs() {
        const gameList = ['allGame', ...utils.EnumHelpers.values(core.LiveGameTab)];
        const gameListItems = gameList.map(game => {
          return i18n.t(`live.gametype.${game}`);
        });
        const _collection = new eui.ArrayCollection(gameListItems);
        this._filterList.itemRendererSkinName = 'AllGameSubTabItemSkin';
        this._filterList.itemRenderer = ui.RuntimeLabelListItem;
        this._filterList.dataProvider = _collection;
      }

      protected getLayout() {
        const layout = new eui.VerticalLayout();
        layout.paddingTop = 20;
        layout.paddingBottom = 20;
        layout.horizontalAlign = egret.HorizontalAlign.CENTER;
        return layout;
      }

      protected setTab(idx: number) {
        if (this._selectedIndex === idx) {
          return;
        }
        this._selectedIndex = idx;
        this._viewStack.selectedIndex = idx;
        this.updateActiveButton(idx);
      }

      protected updateActiveButton(idx: number) {
        Array(3).map((value, index) => {
          const tabButton: ui.GamePanelTabButton = this._tabButtonGroup.getChildAt(index) as ui.GamePanelTabButton;
          tabButton.focus = idx === index;
        });
      }

      protected onFilterChanged(evt: egret.Event) {
        const selectedIdx = this._filterList.selectedIndex - 1;

        this._allTableList.setGameFiltersByTabIndex(selectedIdx);
        this._allTableList.setTableList(this._allGameList, true);
      }

      protected onTableListUpdate(evt: egret.Event) {
        const tableList = evt.data;
        this._allGameList = tableList;
        this.setAllTableList(this._filter);
      }

      protected setAllTableList(filter: core.GameType = null) {
        let tableList = this._allGameList;
        if (filter) {
          tableList = tableList.filter(tableid => {
            const tableInfo = env.tableInfos[tableid];
            if (tableInfo) {
              return tableInfo.gametype === filter;
            } else {
              return false;
            }
          });
        }
        this._allTableList.setTableList(tableList);
      }

      protected onGoodRoadTableListUpdate(evt: egret.Event) {
        const tableList = evt.data;
        this._goodRoadTableList.setTableList(tableList);
        const count = tableList.length;
        this._btnGoodRoad.setBadge(count);
      }

      protected onBetTableListUpdate(evt: egret.Event) {
        const tableList = evt.data;
        this._betTableList.setTableList(tableList);
        const count = tableList.length;
        this._btnAlreadyBet.setBadge(count);
      }
    }
  }
}
