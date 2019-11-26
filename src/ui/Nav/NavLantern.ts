namespace we {
  export namespace ui {
    export class NavLantern extends core.BaseEUI {
      private _loopIndex: number;
      private _loopline: number;
      private _loopMsg: string[];
      private _label: eui.Label;
      private _next: eui.Label;

      private _loopInterval;
      private _wait = 5000;

      public fontsize = 22;
      public lineSpacing = 22;

      constructor() {
        super();
      }

      protected mount() {
        this._loopMsg = [
          '【6.26圍警總】退休警子吐口水襲警　判囚10個月　官斥「污穢、骯髒、卑鄙，傳播細菌」',
          '林鄭指 9 月已提獨立檢討委員會　梁美芬：應十日內公布細節　胡志偉：不倫不類',
          '王婆婆指深圳被捕　保安局：不評論個別個案　特區不宜干預內地執法行動',
          '【修例風波】理大：尋獲身體虛弱留守女子 由輔導員及紅十字人員協助',
          '消防：上周一收前線報告有「人疊人」　救援過程無受阻',
        ];

        this._label = new eui.Label();
        this._next = new eui.Label();
        this._label.width = this._next.width = this.width;
        this._label.size = this._next.size = this.fontsize;
        this._label.lineSpacing = this._next.lineSpacing = this.lineSpacing;
        this.restart();
      }

      public alignToRight() {
        this._label.textAlign = this._next.textAlign = 'right';
      }

      public alignToLeft() {
        this._label.textAlign = this._next.textAlign = 'left';
      }

      private restart() {
        clearInterval(this._loopInterval);
        this._loopIndex = -1;
        this._loopline = 1;
        this.removeChildren();
        egret.Tween.removeTweens(this._label);
        egret.Tween.removeTweens(this._next);
        this.addChild(this._label);
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
