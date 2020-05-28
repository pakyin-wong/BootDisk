/* tslint:disable triple-equals */
namespace we {
  export namespace ui {
    export class LiveSidePanel extends SidePanel {
      protected betTableList: TableList;
      protected goodRoadTableList: TableList;
      protected allTableList: TableList;

      protected _dropdown: SidePanelAllGameDropdown;
      protected _label: ui.RunTimeLabel;

      protected allGameList: string[];

      protected filter: core.GameType;

      protected _bg: eui.Image;

      constructor() {
        super();
        this.skinName = 'LiveSidePanelSkin';
      }

      protected mount() {
        super.mount();
        this._dropdown.visible = false;
        this.addEventListeners();
      }

      protected initTabs() {
        const group = <eui.Group> this._scroller.viewport;

        this._viewStack = new eui.ViewStack();
        this._viewStack.width = group.width;
        this._viewStack.height = group.height;
        group.addChild(this._viewStack);

        // create bet table list
        const betTableGroup = new eui.Group();
        betTableGroup.name = 'betted';
        this._viewStack.addChild(betTableGroup);
        betTableGroup.width = group.width;
        betTableGroup.height = group.height;
        let scroller = new Scroller();
        scroller.width = group.width;
        scroller.height = group.height;
        betTableGroup.addChild(scroller);
        this.betTableList = new TableList();
        this.betTableList.isFreezeScrolling = true;
        this.betTableList.extendHeight = 400;
        this.betTableList.isAnimateItemTransition = true;
        // this.betTableList.itemRenderer = SideListBetItemHolder;
        this.betTableList.itemRendererFunction = item => {
          const tableInfo = env.tableInfos[item];
          switch (tableInfo.gametype) {
            //  switch (0) {
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
            case we.core.GameType.LW:
              return lw.SideListBetItemHolder;
            case we.core.GameType.DT:
              return dt.SideListBetItemHolder;
            default:
              throw new Error('Invalid Game Type');
          }
        };
        this.betTableList.layout = this.getLayout();
        scroller.viewport = this.betTableList;

        // create good road list
        const goodRoadTableGroup = new eui.Group();
        goodRoadTableGroup.name = 'goodroad';
        this._viewStack.addChild(goodRoadTableGroup);
        goodRoadTableGroup.width = group.width;
        goodRoadTableGroup.height = group.height;
        scroller = new Scroller();
        scroller.width = group.width;
        scroller.height = group.height;
        goodRoadTableGroup.addChild(scroller);
        this.goodRoadTableList = new TableList();
        this.goodRoadTableList.isFreezeScrolling = true;
        this.goodRoadTableList.extendHeight = 400;
        this.goodRoadTableList.isAnimateItemTransition = true;
        // this.goodRoadTableList.itemRenderer = SideListItemHolder;
        this.goodRoadTableList.itemRendererFunction = item => {
          const tableInfo = env.tableInfos[item];
          switch (tableInfo.gametype) {
            //  switch (0) {
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
            case we.core.GameType.LW:
              return lw.SideListItemHolder;
            case we.core.GameType.DT:
              return dt.SideListItemHolder;
            default:
              throw new Error('Invalid Game Type');
          }
        };

        this.goodRoadTableList.layout = this.getLayout();
        scroller.viewport = this.goodRoadTableList;

        // create all game list
        const allTableGroup = new eui.Group();
        allTableGroup.name = 'allgames';
        this._viewStack.addChild(allTableGroup);
        allTableGroup.width = group.width;
        allTableGroup.height = group.height;
        scroller = new Scroller();
        scroller.width = group.width;
        scroller.height = group.height;
        allTableGroup.addChild(scroller);
        this.allTableList = new TableList();
        this.allTableList.isFreezeScrolling = true;
        this.allTableList.extendHeight = 400;
        this.allTableList.isAnimateItemTransition = true;
        // this.allTableList.itemRenderer = SideListItemHolder;

        this.allTableList.itemRendererFunction = item => {
          const tableInfo = env.tableInfos[item];
          switch (tableInfo.gametype) {
            //  switch (0) {
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
            case we.core.GameType.LW:
              return lw.SideListItemHolder;
            case we.core.GameType.DT:
              return dt.SideListItemHolder;
            default:
              throw new Error('Invalid Game Type');
          }
        };

        this.allTableList.layout = this.getLayout();
        allTableGroup.addChild(this.allTableList);
        scroller.viewport = this.allTableList;

        this._tabbar.dataProvider = this._viewStack;
        this._tabbar.validateNow();
        let tabItem = <ImageTabItemWithBadge> this._tabbar.getElementAt(0);
        tabItem.badgeBg.source = 'd_common_panel_gamelist_notifydot_green_png';

        tabItem = <ImageTabItemWithBadge> this._tabbar.getElementAt(1);
        tabItem.badgeBg.source = 'd_common_panel_gamelist_notifydot_png';

        this._bg.alpha = 0;
      }

      protected getLayout() {
        const layout = new eui.VerticalLayout();
        layout.paddingTop = 20;
        layout.paddingBottom = 20;
        layout.horizontalAlign = egret.HorizontalAlign.CENTER;
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

        this._dropdown.addEventListener(eui.UIEvent.CHANGE, this.onFilterChanged, this);
      }

      protected destroy() {
        super.destroy();
        // listen to table list update
        dir.evtHandler.removeEventListener(core.Event.TABLE_LIST_UPDATE, this.onTableListUpdate, this);
        // listen to good road list update
        dir.evtHandler.removeEventListener(core.Event.MATCH_GOOD_ROAD_TABLE_LIST_UPDATE, this.onGoodRoadTableListUpdate, this);
        // listen to bet list update
        dir.evtHandler.removeEventListener(core.Event.BET_TABLE_LIST_UPDATE, this.onBetTableListUpdate, this);

        this._dropdown.removeEventListener(eui.UIEvent.CHANGE, this.onFilterChanged, this);
      }

      protected onFilterChanged(evt: egret.Event) {
        const selectedIdx = this._dropdown.selectedIndex - 1;
        // if (selectedIdx < 0) {
        //   this.filter = null;
        // } else {
        //   this.filter = <core.GameType>selectedIdx;
        // }
        // this.setAllTableList(this.filter);

        this.allTableList.setGameFiltersByTabIndex(selectedIdx);
        this.allTableList.setTableList(this.allGameList, true);

        // const count = this.allTableList.tableCount;
        // const tabItem = <ImageTabItemWithBadge> this._tabbar.getElementAt(2);
        // if (tabItem) {
        //   tabItem.onBadgeUpdate(count);
        // }
      }

      protected onTableListUpdate(evt: egret.Event) {
        const tableList = evt.data;
        this.allGameList = tableList;
        // this.allTableList.setTableList(tableList);
        this.setAllTableList(this.filter);
        // const count = this.allTableList.tableCount;
        // const tabItem = <ImageTabItemWithBadge> this._tabbar.getElementAt(2);
        // if (tabItem) {
        //   tabItem.onBadgeUpdate(count);
        // }
      }

      protected setAllTableList(filter: core.GameType = null) {
        let tableList = this.allGameList;
        if (filter) {
          tableList = tableList.filter(tableid => {
            const tableInfo = env.tableInfos[tableid];
            if (tableInfo) {
              return tableInfo.gametype == filter;
            } else {
              return false;
            }
          });
        }
        this.allTableList.setTableList(tableList);
      }

      protected onGoodRoadTableListUpdate(evt: egret.Event) {
        const tableList = evt.data;
        this.goodRoadTableList.setTableList(tableList);
        const count = tableList.length;
        const tabItem = <ImageTabItemWithBadge> this._tabbar.getElementAt(1);
        if (tabItem) {
          tabItem.onBadgeUpdate(count);
        }
      }

      protected onBetTableListUpdate(evt: egret.Event) {
        const tableList = evt.data;
        this.betTableList.setTableList(tableList);
        const count = tableList.length;
        const tabItem = <ImageTabItemWithBadge> this._tabbar.getElementAt(0);
        if (tabItem) {
          tabItem.onBadgeUpdate(count);
        }
      }

      protected onCollapse() {
        super.onCollapse();
        this._dropdown.visible = false;
      }

      protected onClearSelection() {
        if (!this._dropdown.isCollapsed()) {
          // ============================================
          this._dropdown.toggle();
          //  egret.Tween.removeTweens(this._dropdown);
          //   egret.Tween.get(this._dropdown)
          //   .to({ height: 0 }, 200)
          // ============================================
        }
        super.onClearSelection();
        egret.Tween.removeTweens(this._bg);
        egret.Tween.get(this._bg).to({ alpha: 0 }, 200);
      }

      protected onSelected() {
        super.onSelected();
        this.width = 397;
        if (this._bg.alpha < 1) {
          egret.Tween.removeTweens(this._bg);
          egret.Tween.get(this._bg).to({ alpha: 1 }, 200);
        }
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
    }
  }
}
