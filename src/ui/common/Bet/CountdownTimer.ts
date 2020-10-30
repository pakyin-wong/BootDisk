namespace we {
  export namespace ui {
    export class CountdownTimer extends eui.Component implements eui.UIComponent {
      private progressIndicator: ui.RadialProgressIndicator;
      private countdownLabel: eui.Label;

      private _countdownValue: number = 30000;
      private _remainingTime: number = 30000;

      private _previousFrameTime: number;
      private _colorChange: boolean = false;
      private _progressIndicatorVisible = true;

      public bg_color: ui.RoundRectShape;

      public constructor() {
        super();
        // this.once(eui.UIEvent.REMOVED_FROM_STAGE, () => this.stop(), this);
      }

      protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
      }

      protected childrenCreated(): void {
        super.childrenCreated();
        if (this.progressIndicator) {
          this.progressIndicator.visible = this._progressIndicatorVisible;
        }
        if (this.bg_color) {
          // this.bg_flash();
        }
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.destroy, this);
      }

      public destroy() {
        this.countdownLabel.text = '0';
        this.removebg_flash();
        this.stop();
      }

      get countdownValue(): number {
        return this._countdownValue;
      }

      set countdownValue(value: number) {
        this._countdownValue = value;
      }

      get colorChange(): boolean {
        return this._colorChange;
      }

      set colorChange(val: boolean) {
        this._colorChange = val;
      }

      get progressVisible() {
        return this._progressIndicatorVisible;
      }

      set progressVisible(val: boolean) {
        this._progressIndicatorVisible = val;
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
        // console.log('5000/this.countdownValue', 5000 / this.countdownValue);
        // console.log('progressIndicator.progresds', this.progressIndicator.progress);
        if (this._colorChange && this.progressIndicator.progress < 5000 / this.countdownValue) {
          this.countdownLabel.textColor = 0xff0000;
        } else if (this._colorChange && this.progressIndicator.progress >= 5000 / this.countdownValue) {
          if (env.isMobile) {
            this.countdownLabel.textColor = 0x15d688;
          } else {
            this.countdownLabel.textColor = 0xffffff;
          }
        }
      }

      public start() {
        this.stop();
        this._previousFrameTime = egret.getTimer();
        this.addEventListener(egret.Event.ENTER_FRAME, this.updateRemainingTime, this);
      }

      public stop() {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.updateRemainingTime, this);
      }
      public bg_flash() {
        this.bg_color.alpha = 0.7;
        this.removebg_flash();
        egret.Tween.get(this.bg_color, { loop: true }).to({ alpha: 0 }, 200);
        // while not time is out and uncfmBet >0 , do flashing
      }
      public removebg_flash() {
        if (this.bg_color) {
          egret.Tween.removeTweens(this.bg_color);
        }
      }
    }
  }
}
