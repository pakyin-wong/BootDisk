namespace we {
  export namespace overlay {
    export namespace betHistory {
      export class BetHistoryItem_v2 extends BetHistoryItem {
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
          this.currentState = 'hover';
        }

        protected onRollOut() {
          this.currentState = 'normal';
        }
      }
    }
  }
}
