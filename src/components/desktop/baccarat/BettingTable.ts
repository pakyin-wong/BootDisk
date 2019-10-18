namespace baccarat {
  export class BettingTable extends eui.Component {
    private gridPlayerPair: baccarat.BettingTableGrid;
    private gridBankerPair: baccarat.BettingTableGrid;
    private gridPlayer: baccarat.BettingTableGrid;
    private gridTie: baccarat.BettingTableGrid;
    private gridSuperSix: baccarat.BettingTableGrid;
    private gridBanker: baccarat.BettingTableGrid;
    private lblNoComm: eui.Label;
    private switchSuperSix: eui.ToggleSwitch;

    private mapping: { [s: string]: baccarat.BettingTableGrid };

    private uncfmBetDetails: BetDetail[];
    private betDetails: BetDetail[];

    constructor() {
      super();
      this.skinName = utils.getSkin('BettingTable');
    }

    protected childrenCreated() {
      this.changeMethod('normal');
      this.changeLang();
      this.switchSuperSix.addEventListener(
        egret.Event.CHANGE,
        () => {
          this.invalidateState();
        },
        this
      );
      this.mapping = {};
      this.mapping[enums.baccarat.BetField.BANKER] = this.gridBanker;
      this.mapping[enums.baccarat.BetField.PLAYER] = this.gridPlayer;
      this.mapping[enums.baccarat.BetField.TIE] = this.gridTie;
      this.mapping[enums.baccarat.BetField.BANKER_PAIR] = this.gridBankerPair;
      this.mapping[enums.baccarat.BetField.PLAYER_PAIR] = this.gridPlayerPair;

      this.gridBanker.setFieldName(enums.baccarat.BetField.BANKER);
      this.gridPlayer.setFieldName(enums.baccarat.BetField.PLAYER);
      this.gridTie.setFieldName(enums.baccarat.BetField.TIE);
      this.gridBankerPair.setFieldName(enums.baccarat.BetField.BANKER_PAIR);
      this.gridPlayerPair.setFieldName(enums.baccarat.BetField.PLAYER_PAIR);
      this.resetUnconfirmedBet();

      this.gridPlayerPair.addEventListener('TABLE_GRID_CLICK', this.onBetFieldUpdate, this);
      this.gridBankerPair.addEventListener('TABLE_GRID_CLICK', this.onBetFieldUpdate, this);
      this.gridPlayer.addEventListener('TABLE_GRID_CLICK', this.onBetFieldUpdate, this);
      this.gridTie.addEventListener('TABLE_GRID_CLICK', this.onBetFieldUpdate, this);
      this.gridBanker.addEventListener('TABLE_GRID_CLICK', this.onBetFieldUpdate, this);
      this.gridSuperSix.addEventListener('TABLE_GRID_CLICK', this.onBetFieldUpdate, this);
    }

    protected getCurrentState() {
      if (this.switchSuperSix.selected) {
        return 'SuperSix';
      } else {
        this.gridSuperSix.setUncfmBet(0);
        return 'Normal';
      }
    }

    protected changeMethod(method: string) {
      switch (method) {
        default:
          const border = 10;
          const textColor = 0xffffff;
          const bgColor = 0x000000;

          this.gridPlayerPair.setStyle(border, textColor, bgColor);
          this.gridBankerPair.setStyle(border, textColor, bgColor);
          this.gridPlayer.setStyle(border, textColor, bgColor);
          this.gridBanker.setStyle(border, textColor, bgColor);
          this.gridSuperSix.setStyle(border, textColor, bgColor);
          this.gridTie.setStyle(border, textColor, bgColor);
      }
    }

    protected changeLang() {
      this.gridPlayerPair.text = i18n.t('baccarat.playerPair');
      this.gridBankerPair.text = i18n.t('baccarat.bankerPair');
      this.gridPlayer.text = i18n.t('baccarat.player');
      this.gridTie.text = i18n.t('baccarat.tie');
      this.gridSuperSix.text = i18n.t('baccarat.superSix');
      this.gridBanker.text = i18n.t('baccarat.banker');
      this.lblNoComm.text = i18n.t('baccarat.noComm');
    }

    public updateBetFields(betDetails: BetDetail[]) {
      // TODO: update the already bet amount of each bet field
      this.betDetails = betDetails;
    }

    public showWinFields(betDetails: BetDetail[]) {
      // TODO: show the win effect of each win field
      this.betDetails = betDetails;
    }

    public showWinEffect(betDetails: BetDetail[]) {
      // TODO: show the win effect of each winning bet
      this.betDetails = betDetails;
    }

    protected onBetFieldUpdate(event: egret.Event) {
      const betDetail: BetDetail = event.data;
      // validate bet action
      if (this.validateBetAction(betDetail)) {
        // update the uncfmBetDetails
        for (const detail of this.uncfmBetDetails) {
          if (detail.field === betDetail.field) {
            detail.amount += betDetail.amount;
            break;
          }
        }
        // update the corresponding table grid
        this.mapping[betDetail.field].addUncfmBet(betDetail.amount);
      }
    }

    protected validateBet(): boolean {
      const fieldAmounts = utils.arrayToKeyValue(this.uncfmBetDetails, 'field', 'amount');
      return this.validateFieldAmounts(fieldAmounts);
    }

    // check if the current unconfirmed betDetails are valid
    protected validateFieldAmounts(fieldAmounts: {}): boolean {
      const betLimit: BetLimit = env.betLimits[env.currentSelectedBetLimitIndex];

      // TODO: check balance

      // check betlimit

      return true;
    }

    // check if the current bet action is valid
    protected validateBetAction(betDetail: BetDetail): boolean {
      const fieldAmounts = utils.arrayToKeyValue(this.uncfmBetDetails, 'field', 'amount');
      fieldAmounts[betDetail.field] += betDetail.amount;
      return this.validateFieldAmounts(fieldAmounts);
    }

    protected resetUnconfirmedBet() {
      this.uncfmBetDetails = [
        { field: enums.baccarat.BetField.BANKER, amount: 0 },
        { field: enums.baccarat.BetField.PLAYER, amount: 0 },
        { field: enums.baccarat.BetField.TIE, amount: 0 },
        { field: enums.baccarat.BetField.BANKER_PAIR, amount: 0 },
        { field: enums.baccarat.BetField.PLAYER_PAIR, amount: 0 },
      ];
    }
    public cancelBet() {
      this.resetUnconfirmedBet();
      this.gridTie.cancelBet();
      this.gridBanker.cancelBet();
      this.gridPlayer.cancelBet();
      this.gridPlayerPair.cancelBet();
      this.gridBankerPair.cancelBet();
      this.gridSuperSix.cancelBet();
    }
    public onChangeLang() {
      this.changeLang();
    }
  }
}
