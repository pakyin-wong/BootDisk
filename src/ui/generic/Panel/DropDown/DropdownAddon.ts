namespace we {
  export namespace ui {
    export function NewDropdownItem(key: any, renderText?: () => string) {
      return {
        key,
        renderText,
      };
    }

    export class DropdownAddon extends DisplayObjectAddon {
      protected target: ui.Panel & IDropdown;
      private _dataCollection: eui.ArrayCollection;
      private _list: eui.List;
      private _review: ui.RunTimeLabel;
      private _reviewRenderText: (renderText) => () => string;

      constructor(displayObject: egret.DisplayObject & IDropdown) {
        super(displayObject);
        this._dataCollection = new eui.ArrayCollection();
        this._list = new eui.List();
        this._list.dataProvider = this._dataCollection;
        this._list.itemRenderer = DropdownItemRenderer;
        this._list.requireSelection = false;
        const layout = new eui.VerticalLayout();
        layout.horizontalAlign = 'left';
        this._list.layout = layout;
        this.itemSkin = 'DropdownItem';

        if (this.target.$hasAddToStage) {
          this.target.once(egret.Event.REMOVED_FROM_STAGE, this.removedFromStage, this);
          dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this, false, -101);
        } else {
          this.target.once(egret.Event.ADDED_TO_STAGE, this.addedToStage, this);
        }
      }

      protected addedToStage() {
        this.target.once(egret.Event.REMOVED_FROM_STAGE, this.removedFromStage, this);
        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this, false, -101);
      }

      protected removedFromStage() {
        this.target.once(egret.Event.ADDED_TO_STAGE, this.addedToStage, this);
        dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
      }

      protected changeLang() {
        this._list.validateNow();
        this._list.width = this._list.contentWidth;
      }

      public init() {
        if (this.target.stage && this.target.dropdownScroller) {
          super.init();
          this._list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTapItem, this);
          this._list.addEventListener(egret.Event.CHANGE, this.onChange, this);
          this._list.addEventListener(egret.Event.RENDER, this.onRender, this);

          this.target.dropdownScroller.useMiniScrollBar = true;
          this.target.dropdownScroller.viewport = this._list;
        }
      }

      public deactivate() {
        if (this.isInit) {
          this._list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTapItem, this);
          this._list.removeEventListener(egret.Event.CHANGE, this.onChange, this);
          this._list.removeEventListener(egret.Event.RENDER, this.onRender, this);
          this.target.dropdownScroller.viewport = null;
          this._review = null;
        }
        super.deactivate();
      }

      public set review(label: ui.RunTimeLabel) {
        this._review = label;
      }

      public set reviewRenderText(func: (renderText) => () => string) {
        this._reviewRenderText = func;
      }

      public set itemSkin(s) {
        this._list.itemRendererSkinName = utils.getSkinByClassname(s);
      }

      public select(key) {
        const source = this._dataCollection.source;
        for (let i = 0; i < source.length; i++) {
          if (source[i].key === key || source === key) {
            this._list.selectedIndex = i;
            this._review.renderText = this._reviewRenderText ? this._reviewRenderText(this._list.selectedItem.renderText) : this._list.selectedItem.renderText;
            // this.onChange();
            return;
          }
        }
      }

      public clearSelection() {
        this._list.selectedIndex = -1;
        this._review.renderText = this._reviewRenderText ? this._reviewRenderText(() => '-') : () => '-';
      }

      public get data(): eui.ArrayCollection {
        return this._dataCollection;
      }

      protected onChange() {
        this._review.renderText = this._reviewRenderText ? this._reviewRenderText(this._list.selectedItem.renderText) : this._list.selectedItem.renderText;
        this.target.dispatchEvent(new egret.Event('DROPDOWN_ITEM_CHANGE', false, false, this._list.selectedItem.key));
      }

      protected onRender() {
        this.target.$setHeight(Math.min(this._list.measuredHeight + this.target.dropdownScroller.top + this.target.dropdownScroller.bottom, this.target.maxHeight));
      }

      protected onTapItem(e: eui.PropertyEvent) {
        this.target.hide();
      }
    }
  }
}
