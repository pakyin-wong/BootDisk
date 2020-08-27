namespace we {
  export namespace ui {
    export class BetChipSetHorizontal extends BetChipSet {
      private _navWidth = 40;
      private _containerPadding = 5;
      private _startIndex = 0;
      private _visibleDenomNum = 0;
      private _leftNav: eui.Label;
      private _rightNav: eui.Label;
      private _chipList: (IBetChip & core.BaseEUI)[] = [];
      protected _chipContainer: eui.Component;
      protected _chipScale: number = 1;

      public constructor() {
        super();
        this._leftNav = new eui.Label();
        this._leftNav.text = '<';
        this._leftNav.left = 0;
        this._leftNav.verticalCenter = 0;
        this._leftNav.addEventListener(egret.TouchEvent.TOUCH_TAP, this._navigate.bind(this, -1), this);
        this._rightNav = new eui.Label();
        this._rightNav.text = '>';
        this._rightNav.right = 0;
        this._rightNav.verticalCenter = 0;
        this._rightNav.addEventListener(egret.TouchEvent.TOUCH_TAP, this._navigate.bind(this, 1), this);

        this._chipContainer = new eui.Component();
        this._chipContainer.top = 0;
        this._chipContainer.bottom = 0;
        this._chipContainer.left = this._navWidth;
        this._chipContainer.right = this._navWidth;
        this.addChild(this._leftNav);
        this.addChild(this._chipContainer);
        this.addChild(this._rightNav);
        this._visibleDenomNum = 5; // default value
      }

      public set navWidth(value: number) {
        this._navWidth = value;
        this._chipContainer.left = this._navWidth;
        this._chipContainer.right = this._navWidth;
      }
      public get navWidth(): number {
        return this._navWidth;
      }

      public $setChipScale(val: number) {
        super.$setChipScale(val);
        for (const chip of this._chipList) {
          chip.scaleX = val;
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
        this._selectedChipIndex = env.currentChipSelectedIndex;
        this.setChipSet(denomList);
        this._renderItems();
        this._onChipSelected(this._selectedChipIndex);
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
        const childInterval = (this.width - this._navWidth * 2) / this._visibleDenomNum;
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
        this._chipList[this._selectedChipIndex].type = we.core.ChipType.PERSPECTIVE;
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
