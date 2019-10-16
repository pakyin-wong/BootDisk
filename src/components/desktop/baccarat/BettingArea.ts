namespace baccarat {
  export class BettingArea extends eui.Component {
    private _mode = 'room-baccarat'; // betting area mode = 'quick-bet' / 'room-baccarat'
    private bettingTable: baccarat.BettingTable;
    private betChipSet: baccarat.BetChipSet;
    private cardHolder: baccarat.CardHolder;
    private countdownTimer: baccarat.CountdownTimer;
    private confirmButton: eui.Button;
    private cancelButton: eui.Button;

    constructor() {
      super();

      env.tableInfo = new Array<TableInfo>();
      env.tableInfo.push(new TableInfo());
      env.gameData = new GameData();
    }

    protected updateGame() {
      switch (env.gameData.gameState) {
        case 1:
          break;
        case 2:
          break;
        default:
          break;
      }
    }

    protected createChildren() {
      super.createChildren();
      this.skinName = utils.getSkin('BettingArea');
    }
    protected childrenCreated() {
      super.childrenCreated();
      console.log('start betLimits');
      env.betLimits = {
        currency: 'en',
        upper: 100000,
        lower: 1,
        denominationList: [1, 2, 5, 10, 50, 100],
      };

      console.log(env.betLimits.denominationList);
      this.betChipSet.setDenominationList(env.betLimits.denominationList);

      this.countdownTimer.countdownValue = 30000;
      this.countdownTimer.remainingTime = 30000;
      this.countdownTimer.start();

      this.confirmButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onConfirmPressed, this, true);
      this.cancelButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCancelPressed, this, true);

      /*
      const cardHolder = new components.CardGame();
      cardGame.x = 0;
      cardGame.y = 0;
      this.addChild(cardGame);

*/
      /*
      const denominationList = [1, 2, 5, 10, 50, 100];
      const chipSet: baccarat.BetChipSet = new baccarat.BetChipSet(
        denominationList
      );
      chipSet.x = 0;
      chipSet.y = 400;
      this.addChild(chipSet);
      */
      /*
      const bettingTable = new components.BettingTable();
      bettingTable.x = 0;
      bettingTable.y = 600;
      this.addChild(bettingTable);
      */
    }

    private onConfirmPressed() {
      egret.log('Confirm');
    }

    private onCancelPressed() {
      egret.log('Cancel');
    }
  }
}
