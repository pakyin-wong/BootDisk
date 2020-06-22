namespace we {
  export namespace overlay {
    export class ChangeName extends ui.Panel {
      protected _txt_title: ui.RunTimeLabel;
      protected scroller: ui.Scroller;
      protected collection: eui.ArrayCollection;
      protected _editRoadPanel: ba.GoodRoadEditItem;
      protected _changeName: ui.BaseImageButton;
      protected _dropDownMenu: egret.DisplayObject;

      protected _group_nickname: eui.Group;
      private _arrCol_nickname: eui.ArrayCollection;
      private _txt_nickname: ui.RunTimeLabel;
      protected _btn_nickname: eui.Group;
      private _ddm_nickname: ui.Panel;
      private _arrow_nickname: eui.Image;
      private _mask_nickname: eui.Rect;

      private _mask: eui.Rect;

      constructor() {
        super('ChangeName');
      }

      protected mount() {
        super.mount();
      }

      protected init_menu() {
        this._txt_title.renderText = () => `${i18n.t('nav.system.changeName')}`;

        let idx = 0;
        for (const item of Object.keys(env.nameList)) {
          // for each groupKey

          // create nameGroup
          // const nameGroup: eui.Group = this.createNameGroup();

          this.addNameGroup();
          this._txt_nickname.text = item;
          this._arrCol_nickname = new eui.ArrayCollection();

          env.nameList[item].forEach((_item, index) => {
            this._arrCol_nickname.source.push(ui.NewDropdownItem(index, () => _item[1]));
            console.log(_item, index);
          });

          if (this._ddm_nickname) {
            this._ddm_nickname.isDropdown = true;
            this._ddm_nickname.isPoppable = true;
            this._ddm_nickname.dismissOnClickOutside = true;
            this._ddm_nickname.setToggler(this._btn_nickname);
            this._ddm_nickname.dropdown.review = this._txt_nickname;
            this._ddm_nickname.dropdown.data.replaceAll(this._arrCol_nickname.source);
            this._ddm_nickname.dropdown.select(env.nickname);
          }
          utils.DropdownCreator.new({
            toggler: this._btn_nickname,
            review: this._txt_nickname,
            arrCol: this._arrCol_nickname,
            title: () => ``,
            selected: this._txt_nickname,
          });
          const bindFunc = this.onNicknameChange.bind(this, idx);
          this.addListeners(bindFunc);
          idx++;
        }
      }

      protected addNameGroup() {
        this._arrow_nickname = new eui.Image();
        this._arrow_nickname.source = 'd_lobby_button_down_normal_png';
        this._arrow_nickname.width = 80;
        this._arrow_nickname.height = 80;
        this._arrow_nickname.right = 30;
        this._arrow_nickname.verticalCenter = 0;

        this._txt_nickname = new ui.RunTimeLabel();
        this._txt_nickname.width = 453;
        this._txt_nickname.height = 89;
        this._txt_nickname.verticalAlign = 'middle';
        this._txt_nickname.textAlign = 'center';
        this._txt_nickname.size = 60;
        this._txt_nickname.alpha = 0.7;
        this._txt_nickname.scaleX = 1;
        this._txt_nickname.horizontalCenter = 0;
        this._txt_nickname.verticalCenter = 0;

        this._mask_nickname = new eui.Rect();
        this._mask_nickname.fillAlpha = 0.2;
        this._mask_nickname.fillColor = 0x4b535b;
        this._mask_nickname.ellipseWidth = this._mask_nickname.ellipseHeight = 130;
        this._mask_nickname.scaleX = this._mask_nickname.scaleY = 1;
        this._mask_nickname.left = this._mask_nickname.right = this._mask_nickname.top = this._mask_nickname.bottom = 0;

        this._btn_nickname = new eui.Group();
        this._btn_nickname.width = 1050;
        this._btn_nickname.height = 130;
        this._btn_nickname.x = 97;
        this._btn_nickname.y = 431;

        this._group_nickname.addChild(this._btn_nickname);
        this._btn_nickname.addChild(this._mask_nickname);
        this._btn_nickname.addChild(this._txt_nickname);
        this._btn_nickname.addChild(this._arrow_nickname);
      }

      protected destroy() {
        super.destroy();
        this.removeListeners();
      }

      protected addListeners(bindFunc) {
        this._btn_nickname.addEventListener('DROPDOWN_ITEM_CHANGE', bindFunc, this);
        this._btn_nickname.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNicknameSelect, this);
      }

      protected removeListeners() {
        this._btn_nickname.removeEventListener('DROPDOWN_ITEM_CHANGE', this.onNicknameChange, this);
        this._btn_nickname.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onNicknameSelect, this);
      }

      private onNicknameSelect(item) {
        if (env.orientation === 'portrait') {
          this._mask_nickname.fillColor = 0x1b416e;
          this._arrow_nickname.rotation += 180;
        }
        this._mask.visible = !this._mask.visible;
        dir.monitor._mDropdown._title.renderText = () => item + '     ' + env.nickname;
      }

      private onNicknameChange(e, idx) {
        if (env.orientation === 'portrait') {
          this._arrow_nickname.rotation = 180;
        }
        env.nickname = env.nameList['groupKey01'][e.data][1];
        dir.evtHandler.dispatch(core.Event.NICKNAME_UPDATE);
        this.previousPage();
      }

      private previousPage() {
        dir.evtHandler.createOverlay({
          class: 'PlayerProfile',
          args: ['PlayerProfile'],
        });
        logger.l(utils.LoggerTarget.DEBUG, `NavSideMenu::PlayerProfile`);
      }

      protected initOrientationDependentComponent() {
        super.initOrientationDependentComponent();
        this.init_menu();
      }
    }
  }
}
