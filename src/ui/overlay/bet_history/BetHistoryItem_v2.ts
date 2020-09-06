namespace we {
  export namespace overlay {
    export namespace betHistory {
      export class BetHistoryItem_v2 extends BetHistoryItem {
        public constructor() {
          super();
          this.skinName = utils.getSkinByClassname('BetHistoryItem_v2');
        }

        protected childrenCreated(): void {
          super.childrenCreated();

          this.$addListener(mouse.MouseEvent.ROLL_OVER, this.onHover, this);
          this.$addListener(mouse.MouseEvent.ROLL_OUT, this.onRollOut, this);
        }
      }
    }
  }
}
