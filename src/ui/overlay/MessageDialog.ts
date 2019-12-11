namespace we {
  export namespace overlay {
    export class MessageDialog extends we.ui.Panel {
      private _txt_title: ui.RunTimeLabel;
      private _btn_dismiss: ui.DialogRoundButton;
      private _btn_action: ui.DialogRoundButton;

      constructor(type, title) {
        super('overlay/MessageDialog');
        if (type === 'confirm') {
          this.currentState = 'two';
          this._btn_action.currentState = 'danger';
        } else {
          this.currentState = 'one';
          this._btn_dismiss.currentState = 'hover';
        }
        this._txt_title.renderText = () => title;
        this._btn_dismiss.addEventListener(egret.TouchEvent.TOUCH_TAP, this.dismiss, this);
      }

      private dismiss() {
        // this.parent.dispatchEvent(new egret.Event('close'));
        (this.parent as we.ui.Panel).hide();
        console.log('dismiss dismiss dismiss');
      }
    }
  }
}
