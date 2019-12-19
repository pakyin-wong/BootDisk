namespace we {
  export namespace ui {
    export interface IDropdown {
      dropdownScroller: ui.Scroller;
    }

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

      constructor(displayObject: egret.DisplayObject & IDropdown) {
        super(displayObject);
        this._dataCollection = new eui.ArrayCollection();
        this._list = new eui.List();
        this._list.dataProvider = this._dataCollection;
        this._list.itemRenderer = DropdownItemRenderer;
        this._list.requireSelection = true;
        this.itemSkin = 'DropdownItem';
      }

      public init() {
        if (this.target.stage && this.target.dropdownScroller) {
          super.init();
          this._list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTapItem, this);
          this._list.addEventListener(egret.Event.CHANGE, this.onChange, this);
          this.target.dropdownScroller.useMiniScrollBar = true;
          this.target.dropdownScroller.viewport = this._list;
        }
      }

      public deactivate() {
        if (this.isInit) {
          this._list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTapItem, this);
          this._list.removeEventListener(egret.Event.CHANGE, this.onChange, this);
          this.target.dropdownScroller.viewport = null;
          this._review = null;
        }
        super.deactivate();
      }

      public set review(label: ui.RunTimeLabel) {
        this._review = label;
      }

      public set itemSkin(s) {
        this._list.itemRendererSkinName = utils.getSkin(s);
      }

      public select(key) {
        const source = this._dataCollection.source;
        for (let i = 0; i < source.length; i++) {
          if (source[i].key === key || source === key) {
            this._list.selectedIndex = i;
            this._review.renderText = this._list.selectedItem.renderText;
            // this.onChange();
            return;
          }
        }
      }

      public get data(): eui.ArrayCollection {
        return this._dataCollection;
      }

      protected onChange() {
        this._review.renderText = this._list.selectedItem.renderText;
        this.target.dispatchEvent(new egret.Event('DROPDOWN_ITEM_CHANGE', false, false, this._list.selectedItem.key));
      }

      protected onTapItem(e: eui.PropertyEvent) {
        this.target.hide();
      }
    }
  }
}