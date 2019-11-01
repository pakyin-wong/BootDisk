namespace components {
  export class DropDownList extends BaseEUI {
    public selectedIndex: number = -1;
    public items: any[] = [];

    public constructor(button: egret.DisplayObject) {
      super();
      this.items = ['Test', 'Teset 2'];
    }
  }
}
