namespace we {
  export namespace lobby {
    export class Scene extends core.BaseScene {
      private _header: eui.Group;
      private _recommend: ui.RunTimeLabel;
      private _livegame: ui.RunTimeLabel;
      private _lottery: ui.RunTimeLabel;
      private _egame: ui.RunTimeLabel;
      private _favourite: ui.RunTimeLabel;

      private video: egret.FlvVideo;
      private liveSceneButton: eui.Button;

      constructor(data: any = null) {
        super(data);
        this.skinName = utils.getSkin('LobbyScene');
      }

      public onEnter() {
        // After pressing the Filter
        dir.socket.getTableList();
        // dir.socket.getTableList(enums.TableFilter.BACCARAT);
        dir.socket.getTableHistory();

        // const scroller = new ui.Scroller();
        // // scroller.percentWidth = 100;
        // scroller.width = 640;
        // scroller.percentHeight = 100;
        // scroller.right = 0;

        // this.addChild(scroller);

        // const collection = new eui.ArrayCollection([]);
        // const roomList = new ui.List();
        // const layout2 = new eui.VerticalLayout();
        // layout2.paddingBottom = 1;
        // roomList.layout = layout2;
        // roomList.enterFrom = 'right';
        // roomList.leaveTo = 'right';
        // roomList.isSwipeable = true;
        // roomList.swipeDirection = ui.SwipeDirection.right;
        // roomList.isAnimateItemTransition = true;
        // roomList.dataProvider = collection;
        // roomList.itemRenderer = LobbyListItem;
        // roomList.right = 0;
        // roomList.y = 1;
        // roomList.width = 640;
        // roomList.useVirtualLayout = false;
        // roomList.maxDisplayCount = 4;
        // setInterval(() => {
        //   roomList.addItem(Math.floor(Math.random() * 1000));
        // }, 500);
        // // scroller.viewport = roomList;
        // this.addChild(roomList);

        setTimeout(function () {
          // utils.linkTo('weweb://scene/ba?tableid=1');
          // utils.linkTo('https://www.google.com', 'Google');
        }, 8000);
      }

      public async onFadeEnter() {}

      public onExit() {
        this.removeChildren();
        this.sceneHeader.removeChildren();
      }

      public async onFadeExit() {}

      protected mount() {
        this._header.parent && this._header.parent.removeChild(this._header);
        this._recommend.renderText = () => `${i18n.t('lobby.header.recommend')}`;
        this._livegame.renderText = () => `${i18n.t('lobby.header.livegame')}`;
        this._lottery.renderText = () => `${i18n.t('lobby.header.lottery')}`;
        this._egame.renderText = () => `${i18n.t('lobby.header.egame')}`;
        this._favourite.renderText = () => `${i18n.t('lobby.header.favourite')}`;
        this.sceneHeader.addChild(this._header);

        this.addListeners();
      }

      protected addListeners() {
        utils.addButtonListener(this._recommend, this.onPageBtnPress);
        utils.addButtonListener(this._livegame, this.onPageBtnPress);
        utils.addButtonListener(this._lottery, this.onPageBtnPress);
        utils.addButtonListener(this._egame, this.onPageBtnPress);
        utils.addButtonListener(this._favourite, this.onPageBtnPress);
      }

      private onPageBtnPress(e: egret.TouchEvent) {
        logger.l(e.$currentTarget);
      }
    }
  }
}
