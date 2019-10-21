namespace components {
  export class UserInfoWindow extends eui.Component implements eui.UIComponent {
    private _visible;
    private _initY;

    public constructor() {
      super();
      this.skinName = utils.getSkin('UserInfoWindow');
      this._visible = false;
      super.$setVisible(false);
    }

    protected partAdded(partName: string, instance: any): void {
      super.partAdded(partName, instance);
    }

    protected childrenCreated(): void {
      super.childrenCreated();
      this._initY = this.y;
      this.alpha = 0;
    }

    public get visible(): boolean {
      return this._visible;
    }

    public set visible(vis: boolean) {
      const animY = 10;
      if (!vis) {
        // hide
        this.y = this._initY;
        this.alpha = 1;
        TweenLite.to(this, 0.2, {
          y: this._initY - animY,
          alpha: 0,
        }).eventCallback('onComplete', () => {
          this._visible = false;
          super.$setVisible(false);
        });
      } else {
        // show
        this.y = this._initY - animY;
        this.alpha = 0;
        this._visible = true;
        super.$setVisible(true);
        TweenLite.to(this, 0.2, {
          y: this._initY,
          alpha: 1,
        }).eventCallback('onComplete', () => {
          // add event listener for close
          this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleTapAnywhere, this);
        });
      }
    }

    private handleTapAnywhere(event: egret.TouchEvent) {
      if (this.$hitTest(event.stageX, event.stageY)) {
        // is click on this window
        return;
      }
      this.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.handleTapAnywhere, this);
      this.visible = false;
    }
  }
}
