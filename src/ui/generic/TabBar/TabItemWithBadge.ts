namespace we {
  export namespace ui {
    export class TabItemWithBadge extends eui.ItemRenderer {
      protected _badge: eui.Group;
      protected _badgeLabel: eui.Label;
      protected badgeBg_bet: ui.RoundRectShape;
      protected badgeBg_goodroad: ui.RoundRectShape;

      constructor() {
        super();
        this.skinName = 'ImageTabItemWithBadgeSkin';
      }

      protected getCurrentState() {
        const state = super.getCurrentState();
        if (state === 'upAndSelected') {
          this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        } else if (state !== 'downAndSelected') {
          this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        }
        return state;
      }

      protected dataChanged(): void {}

      protected onTap(evt: egret.TouchEvent) {
        const list = <eui.TabBar> this.parent;
        // list.selectedIndex = -1;
        list.dispatchEvent(new eui.UIEvent('CLEAR_SELECTION'));
      }

      public onBadgeUpdate(status: string, value: number) {
        switch (status) {
          case 'goodroad': {
            this.badgeBg_goodroad.visible = true;
            this.badgeBg_bet.visible = false;
            break;
          }
          case 'bet': {
            this.badgeBg_goodroad.visible = false;
            this.badgeBg_bet.visible = true;
            break;
          }
        }

        if (!this._badge.visible && value > 0) {
          egret.Tween.removeTweens(this._badge);
          this._badge.visible = true;
          this._badge.scaleX = 0;
          this._badge.scaleY = 0;
          egret.Tween.get(this._badge).to({ scaleX: 1, scaleY: 1 }, 400, egret.Ease.backOut);
        } else if (this._badge.visible && value === 0) {
          egret.Tween.removeTweens(this._badge);
          egret.Tween.get(this._badge)
            .to({ scaleX: 0, scaleY: 0 }, 400, egret.Ease.backIn)
            .call(() => {
              this._badge.visible = false;
            });
        }
        this._badgeLabel.text = `${value}`;
      }
    }
  }
}
