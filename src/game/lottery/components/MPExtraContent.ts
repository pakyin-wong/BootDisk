namespace we {
  export namespace lottery {
    export class MPExtraContent {
      public static mount(page: Page) {

        page.scroller.headerOffset = 220;

        const holder = new we.ui.HorizontalHolder();
        holder.slideHeight = 1242;
        holder.slideWidth = 1242;
        holder.isAuto = true;
        holder.isLoop = true;
        holder.isBullet = true;
        holder.height = 1242;
        holder.width = 1242;
        holder.bulletGapValue = 20;
        holder.bulletBottom = 50;
        holder.bulletHorizontalCenter = 0;
        dir.liveResources.liveHeroBanners.forEach(element => {
          const image = new eui.Image();
          if (element.image) {
            image.source = element.image;
          }
          holder.addChild(image);
        });

        const shape: egret.Shape = new egret.Shape();
        GradientFill.beginGradientFill(shape.graphics, page.width, 160, ['0x12121200', '0x121212'], 0);
        shape.graphics.drawRect(0, 0, page.width, 160);
        shape.y = holder.height - 160;

        const tabs = new live.DropDownLiveGameTabbar(utils.EnumHelpers.values(core.LotteryTab),'lottery');

        page['_tabbarBg'] = shape;
        page['_tabs'] = tabs;
        page['_slider'] = holder;
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
      }

      public static destroy(page: Page) {
        page.scroller.removeEventListener(egret.Event.CHANGE, page['onScroll'], page);
        page['_tabs'].removeEventListener('CHANGE', page['onTabChanged'], page);
        page.roomList.removeChild(page['_tabs']);
        // page.roomList.removeChild(page['_tabbarBg']);
        page.roomList.removeChild(page['_slider']);
      }
    }
  }
}
