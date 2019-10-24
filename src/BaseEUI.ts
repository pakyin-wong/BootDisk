class BaseEUI extends eui.Component {
  constructor(skin: string = null) {
    super();
    if (skin) {
      this.skinName = utils.getSkin(skin);
    }
  }

  protected childrenCreated(): void {
    super.childrenCreated();
    this.once(eui.UIEvent.REMOVED_FROM_STAGE, this.destroy, this);
    this.mount();
  }

  protected mount() {}

  protected destroy() {}
}
