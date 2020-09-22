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

      public $setX(val: number): boolean {
        if (this.edgeDismissableAddon) { this.edgeDismissableAddon.objPosX = val; }
        return super.$setX(val);
      }

      public $setY(val: number): boolean {
        if (this.edgeDismissableAddon) { this.edgeDismissableAddon.objPosY = val; }
        return super.$setY(val);
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
        super.$setVisible(val && this._visible);
      }

      public $setVisible(val: boolean) {
        this._visible = val;
        const visible = val && this._dismissVisible;
        super.$setVisible(visible);
      }

      constructor() {
        super();
        this.edgeDismissableAddon = new EdgeDismissableAddon(this);
      }
    }
  }
}
