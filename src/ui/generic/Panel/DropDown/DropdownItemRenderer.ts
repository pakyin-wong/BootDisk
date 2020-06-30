namespace we {
  export namespace ui {
    enum DropdownItemRendererState {
      NORMAL = 'normal',
      HOVER = 'hover',
      SELECTED = 'selected',
      SELECTED_HOVER = 'selected-hover',
    }

    export class DropdownItemRenderer extends eui.ItemRenderer {
      protected review: ui.RunTimeLabel;
      protected _isSelected: boolean = false;
      protected _isHover: boolean = false;
      protected _key;

      public constructor() {
        super();
      }

      protected childrenCreated(): void {
        super.childrenCreated();
        this.$addListener(mouse.MouseEvent.ROLL_OVER, this.onRollover, this);
        this.$addListener(mouse.MouseEvent.ROLL_OUT, this.onRollout, this);
        mouse.setButtonMode(this, true);
      }

      protected dataChanged() {
        const key = this.data.key ? this.data.key : this.data;
        this._key = key;
        this.review.renderText = this.data.renderText ? this.data.renderText : () => i18n.t(key);
      }

      protected onRollover() {
        this._isHover = true;
        this.update();
      }

      protected onRollout() {
        this._isHover = false;
        this.update();
      }

      public set selected(b) {
        this._isSelected = b;
        this.update();
      }

      protected update() {
        let state;
        if (this._isSelected && this._isHover) {
          state = DropdownItemRendererState.SELECTED_HOVER;
        } else if (this._isHover) {
          state = DropdownItemRendererState.HOVER;
        } else if (this._isSelected) {
          state = DropdownItemRendererState.SELECTED;
        } else {
          state = DropdownItemRendererState.NORMAL;
        }

        this.currentState !== state && (this.currentState = state);
      }

      public get key() {
        return this._key;
      }

      public get renderText() {
        return this.review.renderText;
      }
    }
  }
}
