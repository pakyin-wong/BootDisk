/** Over-Scene Global Controller */
class Monitor {
  public start(stage: egret.Stage) {
    const _nav = new components.Nav();
    dir.layerCtr.nav.addChild(_nav);
  }
}
