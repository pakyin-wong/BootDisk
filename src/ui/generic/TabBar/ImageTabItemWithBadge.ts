namespace we {
  export namespace ui {
    export class ImageTabItemWithBadge extends TabItemWithBadge {
      protected _image: eui.Image;
      // protected _badge: eui.Group;
      // protected _badgeLabel: eui.Label;

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
        let imgState = 'none';
        switch (state) {
          case 'down':
          case 'upAndSelected':
          case 'downAndSelected':
            imgState = 'hover';
            break;
        }
        this._image.source = `d_lobby_list_panel_${this.data}_${imgState}_png`;
        this.onBadgeUpdate(Math.floor(Math.random() * 20));
      }
    }
  }
}
