namespace components {
  export class BettingArea extends eui.Component {
    private _mode = 'room-baccarat'; // betting area mode = 'lobby-baccarat' / 'room-baccarat'
    constructor() {
      super();
    }
    protected childrenCreated() {
      super.childrenCreated();
      const denominationList = [1, 2, 5, 10, 50, 100];
      const chipSet: baccarat.BetChipSet = new baccarat.BetChipSet(
        denominationList
      );
      chipSet.x = 0;
      chipSet.y = 0;
      this.addChild(chipSet);

      const bettingTable = new components.BettingTable();
      bettingTable.x = 0;
      bettingTable.y = 200;
      this.addChild(bettingTable);

      const countdownTimer = new baccarat.CountdownTimer();
      countdownTimer.x = 550;
      countdownTimer.y = 0;
      this.addChild(countdownTimer);
      countdownTimer.countdownValue = 30000;
      countdownTimer.remainingTime = 30000;
      countdownTimer.start();
    }
  }
}
