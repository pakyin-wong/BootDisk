namespace we {
  export namespace overlay {
    export class PlayerProfile extends ui.Panel {
      private _maskContainer: eui.Group;
      private _section_main: eui.Group;

      private _playerIcon: eui.Image;
      private _changeIcon: eui.Component;
      private _balance: eui.Label;
      private _maxWinAmount: eui.Label;
      private _maxWinCount: eui.Label;
      private _follower: eui.Label;
      private _following: eui.Label;
      private _favouriteDealer: eui.Label;

      private _username: ui.RunTimeLabel;
      private _txt_maxWinAmount: ui.RunTimeLabel;
      private _txt_maxWinCount: ui.RunTimeLabel;
      private _txt_follower: ui.RunTimeLabel;
      private _txt_following: ui.RunTimeLabel;
      private _txt_favouriteDealer: ui.RunTimeLabel;
      // new add
      private _txt_title: ui.RunTimeLabel;
      private _txt_setting: ui.RunTimeLabel;
      private _section_iconSelect: eui.Group;

      private _sectionBackIcon: eui.Image;

      private _iconScroller: we.ui.Scroller;
      private _iconListData: eui.ArrayCollection;
      private _nameListData: eui.ArrayCollection;
      protected dropdownSource: any[];
      private _iconList: eui.List;
      private _iconGaySize = 10;

      private _nameScroller: we.ui.Scroller;
      private _nameList: eui.List;
      private _arrow: eui.Image;

      protected _btn_name: egret.DisplayObject;
      protected _ddm_name: ui.Panel;
      protected _txt_name: ui.RunTimeLabel;

      private _editName: ui.BaseImageButton;

      public constructor(skin = null) {
        // super('PlayerProfile');
        super(skin);
        this._iconListData = new eui.ArrayCollection(env.icons);
      }
      protected mount() {
        super.mount();

        if (!env.isMobile) {
          this._txt_name.renderText = () => `${i18n.t('nav.userName.category.cartoon')}`;
          console.log(this._txt_name.text);

          // this.dropdownSource = env.nicknames.nickname_group1.map((data, index) => {
          //   return ui.NewDropdownItem(index, () => env.nicknames.nickname_group1[index]);
          // });
          this.dropdownSource = [];
          this._nameListData = new eui.ArrayCollection(this.dropdownSource);

          if (this._ddm_name) {
            this._ddm_name.isDropdown = true;
            this._ddm_name.isPoppable = true;
            this._ddm_name.dismissOnClickOutside = true;
            this._ddm_name.setToggler(this._btn_name);
            this._ddm_name.dropdown.review = this._txt_name;
            this._ddm_name.dropdown.data.replaceAll(this._nameListData.source);
            this._ddm_name.dropdown.select(env.voice);
          }
          utils.DropdownCreator.new({
            toggler: this._btn_name,
            review: this._txt_name,
            arrCol: this._nameListData,
            title: () => ``,
            selected: env.nickname,
          });
        }
      }

      protected initPlayerProfile() {
        this._txt_maxWinAmount.renderText = () => `${i18n.t('playerprofile_maxWinAmount')}`;
        this._txt_maxWinCount.renderText = () => `${i18n.t('playerprofile_maxWinCount')}`;
        this._txt_follower.renderText = () => `${i18n.t('playerprofile_follower')}`;
        this._txt_following.renderText = () => `${i18n.t('playerprofile_following')}`;
        this._txt_favouriteDealer.renderText = () => `${i18n.t('playerprofile_favouriteDealer')}`;
        this._username.renderText = () => env.nickname;
        this._playerIcon.source = env.icon;
        if (env.isMobile) {
          this._txt_title.renderText = () => `${i18n.t('playerprofile_title')}`;
        }

        // create mask
        const shape = new egret.Shape();
        shape.graphics.beginFill(0xffffff, 1);
        shape.graphics.drawRect(0, 0, this._maskContainer.width, this._maskContainer.height);
        shape.graphics.endFill();
        this._maskContainer.addChild(shape);
        this._maskContainer.mask = shape;
        // init icon scroller
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
        this._sectionBackIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.slideToMainSection, this);
        this._changeIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.slideToIconSelectSection, this);
        if (env.isMobile) {
          this._editName.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeName, this);
        }
        if (!env.isMobile) {
          // if desktop
          this._editName.addEventListener(egret.TouchEvent.TOUCH_TAP, this.slideToNameSelectSection, this);
          this._ddm_name.addEventListener('DROPDOWN_ITEM_CHANGE', this.onChangeName, this);
        }
        this._iconList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onChangeIcon, this);
      }

      private removeListeners() {
        this._sectionBackIcon.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.slideToMainSection, this);
        this._changeIcon.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.slideToIconSelectSection, this);
        if (env.isMobile) {
          this._editName.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeName, this);
        }
        if (!env.isMobile) {
          // if desktop
          this._editName.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.slideToNameSelectSection, this);
          this._ddm_name.removeEventListener('DROPDOWN_ITEM_CHANGE', this.onChangeName, this);
        }
        this._iconList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onChangeIcon, this);
      }

      private slideToIconSelectSection() {
        if (!env.isMobile) {
          this._iconScroller.visible = true;
          this._nameScroller.visible = false;
        }
        this._txt_setting.renderText = () => `${i18n.t('playerprofile_iconsetting')}`;
        // cancel current tween
        egret.Tween.removeTweens(this._section_main);
        egret.Tween.removeTweens(this._section_iconSelect);
        // tween move to new position
        egret.Tween.get(this._section_main).to({ $x: -this._section_main.width }, 200);
        egret.Tween.get(this._section_iconSelect).to({ $x: 0 }, 200);
      }

      private slideToNameSelectSection() {
        if (!env.isMobile) {
          this._iconScroller.visible = false;
          this._nameScroller.visible = true;
        }
        this._txt_setting.renderText = () => `${i18n.t('nav.system.changeName')}`;
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

      private onChangeName(e) {
        if (env.isMobile) {
          dir.evtHandler.createOverlay({
            class: 'ChangeName',
          });
          logger.l(utils.LoggerTarget.DEBUG, `NavSideMenu::ChangeName`);
        } else {
          this._username.text = env.nickname = env.nicknames.nickname_group1[e.data];
          dir.evtHandler.dispatch(core.Event.NICKNAME_UPDATE);
          this.slideToMainSection();
          this.mount();
        }
      }

      private onChangeIcon() {
        this._playerIcon.source = env.icon = env.icons[this._iconList.selectedIndex];
        dir.evtHandler.dispatch(core.Event.ICON_UPDATE);
        this.slideToMainSection();
      }

      protected initOrientationDependentComponent() {
        super.initOrientationDependentComponent();
        this.initPlayerProfile();
      }
    }
  }
}
