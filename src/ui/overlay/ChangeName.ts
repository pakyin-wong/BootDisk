namespace we {
  export namespace overlay {
    export class ChangeName extends ui.Panel {
      protected _txt_title: ui.RunTimeLabel;
      protected _group_nickname: eui.Group;
      private _mask: eui.Rect;

      constructor() {
        super('ChangeName');
      }

      protected mount() {
        super.mount();
      }

      protected init_menu() {
        this._txt_title.renderText = () => `${i18n.t('nav.system.changeName')}`;

        for (const item of Object.keys(env._groups)) {
          // for each groupKey

          const _btn_nickname: eui.Group = new eui.Group();
          const _mask_nickname: eui.Rect = new eui.Rect();
          const _arrow_nickname: eui.Image = new eui.Image();
          const _txt_nickname: ui.RunTimeLabel = new ui.RunTimeLabel();

          _txt_nickname.text = env.groupName[env.language][item];
          _txt_nickname.verticalAlign = 'middle';
          _txt_nickname.textAlign = 'center';
          _txt_nickname.scaleX = 1;

          _mask_nickname.fillAlpha = 0.2;
          _mask_nickname.fillColor = 0x4b535b;
          _mask_nickname.ellipseWidth = _mask_nickname.ellipseHeight = 130;
          _mask_nickname.scaleX = _mask_nickname.scaleY = 1;
          _mask_nickname.left = _mask_nickname.right = _mask_nickname.top = _mask_nickname.bottom = 0;

          _txt_nickname.size = 60;
          _txt_nickname.alpha = 0.7;
          _txt_nickname.height = 89;
          _txt_nickname.width = 450;
          _txt_nickname.horizontalCenter = _txt_nickname.verticalCenter = 0;

          switch (env.orientation) {
            case 'landscape':
              _btn_nickname.width = 1146;
              _btn_nickname.height = 120;
              _btn_nickname.x = 1128;
              _btn_nickname.y = 5;
              _btn_nickname.horizontalCenter = 0;

              _mask_nickname.width = 609;
              _mask_nickname.height = 120;

              _txt_nickname.y = 20;

              break;

            case 'portrait':
              _btn_nickname.width = 1050;
              _btn_nickname.height = 130;
              _btn_nickname.x = 97;
              _btn_nickname.y = 431;

              _arrow_nickname.source = 'd_lobby_button_down_normal_png';
              _arrow_nickname.width = _arrow_nickname.height = 80;
              _arrow_nickname.right = 30;
              _arrow_nickname.verticalCenter = 0;

              break;
          }

          this._group_nickname.addChild(_btn_nickname);
          _btn_nickname.addChild(_mask_nickname);
          _btn_nickname.addChild(_txt_nickname);
          _btn_nickname.addChild(_arrow_nickname);

          const _arrCol_nickname: eui.ArrayCollection = new eui.ArrayCollection();
          const bindFunc = this.onNicknameChange.bind(_arrCol_nickname);

          // env.nameList[item].forEach((_item, index) => {
          // _arrCol_nickname.source.push(ui.NewDropdownItem(index, () => _item[1]));
          env._groups[item].forEach((_item, index) => {
            const nickName = env._nicknames[env.language][_item] || env._nicknames['en'][_item];
            _arrCol_nickname.source.push(ui.NewDropdownItem(_item, () => nickName['value']));
          });

          _btn_nickname.name = item;
          utils.DropdownCreator.new({
            toggler: _btn_nickname,
            review: _txt_nickname,
            arrCol: _arrCol_nickname,
            title: () => ``,
            selected: _txt_nickname,
          });

          _btn_nickname.addEventListener('DROPDOWN_ITEM_CHANGE', bindFunc, this);
          _btn_nickname.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNicknameSelect, this);
        }
      }

      protected destroy() {
        super.destroy();
      }

      private onNicknameSelect(evt: egret.TouchEvent) {
        this._mask.visible = !this._mask.visible;
        const key = evt.currentTarget.name;
        dir.monitor._mDropdown._title.renderText = () => env.groupName[env.language][key] + '     ' + env.nickname;
      }

      private onNicknameChange(e) {
        const _data = this as any;
        const nickName = env._nicknames[env.language][e.data] || env._nicknames['en'][e.data];
        env.nickname = nickName['value'];
        env.nicknameKey = e.data;
        dir.evtHandler.dispatch(core.Event.NICKNAME_UPDATE);
        dir.evtHandler.createOverlay({
          class: 'PlayerProfile',
          args: ['PlayerProfile'],
        });
        logger.l(utils.LogTarget.DEBUG, `NavSideMenu::PlayerProfile`);
        dir.socket.updateSetting('nickname', env.nickname);
        dir.socket.updateSetting('nicknameKey', env.nicknameKey);
      }

      protected initOrientationDependentComponent() {
        super.initOrientationDependentComponent();
        this.init_menu();
      }
    }
  }
}
