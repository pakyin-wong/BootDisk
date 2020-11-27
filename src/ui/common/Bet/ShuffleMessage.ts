namespace we {
  export namespace ui {
    export class ShuffleMessage extends InGameMessage {
        protected _txt: ui.RunTimeLabel;

        protected mount() {
            super.mount();
            this._txt.renderText = ()=> i18n.t('gameIcon_shuffle');
            this.visible = false;
        }

        public show() {
            this.startAnimation(InGameMessage.INFO);
            this._isAnimating = true;
            this.visible = true;
        }

        public hide() {
            this._isAnimating && this.endAnimation(InGameMessage.INFO);
        }
    }
  }
}