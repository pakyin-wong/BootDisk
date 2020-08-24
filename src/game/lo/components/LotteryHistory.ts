namespace we {
  export namespace overlay {
    export class LotteryHistory extends ui.Panel {
      protected _list: eui.List;
      protected _arrCol: eui.ArrayCollection;

      constructor() {
        super('lo.LotteryHistory');
      }

      protected mount() {
        super.mount();
        this._arrCol = new eui.ArrayCollection();

        for (let i = 0; i < 10; i++) {
          this._arrCol.addItem({
            round: '0000000000',
            ball1: 1,
            ball2: 2,
            ball3: 3,
            ball4: 4,
            ball5: 5,
          });
        }

        this._list.itemRenderer = lo.LotteryHistoryIR;
        this._list.dataProvider = this._arrCol;
      }
    }
  }
}
