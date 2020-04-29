namespace we {
  export namespace ui {
    export class LiveListItem extends LiveListSimpleItem {
      protected _dealerImage;
      protected _contentContainerStatic: eui.Group;

      public constructor(skinName: string = null) {
        super(skinName);
      }

      protected initChildren() {
        super.initChildren();
        if (this._quickBetGroup) {
          this._quickBetGroup.cacheAsBitmap = true;
        }
        if (this._contentContainerStatic) {
          this._contentContainerStatic.cacheAsBitmap = true;
        }
      }

      protected addRoundCornerMask() {
        const shape = new egret.Shape();
        shape.graphics.beginFill(0xffffff, 1);
        shape.graphics.drawRoundRect(0, 0, this.width, this.height, 16, 16);
        shape.graphics.endFill();

        this._contentContainer.addChild(shape);
        this._contentContainer.mask = shape;
      }

      protected initCustomPos() {
        this._targetQuickBetButtonY = 350;
        this._originalQuickBetButtonY = 300;
        this._targetQuickbetPanelY = 378;
        this._originalQuickBetPanelY = 100;
        this._offsetLimit = 900;
        this._offsetMovement = 800;
      }

      public setData(tableInfo: data.TableInfo) {
        super.setData(tableInfo);
        const randNo = Math.round(Math.random() * 4) + 1;
        this._dealerImage.texture = RES.getRes('temp_baccarat_dealer_' + randNo);
      }

      get dealerImage() {
        return this._dealerImage;
      }

      set dealerImage(value: eui.Image) {
        this._dealerImage = value;
      }
    }
  }
}
