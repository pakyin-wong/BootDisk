// TypeScript file
namespace we {
  export namespace utils {
    export class OrientationManager {
      protected stage: egret.Stage;
      protected _timeoutId: number;
      protected _doTracking: boolean;

      constructor(stage: egret.Stage) {
        this.stage = stage;
        this._doTracking = true;
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

      // resume auto checking orientation
      public resumeTracking() {
        this._doTracking = true;
        this.stage.orientation = egret.OrientationMode.AUTO;
        this.checkOrientation();
      }
      // pause auto checking orientation
      public pauseTracking() {
        this._doTracking = false;
      }
      // manually set the orientation after stopped checking (egret.OrientationMode.LANDSCAPE or egret.OrientationMode.PORTRAIT)
      public setOrientation(orientation: string) {
        this.stage.orientation = orientation;
        const newOrientation = orientation === egret.OrientationMode.LANDSCAPE ? egret.OrientationMode.LANDSCAPE : egret.OrientationMode.PORTRAIT;
        if (newOrientation !== env.orientation) {
          env.orientation = newOrientation;
          switch (newOrientation) {
            case egret.OrientationMode.PORTRAIT:
              this.stage.setContentSize(1242, 2155);
              break;
            case egret.OrientationMode.LANDSCAPE:
              this.stage.setContentSize(2424, 1242);
              break;
          }
          dir.evtHandler.dispatch(core.Event.ORIENTATION_UPDATE);
        }
      }

      public checkOrientation(isInit: boolean = false) {
        if (this._doTracking) {
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
