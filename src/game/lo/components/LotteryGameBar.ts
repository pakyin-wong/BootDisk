namespace we {
  export namespace lo {
    export class LotteryGameBar extends ui.GameBar {
      protected historyBtn: egret.DisplayObject;
      protected trendBtn: egret.DisplayObject;
      protected recordBtn: egret.DisplayObject;
      protected statBtn: egret.DisplayObject;

      protected mount() {
        super.mount();
        utils.addButtonListener(this.historyBtn, this.onHistory, this);
        utils.addButtonListener(this.trendBtn, this.onTrend, this);
        utils.addButtonListener(this.recordBtn, this.onRecord, this);
        utils.addButtonListener(this.statBtn, this.onStat, this);
      }

      protected destroy() {
        super.destroy();
        utils.removeButtonListener(this.historyBtn, this.onHistory, this);
        utils.removeButtonListener(this.trendBtn, this.onTrend, this);
        utils.removeButtonListener(this.recordBtn, this.onRecord, this);
        utils.removeButtonListener(this.statBtn, this.onStat, this);
      }

      protected onHistory() {
        dir.evtHandler.createOverlay({
          class: 'LotteryHistory',
          dismissOnClickOutside: true,
          noDimmer: true,
          showOptions: {
            originW: this.historyBtn.width,
            originH: this.historyBtn.height,
            originX: this.historyBtn.localToGlobal(0, 0).x,
            originY: this.historyBtn.localToGlobal(0, 0).y,
          },
          args: [],
        });
        logger.l(utils.LogTarget.DEBUG, `onClickHistory`);
      }

      protected onTrend() {}

      protected onRecord() {}

      protected onStat() {}
    }
  }
}
