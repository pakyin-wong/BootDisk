namespace baccarat {
  export class BettingArea extends eui.Component {
    private _mode = 'room-baccarat'; // betting area mode = 'quick-bet' / 'room-baccarat'
    private bettingTable: baccarat.BettingTable;
    private betChipSet: baccarat.BetChipSet;
    private cardHolder: baccarat.CardHolder;
    private countdownTimer: baccarat.CountdownTimer;
    private confirmButton: eui.Button;
    private cancelButton: eui.Button;
    private winAmountLabel: eui.Label;

    // temp component
    private stateLabel: eui.Label;

    private tableID: string;
    private previousState: number;
    private gameData: GameData;
    private betDetails: BetDetail[];
    private totalWin: number;

    constructor() {
      super();
    }

    protected createChildren() {
      super.createChildren();
      this.skinName = utils.getSkin('BettingArea');
    }
    protected childrenCreated() {
      super.childrenCreated();
      console.log('start betLimits');

      const denominationList = env.betLimits[env.currentSelectedBetLimitIndex].chipsList.map(data => data.value);
      this.betChipSet.setDenominationList(denominationList);

      this.confirmButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onConfirmPressed, this, true);
      this.cancelButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCancelPressed, this, true);
    }

    private onConfirmPressed() {
      egret.log('Confirm');
      const bets = this.bettingTable.getUnconfirmedBetDetails();
      dir.socket.bet(this.tableID, bets);
    }

    private onCancelPressed() {
      egret.log('Cancel');
      this.bettingTable.cancelBet();
    }

    public onTableInfoUpdate(tableInfo: TableInfo) {
      console.log('BettingArea listener');
      this.tableID = tableInfo.tableid;
      this.gameData = <GameData>tableInfo.data;
      this.betDetails = tableInfo.bets;
      console.log(`BettingArea::onTableInfoUpdate::betDetails ${this.betDetails}`);
      this.updateGame();
      this.previousState = this.gameData.state;
    }

    protected updateGame() {
      console.log(`BettingArea::updateGame::GameState ${this.gameData.state}`);

      switch (this.gameData.state) {
        case enums.baccarat.GameState.IDLE:
          this.setStateIdle();
          break;
        case enums.baccarat.GameState.BET:
          console.log(`BettingArea::updateGame::setStateBet`);
          this.setStateBet();
          break;
        case enums.baccarat.GameState.DEAL:
          this.setStateDeal();
          break;
        case enums.baccarat.GameState.FINISH:
          this.setStateFinish();
          break;
        case enums.baccarat.GameState.REFUND:
          this.setStateRefund();
          break;
        case enums.baccarat.GameState.SHUFFLE:
          logger.l('BettingArea::updateGame()::SHUFFLE');
          this.setStateShuffle();
          break;
        default:
          break;
      }
    }

    protected setStateIdle() {
      if (this.previousState !== enums.baccarat.GameState.IDLE) {
        this.bettingTable.setTouchEnabled(false);
        this.cardHolder.visible = false;
        this.winAmountLabel.visible = false;
        // this.setBetRelatedComponentsTouchEnabled(false);
        // hide state
        this.stateLabel.visible = false;
        this.setBetRelatedComponentsVisibility(false);
      }
    }

    protected setStateBet() {
      if (this.previousState !== enums.baccarat.GameState.BET) {
        // reset data betinfo

        if (this.betDetails) {
          this.betDetails.splice(0, this.betDetails.length);
        }

        // TODO: show start bet message to the client for few seconds
        this.bettingTable.resetUnconfirmedBet();
        this.bettingTable.resetConfirmedBet();
        this.stateLabel.text = 'Betting';
        this.winAmountLabel.visible = false;

        // show state
        this.stateLabel.visible = true;

        // hide cardHolder
        this.cardHolder.visible = false;

        // show the betchipset, countdownTimer, confirm, cancel and other bet related buttons
        this.setBetRelatedComponentsVisibility(true);

        // enable betting table
        this.bettingTable.setTouchEnabled(true);
        this.setBetRelatedComponentsTouchEnabled(true);

        // update the bet amount of each bet field in betting table
        logger.l(`BettingArea::setStateBet:betDetails: ` + this.betDetails);
        if (this.betDetails) {
          this.bettingTable.updateBetFields(this.betDetails);
        }
      }

      // update the countdownTimer
      this.updateCountdownTimer();
    }
    protected setStateDeal() {
      if (this.previousState !== enums.baccarat.GameState.DEAL) {
        this.cardHolder.resetCards();
        // TODO: show stop bet message to the client for few seconds
        this.stateLabel.text = 'Dealing';

        // hide the betchipset, countdownTimer, confirm, cancel and other bet related buttons
        this.setBetRelatedComponentsVisibility(false);
        this.setBetRelatedComponentsTouchEnabled(false);

        // show state
        this.stateLabel.visible = true;

        // show cardHolder
        this.cardHolder.visible = true;
        this.cardHolder.updateResult(this.gameData);

        // disable betting table
        this.bettingTable.setTouchEnabled(false);
        this.setBetRelatedComponentsTouchEnabled(false);

        this.winAmountLabel.visible = false;
      }
      // update card result in cardHolder
      this.cardHolder.updateResult(this.gameData);
    }
    protected setStateFinish() {
      if (this.previousState !== enums.baccarat.GameState.FINISH) {
        // hide the betchipset, countdownTimer, confirm, cancel and other bet related buttons
        this.setBetRelatedComponentsVisibility(false);

        // show state
        this.stateLabel.visible = true;

        // show cardHolder
        this.cardHolder.visible = true;
        this.cardHolder.updateResult(this.gameData);

        // disable betting table
        this.bettingTable.setTouchEnabled(false);
        this.setBetRelatedComponentsTouchEnabled(false);

        // TODO: show effect on each winning bet field
        logger.l(`this.gameData.winType ${this.gameData.wintype} ${EnumHelpers.getKeyByValue(enums.baccarat.FinishType, this.gameData.wintype)}`);
        this.stateLabel.text = `Finish, ${EnumHelpers.getKeyByValue(enums.baccarat.FinishType, this.gameData.wintype)}`;

        if (this.totalWin) {
          this.winAmountLabel.visible = true;
          this.winAmountLabel.text = `This round you got: ${this.totalWin.toString()}`;
        }

        // TODO: show win message and the total win ammount to the client for few seconds

        // TODO: after win message has shown, show win/ lose effect of each bet
      }
    }
    protected setStateRefund() {
      if (this.previousState !== enums.baccarat.GameState.REFUND) {
        // TODO: show round cancel message to the client for few seconds
        this.stateLabel.text = 'Refunding';

        // TODO: after round cancel message has shown, show refund effect of each bet

        // hide the betchipset, countdownTimer, confirm, cancel and other bet related buttons
        this.setBetRelatedComponentsVisibility(false);
        this.setBetRelatedComponentsTouchEnabled(false);

        // show state
        this.stateLabel.visible = true;

        // hide cardHolder
        this.cardHolder.visible = false;
        this.winAmountLabel.visible = false;

        // disable betting table
        this.bettingTable.setTouchEnabled(false);
      }
    }
    protected setStateShuffle() {
      if (this.previousState !== enums.baccarat.GameState.SHUFFLE) {
        // TODO: show shuffle message to the client for few seconds
        this.stateLabel.text = 'Shuffling';

        // hide the betchipset, countdownTimer, confirm, cancel and other bet related buttons
        this.setBetRelatedComponentsVisibility(false);
        this.setBetRelatedComponentsTouchEnabled(false);

        // show state
        this.stateLabel.visible = true;

        // hide cardHolder
        this.cardHolder.visible = false;
        this.winAmountLabel.visible = false;

        // disable betting table
        this.bettingTable.setTouchEnabled(false);
      }
    }

    public onBetDetailUpdate(tableInfo: TableInfo) {
      // TODO: show win result when bet detail is ready
      this.betDetails = tableInfo.bets;
      switch (this.gameData.state) {
        case enums.baccarat.GameState.BET:
          this.bettingTable.updateBetFields(this.betDetails);
          break;
        case enums.baccarat.GameState.FINISH:
        default:
          this.computeTotalWin();
          this.winAmountLabel.visible = true;
          this.winAmountLabel.text = `This round you got: ${this.totalWin.toString()}`;
          this.bettingTable.showWinEffect(this.betDetails);
          break;
      }
    }

    public onBetConfirmed() {
      this.bettingTable.resetUnconfirmedBet();
      egret.log('Bet Succeeded');
    }

    protected setBetRelatedComponentsVisibility(visible: boolean) {
      this.betChipSet.visible = visible;
      this.countdownTimer.visible = visible;
      this.confirmButton.visible = visible;
      this.cancelButton.visible = visible;
    }

    protected setBetRelatedComponentsTouchEnabled(enabled: boolean) {
      this.betChipSet.setTouchEnabled(enabled);
      this.confirmButton.touchEnabled = enabled;
      this.cancelButton.touchEnabled = enabled;
    }

    protected updateCountdownTimer() {
      // const currentTime = Date.now();
      // const timeDiff = currentTime - this.gameData.startTime;
      // this.countdownTimer.countdownValue = this.gameData.timer;
      // this.countdownTimer.remainingTime = this.gameData.timer - timeDiff;
      // this.countdownTimer.start();

      this.countdownTimer.countdownValue = this.gameData.countdown * 1000;
      this.countdownTimer.remainingTime = this.gameData.countdown * 1000 - (env.currTime - this.gameData.starttime);
      this.countdownTimer.start();
    }

    protected computeTotalWin() {
      let totalWin = 0;
      if (this.betDetails) {
        for (const betDetail of this.betDetails) {
          totalWin += betDetail.winamount;
        }
      }

      this.totalWin = totalWin;
    }

    public onChangeLang() {
      this.bettingTable.onChangeLang();
    }
  }
}
