namespace we {
  export namespace overlay {
    export namespace betHistory {
      export class BetHistoryItem_v2 extends BetHistoryItem {
        protected _hover: egret.DisplayObject;

        public constructor() {
          super();
          this.skinName = utils.getSkinByClassname('BetHistoryItem_v2');
        }

        protected mount(): void {
          super.mount();
          this.$addListener(mouse.MouseEvent.ROLL_OVER, this.onHover, this);
          this.$addListener(mouse.MouseEvent.ROLL_OUT, this.onRollOut, this);
        }

        protected destroy() {
          super.destroy();
          this.removeEventListener(mouse.MouseEvent.ROLL_OVER, this.onHover, this);
          this.removeEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollOut, this);
        }

        protected onHover() {
          this._hover.visible = true;
        }

        protected onRollOut() {
          this._hover.visible = false;
        }
      }
    }
  }
}
