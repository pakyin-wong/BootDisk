namespace we {
  export namespace ui {
    export class ImageTabItemWithBadge extends TabItemWithBadge {
      protected _image: ui.BaseAnimationButton;

      constructor() {
        super();
        this.skinName = 'ImageTabItemWithBadgeSkin';
        this._badge.visible = false;
        mouse.setButtonMode(this, true);
      }

      protected getCurrentState() {
        const state = super.getCurrentState();
        this.updateImage(state);
        return state;
      }

      protected dataChanged(): void {
        this.updateImage(this.currentState);
      }

      protected updateImage(state) {
        if (!this._image) {
          this._image = new we.ui.BaseAnimationButton();
          this._image.dbClass = 'lobby_ui';
          this._image.dbDisplay = `d_lobby_panel_gamelist_${this.data}`;
          this._image.isSwitch = true;
          this.addChildAt(this._image, 0);
        }
        this._image.active = false;
        switch (state) {
          case 'down':
          case 'upAndSelected':
          case 'downAndSelected':
            this._image.active = true;
            break;
        }
      }
    }
  }
}
