namespace we {
  export namespace dil {
    export class History extends core.BaseEUI {
      protected _round10Title: ui.RunTimeLabel;
        public constructor(skin: string = null) {
            super(skin);
        }
        protected mount() {
          super.mount();
          this._round10Title.renderText = () => i18n.t('dice.recent10round');
        }
    }
  }
}
