namespace scene {
  export class LobbyScene extends BaseScene {
    public onEnter() {
      this.skinName = utils.getSkin('LobbyScene');
      dir.layerCtr.nav.addChild(new components.NavBar());
    }

    public async onFadeEnter() {}

    public onExit() {
      this.removeChildren();
    }

    public async onFadeExit() {}
  }
}
