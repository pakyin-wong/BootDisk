namespace we {
  export namespace core {
    export class BaseEUI extends eui.Component {
      constructor(skin: string = null, orientationDependent: boolean = true) {
        super();
        if (skin) {
          this.skinName = utils.getSkin(skin, orientationDependent);
        }
      }

      protected childrenCreated(): void {
        super.childrenCreated();
        this.once(eui.UIEvent.REMOVED_FROM_STAGE, this.destroy, this);
        this.mount();
        this.dispatchEvent(new egret.Event('mounted'));
      }

      protected mount() {}

      protected destroy() {}
    }
  }
}
