namespace we {
  export namespace overlay {
    export interface IMessageDialogButtonProps {
      [button: string]: {
        text: string;
        onClick?: () => Promise<void>;
      };
    }

    export class MessageDialog extends we.ui.Panel {
      private _txt_title: ui.RunTimeLabel;
      private _btn_dismiss: ui.BaseImageButton;
      private _btn_action: ui.BaseImageButton;

      constructor(title, buttonProps: IMessageDialogButtonProps) {
        super('overlay/MessageDialog');
        const buttonNames = Object.keys(buttonProps);
        this.currentState = buttonNames.length === 2 ? 'two' : 'one';
        for (const btn of buttonNames) {
          this[`_btn_${btn}`].text = buttonProps[btn].text;
          this[`_btn_${btn}`].addEventListener(
            egret.TouchEvent.TOUCH_TAP,
            async () => {
              if (buttonProps[btn].onClick) {
                await buttonProps[btn].onClick();
              }
              this._hide();
            },
            this
          );
        }
        this._txt_title.renderText = () => title;
      }

      private _hide() {
        // this.parent.dispatchEvent(new egret.Event('close'));
        (this.parent as we.ui.Panel).hide();
      }
    }
  }
}
