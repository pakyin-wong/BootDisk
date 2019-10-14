namespace scene {
  export class LobbyScene extends BaseScene {
    public onEnter() {}

    public async onFadeEnter() {}

    public onExit() {
      this.removeChildren();
    }

    public async onFadeExit() {}
  }
}
