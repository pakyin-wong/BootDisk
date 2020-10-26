namespace we {
  export namespace core {
    export class BaseEUI extends eui.Component implements ui.IDismissable {
      public static tapHistory: any[] = [];

      public customKey: string;

      protected _skinKey: string;
      protected _orientationDependent: boolean;
      constructor(skin: string = null, orientationDependent: boolean = true) {
        super();
        this.edgeDismissableAddon = new ui.EdgeDismissableAddon(this);

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
        if (skin && env.initialized) {
          this.skinName = utils.getSkinByClassname(skin, orientationDependent);
        }
      }

      public set orientationDependent(value: boolean) {
        this._orientationDependent = value;
        // /*
        if (env.isMobile && this.$hasAddToStage) {
          if (value) {
            dir.evtHandler.addEventListener(core.Event.ORIENTATION_UPDATE, this.onOrientationChange, this);
          } else {
            dir.evtHandler.removeEventListener(core.Event.ORIENTATION_UPDATE, this.onOrientationChange, this);
          }
        }
        // */
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
        // /*
        if (env.isMobile && this._orientationDependent) {
          dir.evtHandler.removeEventListener(core.Event.ORIENTATION_UPDATE, this.onOrientationChange, this);
        }
        // */
      }

      protected async onOrientationChange() {
        this.clearOrientationDependentComponent();
        this.updateSkin(this._skinKey, true);
        // await utils.wait(this, 'mounted'); 
        this.initOrientationDependentComponent();
        this.arrangeComponents();
      }

      // public dispatchEvent(event: egret.Event): boolean {
      //   console.log(event.type);
      //   return super.dispatchEvent(event);
      // }


      // init those components which are not generated from the skin
      protected initComponents() {
        this.initOrientationDependentComponent();
      }

      protected clearOrientationDependentComponent() {}

      protected initOrientationDependentComponent() {}

      // set the position of the children components
      protected arrangeComponents() {}

      // public $addListener(type, listener, thisObject, useCapture = null, priority = null, dispatchOnce = null) {
      //   super.$addListener(type, listener, thisObject, useCapture, priority, dispatchOnce);
      //   if (dir.config.logtap && type === egret.TouchEvent.TOUCH_TAP) {
      //     super.$addListener(egret.TouchEvent.TOUCH_TAP, this.logTap, this);
      //   }
      // }

      // public removeEventListener(type, listener, thisObject, useCapture = null) {
      //   super.removeEventListener(type, listener, thisObject, useCapture);
      //   if (dir.config.logtap && type === egret.TouchEvent.TOUCH_TAP) {
      //     super.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.logTap, this);
      //   }
      // }

      // public logTap(e: egret.TouchEvent) {
      //   const length = BaseEUI.tapHistory.length;
      //   if (length >= 10) {
      //     BaseEUI.tapHistory.shift();
      //   }
      //   BaseEUI.tapHistory.push({
      //     target: e.target,
      //     x: e.stageX,
      //     y: e.stageY,
      //   });
      //   logger.l(utils.LogTarget.DEBUG, BaseEUI.tapHistory);
      // }

      protected _isEdgeDismissable: boolean = false;
      protected edgeDismissableAddon: ui.EdgeDismissableAddon;

      public dismissPosX: number = NaN;
      public dismissPosY: number = NaN;

      public $setX(val: number): boolean {
        if (this.edgeDismissableAddon) {
          this.edgeDismissableAddon.objPosX = val;
        }
        return super.$setX(val);
      }

      public $setY(val: number): boolean {
        if (this.edgeDismissableAddon) {
          this.edgeDismissableAddon.objPosY = val;
        }
        return super.$setY(val);
      }

      public set isEdgeDismissable(value: boolean) {
        this._isEdgeDismissable = value;
        this.edgeDismissableAddon.active = value;
      }
      public get isEdgeDismissable(): boolean {
        return this._isEdgeDismissable;
      }

      protected _visible: boolean = true;
      protected _dismissVisible: boolean = true;
      protected _alpha: number = 1;
      protected _dismissAlpha: number = 1;

      public get dismissAlpha() {
        return this._dismissAlpha;
      }

      public set dismissAlpha(val) {
        this._dismissAlpha = val;
        this.$setAlpha(val * this._alpha);
      }

      public get alpha() {
        return this._alpha;
      }

      public set alpha(val) {
        this._alpha = val;
        this.$setAlpha(val * this._dismissAlpha);
      }

      public get dismissVisible(): boolean {
        return this._dismissVisible;
      }

      public set dismissVisible(val: boolean) {
        this._dismissVisible = val;
        super.$setVisible(val && this._visible);
      }

      public $setVisible(val: boolean) {
        this._visible = val;
        const visible = val && this._dismissVisible;
        super.$setVisible(visible);
      }
    }
  }
}
