/* tslint:disable triple-equals */
namespace we {
  export namespace ui {
    export class LotteryMobileLiveListItem extends MobileLiveListItem {
      protected _counter1: eui.Label;
      protected _counter2: eui.Label;
      protected _counter3: eui.Label;
      protected _counter4: eui.Label;
      protected _counter5: eui.Label;
      protected _counter6: eui.Label;

      protected _targetTime;
      protected _counterInterval;

      public constructor(skinName: string = null) {
        super(skinName);
      }

      protected initChildren() {
        super.initChildren();
      }

      protected updateCountdownTimer() {
        clearInterval(this._counterInterval);
        this._targetTime = this._gameData.starttime + this._gameData.countdown * 1000;

        this._counterInterval = setInterval(this.update.bind(this), 500);
        this.update();
      }

      protected update() {
        const diff = this._targetTime - env.currTime;

        if (diff > 0) {
          const dateStr = moment.utc(diff).format('HH:mm:ss');
          this._counter1.text = dateStr.substr(0, 1);
          this._counter2.text = dateStr.substr(1, 1);
          this._counter3.text = dateStr.substr(3, 1);
          this._counter4.text = dateStr.substr(4, 1);
          this._counter5.text = dateStr.substr(6, 1);
          this._counter6.text = dateStr.substr(7, 1);
        } else {
          this.resetTimer();
        }
      }

      protected resetTimer() {
        this._counter1.text = '0';
        this._counter2.text = '0';
        this._counter3.text = '0';
        this._counter4.text = '0';
        this._counter5.text = '0';
        this._counter6.text = '0';
        clearInterval(this._counterInterval);
      }
    }
  }
}
