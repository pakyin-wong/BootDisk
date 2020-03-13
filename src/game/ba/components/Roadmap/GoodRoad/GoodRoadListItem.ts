namespace we {
  export namespace ba {
    export class GoodRoadListItem extends core.BaseEUI {
      public selected: boolean;
      public itemIndex: number;

      private _bigRoad: we.ba.GoodRoadmap;
      private _binButton: ui.BaseImageButton;
      private _activeButton: ui.ToggleButton;
      private _addButton: ui.BaseImageButton;
      private _editButton: ui.BaseImageButton;
      private _titleLabel: eui.Label;
      private _group: eui.Group;

      private isActive: number;
      private roadId: string;
      private roadType: number; // add icon(0) , default(1) or custom road(2)
      private roadName: string;

      public constructor() {
        super();
        this.roadType = 0;
        this.skinName = utils.getSkin('GoodRoadListItem');
      }

      protected mount() {
        this.touchEnabled = true;

        if (!env.isMobile) {
          const hitarea = new egret.Shape();
          hitarea.graphics.beginFill(0, 0);
          hitarea.graphics.drawRect(-(this.width - this._addButton.width) / 2, -this.height / 2 + 50, this.width, this.height - 52);
          this._addButton.addChild(hitarea);
          this._addButton.touchEnabled = true;
          this._addButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddTap, this);

          const hitarea2 = new egret.Shape();
          hitarea2.graphics.beginFill(0, 0);
          hitarea2.graphics.drawRect(-(this.width - this._editButton.width) / 2, -this.height / 2 + 50, this.width, this.height - 52);
          this._editButton.addChild(hitarea2);
          this._editButton.alpha = 0;
          this._editButton.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onEditOver, this);
          this._editButton.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onEditOut, this);
        }

        this._editButton.touchEnabled = true;
        this._editButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEditTap, this);
        this._binButton.touchEnabled = true;
        this._binButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBinTap, this);

        this._activeButton.addEventListener('onToggle', this.onActiveTap, this);
        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);

        // this.anchorOffsetX = this.width / 2;
        // this.anchorOffsetY = this.height / 2;
        // this.x += this.anchorOffsetX;
        // this.y += this.anchorOffsetY;

        // this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        // this._group.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onRollover, this);
        // this._group.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollout, this);
      }

      protected destroy() {
        super.destroy();
        if (this._addButton.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
          this._addButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddTap, this);
        }

        if (this._editButton.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
          this._editButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onEditTap, this);
        }

        if (this._editButton.hasEventListener(mouse.MouseEvent.ROLL_OVER)) {
          this._editButton.removeEventListener(mouse.MouseEvent.ROLL_OVER, this.onEditOver, this);
        }

        if (this._editButton.hasEventListener(mouse.MouseEvent.ROLL_OUT)) {
          this._editButton.removeEventListener(mouse.MouseEvent.ROLL_OUT, this.onEditOut, this);
        }

        if (this._binButton.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
          this._binButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBinTap, this);
        }

        if (this._activeButton.hasEventListener('onToggle')) {
          this._activeButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onActiveTap, this);
        }

        if (dir.evtHandler.hasEventListener(core.Event.SWITCH_LANGUAGE)) {
          dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        }
      }

      public setRoadEnabled(n: boolean) {
        // 0 for on, 1 for off
        if (n) {
          this._activeButton.setInitButtonState(0);
          this.alpha = 1;
        } else {
          this._activeButton.setInitButtonState(1);
          this.alpha = 0.5;
        }
      }

      public setRoadName(n: string) {
        this.roadName = n;
        this.changeLang();
      }

      public setRoadData(n: string) {
        this._bigRoad.updateRoadData(n);
      }

      public changeLang() {
        if (this.roadType === 0) {
          // add icon
          this._titleLabel.text = i18n.t('baccarat.addNewGoodRoad');
        } else if (this.roadType === 1) {
          // default road
          this._titleLabel.text = i18n.t('goodroad.' + this.roadName);
        } else if (this.roadType === 2) {
          // custom road
          this._titleLabel.text = this.roadName;
        }
      }

      public setRoadType(t: number) {
        this.roadType = t;
        this.renderItem();
      }

      public setRoadId(id: string) {
        this.roadId = id;
      }

      private renderItem() {
        // this._titleLabel.text = "";
        this._binButton.visible = false;
        this._activeButton.visible = false;
        this._bigRoad.visible = false;
        this._addButton.visible = false;
        this._editButton.visible = false;

        if (this.roadType === 0) {
          // add road
          this._addButton.visible = true;
        } else if (this.roadType === 1) {
          // default roads
          this._activeButton.visible = true;
          this._bigRoad.visible = true;
        } else {
          // custom roads
          this._editButton.visible = true;
          this._binButton.visible = true;
          this._activeButton.visible = true;
          this._bigRoad.visible = true;
        }
      }

      private onEditTap(evt: egret.Event) {
        this.dispatchEvent(new egret.Event('onEditTap'));
      }

      private onEditOver(evt: egret.Event) {
        this._editButton.alpha = 1;
      }

      private onEditOut(evt: egret.Event) {
        this._editButton.alpha = 0;
      }

      private onAddTap(evt: egret.Event) {
        this.dispatchEvent(new egret.Event('onAddTap'));
      }

      private onBinTap(evt: egret.Event) {
        dir.evtHandler.showMessage({
          class: 'MessageDialog',
          args: [
            i18n.t('baccarat.removeGoodRoad'),

            {
              dismiss: {
                text: i18n.t('baccarat.cancelRemoveGoodRoad'),
              },
              action: {
                text: i18n.t('baccarat.confirmRemoveGoodRoad'),
                onClick: () => {
                  this.dispatchEvent(new egret.Event('onBinTap'));
                },
              },
            },
          ],
        });
      }

      private onActiveTap(evt: egret.Event) {
        const enabled: boolean = evt.data === 0;

        if (enabled) {
          this.alpha = 1;
        } else {
          this.alpha = 0.5;
        }

        // limit max number of enabled
        let roadsEnabledCount = 0;
        const defaults = env.goodRoadData.default.slice();
        defaults.forEach(element => {
          if (element.id === this.roadId) {
            element.enabled = enabled;
          }
          if (element.enabled) {
            roadsEnabledCount++;
          }
        });

        const custom = env.goodRoadData.custom.slice();
        custom.forEach(element => {
          if (element.id === this.roadId) {
            element.enabled = enabled;
          }
          if (element.enabled) {
            roadsEnabledCount++;
          }
        });

        if (roadsEnabledCount > 20) {
          this._activeButton.setInitButtonState(1);
        } else {
          this.dispatchEvent(new egret.Event('onEnableChanged', false, false, enabled));
        }
      }

      private onTouchTap(evt: egret.Event) {
        const target = evt.target;
        if (target.parent && target.parent instanceof eui.ItemRenderer) {
          evt.stopPropagation();
          return;
        }
      }

      public onRollover(evt: egret.Event) {
        if (!env.livepageLocked) {
          egret.Tween.removeTweens(this);
          egret.Tween.get(this).to({ scaleX: 1.05, scaleY: 1.05 }, 250);
        }
      }

      public onRollout(evt: egret.Event) {
        egret.Tween.removeTweens(this);
        const tw1 = egret.Tween.get(this).to({ scaleX: 1, scaleY: 1 }, 250);
      }
    }
  }
}
