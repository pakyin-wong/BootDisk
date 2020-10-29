namespace we {
  export namespace lottery {
    export class MLExtraContent {
      protected static holder : ui.HorizontalHolder;

      public static mount(page: Page) {

        this.holder = new we.ui.HorizontalHolder();
        this.holder.maskRadius = 48;
        this.holder.x = 60;
        this.holder.slideHeight = 850;
        this.holder.slideWidth = 850;
        this.holder.isAuto = true;
        this.holder.isLoop = true;
        this.holder.isBullet = true;
        this.holder.height = 850;
        this.holder.width = 850;
        this.holder.bulletGapValue = 20;
        this.holder.bulletBottom = 50;
        this.holder.bulletHorizontalCenter = 0;
        dir.lotteryResources.heroBanners.forEach(element => {
          const image = new eui.Image();
          image.source = element.image;
          image.height = this.holder.height;
          image.width = this.holder.width;
          image.fillMode = 'cover';
          this.holder.addChild(image);
        });

        const tabs = new live.DropDownLiveGameTabbar(utils.EnumHelpers.values(core.LotteryTab),'lottery');

        page['_tabs'] = tabs;
        page['_slider'] = this.holder;
        page['onTabChanged'] = function () {
          const item = this._tabs.selectedItem;
          env.currentTab = item;
          this.roomList.setGameFilters(item);
          this.roomList.setTableList(this.roomIds, true);
          this.scroller.viewport.scrollV = 0;
          this.scroller.validateNow();
        };

        page['_tabs'].addEventListener('CHANGE', page['onTabChanged'], page);
        page.addChild(page['_tabs']);
        page.roomList.addChildAt(page['_slider'], 0);
      }

      public static destroy(page: Page) {
        page['_tabs'].removeEventListener('CHANGE', page['onTabChanged'], page);
        page.removeChild(page['_tabs']);
        page.roomList.removeChild(page['_slider']);
      }

      public static reloadBanners() {
        const holder = this.holder;
        holder.removeChildren();
        dir.lotteryResources.heroBanners.forEach(element => {
          const image = new eui.Image();
          image.source = element.image;
          image.height = holder.height;
          image.width = holder.width;
          image.fillMode = 'cover';
          holder.addChild(image);
        });
      }

    }
  }
}
