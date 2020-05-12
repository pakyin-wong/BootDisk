namespace we {
  export namespace overlay {
    export class PlayerProfile extends ui.Panel {
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

      private _txt_maxWinAmount: ui.RunTimeLabel;
      private _txt_maxWinCount: ui.RunTimeLabel;
      private _txt_follower: ui.RunTimeLabel;
      private _txt_following: ui.RunTimeLabel;
      private _txt_favouriteDealer: ui.RunTimeLabel;
      // new add
      private _txt_title: ui.RunTimeLabel;
      private _txt_iconsetting: ui.RunTimeLabel;
      private _section_iconSelect: eui.Group;

      private _sectionBackIcon: eui.Image;

      private _iconScroller: we.ui.Scroller;
      private _iconListData: eui.ArrayCollection;
      private _iconList: eui.List;
      private _iconGaySize = 10;

      private _editName: ui.BaseImageButton;

      public constructor(skin = null) {
        // super('PlayerProfile');
        super(skin);

        this._iconListData = new eui.ArrayCollection([
          {
            key: 1,
            url: 'resource/d_lobby_profile_pic_01_png',
          },
        ]);
      }

      // protected mount() {
      //   super.mount();
      //   this.initPlayerProfile();
      //   // dir.evtHandler.addEventListener(core.Event.ORIENTATION_UPDATE, this.onOrientationChangePlayerProfile, this);
      // }

      protected initPlayerProfile() {
        this._txt_maxWinAmount.renderText = () => `${i18n.t('playerprofile_maxWinAmount')}`;
        this._txt_maxWinCount.renderText = () => `${i18n.t('playerprofile_maxWinCount')}`;
        this._txt_follower.renderText = () => `${i18n.t('playerprofile_follower')}`;
        this._txt_following.renderText = () => `${i18n.t('playerprofile_following')}`;
        this._txt_favouriteDealer.renderText = () => `${i18n.t('playerprofile_favouriteDealer')}`;
        if (env.isMobile) {
          this._txt_iconsetting.renderText = () => `${i18n.t('playerprofile_iconsetting')}`;
          this._txt_title.renderText = () => `${i18n.t('playerprofile_title')}`;
          this._txt_iconsetting.renderText = () => `${i18n.t('playerprofile_iconsetting')}`;
        }

        // create mask
        const shape = new egret.Shape();
        shape.graphics.beginFill(0xffffff, 1);
        shape.graphics.drawRect(0, 0, this._maskContainer.width, this._maskContainer.height);
        shape.graphics.endFill();
        this._maskContainer.addChild(shape);
        this._maskContainer.mask = shape;
        // init scroller
        this._iconList.itemRenderer = ui.IconItemRenderer;
        this._iconList.itemRendererSkinName = utils.getSkinByClassname('PlayerProfileIconItem');
        this._iconList.dataProvider = this._iconListData;

        this._iconScroller.useMiniScrollBar = true;

        this.addListeners();
      }

      protected destroy() {
        super.destroy();
        this.removeListeners();
      }

      private addListeners() {
        this._playerIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.slideToIconSelectSection, this);
        this._sectionBackIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.slideToMainSection, this);
        this._editName.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeNameSection, this);
      }

      private removeListeners() {
        this._playerIcon.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.slideToIconSelectSection, this);
        this._sectionBackIcon.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.slideToMainSection, this);
        this._editName.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.changeNameSection, this);
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

      private changeNameSection() {
        dir.evtHandler.createOverlay({
          class: 'ChangeName',
        });
        logger.l(`NavSideMenu::onClickHistory`);
      }

      protected initOrientationDependentComponent() {
        super.initOrientationDependentComponent();
        this.initPlayerProfile();
      }

      // protected onOrientationChangePlayerProfile() {
      //   this.destroy();
      //   this.initPlayerProfile();
      // }
    }
  }
}
