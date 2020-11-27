// TypeScript file
namespace we {
  export namespace blockchain {
    export class CardUsedMessage extends core.BaseEUI {
      protected _label: ui.RunTimeLabel;
      protected _group: eui.Group;
      protected _value: number = 0; // #card used

      constructor() {
        super(null, false);
      }

      public set value(val: number) {
        this._value = val;
        if (this._label) {
          this._label.renderText = () => i18n.t('baccarat.cardUsed', val);
        }
      }

      public show() {
        egret.Tween.removeTweens(this._group);
        const scaleFrom = 0.8;
        this._group.alpha = 0;
        this._group.y = 10;
        this._group.scaleX = scaleFrom;
        this._group.scaleY = scaleFrom;
        egret.Tween.get(this._group).to({ y: 0, alpha: 1 }, 100);
      }

      public hide() {
        egret.Tween.removeTweens(this._group);
        egret.Tween.get(this._group).to({ y: 10, alpha: 0 }, 100);
      }

      protected initComponents() {
        this._group = new eui.Group();
        this._group.horizontalCenter = 0;
        this.addChild(this._group);

        this._label = new we.ui.RunTimeLabel();
        this._label.renderText = () => i18n.t('baccarat.cardUsed', this._value);
        this._label.size = 30;
        this._label.textColor = 0xffffff;
        this._label.horizontalCenter = 0;
        this._label.verticalCenter = 0;
        this._label.verticalAlign = 'middle';
        this._group.addChild(this._label);

        const scaleFrom = 0.8;
        this._group.alpha = 0;
        this._group.y = -50;
        this._group.scaleX = scaleFrom;
        this._group.scaleY = scaleFrom;

        // add background
        const bg = new we.ui.RoundRectShape();
        bg.cornerTL_TR_BL_BR = '6,6,6,6';
        bg.fillColor = '0x171b20';
        bg.fillAlpha = 0.8;
        bg.stroke = 0;
        bg.top = -8;
        bg.bottom = -8;
        bg.left = -20;
        bg.right = -20;
        this._group.addChildAt(bg, 0);
      }
    }
  }
}
