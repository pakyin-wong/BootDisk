namespace we {
  export namespace lo {
    export class BetChipSetWithCustom extends ui.Panel {
      protected _chipsetList: ui.List;
      protected _arrcol: eui.ArrayCollection;

      protected _custombet: FunBetCustomBetMobile;

      public betChipHeight: number = 242;
      public betChipWidth: number = 242;
      public labelSize: number = 57;

      public init() {
        this.onBetLimitUpdate();
      }

      protected mount() {
        this.content['betChipHeight'] = this.betChipHeight;
        this.content['betChipWidth'] = this.betChipWidth;
        this.content['labelSize'] = this.labelSize;

        this.hideOnStart = true;
        this.dismissOnClickOutside = true;
        this.isPoppable = true;

        this._custombet = new FunBetCustomBetMobile();

        this._arrcol = new eui.ArrayCollection();
        this._chipsetList.dataProvider = this._arrcol;
        this._chipsetList.itemRendererFunction = item => item == this._custombet? FunBetCustomBetMobileIR : ui.BetChipSetGridItemRenderer;
        this._chipsetList.requireSelection = true;
        this._chipsetList.addEventListener(eui.UIEvent.CHANGE, this.onUpdate, this);

        this._custombet.addEventListener('CUSTOMBET_SELECTED', this.onCustomBetSelected, this);
        dir.evtHandler.addEventListener(core.Event.BET_LIMIT_CHANGE, this.onBetLimitUpdate, this);
        dir.evtHandler.addEventListener(core.Event.BET_DENOMINATION_CHANGE, this.onReplace, this);
      }

      protected destroy() {
        super.destroy();
        this._chipsetList.removeEventListener(eui.UIEvent.CHANGE, this.onUpdate, this);
        this._custombet.removeEventListener('CUSTOMBET_SELECTED', this.onCustomBetSelected, this);
        dir.evtHandler.removeEventListener(core.Event.BET_LIMIT_CHANGE, this.onBetLimitUpdate, this);
        dir.evtHandler.removeEventListener(core.Event.BET_DENOMINATION_CHANGE, this.onReplace, this);
        this._custombet.dispose();
      }

      private onBetLimitUpdate() {
        let denomList = env.getBetLimitSet('Lottery', env.currentSelectedBetLimitIndex).chips;
        this._arrcol.removeAll();
        this._arrcol.replaceAll(denomList);
        this._arrcol.addItem(this._custombet);
        
        if(this._custombet.selected) {
          this._chipsetList.selectedIndex = denomList.length;
        } else {
          this._chipsetList.selectedIndex = denomList.length >= env.currentChipSelectedIndex ? env.currentChipSelectedIndex : denomList.length - 1;
          env.currentChipSelectedIndex = this._chipsetList.selectedIndex;
          dir.evtHandler.dispatch(core.Event.BET_DENOMINATION_CHANGE);
        }
      }

      private onUpdate() {
        if (this._chipsetList.selectedItem == this._custombet) {
          !this._custombet.selected && (this._chipsetList.selectedIndex = env.currentChipSelectedIndex);
        } else {
          env.currentChipSelectedIndex = this._chipsetList.selectedIndex;
          this._custombet.selected = false;
          dir.evtHandler.dispatch(core.Event.BET_DENOMINATION_CHANGE);
        }
      }

      protected onCustomBetSelected() {
          this._chipsetList.selectedIndex = this._arrcol.source.length - 1;
          this._custombet.selected = true;
          this.dispatchEvent(new egret.Event('CUSTOMBET_SELECTED',false,false,this._custombet.currentBet));
      }

      protected onReplace() {
        this._chipsetList.selectedIndex = env.currentChipSelectedIndex;
        this._custombet.selected = false;
      }
    }
  }
}
