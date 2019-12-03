namespace we {
  export namespace ba {
    export class BetChipSet extends eui.Component implements eui.UIComponent, IBetChipSet {
      private _startIndex = 0;
      private currentDenomination: number[];
      private visibleDenominationCount = 0;
      private _leftNav: eui.Label;
      private _rightNav: eui.Label;
      private _chipContainer: eui.Group;

      private _envSelectedChipIndex: number = 10;
      private _localSelectedChipIndex: number;

      private chipList: Array<IBetChip & eui.Component> = [];

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
        this.setVisibleDenominationCount(5); // default value
        this._localSelectedChipIndex = 0;
      }

      public setVisibleDenominationCount(count) {
        this.visibleDenominationCount = count;
        this._renderItems();
      }

      public setDenominationList(denominationList: number[]) {
        this.chipList = [];
        this._setChipSet(denominationList);
        // compute start index
        // const selectedIdx = env.currentChipSelectedIndex;
        const selectedIdx = this._envSelectedChipIndex;
        let startIdx = (selectedIdx / this.visibleDenominationCount) * this.visibleDenominationCount;
        const endCount = startIdx + this.visibleDenominationCount;
        if (endCount > this.currentDenomination.length) {
          startIdx -= endCount - this.currentDenomination.length;
        }
        this._localSelectedChipIndex = selectedIdx - startIdx;
        this._setStartIndex(startIdx);
      }

      private _setStartIndex(index) {
        this._startIndex = index;
        this._renderItems();
      }

      private _navigate(dir) {
        // const page = Math.ceil(this._startIndex / this.visibleDenominationCount);
        // const totalPage = Math.ceil(this.chipList.length / this.visibleDenominationCount);
        const visibleMinusOne = this.visibleDenominationCount - 1;
        if (dir > 0) {
          // go right
          let newIndex = this._startIndex;
          newIndex += this.visibleDenominationCount; // next page
          newIndex += visibleMinusOne; // last item
          if (this.chipList[newIndex]) {
            // swap three item
            this._setStartIndex(newIndex - visibleMinusOne);
            console.log('> swap 3 item');
          } else {
            while (!this.chipList[newIndex]) {
              newIndex -= 1;
              if (this.chipList[newIndex]) {
                this._setStartIndex(newIndex - visibleMinusOne);
                console.log('< swap 2 item');
              }
            }
          }
        } else {
          // go left
          let newIndex = this._startIndex;
          newIndex -= 3; // prev page
          if (this.chipList[newIndex]) {
            this._setStartIndex(newIndex);
            console.log('< swap 3 item');
          } else {
            while (!this.chipList[newIndex]) {
              newIndex += 1;
              if (this.chipList[newIndex]) {
                this._setStartIndex(newIndex);
                console.log('< swap 2 item');
              }
            }
          }
        }
        // update selected index
        const newSelected = this._startIndex + this._localSelectedChipIndex;
        this._onChipSelected(newSelected);
      }

      private _updateNavigationDisplay() {
        let showLeftNav = false;
        let showRightNav = false;
        const page = Math.ceil((this._startIndex + this.visibleDenominationCount) / this.visibleDenominationCount);
        const totalPage = Math.ceil(this.chipList.length / this.visibleDenominationCount);
        if (page > 1 && totalPage > 1) {
          showLeftNav = true;
        }
        if (page < totalPage && totalPage > 1) {
          showRightNav = true;
        }
        this._leftNav.visible = showLeftNav;
        this._rightNav.visible = showRightNav;
      }

      private _renderItems() {
        if (!this.chipList.length) {
          return;
        }
        this._chipContainer.removeChildren();
        for (let i = 0; i < this.visibleDenominationCount; i += 1) {
          const child: eui.Component = this.chipList[this._startIndex + i];
          this._chipContainer.addChild(child);
          child.percentHeight = 100;
          child.percentWidth = 100 / this.visibleDenominationCount;
        }
        this._updateNavigationDisplay();
      }

      private _setChipSet(denominationList: number[]) {
        this.currentDenomination = denominationList;

        // check if the currentChipSelectedIndex exceed the denomination list length
        // env.currentChipSelectedIndex = Math.min(denominationList.length - 1, env.currentChipSelectedIndex);
        this._envSelectedChipIndex = Math.min(denominationList.length - 1, this._envSelectedChipIndex);
        // const selectedIdx = env.currentChipSelectedIndex;
        const selectedIdx = this._envSelectedChipIndex;
        this.clearChipList();

        let idx = 0;
        for (const value of denominationList) {
          const betChip = new BetChip(value);
          betChip.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onChipSelected.bind(this, idx), this);
          if (selectedIdx === idx) {
            betChip.highlight = true;
          }
          this.chipList.push(betChip);
          idx += 1;
        }
      }

      private clearChipList() {
        for (const betChip of this.chipList) {
          betChip.parent && betChip.parent.removeChild(betChip);
        }
        this.chipList = [];
      }

      private _onChipSelected(index: number) {
        // env.currentChipSelectedValue = this.chipList[index].getValue();

        // const prevSelectedIndex = env.currentChipSelectedIndex;
        const prevSelectedIndex = this._envSelectedChipIndex;
        this.chipList[prevSelectedIndex].highlight = false;

        // env.currentChipSelectedIndex = index;
        this._envSelectedChipIndex = index;
        this.chipList[index].highlight = true;

        // update _localSelectedChipIndex
        this._localSelectedChipIndex = index - this._startIndex;
      }

      public setTouchEnabled(enabled: boolean) {
        if (this.chipList) {
          this.chipList.forEach(value => {
            value.touchEnabled = enabled;
          });
        }
      }

      public getSelectedChipIndex() {
        console.log('BetChipSet::getSelectedChipIndex ：' + this._envSelectedChipIndex);
        return this._envSelectedChipIndex;
      }
    }
  }
}
