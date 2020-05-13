namespace we {
  export namespace overlay {
    export class ChangeName extends ui.Panel {
      protected _txt_title: ui.RunTimeLabel;
      protected scroller: ui.Scroller;
      protected collection: eui.ArrayCollection;
      protected _editRoadPanel: ba.GoodRoadEditItem;
      protected _changeName: ui.BaseImageButton;

      private _txt_Cartoon: ui.RunTimeLabel;
      private _txt_Myth: ui.RunTimeLabel;
      private _txt_Movie: ui.RunTimeLabel;

      protected _btn_Cartoon: egret.DisplayObject;
      protected _btn_Myth: egret.DisplayObject;
      protected _btn_Movie: egret.DisplayObject;

      private _ddm_Cartoon: ui.Panel;
      private _ddm_Myth: ui.Panel;
      private _ddm_Movie: ui.Panel;

      private _arrow_Cartoon: eui.Image;
      private _arrow_Myth: eui.Image;
      private _arrow_Movie: eui.Image;

      private _mask_Cartoon: eui.Rect;
      private _mask_Myth: eui.Rect;
      private _mask_Movie: eui.Rect;
      private _mask: eui.Rect;

      constructor() {
        super('ChangeName');
      }

      protected mount() {
        super.mount();
      }

      protected init_menu() {
        this._txt_title.renderText = () => `${i18n.t('nav.system.changeName')}`;
        this._txt_Cartoon.renderText = () => `${i18n.t('nav.userName.category.cartoon')}`;
        this._txt_Myth.renderText = () => `${i18n.t('nav.userName.category.myth')}`;
        this._txt_Movie.renderText = () => `${i18n.t('nav.userName.category.movie')}`;

        const _arrCol_Cartoon = new eui.ArrayCollection([
          ui.NewDropdownItem('1', () => `${i18n.t('nav.userName.name.name1')}`),
          ui.NewDropdownItem('2', () => `${i18n.t('nav.userName.name.name2')}`),
          ui.NewDropdownItem('3', () => `${i18n.t('nav.userName.name.name3')}`),
          ui.NewDropdownItem('4', () => `${i18n.t('nav.userName.name.name4')}`),
          ui.NewDropdownItem('5', () => `${i18n.t('nav.userName.name.name5')}`),
        ]);

        if (this._ddm_Cartoon) {
          this._ddm_Cartoon.isDropdown = true;
          this._ddm_Cartoon.isPoppable = true;
          this._ddm_Cartoon.dismissOnClickOutside = true;
          this._ddm_Cartoon.setToggler(this._btn_Cartoon);
          this._ddm_Cartoon.dropdown.review = this._txt_Cartoon;
          this._ddm_Cartoon.dropdown.data.replaceAll(_arrCol_Cartoon.source);
          this._ddm_Cartoon.dropdown.select(env.nickname);
        }
        utils.DropdownCreator.new({
          toggler: this._btn_Cartoon,
          review: this._txt_Cartoon,
          arrCol: _arrCol_Cartoon,
          title: () => ``,
          selected: this._txt_Cartoon,
        });

        const _arrCol_Myth = new eui.ArrayCollection([
          ui.NewDropdownItem('1', () => `${i18n.t('nav.userName.name.name1')}`),
          ui.NewDropdownItem('2', () => `${i18n.t('nav.userName.name.name2')}`),
          ui.NewDropdownItem('3', () => `${i18n.t('nav.userName.name.name3')}`),
          ui.NewDropdownItem('4', () => `${i18n.t('nav.userName.name.name4')}`),
          ui.NewDropdownItem('5', () => `${i18n.t('nav.userName.name.name5')}`),
        ]);
        if (this._ddm_Myth) {
          this._ddm_Myth.isDropdown = true;
          this._ddm_Myth.isPoppable = true;
          this._ddm_Myth.dismissOnClickOutside = true;
          this._ddm_Myth.setToggler(this._btn_Myth);
          this._ddm_Myth.dropdown.review = this._txt_Myth;
          this._ddm_Myth.dropdown.data.replaceAll(_arrCol_Myth.source);
          this._ddm_Myth.dropdown.select(env.nickname);
        }
        utils.DropdownCreator.new({
          toggler: this._btn_Myth,
          review: this._txt_Myth,
          arrCol: _arrCol_Myth,
          title: () => ``,
          selected: this._txt_Myth,
        });

        const _arrCol_Movie = new eui.ArrayCollection([
          ui.NewDropdownItem('1', () => `${i18n.t('nav.userName.name.name1')}`),
          ui.NewDropdownItem('2', () => `${i18n.t('nav.userName.name.name2')}`),
          ui.NewDropdownItem('3', () => `${i18n.t('nav.userName.name.name3')}`),
          ui.NewDropdownItem('4', () => `${i18n.t('nav.userName.name.name4')}`),
          ui.NewDropdownItem('5', () => `${i18n.t('nav.userName.name.name5')}`),
        ]);
        if (this._ddm_Movie) {
          this._ddm_Movie.isDropdown = true;
          this._ddm_Movie.isPoppable = true;
          this._ddm_Movie.dismissOnClickOutside = true;
          this._ddm_Movie.setToggler(this._btn_Movie);
          this._ddm_Movie.dropdown.review = this._txt_Movie;
          this._ddm_Movie.dropdown.data.replaceAll(_arrCol_Movie.source);
          // this._ddm_Movie.dropdown.select(env.nickname);
        }
        utils.DropdownCreator.new({
          toggler: this._btn_Movie,
          review: this._txt_Movie,
          arrCol: _arrCol_Movie,
          title: () => ``,
          selected: this._txt_Movie,
        });

        this.addListeners();
      }

      protected destroy() {
        super.destroy();
        this.removeListeners();
      }

      protected addListeners() {
        this._btn_Cartoon.addEventListener('DROPDOWN_ITEM_CHANGE', this.onCartoonChange, this);
        this._btn_Myth.addEventListener('DROPDOWN_ITEM_CHANGE', this.onMythChange, this);
        this._btn_Movie.addEventListener('DROPDOWN_ITEM_CHANGE', this.onMovieChange, this);
        this._btn_Cartoon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCartoonSelect, this);
        this._btn_Myth.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMythSelect, this);
        this._btn_Movie.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMovieSelect, this);
      }

      protected removeListeners() {
        console.log('remove listener');
        this._btn_Cartoon.removeEventListener('DROPDOWN_ITEM_CHANGE', this.onCartoonChange, this);
        this._btn_Myth.removeEventListener('DROPDOWN_ITEM_CHANGE', this.onMythChange, this);
        this._btn_Movie.removeEventListener('DROPDOWN_ITEM_CHANGE', this.onMovieChange, this);
        this._btn_Cartoon.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCartoonSelect, this);
        this._btn_Myth.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onMythSelect, this);
        this._btn_Movie.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onMovieSelect, this);
      }

      private onCartoonSelect() {
        this._mask_Cartoon.fillColor = 0x1b416e;
        this._mask.alpha = 0.4;
        console.log(this._mask.alpha);
        this._arrow_Cartoon.rotation += 180;
      }

      private onMythSelect() {
        this._mask_Myth.fillColor = 0x1b416e;
        this._mask.alpha = 0.4;
        this._arrow_Myth.rotation += 180;
      }

      private onMovieSelect() {
        this._mask_Movie.fillColor = 0x1b416e;
        this._mask.alpha = 0.4;
        this._arrow_Movie.rotation += 180;
      }

      private onCartoonChange(e) {
        env.nickname = e.data;
        console.log(env.nickname);
        dir.evtHandler.dispatch(core.Event.PLAYER_PROFILE_UPDATE, e.data);
        this.previousPage();
      }

      private onMythChange(e) {
        this._arrow_Myth.rotation = 180;
        env.nickname = e.data;
        console.log(`rotation${this._arrow_Cartoon.rotation}`);
        console.log(env.nickname);
        dir.evtHandler.dispatch(core.Event.PLAYER_PROFILE_UPDATE, e.data);
        this.previousPage();
      }

      private onMovieChange(e) {
        this._arrow_Movie.rotation = 180;
        env.nickname = e.data;
        console.log(`rotation${this._arrow_Cartoon.rotation}`);
        console.log(env.nickname);
        dir.evtHandler.dispatch(core.Event.PLAYER_PROFILE_UPDATE, e.data);
        this.previousPage();
      }
      private previousPage() {
        dir.evtHandler.createOverlay({
          class: 'PlayerProfile',
          args: ['PlayerProfile'],
        });
        logger.l(`NavSideMenu::PlayerProfile`);
      }

      protected initOrientationDependentComponent() {
        super.initOrientationDependentComponent();
        this.init_menu();
      }
    }
  }
}
