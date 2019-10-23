namespace components {
  export class Nav extends BaseEUI {
    private _logo: eui.Image;
    private _user: eui.Label;
    private _time: eui.Label;
    private _profilePrc: eui.Image;
    private _toggleBtn: eui.Image;

    public constructor() {
      super('Nav');
    }

    protected mount() {}
  }
}
