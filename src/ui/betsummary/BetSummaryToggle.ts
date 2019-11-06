namespace ui {
  export class BetSummaryToggle extends eui.Component {
    private toggleFunc: () => void;
    private toggleLabel: eui.Label;
    public constructor(toggleFunc: () => void = null) {
      logger.l('BetSummaryToggle::constructor');
      super();
      if (toggleFunc) {
        this.toggleFunc = toggleFunc;
      }
    }

    protected childrenCreated() {
      super.childrenCreated();
      logger.l('BetSummaryToggle::childrenCreated()');
      this.skinName = we.utils.getSkin('BetSummaryToggle');
      this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toggle, this);
      // this.toggleLabel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toggle, this);
    }

    private toggle(evt: egret.Event) {
      console.log('BetSummaryToggle::toggle');
      this.toggleFunc();
    }

    public setToggle(func: () => void) {
      this.toggleFunc = func;
    }

    public setPos(x: number, y: number) {}
  }
}
