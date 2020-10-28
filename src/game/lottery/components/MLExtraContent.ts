namespace we {
  export namespace lottery {
    export class MLExtraContent {
      public static mount(page: Page) {

        const holder = new we.ui.HorizontalHolder();
        holder.maskRadius = 48;
        holder.x = 60;
        holder.slideHeight = 850;
        holder.slideWidth = 850;
        holder.isAuto = true;
        holder.isLoop = true;
        holder.isBullet = true;
        holder.height = 850;
        holder.width = 850;
        holder.bulletGapValue = 20;
        holder.bulletBottom = 50;
        holder.bulletHorizontalCenter = 0;
        dir.lotteryResources.heroBanners.forEach(element => {
          const image = new eui.Image();
          image.source = element.image;
          image.height = holder.height;
          image.width = holder.width;
          image.fillMode = 'cover';
          holder.addChild(image);
        });

        const tabs = new live.DropDownLiveGameTabbar(utils.EnumHelpers.values(core.LotteryTab),'lottery');

        page['_tabs'] = tabs;
        page['_slider'] = holder;
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
    }
  }
}
