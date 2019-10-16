namespace components {
  export class NavBar extends eui.Component implements eui.UIComponent {
    public constructor() {
      super();
      this.skinName = utils.getSkin('NavBar');
    }

    protected partAdded(partName: string, instance: any): void {
      super.partAdded(partName, instance);
    }

    protected childrenCreated(): void {
      super.childrenCreated();
    }
  }
}
