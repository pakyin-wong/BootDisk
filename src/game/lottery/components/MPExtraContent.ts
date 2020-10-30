namespace we {
  export namespace lottery {
    export class MPExtraContent {
      protected static holder : ui.HorizontalHolder;

      public static mount(page: Page) {

        page.scroller.headerOffset = 220;

        this.holder = new we.ui.HorizontalHolder();
        this.holder.slideHeight = 1242;
        this.holder.slideWidth = 1242;
        this.holder.isAuto = true;
        this.holder.isLoop = true;
        this.holder.isBullet = true;
        this.holder.height = 1242;
        this.holder.width = 1242;
        this.holder.bulletGapValue = 20;
        this.holder.bulletBottom = 50;
        this.holder.bulletHorizontalCenter = 0;
        dir.lotteryResources.heroBanners.forEach(element => {
          const image = new eui.Image();
          if (element.image) {
            image.source = element.image;
          }
          this.holder.addChild(image);
        });

        const shape: egret.Shape = new egret.Shape();
        GradientFill.beginGradientFill(shape.graphics, page.width, 160, ['0x12121200', '0x121212'], 0);
        shape.graphics.drawRect(0, 0, page.width, 160);
        shape.y = this.holder.height - 160;

        const tabs = new live.DropDownLiveGameTabbar(utils.EnumHelpers.values(core.LotteryTab),'lottery');
        
        page['_tabbarBg'] = shape;
        page['_tabs'] = tabs;
        page['_slider'] = this.holder;
        page['onScroll'] = function () {
          const scrollV = this.scroller.viewport.scrollV;
          const scrollTarget = 1100;
          const ratio = Math.min(1, scrollV / scrollTarget);
          const opacity = egret.Ease.quintIn(ratio);
          this._tabbarBg.alpha = opacity;
          dir.evtHandler.dispatch(core.Event.UPDATE_NAVBAR_OPACITY, opacity);
        };
        page['onTabChanged'] = function () {
          const item = this._tabs.selectedItem;
          env.currentTab = item;
          this.roomList.setGameFilters(item);
          this.roomList.setTableList(this.roomIds, true);
          this.scroller.viewport.scrollV = 0;
          this.scroller.validateNow();
        };

        page.scroller.addEventListener(egret.Event.CHANGE, page['onScroll'], page);
        page['_tabs'].addEventListener('CHANGE', page['onTabChanged'], page);
        page.roomList.addChildAt(page['_tabs'], 0);
        // page.roomList.addChildAt(page['_tabbarBg'], 0);
        page.roomList.addChildAt(page['_slider'], 0);

        page['_tabs'].setSelectedItem(env.currentTab);
      }

      public static destroy(page: Page) {
        page.scroller.removeEventListener(egret.Event.CHANGE, page['onScroll'], page);
        page['_tabs'].removeEventListener('CHANGE', page['onTabChanged'], page);
        page.roomList.removeChild(page['_tabs']);
        // page.roomList.removeChild(page['_tabbarBg']);
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
