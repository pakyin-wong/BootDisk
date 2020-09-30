namespace we {
  export namespace rc {
    export class RcSceneTranditional extends lo.LotterySceneTraditional {
      protected initBettingTable() {
        // super.initBettingTable();

        if (!this._bettingPanel) {
          this._bettingPanel = new RCTraditionalBettingPanel();
          this._bettingPanelGroup.addChild(this._bettingPanel);
        }

        this._counter = this._bettingPanel._timer;

        if (this._tableInfo) {
          this._bettingPanel.updateBetTableInfo(this._tableInfo);
          this._bettingPanel.updateRoundDetailInfo(this._tableInfo.betInfo);
        }
      }

      protected setSkinName() {
        this.skinName = utils.getSkinByClassname('RcSceneTraditional');
      }
    }
  }
}
