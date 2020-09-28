namespace we {
  export namespace rc {
    export class RcSCeneFun extends lo.LotterySceneFun {
      protected setSkinName() {
        this.skinName = utils.getSkinByClassname('RcSceneFun');
      }
    }
  }
}
