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
        this._bankerButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddTap, this);

        this._playerButton.touchEnabled = true;
        this._bankerButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddTap, this);

        this._bankerButton.touchEnabled = true;
        this._bankerButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddTap, this);

        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);

        // this.anchorOffsetX = this.width / 2;
        // this.anchorOffsetY = this.height / 2;
        // this.x += this.anchorOffsetX;
        // this.y += this.anchorOffsetY;

        // this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        // this._group.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onRollover, this);
        // this._group.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollout, this);
      }

      public changeLang() {
        const arr = [i18n.t('baccarat.addNewGoodRoad'), i18n.t('baccarat.newGoodRoadName')];
        if (this.roadType === -1) {
          // add icon
        } else if (this.roadType === 0) {
          // default road
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
          this.roadType = 0;
          this.roadPattern = '';
        } else {
          // custom
          this.roadId = data.id;
          this.roadType = 1;
          this.roadPattern = data.pattern;
        }

        this._bigRoad.updateRoadData(this.roadPattern);
      }

      public setRoadId(id) {
        this.roadId = id;
      }

      private onEditTap(evt: egret.Event) {}

      private onAddTap(evt: egret.Event) {}

      private onCloseTap(evt: egret.Event) {
        this.visible = false;
      }

      private onActiveTap(evt: egret.Event) {
        const s = evt.data;
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
