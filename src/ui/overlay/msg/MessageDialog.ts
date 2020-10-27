namespace we {
  export namespace overlay {
    export class MessageDialog extends we.ui.Panel {
      private _txt_title: ui.RunTimeLabel;
      private _btn_dismiss: ui.RoundRectButton;
      private _btn_action: ui.RoundRectButton;
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
          (<ui.RoundRectButton> this[`_btn_${btn}`]).label.text = this._buttonProps[btn].text;
          (<ui.RoundRectButton> this[`_btn_${btn}`]).label.size = env.isMobile ? 60 : 24;
          (<ui.RoundRectButton> this[`_btn_${btn}`]).label.fontFamily = 'Arial';
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

      protected async onOrientationChange() {
        super.onOrientationChange();
        this.invalidateState();
      }
    }
  }
}
