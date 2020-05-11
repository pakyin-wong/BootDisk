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

      constructor() {
        super('ChangeName');
      }

      protected mount() {
        super.mount();
      }

      protected init_menu() {
        this._txt_title.renderText = () => `${i18n.t('nav.system.changeName')}`;

        const _arrCol_Cartoon = new eui.ArrayCollection([ui.NewDropdownItem('sc', () => `简体中文`), ui.NewDropdownItem('tc', () => `繁體中文`), ui.NewDropdownItem('en', () => `English`)]);
        if (this._ddm_Cartoon) {
          this._ddm_Cartoon.isDropdown = true;
          this._ddm_Cartoon.isPoppable = true;
          this._ddm_Cartoon.dismissOnClickOutside = true;
          this._ddm_Cartoon.setToggler(this._btn_Cartoon);
          this._ddm_Cartoon.dropdown.review = this._txt_Cartoon;
          this._ddm_Cartoon.dropdown.data.replaceAll(_arrCol_Cartoon.source);
          this._ddm_Cartoon.dropdown.select(env.language);
        }
        utils.DropdownCreator.new({
          toggler: this._btn_Cartoon,
          review: this._txt_Cartoon,
          arrCol: _arrCol_Cartoon,
          title: () => ``,
          selected: env.language,
        });

        const _arrCol_Myth = new eui.ArrayCollection([
          ui.NewDropdownItem('cantonese', () => `${i18n.t('voice_cantonese')}`),
          ui.NewDropdownItem('mandarin', () => `${i18n.t('voice_mandarin')}`),
          ui.NewDropdownItem('english', () => `${i18n.t('voice_english')}`),
        ]);
        if (this._ddm_Myth) {
          this._ddm_Myth.isDropdown = true;
          this._ddm_Myth.isPoppable = true;
          this._ddm_Myth.dismissOnClickOutside = true;
          this._ddm_Myth.setToggler(this._btn_Myth);
          this._ddm_Myth.dropdown.review = this._txt_Myth;
          this._ddm_Myth.dropdown.data.replaceAll(_arrCol_Myth.source);
          this._ddm_Myth.dropdown.select(env.voice);
        }
        utils.DropdownCreator.new({
          toggler: this._btn_Myth,
          review: this._txt_Myth,
          arrCol: _arrCol_Myth,
          title: () => ``,
          selected: env.voice,
        });

        const _arrCol_Movie = new eui.ArrayCollection([
          ui.NewDropdownItem(1, () => `${i18n.t('nav.system.bgm')} 01`),
          ui.NewDropdownItem(2, () => `${i18n.t('nav.system.bgm')} 02`),
          ui.NewDropdownItem(3, () => `${i18n.t('nav.system.bgm')} 03`),
        ]);
        if (this._ddm_Movie) {
          this._ddm_Movie.isDropdown = true;
          this._ddm_Movie.isPoppable = true;
          this._ddm_Movie.dismissOnClickOutside = true;
          this._ddm_Movie.setToggler(this._btn_Movie);
          this._ddm_Movie.dropdown.review = this._txt_Movie;
          this._ddm_Movie.dropdown.data.replaceAll(_arrCol_Movie.source);
          this._ddm_Movie.dropdown.select(env.bgm);
        }
        utils.DropdownCreator.new({
          toggler: this._btn_Movie,
          review: this._txt_Movie,
          arrCol: _arrCol_Movie,
          title: () => ``,
          selected: env.bgm,
        });

        // this._txt_version.text = env.version;

        this.addListeners();
      }

      protected destroy() {
        super.destroy();
        this.removeListeners();
      }

      protected addListeners() {
        this._btn_Cartoon.addEventListener('DROPDOWN_ITEM_CHANGE', this.onCartoonSelect, this);
        this._btn_Myth.addEventListener('DROPDOWN_ITEM_CHANGE', this.onMythSelect, this);
        this._btn_Movie.addEventListener('DROPDOWN_ITEM_CHANGE', this.onMovieSelect, this);
      }

      protected removeListeners() {
        this._btn_Cartoon.removeEventListener('DROPDOWN_ITEM_CHANGE', this.onCartoonSelect, this);
        this._btn_Myth.removeEventListener('DROPDOWN_ITEM_CHANGE', this.onMythSelect, this);
        this._btn_Movie.removeEventListener('DROPDOWN_ITEM_CHANGE', this.onMovieSelect, this);
      }

      private onCartoonSelect(e) {
        i18n.setLang(e.data);
        this._ddm_Cartoon && this._ddm_Cartoon.dropdown.select(env.language);
      }

      private onMythSelect(e) {
        env.voice = e.data;
        dir.evtHandler.dispatch(core.Event.VOICE_UPDATE, e.data);
        this._ddm_Myth && this._ddm_Myth.dropdown.select(env.voice);
      }

      private onMovieSelect(e) {
        env.bgm = e.data;
        dir.evtHandler.dispatch(core.Event.BGM_UPDATE, e.data);
        this._ddm_Movie && this._ddm_Movie.dropdown.select(env.bgm);
      }

      protected initOrientationDependentComponent() {
        super.initOrientationDependentComponent();
        this.init_menu();
      }
    }
  }
}
