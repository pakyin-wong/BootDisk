// TypeScript file
namespace we {
  export namespace overlay {
    export class SSCTraditionalMobileDropdown extends ui.Panel {
      private _betTypeScroller: eui.Scroller;
      private _betTypeList: eui.List;

      private _betModeScroller: eui.Scroller;
      private _betModeList: eui.List;

      private _title: ui.RunTimeLabel;

      private _btnConfirm;
      private _confirm :ui.RunTimeLabel;
      private _config;

      private _betTypeConfig;
      private _betModeConfig;

      private _betTypeDataCollection: eui.ArrayCollection;
      private _betModeDataCollection: eui.ArrayCollection;

      private _currentBigTagIndex = -1;
      private _currentSmallTagIndex = -1;

      private _itemHeight: number = 0;
      private _bettingPanel;

      constructor(config, panel) {
        super();
        this._bettingPanel = panel;
        this._config = config;
        this.skinName = 'skin_mobile.lo.SSCTraditionalMobileDropdown';
        this.isPoppable = true;
        // this.hideOnStart = true;
        this.dismissOnClickOutside = true;
        this.poppableAddon = new ui.PoppableAddonBottomSilder(this);
      }

      protected mount() {
        super.mount();
        this.addEventListeners();
        this.toggleDropdown();
      }

      protected addEventListeners(){
        // this.addEventListener('LO_TRAD_TOGGLE_MOBILE_GAMETYPE_DROPDOWN', this.toggleDropdown, this);
        this._btnConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.syncResult, this);
      }

      protected removeEventListeners(){
        // this.removeEventListener('LO_TRAD_TOGGLE_MOBILE_GAMETYPE_DROPDOWN', this.toggleDropdown, this);
        this._btnConfirm.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.syncResult, this);
      }
      protected async toggleDropdown(e = null) {
        if (this.isActivated) {
          return;
        }
        this.initOpt();
        this._title.renderText = () => `${i18n.t('lo_trad.ui.gamemode')}`;
        this._confirm.renderText = () =>`${i18n.t('mobile_dropdown_confirm')}`;

        this._currentBigTagIndex = 0;
        this._currentSmallTagIndex = 0;

        this._betModeList.selectedIndex = 0;
        this._betTypeList.selectedIndex = 0;

        // this._betModeScroller.viewport.scrollV = this._betModeList.selectedIndex * this._itemHeight;
        // this._betTypeScroller.viewport.scrollV = this._betTypeList.selectedIndex * this._itemHeight;
        this._betTypeList.dataProvider = this._betTypeDataCollection;
        this._betModeList.dataProvider = this._betModeDataCollection;
        this._betTypeList.dataProviderRefreshed();
        this._betModeList.dataProviderRefreshed();
        this._betTypeList.itemRenderer = lo.SSCTraditionalMobileDropdownItemRender;
        this._betModeList.itemRenderer = lo.SSCTraditionalMobileDropdownItemRender;

        this.betTypeUpdate();
        this.betModeUpdate();
        this.show();
      }
      protected initOpt() {
        // dropDownSource = eui.ArrayCollection(key, renderText)
        this._betTypeConfig = [];
        for (let i = 0; i < Object.keys(this._config).length; i++) {
          this._betTypeConfig.push(this._config[Object.keys(this._config)[i]]);
        }

        this._currentBigTagIndex = 0;

        const currentBetType = this._betTypeConfig[this._currentBigTagIndex];
        this._betModeConfig = [];

        for (let i = 0; i < Object.keys(currentBetType['type']).length; i++) {
          this._betModeConfig.push(currentBetType['type'][Object.keys(currentBetType['type'])[i]]);
        }

        this._currentSmallTagIndex = 0;
        this.initDataCollection();
      }

      protected initDataCollection() {
        this._betTypeDataCollection = new eui.ArrayCollection();
        const tempBetType = [];

        for (let i = 0; i < this._betTypeConfig.length; i++) {
          const name = `${i18n.t('lo_trad.bigTag.'+this._betTypeConfig[i].name)}`;
          tempBetType.push({ key: i, renderText: name });
        }

        this._betTypeDataCollection.replaceAll([].concat(tempBetType));

        this._betModeDataCollection = new eui.ArrayCollection();

        const tempBetMode = [];

        for (let i = 0; i < this._betModeConfig.length; i++) {
          const name = `${i18n.t('lo_trad.smallTag.'+this._betModeConfig[i].name)}`;
          tempBetMode.push({ key: i, renderText: name });
        }

        this._betModeDataCollection.replaceAll([].concat(tempBetMode));
      }

      protected clearOrientationDependentComponent() {
        this._currentBigTagIndex = this._betTypeList.selectedIndex;
        this._currentSmallTagIndex = this._betModeList.selectedIndex;

        this.removeListeners();
      }
      protected addListeners() {
        // dir.evtHandler.addEventListener(core.Event.TOGGLE_MOBILE_DROPDOWN, this.toggleDropdown, this);

        this._betTypeScroller.addEventListener(eui.UIEvent.CHANGE_START, this.onBetTypeScrollStart, this);
        this._betTypeScroller.addEventListener(egret.Event.CHANGE, this.onBetTypeScroll, this);
        this._betTypeScroller.addEventListener(eui.UIEvent.CHANGE_END, this.onBetTypeScrollEnd, this);
        this._betTypeList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onBetTypeHandleTap, this);
        this._betTypeList.addEventListener(egret.Event.CHANGE, this.onBetTypeChange, this);
        this._betTypeList.addEventListener(egret.Event.RENDER, this.onBetTypeRender, this);
        this._betModeScroller.addEventListener(eui.UIEvent.CHANGE_START, this.onBetModeScrollStart, this);
        this._betModeScroller.addEventListener(egret.Event.CHANGE, this.onBetModeScroll, this);
        this._betModeScroller.addEventListener(eui.UIEvent.CHANGE_END, this.onBetModeScrollEnd, this);
        this._betModeList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onBetModeHandleTap, this);
        this._betModeList.addEventListener(egret.Event.CHANGE, this.onBetModeChange, this);
        this._betModeList.addEventListener(egret.Event.RENDER, this.onBetModeRender, this);
      }

      protected removeListeners() {
        this._betTypeScroller.removeEventListener(eui.UIEvent.CHANGE_START, this.onBetTypeScrollStart, this);
        this._betTypeScroller.removeEventListener(egret.Event.CHANGE, this.onBetTypeScroll, this);
        this._betTypeScroller.removeEventListener(eui.UIEvent.CHANGE_END, this.onBetTypeScrollEnd, this);
        this._betTypeList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onBetTypeHandleTap, this);
        this._betTypeList.removeEventListener(egret.Event.CHANGE, this.onBetTypeChange, this);
        this._betTypeList.removeEventListener(egret.Event.RENDER, this.onBetTypeRender, this);
        this._betModeScroller.removeEventListener(eui.UIEvent.CHANGE_START, this.onBetModeScrollStart, this);
        this._betModeScroller.removeEventListener(egret.Event.CHANGE, this.onBetModeScroll, this);
        this._betModeScroller.removeEventListener(eui.UIEvent.CHANGE_END, this.onBetModeScrollEnd, this);
        this._betModeList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onBetModeHandleTap, this);
        this._betModeList.removeEventListener(egret.Event.CHANGE, this.onBetModeChange, this);
        this._betModeList.removeEventListener(egret.Event.RENDER, this.onBetModeRender, this);
      }

      protected initOrientationDependentComponent() {
        // protected initComponents() {
        (<ui.RunTimeLabel>this._btnConfirm).renderText = () => `${i18n.t('mobile_dropdown_confirm')}`;
        this._betTypeScroller.bounces = false;
        this._betTypeList.dataProvider = this._betTypeDataCollection;
        this._betTypeList.itemRenderer = lo.SSCTraditionalMobileDropdownItemRender;
        this._betTypeList.requireSelection = true;
        this._betTypeScroller.viewport = this._betTypeList;

        this._betModeScroller.bounces = false;
        this._betModeList.dataProvider = this._betModeDataCollection;
        this._betModeList.itemRenderer = lo.SSCTraditionalMobileDropdownItemRender;
        this._betModeList.requireSelection = true;
        this._betModeScroller.viewport = this._betModeList;

        this.poppableAddon.onOrientationChange();
        this.addListeners();
        // if (this._selectedIdx >= 0 && this._opt) {
        //   this._title.renderText = this._opt.title;
        //   this._dataCollection.replaceAll([].concat(this._opt.arrCol.source));
        //   this._list.dataProviderRefreshed();
        //   this._list.selectedIndex = this._selectedIdx;
        // }
      }

      protected syncResult() {
        this._betTypeScroller.stopAnimation();
        this._betModeScroller.stopAnimation();

        this._bettingPanel.dispatchEvent(
          new egret.Event('GAMETYPEDROPDOWN_ITEM_CHANGE', false, false, {
            betType: this._currentBigTagIndex,
            betMode: this._currentSmallTagIndex,
          })
        );

        // console.log('betType: ' + this._betTypeConfig[this._currentBigTagIndex] +
        //      'betMode: '+ this._betModeConfig[this._currentSmallTagIndex]);

        this.foreclosed();
        // this._opt.review && (this._opt.review.renderText = this._list.selectedItem.renderText);
        // this._opt.toggler.dispatchEvent(new egret.Event('DROPDOWN_ITEM_CHANGE', false, false, this._list.selectedItem.key));
        // this._opt = null;
      }

      protected destroy() {
        super.destroy();
        this.removeListeners();
      }

      protected updateBetModeList() {
        const currentBetType = this._betTypeConfig[this._currentBigTagIndex];
        this._betModeConfig = [];

        for (let i = 0; i < Object.keys(currentBetType['type']).length; i++) {
          this._betModeConfig.push(currentBetType['type'][Object.keys(currentBetType['type'])[i]]);
        }

        // this._betModeDataCollection = new eui.ArrayCollection();

        const tempBetMode = [];

        for (let i = 0; i < this._betModeConfig.length; i++) {
          const name = `${i18n.t('lo_trad.smallTag.'+this._betModeConfig[i].name)}`;
          tempBetMode.push({ key: i, renderText: name });
        }

        this._betModeDataCollection.replaceAll([].concat(tempBetMode));
        this._betModeList.dataProvider = this._betModeDataCollection;
        this._betModeList.dataProviderRefreshed();
        this._betModeList.itemRenderer = lo.SSCTraditionalMobileDropdownItemRender;
        this._betModeList.selectedIndex = 0;
        this._currentSmallTagIndex = 0;
        this.betModeUpdate();
      }

      protected onBetTypeHandleTap() {
        this.isBetTypeTapItem = true;
        this._currentBigTagIndex = this._betTypeList.selectedIndex;
        this.betTypeUpdate();
        this.updateBetModeList();
      }

      protected onBetModeHandleTap() {
        this.isBetModeTapItem = true;
        this._currentSmallTagIndex = this._betModeList.selectedIndex;
        this.betModeUpdate();
      }

      // -----SCROLLER PART
      protected get betTypeCalIndex() {
        return Math.floor((this._betTypeScroller.viewport.scrollV + this._itemHeight * 0.1) / this._itemHeight);
      }

      protected get betModeCalIndex() {
        return Math.floor((this._betModeScroller.viewport.scrollV + this._itemHeight * 0.1) / this._itemHeight);
      }

      protected onBetTypeRender() {
        this._betTypeList.numChildren > 0 && (this._itemHeight = this._betTypeList.getChildAt(0).height);
      }

      protected onBetModeRender() {
        this._betModeList.numChildren > 0 && (this._itemHeight = this._betModeList.getChildAt(0).height);
      }

      protected onBetTypeScroll() {
        this._betTypeList.selectedIndex = this.betTypeCalIndex;
        this._currentBigTagIndex = this._betTypeList.selectedIndex;
        // this._subtitle.visible = true;
        // this._subtitle.renderText = () => env.nicknames.nickname_group1[this.calIndex];
      }

      protected onBetModeScroll() {
        this._betModeList.selectedIndex = this.betModeCalIndex;
        this._currentSmallTagIndex = this._betModeList.selectedIndex;
        // this._subtitle.visible = true;
        // this._subtitle.renderText = () => env.nicknames.nickname_group1[this.calIndex];
      }

      protected onBetTypeChange() {
        // this._scroller.stopAnimation();
        this._betTypeScroller.stopAnimation();
        this.betTypeUpdate();
      }

      protected onBetModeChange() {
        // this._scroller.stopAnimation();
        this._betModeScroller.stopAnimation();
        this.betModeUpdate();
      }
      protected _isBetTypeTapItem = false;
      protected _isBetModeTapItem = false;

      protected set isBetTypeTapItem(v) {
        this._isBetTypeTapItem = v;
      }

      protected get isBetTypeTapItem() {
        return this._isBetTypeTapItem;
      }

      protected set isBetModeTapItem(v) {
        this._isBetModeTapItem = v;
      }

      protected get isBetModeTapItem() {
        return this._isBetModeTapItem;
      }

      protected onBetTypeScrollStart() {
        egret.Tween.removeTweens(this._betTypeScroller.viewport);
      }

      protected onBetModeScrollStart() {
        egret.Tween.removeTweens(this._betModeScroller.viewport);
      }

      protected onBetTypeScrollEnd() {
        if (this.isBetTypeTapItem) {
          return;
        }
        this._betTypeList.selectedIndex = this.betTypeCalIndex;
        this._currentBigTagIndex = this._betTypeList.selectedIndex;
        this.betTypeUpdate();
        this.updateBetModeList();
      }

      protected onBetModeScrollEnd() {
        if (this.isBetModeTapItem) {
          return;
        }
        this._betModeList.selectedIndex = this.betModeCalIndex;
        this._currentSmallTagIndex = this._betModeList.selectedIndex;
        this.betModeUpdate();
      }

      protected betTypeUpdate() {
        const inst = this;
        egret.Tween.removeTweens(this._betTypeScroller.viewport);
        egret.Tween.get(this._betTypeScroller.viewport)
          .to({ scrollV: this._betTypeList.selectedIndex * this._itemHeight }, 300)
          .call(() => (this.isBetTypeTapItem = false), inst);
      }

      protected betModeUpdate() {
        const inst = this;
        egret.Tween.removeTweens(this._betModeScroller.viewport);
        egret.Tween.get(this._betModeScroller.viewport)
          .to({ scrollV: this._betModeList.selectedIndex * this._itemHeight }, 300)
          .call(() => (this.isBetModeTapItem = false), inst);
      }
    }
  }
}
