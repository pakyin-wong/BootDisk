namespace we {
  export namespace core {
    export class TooltipCtr {
      private margin = 8;
      private paddingVertical = 6;
      private paddingHorizontal = 16;
      private stage: egret.Stage;
      private activeTooltip: eui.Group = null;

      constructor(stage: egret.Stage) {
        logger.l(utils.LogTarget.DEBUG, 'TooltipCtr is created');
        this.stage = stage;
      }

      private onShowTooltip({ data: { displayObject, x, y } }) {
        this.activeTooltip = new eui.Group();
        // add text
        const text = new we.ui.RunTimeLabel();
        text.renderText = () => i18n.t(displayObject.tooltipText);
        text.size = 16;
        text.textColor = 0xffffff;
        text.x = this.paddingHorizontal;
        text.y = this.paddingVertical;
        this.activeTooltip.addChild(text);
        // add background
        const bg = new we.ui.RoundRectShape();
        bg.cornerTL_TR_BL_BR = '6,6,6,6';
        bg.fillColor = '0x000000';
        bg.fillAlpha = 0.5;
        bg.stroke = 0;
        bg.width = text.width + this.paddingHorizontal * 2;
        bg.height = text.height + this.paddingVertical * 2;
        this.activeTooltip.addChildAt(bg, 0);
        // show tooltip
        this.activeTooltip.alpha = 0;
        this.activeTooltip.touchEnabled = false;
        dir.layerCtr.tooltip.addChild(this.activeTooltip);
        const coord = (<egret.DisplayObject>displayObject).localToGlobal(0, 0);
        switch (displayObject.tooltipPosition) {
          case 'below': {
            this.activeTooltip.x = coord.x + displayObject.width / 2 - this.activeTooltip.width / 2;
            this.activeTooltip.y = coord.y + displayObject.height + this.margin;
            break;
          }
          default:
            break;
        }
        egret.Tween.get(this.activeTooltip).to({ alpha: 1 }, 200, egret.Ease.sineIn);
      }

      private onHideTooltip() {
        egret.Tween.removeTweens(this.activeTooltip);
        dir.layerCtr.tooltip.removeChildren();
      }

      public addListeners() {
        this.stage.addEventListener('TOOLTIP_SHOW', this.onShowTooltip.bind(this), false);
        this.stage.addEventListener('TOOLTIP_HIDE', this.onHideTooltip.bind(this), false);
      }
    }
  }
}
