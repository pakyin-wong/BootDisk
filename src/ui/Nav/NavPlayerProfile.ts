namespace we {
  export namespace ui {
    export class NavPlayerProfile extends Panel {
      private _maskContainer: eui.Group;
      private _section_main: eui.Group;

      private _playerIcon: eui.Image;
      private _username: eui.Label;
      private _balance: eui.Label;
      private _maxWinAmount: eui.Label;
      private _maxWinCount: eui.Label;
      private _follower: eui.Label;
      private _following: eui.Label;
      private _favouriteDealer: eui.Label;

      private _txt_maxWinAmount: RunTimeLabel;
      private _txt_maxWinCount: RunTimeLabel;
      private _txt_follower: RunTimeLabel;
      private _txt_following: RunTimeLabel;
      private _txt_favouriteDealer: RunTimeLabel;

      private _section_iconSelect: eui.Group;

      private _sectionBackIcon: eui.Image;

      private _iconScroller: we.ui.Scroller;
      private _iconListData: eui.ArrayCollection = new eui.ArrayCollection([]);
      private _iconList: eui.List;
      private _iconGaySize = 30;

      public constructor() {
        super('NavPlayerProfile');
      }

      protected mount() {
        super.mount();

        this._txt_maxWinAmount.renderText = () => `${i18n.t('playerprofile_maxWinAmount')}`;
        this._txt_maxWinCount.renderText = () => `${i18n.t('playerprofile_maxWinCount')}`;
        this._txt_follower.renderText = () => `${i18n.t('playerprofile_follower')}`;
        this._txt_following.renderText = () => `${i18n.t('playerprofile_following')}`;
        this._txt_favouriteDealer.renderText = () => `${i18n.t('playerprofile_favouriteDealer')}`;

        // create mask
        const shape = new egret.Shape();
        shape.graphics.beginFill(0xffffff, 1);
        shape.graphics.drawRect(0,0, this._maskContainer.width, this._maskContainer.height);
        shape.graphics.endFill();
        this._maskContainer.addChild(shape);
        this._maskContainer.mask = shape;
        // init scroller
        const tlayout = new eui.TileLayout();
        tlayout.requestedColumnCount = 3;
        tlayout.horizontalGap = this._iconGaySize;
        tlayout.verticalGap = this._iconGaySize;

        this._iconList = new eui.List();
        this._iconList.dataProvider = this._iconListData;
        this._iconList.layout = tlayout;
        // for (let i = 1; i <= 8; i += 1) {
        //   for (let abc = 1; abc <= 2; abc += 1) {
        //     const image = new eui.Image();
        //     image.source = RES.getRes(`d_lobby_profile_pic_0${i}_png`);
        //     image.width = image.height = tlayout.columnWidth;
        //     grids.addChild(image);
        //   }
        // }
        this._iconScroller.useMiniScrollBar = true;
        this._iconScroller.viewport = this._iconList;

        this.addListeners();
      }

      protected destroy() {
        this.removeListeners();
      }

      private addListeners() {
        this._playerIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.slideToIconSelectSection, this);
        this._sectionBackIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.slideToMainSection, this);
      }

      private removeListeners() {
        this._playerIcon.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.slideToIconSelectSection, this);
        this._sectionBackIcon.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.slideToMainSection, this);
      }

      private slideToIconSelectSection() {
        // cancel current tween
        egret.Tween.removeTweens(this._section_main);
        egret.Tween.removeTweens(this._section_iconSelect);
        // tween move to new position
        egret.Tween.get(this._section_main).to({ $x: -this._section_main.width }, 200);
        egret.Tween.get(this._section_iconSelect).to({ $x: 0 }, 200);
      }

      private slideToMainSection() {
        // cancel current tween
        egret.Tween.removeTweens(this._section_main);
        egret.Tween.removeTweens(this._section_iconSelect);
        // tween move to new position
        egret.Tween.get(this._section_main).to({ $x: 0 }, 200);
        egret.Tween.get(this._section_iconSelect).to({ $x: this._section_iconSelect.width }, 200);
      }
    }
  }
}
