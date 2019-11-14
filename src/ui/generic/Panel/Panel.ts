namespace we {
  export namespace ui {
    export class Panel extends core.BaseEUI implements IPoppable, IDraggable {
      public content: egret.DisplayObject;
      public close: eui.UIComponent;
      public toggler: egret.DisplayObject;
      public moveArea: egret.DisplayObject;

      protected _isDraggable: boolean = false;
      protected _isPoppable: boolean = false;
      protected _isEdgeDismissable: boolean = false;
      protected _dismissOnClickOutside: boolean = false;

      protected draggableAddon: DraggableAddon;
      protected edgeDismissableAddon: EdgeDismissable;
      protected poppableAddon: PoppableAddon;

      constructor(skin: string = null) {
        super(skin);
        this.draggableAddon = new DraggableAddon(this);
        this.edgeDismissableAddon = new EdgeDismissable(this);
        this.poppableAddon = new PoppableAddon(this);
      }

      public set isDraggable(value: boolean) {
        this._isDraggable = value;
        this.draggableAddon.active = value;
      }
      public get isDraggable(): boolean {
        return this._isDraggable;
      }
      public set isPoppable(value: boolean) {
        this._isPoppable = value;
        this.draggableAddon.active = value;
      }
      public get isPoppable(): boolean {
        return this._isPoppable;
      }
      public set isEdgeDismissable(value: boolean) {
        this._isEdgeDismissable = value;
        this.draggableAddon.active = value;
      }
      public get isEdgeDismissable(): boolean {
        return this._isEdgeDismissable;
      }
      public set dismissOnClickOutside(value: boolean) {
        this._dismissOnClickOutside = value;
        this.poppableAddon.dismissOnClickOutside = value;
      }
      public get dismissOnClickOutside(): boolean {
        return this._dismissOnClickOutside;
      }
      public get panelName(): string {
        return (<any>this).constructor.name;
      }

      protected mount() {
        // this.hide();
        this.draggableAddon.active = this._isDraggable;
        this.draggableAddon.init();
        this.edgeDismissableAddon.active = this._isEdgeDismissable;
        this.poppableAddon.active = this._isPoppable;
        this.poppableAddon.dismissOnClickOutside = this._dismissOnClickOutside;
        this.poppableAddon.init();
      }

      protected destroy() {
        this.removeToggler();
      }

      public get isActivated(): boolean {
        return this.content && this.content.visible;
      }

      public setContent(c: egret.DisplayObject) {
        this.content && this.removeChild(this.content);
        this.content = c;
        this.addChild(this.content);
        this.poppableAddon.updateContentPos();
      }

      public setToggler(toggler: egret.DisplayObject) {
        this.poppableAddon.setToggler(toggler);
      }

      public removeToggler() {
        this.poppableAddon.removeToggler();
      }
    }
  }
}
