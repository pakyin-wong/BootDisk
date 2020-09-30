namespace we {
  export namespace ui {
    export class MobileSideGameList extends Panel {
      private _layoutRefer: eui.Group;
      private _tabs: eui.TabBar;
      private _tabSource;
      private _tabArrayCollection: eui.ArrayCollection;
      private _viewStack: eui.ViewStack;
      private _dmm: ui.Panel;

      private _btnAlreadyBet: ui.GamePanelTabButton;
      private _btnGoodRoad: ui.GamePanelTabButton;
      private _btnAllGame: ui.GamePanelTabButton;

      //protected _lblBetHint: ui.RunTimeLabel;

      protected _betTableList: TableList;
      protected _goodRoadTableList: TableList;
      protected _allTableList: TableList;
      protected _allGameList: string[] = [];
      protected _betList: string[] = [];
      protected _goodRoadList: string[] = [];

      protected _noGoodRoadGroup: eui.Group;
      protected _noBetGroup: eui.Group;

      // protected fixedTab: string[] = ['allGame', 'bet', 'goodroad'];
      protected _pageIds: string = 'allGame';
      protected _group;

      protected _txt_title: RunTimeLabel;

      constructor() {
        super('GamePanelSkin');
        this.poppableAddon = new PoppableAddonBottomSilder(this);
      }

      protected onOrientationChange() {
        this.arrangeComponents();
      }

      protected initOrientationDependentComponent() {
        // this._txt_title.renderText = () => `${i18n.t('sidegamelist_title')}`;
        this._betTableList.setTableList(this._betList);
        const count = this._betList.length;
        this.initTabs();
        this.initPage();
        this.initDmm();

        this.setGroup('live');
        this.addEventListeners();

        this.poppableAddon.updateContentPos();
        if (!this.poppableAddon.isShow) {
          this.poppableAddon.hide(true);
        }
      }

      protected clearOrientationDependentComponent() {
        super.clearOrientationDependentComponent();
        this.removeEventListeners();
      }

      protected initDmm() {
        this._dmm.isDropdown = true;
        this._dmm.isPoppable = true;
        this._dmm.dismissOnClickOutside = true;
        this._dmm.dropdown.itemSkin = 'SidePanelDropdownIR';
        this._dmm.dropdown.review = new RunTimeLabel();
        const gameListItems = utils.EnumHelpers.values(core.GameGroupTab).map(game => {
          return ui.NewDropdownItem(game, () => i18n.t(`gamegroup_tab_${game}`));
        });
        this._dmm.dropdown.data.replaceAll(gameListItems);
        this._dmm.dropdown.select(this._group);
      }

      protected arrangeComponents() {
        this.currentState = env.orientation.toLowerCase();
        this.validateNow();
        this._betTableList.layout = this.getLayout();
        this._goodRoadTableList.layout = this.getLayout();
        this._allTableList.layout = this.getLayout();
      }

      protected destroy() {
        super.destroy();
        this.removeEventListeners();
      }
      protected addEventListeners() {
        dir.evtHandler.addEventListener(core.Event.TOGGLE_SIDE_GAMELIST, this.show, this);
        // listen to table list update
        dir.evtHandler.addEventListener(core.Event.TABLE_LIST_UPDATE, this.onTableListUpdate, this);
        // listen to good road list update
        dir.evtHandler.addEventListener(core.Event.MATCH_GOOD_ROAD_TABLE_LIST_UPDATE, this.onGoodRoadTableListUpdate, this);
        // listen to bet list update
        dir.evtHandler.addEventListener(core.Event.BET_TABLE_LIST_UPDATE, this.onBetTableListUpdate, this);

        utils.addButtonListener(this._btnAlreadyBet, this.onClickBet, this);
        utils.addButtonListener(this._btnGoodRoad, this.onClickGoodRoad, this);
        utils.addButtonListener(this._btnAllGame, this.onClickAllGame, this);

        this._tabs.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.updateView, this);
        this._dmm.addEventListener('DROPDOWN_ITEM_CHANGE', this.onGroupChanged, this);
      }

      protected removeEventListeners() {
        dir.evtHandler.removeEventListener(core.Event.TOGGLE_SIDE_GAMELIST, this.show, this);
        // listen to table list update
        dir.evtHandler.removeEventListener(core.Event.TABLE_LIST_UPDATE, this.onTableListUpdate, this);
        // listen to good road list update
        dir.evtHandler.removeEventListener(core.Event.MATCH_GOOD_ROAD_TABLE_LIST_UPDATE, this.onGoodRoadTableListUpdate, this);
        // listen to bet list update
        dir.evtHandler.removeEventListener(core.Event.BET_TABLE_LIST_UPDATE, this.onBetTableListUpdate, this);

        utils.removeButtonListener(this._btnAlreadyBet, this.onClickBet, this);
        utils.removeButtonListener(this._btnGoodRoad, this.onClickGoodRoad, this);
        utils.removeButtonListener(this._btnAllGame, this.onClickAllGame, this);

        this._tabs.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.updateView, this);
        this._dmm.removeEventListener('DROPDOWN_ITEM_CHANGE', this.onGroupChanged, this);
        this._dmm.removeToggler();
      }

      protected initPage() {
        // create bet table list
        this._betTableList.isFreezeScrolling = true;
        this._betTableList.extendHeight = 250;
        this._betTableList.isAnimateItemTransition = true;
        // this._betTableList.itemRenderer = MobileSideListBetItemHolder;
        this._betTableList.itemRendererFunction = item => {
          const tableInfo = env.tableInfos[item];
          switch (tableInfo.gametype) {
            //  switch (0) {
            case we.core.GameType.BAC:
            case we.core.GameType.BAI:
            case we.core.GameType.BAS:
            case we.core.GameType.BAM:
              return ba.MobileSideListBetItemHolder;
            case we.core.GameType.RO:
            case we.core.GameType.ROL:
              return ro.MobileSideListBetItemHolder;
            case we.core.GameType.DI:
              return di.MobileSideListBetItemHolder;
            case we.core.GameType.DIL:
              return dil.MobileSideListBetItemHolder;
            case we.core.GameType.LW:
              return lw.MobileSideListBetItemHolder;
            case we.core.GameType.DT:
              return dt.MobileSideListBetItemHolder;
            default:
              throw new Error('Invalid Game Type');
          }
        };

        // create good road list
        this._goodRoadTableList.isFreezeScrolling = true;
        this._goodRoadTableList.extendHeight = 250;
        this._goodRoadTableList.isAnimateItemTransition = true;
        // this._goodRoadTableList.itemRenderer = MobileSideListItemHolder;
        this._goodRoadTableList.itemRendererFunction = item => {
          const tableInfo = env.tableInfos[item];
          switch (tableInfo.gametype) {
            //  switch (0) {
            case we.core.GameType.BAC:
            case we.core.GameType.BAI:
            case we.core.GameType.BAS:
            case we.core.GameType.BAM:
              return ba.MobileSideListItemHolder;
            case we.core.GameType.RO:
            case we.core.GameType.ROL:
              return ro.MobileSideListItemHolder;
            case we.core.GameType.DI:
              return di.MobileSideListItemHolder;
            case we.core.GameType.LW:
              return lw.MobileSideListItemHolder;
            case we.core.GameType.DT:
              return dt.MobileSideListItemHolder;
            default:
              throw new Error('Invalid Game Type');
          }
        };

        // create all game list
        this._allTableList.isFreezeScrolling = true;
        this._allTableList.extendHeight = 250;
        this._allTableList.isAnimateItemTransition = true;
        // this._allTableList.itemRenderer = MobileSideListItemHolder;
        this._allTableList.itemRendererFunction = item => {
          const tableInfo = env.tableInfos[item];
          switch (tableInfo.gametype) {
            //  switch (0) {
            case we.core.GameType.BAC:
            case we.core.GameType.BAI:
            case we.core.GameType.BAS:
            case we.core.GameType.BAM:
              return ba.MobileSideListItemHolder;
            case we.core.GameType.RO:
            case we.core.GameType.ROL:
              return ro.MobileSideListItemHolder;
            case we.core.GameType.DI:
              return di.MobileSideListItemHolder;
            case we.core.GameType.DIL:
              return dil.MobileSideListItemHolder;
            case we.core.GameType.LW:
              return lw.MobileSideListItemHolder;
            case we.core.GameType.DT:
              return dt.MobileSideListItemHolder;
            case we.core.GameType.LO:
              return ro.MobileSideListItemHolder;
            default:
              throw new Error('Invalid Game Type');
          }
        };

        this.setBetList();
        this.setGoodRoadList();
      }

      protected initTabs() {
        this._tabs.itemRenderer = MobileSideGameListItemRenderer;
        this._tabArrayCollection = new eui.ArrayCollection();
        this._tabs.dataProvider = this._tabArrayCollection;
        this._tabs.requireSelection = true;
      }

      protected getLayout() {
        const layout = this._layoutRefer.layout;
        const clone: eui.LayoutBase = new eui.TileLayout();
        for (const key in layout) {
          clone[key] = layout[key];
        }
        clone.useVirtualLayout = true;
        return clone;
      }

      protected updateView() {
        this._dmm.removeToggler();

        switch (this._pageIds) {
          case 'bet':
            this._viewStack.selectedIndex = 0;
            break;

          case 'goodroad':
            this._viewStack.selectedIndex = 1;
            break;

          default:
            this._viewStack.selectedIndex = 2;
            this._allTableList.setGameFilters(this._tabSource[this._tabs.selectedIndex]);
            this._allTableList.setTableList(this._allGameList, true);
            this._dmm.setToggler(this._btnAllGame);
            break;
        }

        this._btnAlreadyBet.focus = this._pageIds === 'bet';
        this._btnAllGame.focus = this._pageIds === 'allGame';
        this._btnGoodRoad.focus = this._pageIds === 'goodroad';
      }

      protected onGroupChanged(e) {
        this.setGroup(e.data);
      }

      protected setGroup(s) {
        if (s == this._group) {
          return;
        }
        switch (s) {
          case 'live':
            this._group = s;
            this._tabSource = utils.EnumHelpers.values(core.LiveGameTab);
            this._btnAllGame.updateLabelKey(`gamegroup_tab_${s}`);
            break;
          case 'lottery':
            this._group = s;
            this._tabSource = utils.EnumHelpers.values(core.LotteryTab);
            this._btnAllGame.updateLabelKey(`gamegroup_tab_${s}`);
            break;
        }

        this._tabArrayCollection.replaceAll(
          this._tabSource.map(tab => {
            return {
              tab,
              text: `${this._group}.gametype.${tab}`,
            };
          })
        );
        this.setTab(0);
      }

      protected setTab(idx: number) {
        this._tabs.selectedIndex = idx;
        this.updateView();
      }

      protected onTableListUpdate(evt: egret.Event) {
        const tableList = evt.data;
        this._allGameList = tableList;
        this.updateView();
        this.setBetList();
      }

      protected setBetList() {
        this._betTableList.setTableList(this._betList);
        const count = this._betList.length;
        this._btnAlreadyBet.setBadge(count);
      }
      protected setGoodRoadList() {
        this._goodRoadTableList.setTableList(this._goodRoadList);
        const count = this._goodRoadList.length;
        this._btnGoodRoad.setBadge(count);
      }

      protected onClickBet() {
        this._pageIds = 'bet';
        this.updateView();
      }

      protected onClickGoodRoad() {
        this._pageIds = 'goodroad';
        this.updateView();
      }

      protected onClickAllGame() {
        this._pageIds = 'allGame';
        this.updateView();
      }

      protected onGoodRoadTableListUpdate(evt: egret.Event) {
        const tableList = evt.data;
        this._goodRoadList = tableList;
        this._noGoodRoadGroup.visible = this._goodRoadList.length === 0;
        this.setGoodRoadList();
      }

      protected onBetTableListUpdate(evt: egret.Event) {
        const tableList = evt.data;
        this._betList = tableList;
        this._noBetGroup.visible = this._betList.length === 0;
        this.setBetList();
      }
    }
  }
}
