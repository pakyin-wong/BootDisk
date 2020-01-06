/* tslint:disable triple-equals */
namespace we {
  export namespace ba {
    export class BaListBaseItem extends BaControlItem {
      protected _quickbetEnable: boolean = false;
      protected _quickBetGroup: eui.Group;

      protected _tweenInterval1: number = 250;
      protected _hoverScale: number = 1.1;

      // protected _originalyhover: number;
      protected _originaly: number;
      protected _originalQuickBetButtonY: number;
      protected _targetQuickBetButtonY: number;
      protected _originalQuickBetPanelY: number;
      protected _targetQuickbetPanelY: number;
      protected _offsetY: number;
      protected _offsetLimit: number;
      protected _offsetMovement: number;

      public constructor(skinName: string = null) {
        super(skinName);

        this.initCustomPos();
        this.initPos();
      }

      protected initCustomPos() {
        this._targetQuickBetButtonY = 180;
        this._originalQuickBetButtonY = 150;
        this._targetQuickbetPanelY = 200;
        this._originalQuickBetPanelY = 0;
        this._offsetLimit = 1000;
        this._offsetMovement = 264;
      }

      protected initPos() {
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.x += this.anchorOffsetX;
        this.y += this.anchorOffsetY;
        this._originaly = this.y;
      }

      protected initChildren() {
        super.initChildren();
        const shape = new egret.Shape();
        shape.graphics.beginFill(0xffffff, 1);
        shape.graphics.drawRoundRect(0, 0, this.width, this.height, 16, 16);
        shape.graphics.endFill();

        this._contentContainer.addChild(shape);
        this._contentContainer.mask = shape;
        this._quickBetGroup.alpha = 0;
        this._quickBetGroup.y = this._originalQuickBetPanelY;
      }

      protected onBetDetailUpdateInBetState() {
        super.onBetDetailUpdateInBetState();
        if (this.holder.isFocus) {
          this.hideQuickBetGroup();
        }
      }

      protected onTouchTap(evt: egret.Event) {
        const target = evt.target;
        if (target.parent && target.parent instanceof eui.ItemRenderer) {
          evt.stopPropagation();
          return;
        }
        if (evt.target === this._dropdown.toggler || evt.target === this) {
          evt.stopPropagation();
          return;
        }
      }

      protected showQuickBetGroup() {
        this.holder.changeState(ui.TableListItemHolder.STATE_FOCUS);
        if (this.parent.localToGlobal(this.x, this._originaly).y > this._offsetLimit) {
          this._offsetY = this.parent.localToGlobal(this.x, this._originaly).y - this._offsetMovement;
        } else {
          this._offsetY = 0;
        }
        egret.Tween.removeTweens(this);
        egret.Tween.removeTweens(this._quickBetGroup);
        this._quickBetGroup.height = this._quickBetGroup.contentHeight;

        const p1 = new Promise(resolve =>
          egret.Tween.get(this)
            .to({ y: this._originaly - this._offsetY, scaleX: this._hoverScale, scaleY: this._hoverScale }, this._tweenInterval1)
            .call(resolve)
        );
        const p2 = new Promise(resolve =>
          egret.Tween.get(this._quickBetGroup)
            .to({ y: this._targetQuickbetPanelY, alpha: 1 }, this._tweenInterval1)
            .call(resolve)
        );
      }

      protected hideQuickBetGroup() {
        egret.Tween.removeTweens(this);
        egret.Tween.removeTweens(this._quickBetGroup);
        this._quickBetGroup.height = 0;

        egret.Tween.get(this._quickBetGroup).to({ y: this._originalQuickBetPanelY, alpha: 0 }, this._tweenInterval1);

        if (this._mouseOutside) {
          const tw1 = egret.Tween.get(this).to({ scaleX: 1, scaleY: 1, y: this._originaly }, this._tweenInterval1);
          this.showQuickBetButton(false);
        } else {
          egret.Tween.get(this).to({ y: this._originaly }, this._tweenInterval1);
        }
        if (this.holder.isFocus) {
          setTimeout(() => {
            this.holder.changeState(ui.TableListItemHolder.STATE_NORMAL);
            if (this._mouseOutside) {
              this.showQuickBetButton(false);
            }
          }, 300);
        }
      }

      public onClickButton(evt: egret.Event) {
        this.list.setChildIndex(this.holder, 1000);
        // this.setChildIndex(this._timer, 2500);

        if (!this.list.isLocked) {
          if (this._gameData.state !== we.ba.GameState.BET) {
            return;
          }
          this.showQuickBetGroup();
        } else if (this.holder.isFocus) {
          this.hideQuickBetGroup();
        }
      }

      protected setBetRelatedComponentsEnabled(enable) {
        super.setBetRelatedComponentsEnabled(enable);
        this._quickbetEnable = enable;
        // this._bettingTable.touchChildren = enable;
        // this._bettingTable.touchEnabled = enable;
        if (!this._mouseOutside && enable) {
          this.showQuickBetButton(true);
        }
        if (!enable) {
          this.hideQuickBetGroup();
          this.showQuickBetButton(false);
        }
      }

      public onRollover(evt: egret.Event) {
        super.onRollover(evt);
        if (!this.list.isLocked) {
          // this.setChildIndex(this._timer, 25000);
          egret.Tween.removeTweens(this);
          egret.Tween.get(this).to({ scaleX: this._hoverScale, scaleY: this._hoverScale, y: this._originaly }, this._tweenInterval1);
          if (this._quickbetEnable) {
            this.showQuickBetButton(true);
          }
        }
      }

      public onRollout(evt: egret.Event) {
        super.onRollout(evt);
        if (!this.list.isLocked) {
          // this.setChildIndex(this._timer, 2500);

          egret.Tween.removeTweens(this);
          const tw1 = egret.Tween.get(this).to({ scaleX: 1, scaleY: 1, y: this._originaly }, 250);
          this.showQuickBetButton(false);
        }
      }

      protected quickBetButtonAnimationDelayTimeout = null;

      protected showQuickBetButton(isShow: boolean) {
        if (this.quickBetButtonAnimationDelayTimeout) {
          clearTimeout(this.quickBetButtonAnimationDelayTimeout);
          this.quickBetButtonAnimationDelayTimeout = null;
        }
        this.quickBetButtonAnimationDelayTimeout = setTimeout(() => {
          this.animateQuickBetButton(isShow);
        });
      }

      protected animateQuickBetButton(show: boolean) {}
    }
  }
}
