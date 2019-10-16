
namespace components {
  export class BettingTable extends eui.Component {
    private imgPlayerPair: components.BettingTableGrid;
    private imgBankerPair: components.BettingTableGrid;
    private imgPlayerNormal: components.BettingTableGrid;
    private imgTieNormal: components.BettingTableGrid;
    private imgBankerNormal: components.BettingTableGrid;

    private mapping: {};

    constructor() {
      super();
      this.skinName = utils.getSkin('BettingTable');
    }

    protected childrenCreated() {
      this.changeMethod('normal');
      this.changeLang('zh-cn');
    }

    protected setupGridListener(grid: eui.Component) {}

    protected changeMethod(method: string) {
      switch (method) {
        default:
          const border = 10;
          const textColor = 0xffffff;
          const bgColor = 0x000000;

          this.imgPlayerPair.setStyle(border, textColor, bgColor);
          this.imgBankerPair.setStyle(border, textColor, bgColor);
          this.imgPlayerNormal.setStyle(border, textColor, bgColor);
          this.imgBankerNormal.setStyle(border, textColor, bgColor);
          this.imgTieNormal.setStyle(border, textColor, bgColor);
      }
    }

    protected changeLang(lang: string) {
      switch (utils.getLang(lang)) {
        case enums.lang.CN:
          console.log(lang);
          this.imgPlayerPair.text = '閒對';
          this.imgBankerPair.text = '莊對';
          this.imgPlayerNormal.text = '閒';
          this.imgTieNormal.text = '和';
          this.imgBankerNormal.text = '莊';

          break;

        case enums.lang.EN:
          this.imgPlayerPair.text = 'Player Pair';
          this.imgBankerPair.text = 'Banker Pair';
          this.imgPlayerNormal.text = 'Player';
          this.imgTieNormal.text = 'Tie';
          this.imgBankerNormal.text = 'Banker';
          break;
      }
    }
  }
}
