namespace we {
  export namespace lottery {
    export class DExtraContent {
      public static mount(page: Page) {
        const tabBarGroup = new eui.Group();
        tabBarGroup.left = 71;
        tabBarGroup.right = 71;

        const tabbarBg = new eui.Rect();
        tabbarBg.fillColor = 0x121312;
        tabbarBg.left = 0;
        tabbarBg.right = 0;
        tabbarBg.top = 0;
        tabbarBg.bottom = 0;
        tabbarBg.alpha = 0;

        const tabs = new we.live.SegmentedControl(utils.EnumHelpers.values(core.LotteryTab), 'lottery');
        tabBarGroup.addChild(tabbarBg);
        tabBarGroup.addChild(tabs);

        const stickyHeader = new ui.StickyContent();
        stickyHeader.width = 2600;
        stickyHeader.content = tabBarGroup;
        stickyHeader.scroller = page.scroller;
        stickyHeader.contentPaddingTop = 71;
        stickyHeader.y = 581;

        const slider = new ui.ImageSlider();
        slider.width = 2600;
        slider.height = 780;
        slider.x = 0;
        slider.y = 0;
        slider.configSlides(dir.lotteryResources.heroBanners);

        page['_tabbarBg'] = tabbarBg;
        page['_tabs'] = tabs;
        page['_stickyHeader'] = stickyHeader;
        page['_slider'] = slider;
        page['onScroll'] = function () {
          const scrollV = this.scroller.viewport.scrollV;
          const scrollTarget = 700;
          const ratio = Math.min(1, scrollV / scrollTarget);
          const opacity = egret.Ease.quintIn(ratio);
          this._tabbarBg.alpha = opacity;
          dir.evtHandler.dispatch(core.Event.UPDATE_NAVBAR_OPACITY, opacity);
        };
        page['onTabChanged'] = function () {
          const item = this._tabs.tabBar.selectedItem.key;
          env.currentTab = item;
          this.roomList.setGameFilters(item);
          this.roomList.setTableList(this.roomIds, true);
          this.scroller.viewport.scrollV = 0;
          this.scroller.validateNow();
        };

        page.scroller.addEventListener(egret.Event.CHANGE, page['onScroll'], page);
        page['_tabs'].addEventListener('CHANGE', page['onTabChanged'], page);
        page.roomList.addChild(page['_stickyHeader']);
        page.roomList.addChildAt(page['_slider'], 0);
      }

      public static destroy(page: Page) {
        page.scroller.removeEventListener(egret.Event.CHANGE, page['onScroll'], page);
        page['_tabs'].removeEventListener('CHANGE', page['onTabChanged'], page);
        page.roomList.removeChild(page['_stickyHeader']);
        page.roomList.removeChild(page['_slider']);
      }
    }
  }
}
