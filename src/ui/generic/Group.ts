namespace we {
  export namespace ui {
    export class Group extends eui.Group implements IDismissable {
      protected _isEdgeDismissable: boolean = false;
      protected edgeDismissableAddon: EdgeDismissableAddon;

      public dismissPosX: number = NaN;
      public dismissPosY: number = NaN;
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

      public set isEdgeDismissable(value: boolean) {
        this._isEdgeDismissable = value;
        this.edgeDismissableAddon.active = value;
      }
      public get isEdgeDismissable(): boolean {
        return this._isEdgeDismissable;
      }

      public get dismissVisible(): boolean {
        return this._dismissVisible;
      }

      public set dismissVisible(val) {
        this._dismissVisible = val;
        this.$setVisible(val && this._visible);
      }

      public get visible(): boolean {
        return this._visible;
      }

      public set visible(val) {
        this._visible = val;
        console.log(val, this._dismissVisible);
        this.$setVisible(val && this._dismissVisible);
      }

      constructor() {
        super();
        this.edgeDismissableAddon = new EdgeDismissableAddon(this);
      }
    }
  }
}
