// TypeScript file
namespace we {
  export namespace favourite {
    export class MLFavouriteContentInitializer implements IContentInitializer {
      protected root: GameTableList;
      protected _shouldTouchFocus: boolean = true;
      constructor() {}

      public initContent(root: GameTableList) {
        this.root = root;

        // root.slider = new ui.ImageSlider();
        // root.slider.x = 60;
        // root.slider.width = 850;
        // root.slider.height = 850;
        // root.slider.configSlides(dir.liveResources.liveHeroBanners);
        // root.holder = new we.ui.HorizontalHolder();
        // root.holder.x = 60;
        // root.holder.slideHeight = 850;
        // root.holder.slideWidth = 850;
        // root.holder.isAuto = true;
        // root.holder.isLoop = true;
        // root.holder.isBullet = true;
        // root.holder.height = 850;
        // root.holder.width = 850;
        // root.holder.bulletGapValue = 20;
        // root.holder.bulletBottom = 50;
        // root.holder.bulletHorizontalCenter = 0;
        // dir.liveResources.liveHeroBanners.forEach(element => {
        //   const _group = new eui.Group();
        //   _group.height = root.holder.height;
        //   _group.width = root.holder.width;
        //   const image = new eui.Image();
        //   const _mask = new egret.Shape();
        //   _mask.graphics.beginFill(0xffffff, 1);
        //   _mask.graphics.drawRoundRect(0, 0, root.holder.height, root.holder.width, 100, 100);
        //   _mask.graphics.endFill();
        //   _group.addChild(_mask);
        //   _mask.visible = false;
        //   if (element.image) {
        //     image.source = element.image;
        //     image.height = root.holder.height;
        //     image.width = root.holder.width;
        //     image.fillMode = 'cover';
        //     // image.mask = _mask;
        //     _group.mask = _mask;
        //     _mask.visible = true;
        //   } else {
        //   }
        //   // _group.mask = _mask
        //   _group.addChild(image);
        //   root.holder.addChild(_group);
        //   // _group.addChild(_mask);
        //   // image.mask = _mask;
        //   // root.holder.addChild(image);
        //   // root.holder.addChild(_mask);
        // });

        root.roomList.layout = root.roomListRefer.layout;
        root.roomList.itemRenderer = live.MobileLiveListHolder;
        root.roomList.setGameFilters(core.LiveGameTab.all);
        root.roomList.setTableList(root.roomIds);
        root.roomList.useVirtualLayout = true;

        root.scroller.viewport = root.roomList;
        root.scroller.viewport.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this, true, -1);
        root.scroller.viewport.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchContinue, this, true, -1);
        root.scroller.viewport.addEventListener(egret.TouchEvent.TOUCH_END, this.touchContinue, this, true, -1);

        root.tabItems = utils.EnumHelpers.values(core.LiveGameTab);
        root.tabs = new live.DropDownLiveGameTabbar(root.tabItems);
        root.addChild(root.tabs);

        this.setDisplayMode(env.lobbyGridType);
      }

      protected touchBegin(e: egret.TouchEvent) {
        if (e.currentTarget !== e.target) {
          if ((e.target as egret.EventDispatcher).hasEventListener(egret.TouchEvent.TOUCH_BEGIN)) {
            this._shouldTouchFocus = false;
            e.preventDefault();
            return;
          }
        }
        this._shouldTouchFocus = true;
      }
      protected touchContinue(e: egret.TouchEvent) {
        if (!this._shouldTouchFocus) {
          e.preventDefault();
        }
      }

      public onDisplayMode(evt: egret.Event) {
        this.setDisplayMode(evt.data);
      }

      protected setDisplayMode(mode) {
        this.root.roomList.layout.clearVirtualLayoutCache();
        switch (mode) {
          case we.lobby.mode.NORMAL:
            this.root.currentState = 'normal';
            break;
          case we.lobby.mode.SIMPLE:
          default:
            this.root.currentState = 'simple';
            break;
        }
      }

      public reloadBanners() {}
    }
  }
}
