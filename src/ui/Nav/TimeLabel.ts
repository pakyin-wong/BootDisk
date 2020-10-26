namespace we {
  export namespace ui {
    export class TimeLabel extends eui.Label {
      private _timeInterval: number = -1;

      constructor() {
        super();
      }

      public childrenCreated() {
        super.childrenCreated();
        this._timeInterval = setInterval(() => {
          this.onUpdateTimer();
        }, 1000);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removedFromStage, this);
      }

      private onAddToStage(e) {
        this._timeInterval = setInterval(() => {
          this.onUpdateTimer();
        }, 1000);
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removedFromStage, this);
      }

      private removedFromStage(e) {
        if (this._timeInterval > -1) {
          clearInterval(this._timeInterval);
          this._timeInterval = -1;
        }
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removedFromStage, this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
      }

      protected onUpdateTimer() {
        this.text = env.isMobile ? utils.formatTime2(env.currTime / Math.pow(10, 3)) : utils.formatTime(env.currTime / Math.pow(10, 3));
      }
    }
  }
}
