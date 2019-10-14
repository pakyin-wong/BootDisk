namespace scene {
  export class LobbyScene extends BaseScene {
    public onEnter() {
      this.addEventListener(eui.UIEvent.COMPLETE, this.mount, this);
    }

    protected mount() {
      this.removeEventListener(eui.UIEvent.COMPLETE, this.mount, this);

      this.addChild(new components.NavBar());
    }

    public async onFadeEnter() {}

    public onExit() {
      this.removeChildren();
    }

    public async onFadeExit() {}
  }
}
