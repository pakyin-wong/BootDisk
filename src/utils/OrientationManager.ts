// TypeScript file
namespace we {
  export namespace utils {
    export class OrientationManager {
      protected stage: egret.Stage;
      protected _timeoutId: number;

      constructor(stage: egret.Stage) {
        this.stage = stage;
        window.addEventListener('resize', e => this.onResize(e), false);
        this.checkOrientation(true);
        // window.onorientationchange = () => {
        //   this.onRotate((<any> screen).orientation.angle);
        // };
        // this.onRotate((<any> screen).orientation.angle, true);
      }

      public onResize(e: Event) {
        if (this._timeoutId) {
          clearTimeout(this._timeoutId);
          this._timeoutId = null;
        }
        this._timeoutId = setTimeout(() => {
          this.checkOrientation();
        }, 500);
      }

      public checkOrientation(isInit: boolean = false) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const newOrientation = width / height >= 1 ? egret.OrientationMode.LANDSCAPE : egret.OrientationMode.PORTRAIT;
        if (isInit || newOrientation !== env.orientation) {
          env.orientation = newOrientation;
          switch (newOrientation) {
            case egret.OrientationMode.PORTRAIT:
              this.stage.setContentSize(1242, 2155);
              break;
            case egret.OrientationMode.LANDSCAPE:
              this.stage.setContentSize(2424, 1242);
              break;
          }
          if (!isInit) {
            dir.evtHandler.dispatch(core.Event.ORIENTATION_UPDATE);
          }
        }
      }

      public onRotate(angle: number, isInit: boolean = false) {
        if (angle === 0) {
          // portrait
          env.orientation = egret.OrientationMode.PORTRAIT;
          this.stage.setContentSize(1242, 2155);
        } else {
          // landscape
          env.orientation = egret.OrientationMode.LANDSCAPE;
          this.stage.setContentSize(2424, 1242);
        }
        if (!isInit) {
          if (this._timeoutId) {
            clearTimeout(this._timeoutId);
            this._timeoutId = null;
          }
          this._timeoutId = setTimeout(function () {
            dir.evtHandler.dispatch(core.Event.ORIENTATION_UPDATE);
          }, 100);
        }
      }
    }
  }
}
