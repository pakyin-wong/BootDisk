namespace components {
  export class BettingTable extends eui.Component {
    private imgPlayerPair: eui.Component;
    private imgBankerPair: eui.Component;
    private imgPlayerNormal: eui.Component;
    private imgTieNormal: eui.Component;
    private imgBankerNormal: eui.Component;

    private mapping: {};

    constructor() {
      super();
      this.skinName = 'resource/skin_desktop/BettingTable.exml';
    }

    protected childrenCreated() {
      this.changeMethod('normal');
      this.changeLang('zh-cn');
    }

    private setupGrid(
      container: eui.Component,
      border: number,
      textColor: number,
      bgColor: number
    ) {
      // container.removeChildren();
      console.log('setupGrid');
      let grid = this.getGridChild(container);
      grid = grid ? grid : new BettingTableGrid();

      grid.setSize(container.width, container.height);
      grid.setStyle(border, textColor, bgColor);
      container.addChild(grid);
    }

    protected setupGridListener(grid: eui.Component) {}

    protected changeMethod(method: string) {
      switch (method) {
        default:
          this.setupGrid(this.imgPlayerPair, 10, 0xffffff, 0x000000);
          this.setupGrid(this.imgBankerPair, 10, 0xffffff, 0x000000);
          this.setupGrid(this.imgPlayerNormal, 10, 0xffffff, 0x000000);
          this.setupGrid(this.imgBankerNormal, 10, 0xffffff, 0x000000);
          this.setupGrid(this.imgTieNormal, 10, 0xffffff, 0x000000);
      }
    }

    protected changeLang(lang: string) {
      switch (utils.getLang(lang)) {
        case enums.lang.CN:
          console.log(lang);
          this.getGridChild(this.imgPlayerPair).text = '閒對';
          this.getGridChild(this.imgBankerPair).text = '莊對';
          this.getGridChild(this.imgPlayerNormal).text = '閒';
          this.getGridChild(this.imgTieNormal).text = '和';
          this.getGridChild(this.imgBankerNormal).text = '莊';

          break;

        case enums.lang.EN:
          this.getGridChild(this.imgPlayerPair).text = 'Player Pair';
          this.getGridChild(this.imgBankerPair).text = 'Banker Pair';
          this.getGridChild(this.imgPlayerNormal).text = 'Player';
          this.getGridChild(this.imgTieNormal).text = 'Tie';
          this.getGridChild(this.imgBankerNormal).text = 'Banker';
          break;
      }
    }

    protected getGridChild(grid: eui.Component) {
      let child: BettingTableGrid;
      try {
        child = grid.getChildAt(0) as BettingTableGrid;
      } catch (e) {
        return undefined;
      }
      return child;
    }
  }
}
