namespace we {
  export namespace lo {
    export class FunBetCustomBetMobileIR extends eui.ItemRenderer {

        public constructor() {
          super();
        }

        protected childrenCreated(): void {
          super.childrenCreated();
          this.mount();
          this.addEventListener(egret.Event.ADDED_TO_STAGE, this.mount, this);
          this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.destroy, this);
        }

        protected mount() {}

        protected destroy() {
            this.removeChildren();
        }

        protected dataChanged(): void {
            this.removeChildren();
            this.addChild(this.data.item);
        }
    }
  }
}