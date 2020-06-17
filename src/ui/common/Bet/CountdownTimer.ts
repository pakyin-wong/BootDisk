namespace we {
  export namespace ui {
    export class CountdownTimer extends eui.Component implements eui.UIComponent {
      private progressIndicator: ui.RadialProgressIndicator;
      private countdownLabel: eui.Label;

      private _countdownValue: number = 30000;
      private _remainingTime: number = 30000;

      private _previousFrameTime: number;

      public constructor() {
        super();
        // this.once(eui.UIEvent.REMOVED_FROM_STAGE, () => this.stop(), this);
      }

      protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
      }

      protected childrenCreated(): void {
        super.childrenCreated();
      }

      get countdownValue(): number {
        return this._countdownValue;
      }

      set countdownValue(value: number) {
        this._countdownValue = value;
      }

      get remainingTime(): number {
        return this._remainingTime;
      }
      set remainingTime(second: number) {
        if (this._countdownValue <= 0) {
          this.progressIndicator.progress = 1;
          this.countdownLabel.text = ``;
        } else {
          this._remainingTime = Math.max(Math.min(second, this._countdownValue), 0);
          const ratio = (this._remainingTime * 1.0) / this._countdownValue;
          this.progressIndicator.progress = ratio;
          this.countdownLabel.text = `${Math.ceil(this._remainingTime * 0.001)}`;
        }
      }

      private updateRemainingTime() {
        const timeDiff = egret.getTimer() - this._previousFrameTime;
        this._previousFrameTime = egret.getTimer();
        let remainingTime = this._remainingTime - timeDiff;
        if (remainingTime <= 0) {
          this.stop();
          remainingTime = 0;
        }
        this.remainingTime = remainingTime;
      }

      public start() {
        this._previousFrameTime = egret.getTimer();
        this.addEventListener(egret.Event.ENTER_FRAME, this.updateRemainingTime, this);
      }

      public stop() {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.updateRemainingTime, this);
      }
    }
  }
}
