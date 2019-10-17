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

    private mapping: {};

    constructor() {
      super();
      this.skinName = utils.getSkin('BettingTable');
    }

    protected childrenCreated() {
      this.changeMethod('normal');
      this.changeLang('zh-cn');
      this.switchSuperSix.addEventListener(
        egret.Event.CHANGE,
        () => {
          this.invalidateState();
        },
        this
      );
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

    protected changeLang(lang: string) {
      switch (utils.getLang(lang)) {
        case enums.lang.CN:
          console.log(lang);
          this.gridPlayerPair.text = '閒對';
          this.gridBankerPair.text = '莊對';
          this.gridPlayer.text = '閒';
          this.gridTie.text = '和';
          this.gridSuperSix.text = '超級六';
          this.gridBanker.text = '莊';
          this.lblNoComm.text = '免佣';

          break;

        case enums.lang.EN:
          this.gridPlayerPair.text = 'Player Pair';
          this.gridBankerPair.text = 'Banker Pair';
          this.gridPlayer.text = 'Player';
          this.gridTie.text = 'Tie';
          this.gridSuperSix.text = 'Super Six';
          this.gridBanker.text = 'Banker';
          this.lblNoComm.text = 'No Comission';
          break;
      }
    }
    public cancelBet() {
      this.gridTie.cancelBet();
      this.gridBanker.cancelBet();
      this.gridPlayer.cancelBet();
      this.gridPlayerPair.cancelBet();
      this.gridBankerPair.cancelBet();
      this.gridSuperSix.cancelBet();
    }

    public onTableInfoUpdate(tableInfo: TableInfo) {
      // if game cancelled or modified, please do something here
    }
  }
}
