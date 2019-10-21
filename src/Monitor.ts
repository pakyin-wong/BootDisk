/** Over-Scene Global Controller */
class Monitor {
  public start() {
    const _nav = new components.NavBar();
    dir.layerCtr.nav.addChild(_nav);
  }
}
