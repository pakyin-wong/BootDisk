namespace we {
  export namespace overlay {
    export class PlayerProfile extends ui.Panel {
      private _maskContainer: eui.Group;
      private _section_main: eui.Group;

      private _playerIcon: eui.Image;
      private _changeIcon: eui.Component;
      private _maxWinAmount: eui.Label;
      private _maxWinCount: eui.Label;
      private _follower: eui.Label;
      private _following: eui.Label;
      private _favouriteDealer: eui.Label;

      private _balance: ui.RunTimeLabel;
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

      // protected _Nav: ui.Nav;
      protected _winAmount: number;
      protected _winStreak: number;

      public constructor(skin = null) {
        super('PlayerProfile');
        // super(skin);
        this.createIconList();
      }

      // public set Nav(value: ui.Nav) {
      //   this._Nav = value;
      // }

      public get winAmount() {
        return this._winAmount;
      }

      public set winAmount(val: any) {
        this._winAmount = val;
      }

      public get winStreak() {
        return this._winStreak;
      }

      public set winStreak(val: any) {
        this._winStreak = val;
      }

      protected mount() {
        super.mount();

        this._section_iconSelect.visible = true;

        if (!env.isMobile) {
          let i = 0; // to calculate y value of ddm_nickname
          // for (const item of Object.keys(env.nameList)) {
          for (const item of Object.keys(env._groups)) {
            // TODO: use eng._groups
            // for each groupKey

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

            _txt_nickname.renderText = () => (env.groupName[env.language] ? env.groupName[env.language][item] : env.groupName['en'][item]);
            _txt_nickname.verticalAlign = 'middle';
            _txt_nickname.textAlign = 'center';
            _txt_nickname.scaleX = 1;
            _txt_nickname.x = 48;
            _txt_nickname.y = 7;
            _txt_nickname.width = 155;
            _txt_nickname.height = 36;
            // _txt_nickname.fontFamily = 'NotoSansCJKtc';
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
            const bindFunc = this.onSelectNickname.bind(this);

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

            env._groups[item].forEach((_item, index) => {
              _arrCol_nickname.source.push(
                ui.NewDropdownItem(_item, () => {
                  const nickName = env._nicknames[env.language] ? env._nicknames[env.language][_item] || env._nicknames['en'][_item] : env._nicknames['en'][_item];
                  return nickName['value'];
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
              this._ddm_nickname.dropdown.reviewRenderText = renderText => () => env.groupName[env.language][item];
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

      public updateProfileText() {
        this._maxWinAmount.text = this.winAmount;
        this._maxWinCount.text = this.winStreak;
      }

      protected initPlayerProfile() {
        this._balance.renderText = () => `${dir.meterCtr.getLocal('balance')}`;
        dir.meterCtr.register('balance', this._balance);
        if (!isNaN(env.balance)) {
          dir.meterCtr.rackTo('balance', env.balance, 0);
        }
        if (env.isMobile) {
          this.MobileGetPlayerProfileSummary();
        }

        this._txt_maxWinAmount.renderText = () => `${i18n.t('playerprofile_maxWinAmount')}`;
        this._txt_maxWinCount.renderText = () => `${i18n.t('playerprofile_maxWinCount')}`;
        this._txt_follower.renderText = () => `${i18n.t('playerprofile_follower')}`;
        this._txt_following.renderText = () => `${i18n.t('playerprofile_following')}`;
        this._txt_favouriteDealer.renderText = () => `${i18n.t('playerprofile_favouriteDealer')}`;
        this._username.renderText = () => env.nickname;
        this._playerIcon.source = env.icons && env.icons[env.profileimage] ? env.icons[env.profileimage] : 'd_lobby_profile_pic_01_png';
        if (env.isMobile) {
          this._txt_title.renderText = () => `${i18n.t('playerprofile_title')}`;
        }

        this._maxWinCount.text = env.maxWinCount.toString();
        this._maxWinAmount.text = env.maxWinAmount.toString();
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

      private MobileGetPlayerProfileSummary() {
        dir.socket.getPlayerProfileSummary(data => this.MobileUpdateMaxWinAmountAndCount(data));
      }

      protected MobileUpdateMaxWinAmountAndCount(data) {
        if (data.error) {
          return;
        }
        const { maxwin, winningstreak } = data;
        env.maxWinCount = winningstreak;
        env.maxWinAmount = maxwin;
        this.updateProfileText();
      }

      protected destroy() {
        super.destroy();
        // this._Nav = null;
        dir.meterCtr.drop('balance', this._balance);
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
        this._section_iconSelect.visible = true;
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
        this._section_iconSelect.visible = true;
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
        egret.Tween.get(this._section_iconSelect)
          .to({ $x: this._section_iconSelect.width }, 200)
          .call(() => {
            this._section_iconSelect.visible = false;
          });
      }

      private onChangeName(e) {
        dir.evtHandler.createOverlay({
          class: 'ChangeName',
        });
        logger.l(utils.LogTarget.DEBUG, `NavSideMenu::ChangeName`);
      }

      private onChangeIcon() {
        env.profileimage = this.iconList[this._iconList.selectedIndex];
        this._playerIcon.source = env.icons[env.profileimage];
        dir.evtHandler.dispatch(core.Event.ICON_UPDATE);
      }

      private onSelectNickname(e) {
        for (const panel of this._group_ddm.$children as ui.Panel[]) {
          if (panel !== e.currentTarget) {
            panel.dropdown.clearSelection();
          }
        }
        // const _data = this as any;
        const nickName = env._nicknames[env.language][e.data] || env._nicknames['en'][e.data];
        env.nickname = nickName['value'];
        env.nicknameKey = e.data;
        dir.evtHandler.dispatch(core.Event.NICKNAME_UPDATE);
      }

      protected createIconList() {
        if (env.icons) {
          this.iconList = [];
          for (const item of Object.keys(env.icons)) {
            this.iconList.push(item); // array of icons
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
