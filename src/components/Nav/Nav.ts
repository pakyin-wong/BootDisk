namespace components {
  export class Nav extends eui.Component implements eui.UIComponent {
    private _logo: eui.Image;
    private _user: eui.Label;
    private _time: eui.Label;
    private _profilePrc: eui.Image;
    private _toggleBtn: eui.Image;

    public constructor() {
      super();
      this.once(eui.UIEvent.COMPLETE, this.mount, this);
      this.skinName = utils.getSkin('Nav');
    }

    public mount() {}
  }
}
