namespace we {
  export namespace ba {
    export class BetChipSet extends eui.Component implements eui.UIComponent, IBetChipSet {
      private _startIndex = 0;
      private _denomList: number[];
      private _visibleDenomNum = 0;
      private _leftNav: eui.Label;
      private _rightNav: eui.Label;
      private _chipContainer: eui.Group;

      private _selectedChipIndex: number = 10;

      private _chipList: Array<IBetChip & eui.Component> = [];

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
        this._chipContainer = new eui.Group();
        const hlayout = new eui.HorizontalLayout();
        hlayout.useVirtualLayout = false;
        hlayout.horizontalAlign = egret.HorizontalAlign.JUSTIFY;
        this._chipContainer.layout = hlayout;
        this._chipContainer.top = 0;
        this._chipContainer.bottom = 0;
        this._chipContainer.left = 40;
        this._chipContainer.right = 40;
        this.addChild(this._leftNav);
        this.addChild(this._chipContainer);
        this.addChild(this._rightNav);
        this._visibleDenomNum = 5; // default value
      }

      set visibleDenomNum(value: number) {
        this._visibleDenomNum = value;
      }

      get visibleDenomNum() {
        return this._visibleDenomNum;
      }

      public setVisibleDenomNum(count) {
        this._visibleDenomNum = count;
      }

      public setLast() {
        this._renderItems();
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
        this._selectedChipIndex = Math.min(this._denomList.length - 1, this._selectedChipIndex);
        this.setChipSet(denomList);
        this._startIndex = this._chipList.length - this._visibleDenomNum;
        console.log('BetChipSet::init()', this._selectedChipIndex, this._visibleDenomNum, this._startIndex, this._denomList);
        this._renderItems();
      }

      public setDenominationList(denominationList: number[]) {}

      public resetDenomNum(denomNum: number) {
        this._visibleDenomNum = denomNum;
        // this._onChipSelected(this._selectedChipIndex);
        this._startIndex = this._chipList.length - this._visibleDenomNum;
        this._renderItems();
      }

      public resetDenominationList(denomList: number[]) {
        this._denomList = denomList;
        this.clearChipList();
        this._selectedChipIndex = Math.min(this._denomList.length - 1, this._selectedChipIndex);
        this.setChipSet(denomList);
        this._startIndex = this._chipList.length - this._visibleDenomNum;
        this._renderItems();
      }

      private _navigate(dir) {
        let newSelected: number;
        let newStart: number;
        if (dir > 0) {
          // right
          newStart = Math.min(this._startIndex + this._visibleDenomNum, this._denomList.length - this._visibleDenomNum);
          newSelected =
            newStart === this._denomList.length - this._visibleDenomNum
              ? this.denomList.length - this._visibleDenomNum + (this._selectedChipIndex - this._startIndex)
              : Math.min(this._startIndex + this._visibleDenomNum, this._denomList.length - 1);
          this._startIndex = newStart;
          console.log('BetChipSet::_navigate()- right', this._selectedChipIndex, this._visibleDenomNum, this._startIndex, newSelected);
        } else {
          // left
          newStart = Math.max(this._startIndex - this._visibleDenomNum, 0);
          newSelected = newStart === 0 ? this._selectedChipIndex - this._startIndex : Math.max(this._selectedChipIndex - this._visibleDenomNum, 0);
          this._startIndex = newStart;
          console.log('BetChipSet::_navigate()- left', this._selectedChipIndex, this._visibleDenomNum, this._startIndex, newSelected);
        }
        this._onChipSelected(newSelected);
        this._renderItems();
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
        for (let i = 0; i < this._visibleDenomNum; i += 1) {
          const child: eui.Component & IBetChip = this._chipList[this._startIndex + i];
          this._chipContainer.addChild(child);
          child.verticalCenter = 0;
          child.percentHeight = 100;
          child.percentWidth = 100 / this._visibleDenomNum;
        }
        this._updateNavigationDisplay();
      }

      public setChipSet(denomList: number[]) {
        this._denomList = denomList;
        this._denomList.map((value, index) => {
          console.log('BetChipSet::setChipSet : ', index, value);
          const betChip = new BetChip(value);
          betChip.index = index;
          if (index === this._selectedChipIndex) {
            betChip.highlight = true;
          }
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
        this._chipList[index].highlight = true;
        this._selectedChipIndex = index;
      }

      public setTouchEnabled(enabled: boolean) {
        if (this._chipList) {
          this._chipList.forEach(value => {
            value.touchEnabled = enabled;
          });
        }
      }

      public getSelectedChipIndex() {
        return this._selectedChipIndex;
      }
    }
  }
}
