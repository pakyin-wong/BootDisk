namespace we {
  export namespace ui {
    enum DropdownItemRendererState {
      NORMAL = 'normal',
      HOVER = 'hover',
      SELECTED = 'selected',
      SELECTED_HOVER = 'selected-hover',
    }

    export class DropdownItemRenderer extends eui.ItemRenderer {
      protected _imgCheck: eui.Image;
      protected review: ui.RunTimeLabel;
      // protected _isSelected: boolean = false;
      protected _isHover: boolean = false;
      protected _key;

      public constructor() {
        super();

        this.once(egret.Event.ADDED_TO_STAGE, this.addedToStage, this);
      }

      protected addedToStage() {
        this.once(egret.Event.REMOVED_FROM_STAGE, this.removedFromStage, this);
        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this, false, -100);
      }

      protected removedFromStage() {
        this.once(egret.Event.ADDED_TO_STAGE, this.addedToStage, this);
        dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
      }

      protected changeLang() {
        const vals = {
          italic: this.review.italic,
          bold: this.review.bold,
          size: this.review.size,
          fontFamily: this.review.fontFamily || eui.Label.default_fontFamily,
        };
        const width = utils.measureTextWidth(this.review.text, vals, this.review.style);
        this.review.width = width + 20;

        // if (this.parent) {
        //   const list = this.parent as eui.List;
        //   list.validateNow();
        //   list.width = list.contentWidth;
        // }
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
        const vals = {
          italic: this.review.italic,
          bold: this.review.bold,
          size: this.review.size,
          fontFamily: this.review.fontFamily || eui.Label.default_fontFamily,
        };
        const width = utils.measureTextWidth(this.review.text, vals, this.review.style);
        this.review.width = width + 20;
        this._imgCheck.visible = false;

        this.update();
      }

      protected onRollover() {
        this._isHover = true;
        this.update();
      }

      protected onRollout() {
        this._isHover = false;
        this.update();
      }

      // public set selected(b) {
      //   this._isSelected = b;
      //   this.update();
      // }

      protected getCurrentState(): string {
        let state;
        if (this.selected && this._isHover) {
          this._imgCheck.visible = true;
          state = DropdownItemRendererState.SELECTED_HOVER;
        } else if (this._isHover) {
          state = DropdownItemRendererState.HOVER;
        } else if (this.selected) {
          this._imgCheck.visible = true;
          state = DropdownItemRendererState.SELECTED;
        } else {
          state = DropdownItemRendererState.NORMAL;
        }
        return state;
      }

      protected update() {
        this.invalidateState();
        // let state;
        // if (this._isSelected && this._isHover) {
        //   state = DropdownItemRendererState.SELECTED_HOVER;
        // } else if (this._isHover) {
        //   state = DropdownItemRendererState.HOVER;
        // } else if (this._isSelected) {
        //   state = DropdownItemRendererState.SELECTED;
        // } else {
        //   state = DropdownItemRendererState.NORMAL;
        // }
        // this.currentState !== state && (this.currentState = state);
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
