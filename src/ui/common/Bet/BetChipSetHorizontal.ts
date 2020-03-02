namespace we {
  export namespace ui {
    export class BetChipSetHorizontal extends BetChipSet {
      private _navWidth = 40;
      private _containerPadding = 5;
      private _startIndex = 0;
      private _visibleDenomNum = 0;
      private _leftNav: eui.Label;
      private _rightNav: eui.Label;
      private _chipList: Array<IBetChip & core.BaseEUI> = [];
      protected _chipContainer: eui.Component;
      protected _clipChipHeightPortion: number = 0.85;
      protected _flatChipHeightPortion: number = 1.05;

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

      public set clipChipHeightPortion(value: number) {
        this._clipChipHeightPortion = value;
      }

      public set flatChipHeightPortion(value: number) {
        this._flatChipHeightPortion = value;
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

      set denomList(value: number[]) {
        this._denomList = value;
      }

      get denomList() {
        return this._denomList;
      }

      public init(visibleDenomNum: number, denomList: number[]) {
        this._visibleDenomNum = visibleDenomNum;
        this._denomList = denomList;
        this._selectedChipIndex = this._denomList.length - 1;
        this.setChipSet(denomList);
        this._startIndex = this._chipList.length - this._visibleDenomNum;
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
        this._selectedChipIndex = this._denomList.length - 1;
        this.setChipSet(denomList);
        this._startIndex = this._chipList.length - this._visibleDenomNum;
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
        let childpos = 0;
        const childInterval = (this.width - this._navWidth * 2) / this._visibleDenomNum;
        for (let i = 0; i < this._visibleDenomNum; i += 1) {
          const child: eui.Component & IBetChip = this._chipList[this._startIndex + i];
          this._chipContainer.addChild(child);
          child.verticalCenter = 0;
          child.width = childInterval - this._containerPadding * 2;
          child.x = childpos;
          childpos += childInterval;
        }
        this._updateNavigationDisplay();
      }

      public setChipSet(denomList: number[]) {
        this._denomList = denomList;
        this._denomList.map((value, index) => {
          const betChip = new BetChip(value);
          betChip.index = index;
          betChip.height = this.height * this._clipChipHeightPortion;
          betChip.type = we.core.ChipType.PERSPECTIVE;
          betChip.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onChipSelected.bind(this, index), this);
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
        this._chipList[this._selectedChipIndex].highlight = false;
        this._chipList[this._selectedChipIndex].type = we.core.ChipType.PERSPECTIVE;
        this._chipList[this._selectedChipIndex].height = this.height * this._clipChipHeightPortion;
        this._chipList[this._selectedChipIndex].verticalCenter = 0;

        this._chipList[index].highlight = true;
        this._chipList[index].type = we.core.ChipType.FLAT;
        this._chipList[index].height = this.height * this._flatChipHeightPortion;
        this._chipList[index].verticalCenter = 0;
        this._chipList[index].draw();

        this._selectedChipIndex = index;
      }

      public setTouchEnabled(enabled: boolean) {
        if (this._chipList) {
          this._chipList.forEach(value => {
            value.touchEnabled = enabled;
          });
        }
      }

      public setUpdateChipSetSelectedChipFunc(value: (value: number, index: number) => void) {}
    }
  }
}
