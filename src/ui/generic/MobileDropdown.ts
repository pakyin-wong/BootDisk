namespace we {
  export namespace ui {
    export interface IDropdownOptM {
      toggler: egret.DisplayObject;
      review: RunTimeLabel;
      arrCol: eui.ArrayCollection;
      title: () => string;
      selected: any;
    }

    export class MobileDropdown extends ui.Panel {
      public _title: RunTimeLabel;
      public _subtitle: RunTimeLabel;
      private _scroller: eui.Scroller;
      private _list: eui.List;
      private _itemHeight: number = 0;
      private _opt: IDropdownOptM;
      private _dataCollection: eui.ArrayCollection;

      private _selectedIdx: number = -1;

      constructor() {
        super('MobileDropdown');
        this.isPoppable = true;
        this.hideOnStart = true;
        this.dismissOnClickOutside = true;
        this.poppableAddon = new PoppableAddonBottomSilder(this);
      }
      protected mount() {
        super.mount();

        dir.evtHandler.addEventListener(core.Event.TOGGLE_MOBILE_DROPDOWN, this.toggleDropdown, this);
        this.addEventListener('close', this.syncResult, this);
      }

      // protected initComponents() {
      //   this.initOrientationDependentComponent();
      // }

      protected clearOrientationDependentComponent() {
        if (this._opt) {
          this._selectedIdx = this._list.selectedIndex;
        }
        this.removeListeners();
      }

      protected initOrientationDependentComponent() {
        // protected initComponents() {
        (<RunTimeLabel> this.close).renderText = () => `${i18n.t('mobile_dropdown_confirm')}`;
        this._scroller.bounces = false;
        this._list.dataProvider = this._dataCollection = new eui.ArrayCollection(['']);
        this._list.itemRenderer = MobileDropdownItemRender;
        this._list.requireSelection = true;
        this._scroller.viewport = this._list;
        this.poppableAddon.onOrientationChange();
        this.addListeners();
        if (this._selectedIdx >= 0 && this._opt) {
          this._title.renderText = this._opt.title;
          this._dataCollection.replaceAll([].concat(this._opt.arrCol.source));
          this._list.dataProviderRefreshed();
          this._list.selectedIndex = this._selectedIdx;
        }
      }

      // set the position of the children components
      protected arrangeComponents() {}

      protected destroy() {
        super.destroy();
        this.removeListeners();
      }
      protected addListeners() {
        // dir.evtHandler.addEventListener(core.Event.TOGGLE_MOBILE_DROPDOWN, this.toggleDropdown, this);

        this._scroller.addEventListener(eui.UIEvent.CHANGE_START, this.onScrollStart, this);
        this._scroller.addEventListener(egret.Event.CHANGE, this.onScroll, this);
        this._scroller.addEventListener(eui.UIEvent.CHANGE_END, this.onScrollEnd, this);
        this._list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.handleTap, this);
        this._list.addEventListener(egret.Event.CHANGE, this.onChange, this);
        this._list.addEventListener(egret.Event.RENDER, this.onRender, this);
      }
      protected removeListeners() {
        this._scroller.removeEventListener(eui.UIEvent.CHANGE_START, this.onScrollStart, this);
        this._scroller.removeEventListener(egret.Event.CHANGE, this.onScroll, this);
        this._scroller.removeEventListener(eui.UIEvent.CHANGE_END, this.onScrollEnd, this);
        this._list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.handleTap, this);
        this._list.removeEventListener(egret.Event.CHANGE, this.onChange, this);
        this._list.removeEventListener(egret.Event.RENDER, this.onRender, this);
      }
      protected async toggleDropdown(e) {
        if (this._opt && this.isActivated) {
          return;
        }
        this._opt = e.data;
        this._title.renderText = e.data.title;
        this._dataCollection.replaceAll([].concat(e.data.arrCol.source));
        this._list.dataProviderRefreshed();
        this._list.selectedIndex = 0;
        const source = e.data.arrCol.source;
        for (let i = 0; i < source.length; i++) {
          if (source[i].key === e.data.selected || source === e.data.selected) {
            this._list.selectedIndex = i;
          }
        }
        this._scroller.viewport.scrollV = this._list.selectedIndex * this._itemHeight;
        this.show();
      }
      protected update() {
        egret.Tween.removeTweens(this._scroller.viewport);
        egret.Tween.get(this._scroller.viewport).to({ scrollV: this._list.selectedIndex * this._itemHeight }, 300);
      }
      protected get calIndex() {
        return Math.floor((this._scroller.viewport.scrollV + this._itemHeight * 0.1) / this._itemHeight);
      }
      protected handleTap() {}
      protected onChange() {
        // this._scroller.stopAnimation();
        this.update();
      }
      protected onRender() {
        this._list.numChildren > 0 && (this._itemHeight = this._list.getChildAt(0).height);
      }
      protected onScrollStart() {
        egret.Tween.removeTweens(this._scroller.viewport);
      }
      protected onScroll() {
        this._list.selectedIndex = this.calIndex;
        // this._subtitle.visible = true;
        // this._subtitle.renderText = () => env.nicknames.nickname_group1[this.calIndex];
      }
      protected onScrollEnd() {
        this._list.selectedIndex = this.calIndex;
        this.update();
      }
      protected syncResult() {
        this._scroller.stopAnimation();
        this._opt.review && (this._opt.review.renderText = this._list.selectedItem.renderText);
        this._opt.toggler.dispatchEvent(new egret.Event('DROPDOWN_ITEM_CHANGE', false, false, this._list.selectedItem.key));
        this._opt = null;
      }
    }
  }
}
