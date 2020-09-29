namespace we {
  export namespace rc {
    export class RcSCeneFun extends lo.LotterySceneFun {
      constructor(data: any) {
        super(data);
        this.customKey = 'rc';
      }
      protected setSkinName() {
        this.skinName = utils.getSkinByClassname('RcSceneFun');
      }
      protected onGameStatisticUpdated() {}

      protected updateResultDisplay() {}
    }
  }
}
