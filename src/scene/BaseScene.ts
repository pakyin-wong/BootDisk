namespace scene {
  export class BaseScene extends eui.Component {
    public constructor(data: any = null) {
      super();
    }

    public onEnter() {}

    public async onFadeEnter() {}

    public onExit() {}

    public async onFadeExit() {}

    // switchSkin (mobile / tablet / desktop)
  }
}
