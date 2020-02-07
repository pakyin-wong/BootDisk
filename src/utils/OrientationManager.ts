// TypeScript file
namespace we {
  export namespace utils {
    export class OrientationManager {
      protected stage: egret.Stage;

      constructor(stage: egret.Stage) {
        this.stage = stage;
        window.onorientationchange = () => {
          this.onRotate((<any> screen).orientation.angle);
        };
      }

      public onRotate(angle: number) {
        if (angle === 0) {
          // portrait
          console.log('portrait');
          // this.stage.setContentSize(1340, 2600);
        } else {
          // landscape
          console.log('landscape');
          // this.stage.setContentSize(2600, 1340);
        }
      }
    }
  }
}
