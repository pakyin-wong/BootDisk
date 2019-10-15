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
      container.removeChildren();
      const grid = new BettingTableGrid();
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
          this.setGridText(this.imgPlayerPair, '閒對');
          this.setGridText(this.imgBankerPair, '莊對');
          this.setGridText(this.imgPlayerNormal, '閒');
          this.setGridText(this.imgTieNormal, '和');
          this.setGridText(this.imgBankerNormal, '莊');

          break;

        case enums.lang.EN:
          this.setGridText(this.imgPlayerPair, 'Player Pair');
          this.setGridText(this.imgBankerPair, 'Banker Pair');
          this.setGridText(this.imgPlayerNormal, 'Player');
          this.setGridText(this.imgTieNormal, 'Tie');
          this.setGridText(this.imgBankerNormal, 'Banker');
          break;
      }
    }

    protected setGridText(grid: eui.Component, text: string) {
      const child = grid.getChildAt(0) as BettingTableGrid;
      child.text = text;
    }
  }
}
