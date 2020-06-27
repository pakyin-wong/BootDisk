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

      private _txt_title: ui.RunTimeLabel;
      private _txt_setting: ui.RunTimeLabel;
      private _section_iconSelect: eui.Group;

      private _sectionBackIcon: eui.Image;

      private _iconScroller: we.ui.Scroller;
      private _iconListData: eui.ArrayCollection;
      private _iconList: eui.List;
      private iconList: string[];
      private _iconGaySize = 10;

      private _nameScroller: we.ui.Scroller;
      private _arrow: eui.Image;

      private _editName: ui.BaseImageButton;
      protected _group_nickname: eui.Group;
      protected _group_ddm: eui.Group;
      protected _ddm_nickname: ui.Panel;

      public constructor(skin = null) {
        super('PlayerProfile');
        // super(skin);
        this.createIconList();
      }

      protected mount() {
        super.mount();

        if (!env.isMobile) {
          let i = 0; // to calculate y value of ddm_nickname
          // for (const item of Object.keys(env.nameList)) {
          for (const item of Object.keys(env._groups)) {
            // TODO: use eng._groups
            // for each groupKey

            const bindFunc = this.onSelectNickname.bind(item);

            const _btn_nickname: eui.Group = new eui.Group();
            const _mask_nickname: eui.Rect = new eui.Rect();
            const _arrow_nickname: eui.Image = new eui.Image();
            const _txt_nickname: ui.RunTimeLabel = new ui.RunTimeLabel();
            this._ddm_nickname = new ui.Panel();

            _btn_nickname.width = 330;
            _btn_nickname.height = 50;
            _btn_nickname.x = 5;
            _btn_nickname.y = 0;
            _btn_nickname.scaleX = _btn_nickname.scaleY = 1;

            _mask_nickname.fillAlpha = 0;
            _mask_nickname.strokeColor = 0x3b4f6c;
            _mask_nickname.strokeAlpha = 1;
            _mask_nickname.strokeWeight = 2;
            _mask_nickname.ellipseWidth = _mask_nickname.ellipseHeight = 50;
            _mask_nickname.scaleX = _mask_nickname.scaleY = 1;
            _mask_nickname.left = _mask_nickname.top = _mask_nickname.bottom = 0;
            _mask_nickname.width = _btn_nickname.width;

            _txt_nickname.text = env._nicknameSet['groups'][item]; // groupKey
            _txt_nickname.verticalAlign = 'middle';
            _txt_nickname.textAlign = 'center';
            _txt_nickname.scaleX = 1;
            _txt_nickname.x = 48;
            _txt_nickname.y = 7;
            _txt_nickname.width = 155;
            _txt_nickname.height = 36;
            _txt_nickname.fontFamily = 'NotoSansCJKtc';
            _txt_nickname.size = 24;
            _txt_nickname.scaleY = 1;

            _arrow_nickname.source = 'd_lobby_button_down_normal_png';
            _arrow_nickname.width = _arrow_nickname.height = 30;
            _arrow_nickname.right = 20;
            _arrow_nickname.verticalCenter = 0;

            this._group_ddm.touchEnabled = false;
            this._ddm_nickname.y = _btn_nickname.y + _btn_nickname.height * (i + 1) + 10 + 30 * i;
            this._ddm_nickname.width = 300;
            this._ddm_nickname.skinName = 'skin_desktop.NavDropdown';

            this._group_nickname.addChild(_btn_nickname);
            this._group_ddm.addChild(this._ddm_nickname);
            _btn_nickname.addChild(_mask_nickname);
            _btn_nickname.addChild(_txt_nickname);
            _btn_nickname.addChild(_arrow_nickname);

            const _arrCol_nickname: eui.ArrayCollection = new eui.ArrayCollection();

            // env.nameList[item].forEach((_item, index) => {
            //   // data inside each name group
            //   _arrCol_nickname.source.push(
            //     ui.NewDropdownItem(index, () => {
            //       // const nickName = env.nameList[nicknameKey][env.language] || env.nameList[nicknameKey]['en'];
            //       console.log(env.language, env.nameList[item][index][1]);
            //       // return _item[1];
            //       return env.nameList[item][index][1];
            //     })
            //   );
            // })
            // console.log(`.........${JSON.stringify(env._groups[item])}`);
            // console.log(`.........${JSON.stringify(env._groups)}`);
            env._groups[item].forEach((nicknameKey, index) => {
              _arrCol_nickname.source.push(
                ui.NewDropdownItem(index, () => {
                  const langCode = env.language;
                  const nickname = env._nicknames[langCode][nicknameKey]['value'] || env._nicknames['en'][nicknameKey]['value'];
                  return nickname;
                })
              );
            });

            if (this._ddm_nickname) {
              this._ddm_nickname.isDropdown = true;
              this._ddm_nickname.isPoppable = true;
              this._ddm_nickname.dismissOnClickOutside = true;
              this._ddm_nickname.setToggler(_btn_nickname);
              this._ddm_nickname.dropdown.review = _txt_nickname;
              // this._ddm_nickname.dropdown.reviewRenderText = renderText => () => `Nickname: ${renderText()}`;
              this._ddm_nickname.dropdown.reviewRenderText = renderText => () => _txt_nickname.text;
              this._ddm_nickname.dropdown.data.replaceAll(_arrCol_nickname.source);
              this._ddm_nickname.dropdown.select(env.voice);
            }
            utils.DropdownCreator.new({
              toggler: _btn_nickname,
              review: _txt_nickname,
              arrCol: _arrCol_nickname,
              title: () => ``,
              selected: env.nickname,
            });

            this._ddm_nickname.addEventListener('DROPDOWN_ITEM_CHANGE', bindFunc, this);
            i++;
          }
        }
      }

      protected initPlayerProfile() {
        this._txt_maxWinAmount.renderText = () => `${i18n.t('playerprofile_maxWinAmount')}`;
        this._txt_maxWinCount.renderText = () => `${i18n.t('playerprofile_maxWinCount')}`;
        this._txt_follower.renderText = () => `${i18n.t('playerprofile_follower')}`;
        this._txt_following.renderText = () => `${i18n.t('playerprofile_following')}`;
        this._txt_favouriteDealer.renderText = () => `${i18n.t('playerprofile_favouriteDealer')}`;
        this._username.renderText = () => env.nickname;
        this._playerIcon.source = env.profileimage;
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
          this._editName.addEventListener(egret.TouchEvent.TOUCH_TAP, this.slideToNameSelectSection, this);
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
          this._editName.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.slideToNameSelectSection, this);
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
        dir.evtHandler.createOverlay({
          class: 'ChangeName',
        });
        logger.l(utils.LogTarget.DEBUG, `NavSideMenu::ChangeName`);
      }

      private onChangeIcon() {
        this._playerIcon.source = env.profileimage = this.iconList[this._iconList.selectedIndex];
        dir.evtHandler.dispatch(core.Event.ICON_UPDATE);
        // this.slideToMainSection();
      }

      private onSelectNickname(e) {
        const _data = this as any;
        env.nickname = env.nameList[_data][e.data][1];
        dir.evtHandler.dispatch(core.Event.NICKNAME_UPDATE);
      }

      protected createIconList() {
        if (env.icons) {
          this.iconList = [];
          for (const item of Object.keys(env.icons)) {
            this.iconList.push(env.icons[item]); // array of icons
          }
          this._iconListData = new eui.ArrayCollection(this.iconList);
        }
      }

      protected initOrientationDependentComponent() {
        super.initOrientationDependentComponent();
        this.initPlayerProfile();
      }
    }
  }
}
