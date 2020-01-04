namespace we {
  export namespace ba {
    export class GoodRoadEditItem extends ui.Panel {
      public selected: boolean;
      public itemIndex: number;

      private _bigRoad: we.ba.GoodRoadmapEdit;
      private _bankerButton: ui.RoundButton;
      private _playerButton: ui.RoundButton;
      private _textBg: eui.Rect;
      private _titleLabel: eui.EditableText;
      private _clearButton: ui.RoundButton;
      private _removeButton: ui.RoundButton;
      private _removeAllButton: ui.RoundButton;
      private _saveButton: ui.RoundButton;
      private _bigRoadMask: eui.Rect;

      private roadId: string;
      private roadName: string;
      private roadEnabled: boolean;
      private roadType: number; // add icon(0) , default(1) or custom road(2)
      private roadPattern: string;

      public constructor() {
        super();
        this.roadType = 0;
        this.skinName = utils.getSkin('GoodRoadEditItem');
      }

      protected mount() {
        this.hideOnStart = true;
        this.isPoppable = true;
        this.touchEnabled = true;

        this._bigRoad.mask = this._bigRoadMask;

        this._bankerButton.touchEnabled = true;
        this._bankerButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBankerTap, this);

        this._playerButton.touchEnabled = true;
        this._playerButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlayerTap, this);

        this._removeButton.touchEnabled = true;
        this._removeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRemoveTap, this);

        this._removeAllButton.touchEnabled = true;
        this._removeAllButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRemoveAllTap, this);

        this._saveButton.touchEnabled = true;
        this._saveButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSaveTap, this);

        this._clearButton.touchEnabled = true;
        this._clearButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClearTap, this);

        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);

        // this.anchorOffsetX = this.width / 2;
        // this.anchorOffsetY = this.height / 2;
        // this.x += this.anchorOffsetX;
        // this.y += this.anchorOffsetY;
        this._bigRoad.addEventListener('update', this.onBigRoadUpdated, this);

        this.addEventListener('close', this.onClose, this);
      }

      protected destroy() {
        super.destroy();

        if (this._bankerButton.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
          this._bankerButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBankerTap, this);
        }

        if (this._playerButton.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
          this._playerButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlayerTap, this);
        }

        if (this._removeButton.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
          this._removeButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRemoveTap, this);
        }

        if (this._removeAllButton.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
          this._removeAllButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRemoveAllTap, this);
        }

        if (this._saveButton.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
          this._saveButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSaveTap, this);
        }

        if (this._clearButton.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
          this._clearButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClearTap, this);
        }

        if (dir.evtHandler.hasEventListener(core.Event.SWITCH_LANGUAGE)) {
          dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        }
      }

      private onBigRoadUpdated(e: egret.Event) {
        this._saveButton.alpha = e.data.canSubmit ? 1 : 0.5;
        this._bankerButton.alpha = e.data.canAddBanker ? 1 : 0.5;
        this._playerButton.alpha = e.data.canAddPlayer ? 1 : 0.5;
        this._removeButton.alpha = this._removeAllButton.alpha = e.data.canRemove ? 1 : 0.5;
        this.roadPattern = e.data.roadPattern;
      }

      public changeLang() {
        const arr = [i18n.t('baccarat.addNewGoodRoad'), i18n.t('baccarat.newGoodRoadName')];
        if (this.roadType === 0) {
          // add icon
        } else if (this.roadType === 2) {
          // custom road
        }
      }

      public setByObject(data: any) {
        /*sample data
        {
          type:0,
          id: 'Bxxeeeeea',
          name: '好路xxyy', // key for localization
          pattern: 'bbbpbpbp',
          enabled: true,
        }
        */

        if (data.type === 0) {
          // new
          this.roadId = '';
          this.roadName = i18n.t('baccarat.addNewGoodRoad');
          this.roadType = 0;
          this.roadPattern = '';
          this.roadEnabled = true;
        } else if (data.type === 2) {
          // custom
          this.roadName = data.name;
          this.roadId = data.id;
          this.roadType = 2;
          this.roadPattern = data.pattern;
          this.roadEnabled = data.enabled;
        }

        this._titleLabel.text = this.roadName;
        this._bigRoad.updateRoadData(this.roadPattern);
      }

      private onBankerTap(evt: egret.Event) {
        this._bigRoad.addBanker();
      }

      private onPlayerTap(evt: egret.Event) {
        this._bigRoad.addPlayer();
      }

      private onRemoveTap(evt: egret.Event) {
        this._bigRoad.removeOne();
      }
      private onRemoveAllTap(evt: egret.Event) {
        this._bigRoad.removeAll();
      }
      private onSaveTap(evt: egret.Event) {
        if (this._saveButton.alpha === 1) {
          if (this.roadType === 0) {
            // new
            dir.socket.createGoodRoad(this._titleLabel.text, this.roadPattern);
          } else if (this.roadType === 2) {
            // custom
            dir.socket.updateCustomGoodRoad(this.roadId, {
              id: this.roadId,
              name: this._titleLabel.text,
              pattern: this.roadPattern,
              enabled: this.roadEnabled,
            });
          }
          // hide this panel after save
          this.hide();
          (this.parent.parent as we.overlay.CustomRoad)._cover.visible = false;
        }
      }

      private onClose() {
        (this.parent.parent as we.overlay.CustomRoad)._cover.visible = false;
      }

      private onClearTap(evt: egret.Event) {
        this._titleLabel.text = '';
      }
    }
  }
}
