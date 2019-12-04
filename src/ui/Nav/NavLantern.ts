namespace we {
  export namespace ui {
    export class NavLantern extends core.BaseEUI {
      private _loopIndex: number;
      private _loopline: number;
      private _loopMsg: string[];
      private _label: eui.Label;
      private _next: eui.Label;
      private _mask: egret.Shape;

      private _loopInterval;
      private _wait = 5000;

      public fontsize = 22;
      public lineSpacing = 22;

      constructor() {
        super();
      }

      protected mount() {
        this._loopMsg = ['客服熱線號碼更新為 +63 9250898888，接聽時間為 8:00-00:00。'];

        this._label = new eui.Label();
        this._next = new eui.Label();
        this._label.width = this._next.width = this.width;
        this._label.size = this._next.size = this.fontsize;
        this._label.lineSpacing = this._next.lineSpacing = this.lineSpacing;

        this._mask = new egret.Shape();
        this._mask.graphics.beginFill(0x000000);
        this._mask.graphics.drawRect(0, 0, this.width, this.height);
        this._mask.graphics.endFill();

        this.mask = this._mask;

        this.restart();
      }

      public alignToRight() {
        this._label.textAlign = this._next.textAlign = 'right';
      }

      public alignToLeft() {
        this._label.textAlign = this._next.textAlign = 'left';
      }

      public alignToCenter() {
        this._label.textAlign = this._next.textAlign = 'center';
      }

      public set messages(m: string[]) {
        this._loopMsg = m;
        this.restart();
      }

      private restart() {
        clearInterval(this._loopInterval);
        this._loopIndex = -1;
        this._loopline = 1;
        this.removeChildren();
        egret.Tween.removeTweens(this._label);
        egret.Tween.removeTweens(this._next);
        this.addChild(this._label);
        this.addChild(this._mask);
        this._label.y = 0;
        this._label.text = ' ';
        this._loopInterval = setInterval(this.update.bind(this), this._wait);
        this.update();
      }

      private update() {
        if (this._loopMsg.length < 1) {
          return;
        }

        const lineHeight = (this._label.measuredHeight - this.lineSpacing * (this._label.numLines - 1)) / this._label.numLines;
        if (this._loopline === this._label.numLines) {
          this._loopIndex = this._loopIndex + 1 >= this._loopMsg.length ? 0 : this._loopIndex + 1;
          this._next.text = this._loopMsg[this._loopIndex];
          this._next.y = this.lineSpacing + lineHeight;
          egret.Tween.get(this._label).to({ y: this._label.y - this.lineSpacing - lineHeight }, 500);
          egret.Tween.get(this._next)
            .to({ y: 0 }, 500)
            .call(
              function () {
                egret.Tween.removeTweens(this._label);
                this._label.text = this._next.text;
                this._label.y = 0;
                this.removeChild(this._next);
              }.bind(this)
            );
          this.addChild(this._next);
          this._loopline = 1;
        } else {
          egret.Tween.get(this._label).to({ y: this._label.y - this.lineSpacing - lineHeight }, 500);
          this._loopline++;
        }
      }
    }
  }
}
