namespace we {
  export namespace core {
    export class TooltipCtr {
      private margin = 8;
      private paddingVertical = 6;
      private paddingHorizontal = 14;
      private stage: egret.Stage;
      private activeTooltip: eui.Group = null;

      constructor(stage: egret.Stage) {
        logger.l(utils.LogTarget.DEBUG, 'TooltipCtr is created');
        this.stage = stage;
      }

      private _initTooltip(message) {
        this.activeTooltip = new eui.Group();
        this.activeTooltip.touchEnabled = false;
        // add text
        const text = new we.ui.RunTimeLabel();
        text.renderText = () => i18n.t(message);
        text.size = 20;
        text.textColor = 0xffffff;
        text.x = this.paddingHorizontal;
        text.y = this.paddingVertical;
        this.activeTooltip.addChild(text);
        // add background
        const bg = new we.ui.RoundRectShape();
        bg.cornerTL_TR_BL_BR = '6,6,6,6';
        bg.fillColor = '0x171b20';
        bg.fillAlpha = 0.8;
        bg.stroke = 0;
        bg.width = text.width + this.paddingHorizontal * 2;
        bg.height = text.height + this.paddingVertical * 2;
        this.activeTooltip.addChildAt(bg, 0);
        // add tooltip
        dir.layerCtr.tooltip.addChild(this.activeTooltip);
      }

      private _showTooltip(showX, showY) {
        const scaleFrom = 0.8;
        this.activeTooltip.alpha = 0;
        this.activeTooltip.x = showX + (this.activeTooltip.width * (1 - scaleFrom)) / 2;
        this.activeTooltip.y = showY;
        this.activeTooltip.scaleX = scaleFrom;
        this.activeTooltip.scaleY = scaleFrom;
        egret.Tween.get(this.activeTooltip).to({ alpha: 1, scaleX: 1, scaleY: 1, x: showX }, 150, egret.Ease.sineIn);
      }

      public displayTooltip(x, y, message) {
        this._initTooltip(message);
        this._showTooltip(x, y);
      }

      public removeTooltips() {
        console.trace('>>> removeTooltips ?????');
        if (this.activeTooltip) {
          egret.Tween.removeTweens(this.activeTooltip);
        }
        dir.layerCtr.tooltip.removeChildren();
        this.activeTooltip = null;
      }

      private onShowTooltip({ data: { displayObject, x, y } }) {
        const coord = (<egret.DisplayObject>displayObject).localToGlobal(0, 0);
        // init first to get tooltip width
        this._initTooltip(displayObject.tooltipText.replace(/'/g, ''));
        let showX = 0;
        let showY = 0;
        switch (displayObject.tooltipPosition) {
          case 'below': {
            showX = coord.x + displayObject.width / 2 - this.activeTooltip.width / 2;
            showY = coord.y + displayObject.height + this.margin;
            break;
          }
          default:
            break;
        }
        this._showTooltip(showX, showY);
      }

      public addListeners() {
        this.stage.addEventListener('TOOLTIP_SHOW', this.onShowTooltip.bind(this), false);
        this.stage.addEventListener('TOOLTIP_HIDE', this.removeTooltips.bind(this), false);
      }
    }
  }
}
