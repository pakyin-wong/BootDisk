namespace we {
  export namespace overlay {
    export class CustomRoadMobile extends CustomRoad {
      protected _btn_add: egret.DisplayObject;

      protected mount() {
        super.mount();

        this._editRoadPanel.isFocusItem = true;
        this._btn_add.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRoadAdd, this);
      }

      protected destroy() {
        super.destroy();
        this._btn_add.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRoadAdd, this);
      }

      protected onRoadAdd(e: egret.Event) {
        if (!this._editRoadPanel.isActivated) {
          this._editRoadPanel.show();
          this._editRoadPanel.setByObject({ type: 0 });
          this._cover.visible = true;
        }
      }
      protected onRoadEdit(e: egret.Event) {
        if (!this._editRoadPanel.isActivated) {
          this._editRoadPanel.show();
          this._editRoadPanel.setByObject(e.data.itemData);
          this._cover.visible = true;
        }
      }

      protected insertNewRoadColumn() {
        return;
      }
    }
  }
}
