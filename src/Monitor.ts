/** Over-Scene Global Controller */
class Monitor {
  public start(stage: egret.Stage) {
    const _nav = new components.NavBar();
    dir.layerCtr.nav.addChild(_nav);

    stage.$addListener(
      mouse.MouseEvent.MOUSE_MOVE,
      () => {
        console.log('move');
      },
      this
    );
    stage.$addListener(
      egret.TouchEvent.TOUCH_MOVE,
      () => {
        console.log('move2');
      },
      this
    );
    stage.$addListener(
      egret.TouchEvent.TOUCH_BEGIN,
      () => {
        console.log('begin');
      },
      this
    );
    stage.$addListener(
      egret.TouchEvent.TOUCH_END,
      () => {
        console.log('end');
      },
      this
    );
  }
}
