namespace we {
  export namespace ui {
    export class BetChipSetHorizontal extends BetChipSet {
      private _navWidth = 46;
      private _navHeight = 46;
      private _navPadding = -8;
      // private _navScaleX = 0.4;
      // private _navSize = 60;
      private _containerPadding = 5;
      private _startIndex = 0;
      private _visibleDenomNum = 0;
      // private _leftNav: eui.Label;
      // private _rightNav: eui.Label;
      private _leftNav: eui.Image;
      private _rightNav: eui.Image;
      private _leftNavGroup: eui.Group;
      private _rightNavGroup: eui.Group;
      private _chipList: Array<IBetChip & core.BaseEUI> = [];
      protected _chipContainer: eui.Component;
      protected _chipScale: number = 1;

      public constructor() {
        super();
        this._leftNavGroup = new eui.Group();
        this._leftNavGroup.left = 0;
        this._leftNav = new eui.Image();
        this._leftNav.source = 'd_lobby_button_prev_normal_png';
        this._leftNavGroup.verticalCenter = 0;
        this._leftNavGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this._navigate.bind(this, -1), this);
        this._rightNavGroup = new eui.Group();
        this._rightNav = new eui.Image();
        this._rightNav.source = 'd_lobby_button_next_normal_png';
        this._rightNavGroup.right = 0;
        this._rightNavGroup.verticalCenter = 0;
        this._rightNavGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this._navigate.bind(this, 1), this);
        this.updateNav();

        if (!env.isMobile) {
          mouse.setButtonMode(this._leftNavGroup, true);
          mouse.setButtonMode(this._rightNavGroup, true);
        }

        this._chipContainer = new eui.Component();
        this._chipContainer.top = 0;
        this._chipContainer.bottom = 0;
        this._chipContainer.left = this._navWidth + this._navPadding * 2;
        this._chipContainer.right = this._navWidth + this._navPadding * 2;
        this.addChild(this._chipContainer);
        this.addChild(this._leftNavGroup);
        this._leftNavGroup.addChild(this._leftNav);
        this.addChild(this._rightNavGroup);
        this._rightNavGroup.addChild(this._rightNav);
        this._visibleDenomNum = 5; // default value
      }

      public set navWidth(value: number) {
        this._navWidth = value;
        this._chipContainer.left = this._navWidth + this._navPadding * 2;
        this._chipContainer.right = this._navWidth + this._navPadding * 2;
        this.updateNav();
      }
      public get navWidth(): number {
        return this._navWidth;
      }

      public set navHeight(value: number) {
        this._navHeight = value;
        this._chipContainer.left = this._navWidth + this._navPadding * 2;
        this._chipContainer.right = this._navWidth + this._navPadding * 2;
        this.updateNav();
      }
      public get navHeight(): number {
        return this._navHeight;
      }

      public set navPadding(value: number) {
        this._navPadding = value;
        this._chipContainer.left = this._navWidth + this._navPadding * 2;
        this._chipContainer.right = this._navWidth + this._navPadding * 2;
        this.updateNav();
      }
      public get navPadding(): number {
        return this._navPadding;
      }

      protected updateNav() {
        this._leftNav.top = this._navPadding;
        this._leftNav.left = this._navPadding;
        this._leftNav.bottom = this._navPadding;
        this._leftNav.right = this._navPadding;
        this._leftNavGroup.width = this._navWidth + this._navPadding * 2;
        this._leftNavGroup.height = this._navHeight + this._navPadding * 2;
        this._rightNav.top = this._navPadding;
        this._rightNav.left = this._navPadding;
        this._rightNav.bottom = this._navPadding;
        this._rightNav.right = this._navPadding;
        this._rightNavGroup.width = this._navWidth + this._navPadding * 2;
        this._rightNavGroup.height = this._navHeight + this._navPadding * 2;
      }

      public $setChipScale(val: number) {
        super.$setChipScale(val);
        for (const chip of this._chipList) {
          chip.scaleX = val;
          chip.scaleY = val;
        }
      }

      public set containerPadding(value: number) {
        this._containerPadding = value;
      }

      public get containerPadding(): number {
        return this._containerPadding;
      }

      protected mount() {
        dir.evtHandler.addEventListener(core.Event.BET_DENOMINATION_CHANGE, this.syncChip, this);
      }

      protected destroy() {
        this.clearChipList();
        super.destroy();
        dir.evtHandler.removeEventListener(core.Event.BET_DENOMINATION_CHANGE, this.syncChip, this);
      }

      public set visibleDenomNum(value: number) {
        this._visibleDenomNum = value;
      }

      public get visibleDenomNum() {
        return this._visibleDenomNum;
      }

      public setVisibleDenomNum(count) {
        this._visibleDenomNum = count;
      }

      public set denomList(value: number[]) {
        this._denomList = value;
        this.syncChip();
      }

      public get denomList() {
        return this._denomList;
      }

      public init(visibleDenomNum: number, denomList: number[]) {
        this._visibleDenomNum = visibleDenomNum;
        this._denomList = denomList;
        // this._selectedChipIndex = env.currentChipSelectedIndex;
        this.setChipSet(denomList);
        this._renderItems();
        this.syncChip();
        // this._onChipSelected(env.currentChipSelectedIndex);
      }

      public resetFormat(denomNum: any) {
        this._visibleDenomNum = +denomNum;
        this._startIndex = this._chipList.length - this._visibleDenomNum;
        this._renderItems();
        this._onChipSelected(this._selectedChipIndex);
      }

      public resetDenominationList(denomList: number[]) {
        this._denomList = denomList;
        this.clearChipList();
        this._selectedChipIndex = env.currentChipSelectedIndex;
        this.setChipSet(denomList);
        this._renderItems();
        this._onChipSelected(this._selectedChipIndex);
      }

      private _navigate(dir) {
        let newSelected: number;
        let newStart: number;
        if (dir > 0) {
          // right
          const oldPagePos = this._selectedChipIndex - this._startIndex;
          const lastPageStart = this._denomList.length - this._visibleDenomNum;
          newStart = Math.min(this._startIndex + this._visibleDenomNum, lastPageStart);
          newSelected = newStart === lastPageStart ? lastPageStart + oldPagePos : Math.min(this._selectedChipIndex + this._visibleDenomNum, this._denomList.length - 1);
        } else {
          // left
          const oldPagePos = this._selectedChipIndex - this._startIndex;
          const firstPageStart = 0;
          newStart = Math.max(this._startIndex - this._visibleDenomNum, firstPageStart);
          newSelected = newStart === firstPageStart ? oldPagePos : Math.max(this._selectedChipIndex - this._visibleDenomNum, firstPageStart);
        }
        this._startIndex = newStart;
        this._renderItems();
        this._onChipSelected(newSelected);
      }

      private _updateNavigationDisplay() {
        this._leftNav.visible = this._startIndex > 0;
        this._rightNav.visible = this._startIndex + this._visibleDenomNum < this._chipList.length;
      }

      private _renderItems() {
        if (!this._chipList.length) {
          return;
        }
        this._chipContainer.removeChildren();
        let childpos = this._containerPadding;
        const childInterval = (this.width - (this._navWidth + this._navPadding * 2) * 2) / this._visibleDenomNum;
        for (let i = 0; i < this._visibleDenomNum; i += 1) {
          const child: eui.Component & IBetChip = this._chipList[this._startIndex + i];
          this._chipContainer.addChild(child);
          child.width = childInterval - this._containerPadding * 2;
          child.height = this.height;
          // (<AnimBetChip> child).debugRect.width = childInterval - this._containerPadding * 2;
          // (<AnimBetChip> child).debugRect.height = this.height;
          child.x = childpos;
          child.y = 0;
          childpos += childInterval;
          child.draw(true);
        }
        this._updateNavigationDisplay();
      }

      public setChipSet(denomList: number[]) {
        this._denomList = denomList;
        this._denomList.map((value, index) => {
          const betChip = new AnimBetChip(value);
          betChip.index = env.getWholeDenomMap()[value];
          betChip.type = we.core.ChipType.PERSPECTIVE;
          betChip.chipScale = this.chipScale;
          betChip.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onChipSelected.bind(this, index), this);
          mouse.setButtonMode(betChip, true);
          this._chipList.push(betChip);
        });
      }

      private clearChipList() {
        for (const betChip of this._chipList) {
          betChip.dispose();
          betChip.parent && betChip.parent.removeChild(betChip);
        }
        this._chipList = [];
      }

      private _onChipSelected(index: number) {
        this.setChip(index);
        env.currentChipSelectedIndex = index;
        dir.evtHandler.dispatch(core.Event.BET_DENOMINATION_CHANGE);
      }

      private syncChip() {
        // check if the page is correct
        if (this._selectedChipIndex === env.currentChipSelectedIndex) {
          return;
        }
        const index = env.currentChipSelectedIndex;
        if (!(index - this._startIndex < this._visibleDenomNum && index - this._startIndex > 0)) {
          // update _startIndex
          this._startIndex = (index / this._visibleDenomNum) * this._visibleDenomNum;
          const lastPageStart = this._denomList.length - this._visibleDenomNum;
          this._startIndex = Math.min(this._startIndex, lastPageStart);

          this._renderItems();
        }
        this.setChip(env.currentChipSelectedIndex);
      }

      private setChip(index: number) {
        if (this._selectedChipIndex === index) {
          return;
        }

        if (this._selectedChipIndex > -1) {
          this._chipList[this._selectedChipIndex].type = we.core.ChipType.PERSPECTIVE;
        }
        // this._chipList[this._selectedChipIndex].draw();

        this._chipList[index].type = we.core.ChipType.FLAT;
        // this._chipList[index].draw();
        this._selectedChipIndex = index;
      }

      public set selectedChipIndex(index) {
        this.setChip(index);
      }

      public get selectedChipIndex() {
        return this._selectedChipIndex;
      }

      public setTouchEnabled(enabled: boolean) {
        if (this._chipList) {
          this._chipList.forEach(value => {
            value.touchEnabled = enabled;
          });
        }
      }

      public unSelect() {
        this._chipList[this._selectedChipIndex].type = we.core.ChipType.PERSPECTIVE;
      }

      public setUpdateChipSetSelectedChipFunc(value: (value: number, index: number) => void) {}
    }
  }
}
