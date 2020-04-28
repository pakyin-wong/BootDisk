namespace we {
  export namespace ui {
    export class MobileSideGameList extends Panel {
      private _layoutRefer: eui.Group;
      private _tabs: eui.TabBar;
      private _tabSource;
      private _tabArrayCollection: eui.ArrayCollection;
      private _viewStack: eui.ViewStack;

      protected _betTableList: TableList;
      protected _goodRoadTableList: TableList;
      protected _allTableList: TableList;
      protected _allGameList: string[] = [];

      protected fixedTab: string[] = ['allGame', 'bet', 'goodroad'];

      protected _txt_title: RunTimeLabel;
      protected _selected: number = 0;

      constructor() {
        super('GamePanelSkin');
        this.poppableAddon = new PoppableAddonBottomSilder(this);
      }

      protected initOrientationDependentComponent() {
        this._txt_title.renderText = () => `${i18n.t('sidegamelist_title')}`;

        this.initTabs();
        this.initPage();

        this.setTab(this._selected);
        this.addEventListeners();

        this.poppableAddon.updateContentPos();
        if (!this.poppableAddon.isShow) {
          this.poppableAddon.hide(true);
        }
      }

      protected arrangeComponents() {
        this._betTableList.layout = this.getLayout();
        this._goodRoadTableList.layout = this.getLayout();
        this._allTableList.layout = this.getLayout();
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

        this._tabs.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.updateView, this);
      }

      protected removeEventListeners() {
        // listen to table list update
        dir.evtHandler.removeEventListener(core.Event.TABLE_LIST_UPDATE, this.onTableListUpdate, this);
        // listen to good road list update
        dir.evtHandler.removeEventListener(core.Event.MATCH_GOOD_ROAD_TABLE_LIST_UPDATE, this.onGoodRoadTableListUpdate, this);
        // listen to bet list update
        dir.evtHandler.removeEventListener(core.Event.BET_TABLE_LIST_UPDATE, this.onBetTableListUpdate, this);

        this._tabs.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.updateView, this);
      }

      protected initPage() {
        // create bet table list
        this._betTableList.isFreezeScrolling = true;
        this._betTableList.extendHeight = 250;
        this._betTableList.isAnimateItemTransition = true;
        this._betTableList.itemRenderer = MobileSideListBetItemHolder;

        // create good road list
        this._goodRoadTableList.isFreezeScrolling = true;
        this._goodRoadTableList.extendHeight = 250;
        this._goodRoadTableList.isAnimateItemTransition = true;
        this._goodRoadTableList.itemRenderer = MobileSideListItemHolder;

        // create all game list
        this._allTableList.isFreezeScrolling = true;
        this._allTableList.extendHeight = 250;
        this._allTableList.isAnimateItemTransition = true;
        this._allTableList.itemRenderer = MobileSideListItemHolder;
      }

      protected initTabs() {
        const tabList = [...this.fixedTab, ...utils.EnumHelpers.values(core.LiveGameTab)];

        this._tabSource = tabList.map(tab => {
          switch (tab) {
            case 'bet':
            case 'goodroad':
              return {
                tab,
                text: `sidegamelist_tab_${tab}`,
                count: 0,
              };

            default:
              return {
                tab,
                text: `live.gametype.${tab}`,
              };
          }
        });

        this._tabs.itemRenderer = MobileSideGameListItemRenderer;
        this._tabArrayCollection = new eui.ArrayCollection(this._tabSource);
        this._tabs.dataProvider = this._tabArrayCollection;
        this._tabs.requireSelection = true;
      }

      protected getLayout() {
        return this._layoutRefer.layout;
      }

      protected updateView() {
        if (!this._tabs) {
          return;
        }

        this._selected = this._tabs.selectedIndex;
        const type: string = this._tabs.selectedItem.tab;

        switch (type) {
          case 'bet':
            this._viewStack.selectedIndex = 1;
            break;

          case 'goodroad':
            this._viewStack.selectedIndex = 2;
            break;

          case 'allGame':
            this.setAllTableList(-1);
            this._viewStack.selectedIndex = 0;
            break;

          default:
            this.setAllTableList(this._tabs.selectedIndex - this.fixedTab.length);
            this._viewStack.selectedIndex = 0;
            break;
        }
      }

      protected setTab(idx: number) {
        this._tabs.selectedIndex = idx;
        this.updateView();
      }

      protected onTableListUpdate(evt: egret.Event) {
        const tableList = evt.data;
        this._allGameList = tableList;
        this.updateView();
      }

      protected setAllTableList(filterIdx = -1) {
        this._allTableList.setGameFiltersByTabIndex(filterIdx);
        this._allTableList.setTableList(this._allGameList, true);
      }

      protected onGoodRoadTableListUpdate(evt: egret.Event) {
        const tableList = evt.data;
        this._goodRoadTableList.setTableList(tableList);
        const count = tableList.length;
        // this._tabSource.find(i => i.tab === 'goodroad').count = count;
        // this._tabArrayCollection.refresh();
        const item = this._tabSource.find(i => i.tab === 'goodroad');
        const idx = this._tabSource.indexOf(item);
        item.count = count;
        this._tabArrayCollection.replaceItemAt(item, idx);
      }

      protected onBetTableListUpdate(evt: egret.Event) {
        const tableList = evt.data;
        this._betTableList.setTableList(tableList);
        const count = tableList.length;
        this._tabSource.find(i => i.tab === 'bet').count = count;
        // this._tabArrayCollection.refresh();
        const item = this._tabSource.find(i => i.tab === 'bet');
        const idx = this._tabSource.indexOf(item);
        item.count = count;
        this._tabArrayCollection.replaceItemAt(item, idx);
      }
    }
  }
}
