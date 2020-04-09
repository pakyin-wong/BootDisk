namespace we {
  export namespace core {
    export class BaseEUI extends eui.Component {
      protected _skinKey: string;
      protected _orientationDependent: boolean;
      constructor(skin: string = null, orientationDependent: boolean = true) {
        super();
        this.orientationDependent = orientationDependent;
        if (skin) {
          this._skinKey = skin;
          this.updateSkin(skin, orientationDependent);
          // this.skinName = utils.getSkin(skin, orientationDependent);
        }
        this.once(eui.UIEvent.ADDED_TO_STAGE, this.onAddToStage, this);
      }

      protected onAddToStage() {
        this.orientationDependent = this.orientationDependent;
      }

      protected updateSkin(skin: string = null, orientationDependent: boolean = true) {
        if (skin) {
          this.skinName = utils.getSkinByClassname(skin, orientationDependent);
        }
      }

      public set orientationDependent(value: boolean) {
        this._orientationDependent = value;
        if (env.isMobile && this.$hasAddToStage) {
          if (value) {
            dir.evtHandler.addEventListener(core.Event.ORIENTATION_UPDATE, this.onOrientationChange, this);
          } else {
            dir.evtHandler.removeEventListener(core.Event.ORIENTATION_UPDATE, this.onOrientationChange, this);
          }
        }
      }

      public get orientationDependent(): boolean {
        return this._orientationDependent;
      }

      protected childrenCreated(): void {
        super.childrenCreated();
        this.once(eui.UIEvent.REMOVED_FROM_STAGE, this.destroy, this);
        this.mount();
        this.dispatchEvent(new egret.Event('mounted'));
      }

      protected mount() {
        this.initComponents();
        this.arrangeComponents();
      }

      protected destroy() {
        if (env.isMobile && this._orientationDependent) {
          dir.evtHandler.removeEventListener(core.Event.ORIENTATION_UPDATE, this.onOrientationChange, this);
        }
      }

      protected onOrientationChange() {
        this.clearOrientationDependentComponent();
        this.updateSkin(this._skinKey, true);
        this.initOrientationDependentComponent();
        this.arrangeComponents();
      }

      // init those components which are not generated from the skin
      protected initComponents() {
        this.initOrientationDependentComponent();
      }

      protected clearOrientationDependentComponent() {}

      protected initOrientationDependentComponent() {}

      // set the position of the children components
      protected arrangeComponents() {}
    }
  }
}
