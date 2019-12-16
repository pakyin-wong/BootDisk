namespace we {
  export namespace ba {
    export class GoodRoadListItem extends core.BaseEUI {
      public selected: boolean;
      public itemIndex: number;

      private _bigRoad: we.ba.GoodRoadmap;
      private _binButton: ui.RoundButton;
      private _activeButton: ui.ToggleButton;
      private _addButton: ui.RoundButton;
      private _editButton: ui.RoundButton;
      private _titleLabel: eui.Label;
      private _group: eui.Group;

      private isActive: number;
      private roadId: string;
      private roadType: number; // add icon(-1) , default(0) or custom road(1)

      public constructor() {
        super();
        this.roadType = 0;
        this.skinName = utils.getSkin('GoodRoadListItem');
      }

      protected mount() {
        this.touchEnabled = true;

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
        this._editButton.touchEnabled = true;
        this._editButton.alpha = 0;
        this._editButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEditTap, this);
        this._editButton.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onEditOver, this);
        this._editButton.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onEditOut, this);

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

      public changeLang() {
        const arr = [i18n.t('baccarat.addNewGoodRoad'), i18n.t('baccarat.newGoodRoadName')];
        if (this.roadType === -1) {
          // add icon
        } else if (this.roadType === 0) {
          // default road
        }
      }

      public setRoadType(t) {
        this.roadType = t;

        this.renderItem();
      }

      public setRoadId(id) {
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

      private onEditTap(evt: egret.Event) {}

      private onEditOver(evt: egret.Event) {
        this._editButton.alpha = 1;
      }

      private onEditOut(evt: egret.Event) {
        this._editButton.alpha = 0;
      }

      private onAddTap(evt: egret.Event) {}

      private onBinTap(evt: egret.Event) {}

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
