namespace we {
  export namespace lo {
    export class BetChipSetWithCustom extends ui.Panel {
      protected _chipsetList: ui.List;
      protected _arrcol: eui.ArrayCollection;

      public betChipHeight: number = 242;
      public betChipWidth: number = 242;
      public labelSize: number = 57;

      public init(denomList: number[]) {
        this._arrcol.removeAll();
        this._arrcol.replaceAll(denomList);
        this._chipsetList.selectedIndex = denomList.length >= env.currentChipSelectedIndex ? env.currentChipSelectedIndex : denomList.length - 1;
        this.onUpdate();
      }

      protected mount() {
        this.content['betChipHeight'] = this.betChipHeight;
        this.content['betChipWidth'] = this.betChipWidth;
        this.content['labelSize'] = this.labelSize;

        this.hideOnStart = true;
        this.dismissOnClickOutside = true;
        this.isPoppable = true;

        this._arrcol = new eui.ArrayCollection();
        this._chipsetList.dataProvider = this._arrcol;
        this._chipsetList.itemRenderer = ui.BetChipSetGridItemRenderer;
        this._chipsetList.requireSelection = true;
        this._chipsetList.addEventListener(eui.UIEvent.CHANGE, this.onUpdate, this);
        dir.evtHandler.addEventListener(core.Event.BET_DENOMINATION_CHANGE, this.onReplace, this);
      }

      protected destroy() {
        super.destroy();
        this._chipsetList.removeEventListener(eui.UIEvent.CHANGE, this.onUpdate, this);
        dir.evtHandler.removeEventListener(core.Event.BET_DENOMINATION_CHANGE, this.onReplace, this);
      }

      private onUpdate() {
        env.currentChipSelectedIndex = this._chipsetList.selectedIndex;
        dir.evtHandler.dispatch(core.Event.BET_DENOMINATION_CHANGE);
      }

      protected onReplace() {
        this._chipsetList.selectedIndex = env.currentChipSelectedIndex;
      }
    }
  }
}
