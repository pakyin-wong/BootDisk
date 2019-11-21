namespace we {
  export namespace ui {
    export class BetSummaryToggle extends eui.Component {
      private toggleFunc: () => void;
      private getState: () => boolean;
      private toggleLabel: eui.Label;
      public constructor(toggleFunc: () => void = null, getState: () => boolean = null) {
        logger.l('BetSummaryToggle::constructor');
        super();
        this.skinName = we.utils.getSkin('BetSummaryToggle');
        if (toggleFunc) {
          this.toggleFunc = toggleFunc;
        }
        if (getState) {
          this.getState = getState;
        }
      }

      protected childrenCreated() {
        super.childrenCreated();
        logger.l('BetSummaryToggle::childrenCreated()');
        this.toggleLabel.text = '快速投注^';
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toggle, this);
      }

      private toggle(evt: egret.Event) {
        if (this.getState()) {
          this.toggleLabel.text = '快速投注^';
        } else {
          this.toggleLabel.text = '快速投注∨';
        }
        this.toggleFunc();
      }

      public setToggle(func: () => void) {
        this.toggleFunc = func;
      }

      public setGetState(func: () => boolean) {
        this.getState = func;
      }

      public setPos(x: number, y: number) {}
    }
  }
}
