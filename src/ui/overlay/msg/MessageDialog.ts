namespace we {
  export namespace overlay {
    export class MessageDialog extends we.ui.Panel {
      private _txt_title: ui.RunTimeLabel;
      private _btn_dismiss: ui.BaseImageButton;
      private _btn_action: ui.BaseImageButton;
      private _buttonProps;
      private _title;

      constructor(title, buttonProps: ui.IMessageDialogOpt) {
        super('MessageDialog');
        this._title = title;
        this._buttonProps = buttonProps;
      }

      protected initOrientationDependentComponent() {
        super.initOrientationDependentComponent();
        const buttonNames = Object.keys(this._buttonProps);
        this.currentState = buttonNames.length === 2 ? 'two' : 'one';
        for (const btn of buttonNames) {
          this[`_btn_${btn}`].text = this._buttonProps[btn].text;
          this[`_btn_${btn}`].addEventListener(
            egret.TouchEvent.TOUCH_TAP,
            async () => {
              this._hide();
              if (this._buttonProps[btn].onClick) {
                await this._buttonProps[btn].onClick();
              }
            },
            this
          );
        }
        this._txt_title.renderText = () => this._title;
      }

      private _hide() {
        // this.parent.dispatchEvent(new egret.Event('close'));
        (this.parent as we.ui.MsgOverlay).hide();
      }

      protected onOrientationChange() {
        super.onOrientationChange();
        this.invalidateState();
      }
    }
  }
}
