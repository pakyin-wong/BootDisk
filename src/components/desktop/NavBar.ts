namespace components {
  export class NavBar extends eui.Component implements eui.UIComponent {
    public constructor() {
      super();
      this.skinName = utils.getSkin('NavBar');
      console.log('1wtf');
    }

    protected partAdded(partName: string, instance: any): void {
      super.partAdded(partName, instance);
      console.log('wtf');
    }

    protected childrenCreated(): void {
      super.childrenCreated();
      console.log('2wtf');
    }
  }
}
