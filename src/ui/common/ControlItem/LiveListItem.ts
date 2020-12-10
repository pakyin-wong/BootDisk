namespace we {
  export namespace ui {
    export class LiveListItem extends LiveListSimpleItem {
      protected _dealerImage: eui.Image;
      protected _prevButton: ui.BaseImageButton;

      public constructor(skinName: string = null) {
        super(skinName);
      }

      protected addEventListeners() {
        super.addEventListeners();
        this._prevButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickUndoButton, this);
      }

      protected removeEventListeners() {
        super.removeEventListeners();
        this._prevButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickUndoButton, this);
      }

      public onClickUndoButton(event) {
        this._undoStack.popAndUndo();
      }

      protected initChildren() {
        super.initChildren();
        this.addRoundCornerMask();
        this._dealerImage.fillMode = 'cover';
      }

      protected addRoundCornerMask() {
        const shape = new egret.Shape();
        shape.graphics.beginFill(0xffffff, 1);
        // shape.graphics.drawRoundRect(0, 0, this.width, this.height, 16, 16);
        RoundRect.drawRoundRect(shape.graphics, 0, 0, this.width, this.dealerImage.height, { tl: 8, tr: 8, bl: 0, br: 0 });
        shape.graphics.endFill();

        this._contentContainer.addChildAt(shape, 0);
        // this._contentContainer.mask = shape;
        this.dealerImage.mask = shape;
      }

      protected initCustomPos() {
        this._targetQuickBetButtonY = 388;
        this._originalQuickBetButtonY = 338;
        this._targetQuickbetPanelY = 378;
        this._originalQuickBetPanelY = 100;
        this._offsetLimit = 900;
        this._offsetMovement = 800;
      }

      public setData(tableInfo: data.TableInfo) {
        super.setData(tableInfo);
        this._dealerImage.source = this.itemInitHelper && this.itemInitHelper.getPlaceholder ? this.itemInitHelper.getPlaceholder(tableInfo.gametype) : null;
      }

      get dealerImage() {
        return this._dealerImage;
      }

      set dealerImage(value: eui.Image) {
        this._dealerImage = value;
      }

      protected generateFavouriteButton() {
        const button = new AnimatedToggleButton();
        button.dbClass = 'lobby_ui';
        button.dbDisplay = 'd_lobby_icon_fav';
        button.width = 44;
        button.height = 42;
        button.right = 10;
        button.top = 10;
        button.visible = false;
        this._favouriteButton = button;
        this._contentContainerDynamic.addChild(this._favouriteButton);
      }

    }
  }
}
