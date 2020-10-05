namespace we {
  export namespace lo {
    export class LoAnalysisList extends core.BaseEUI implements eui.UIComponent {
      protected list: eui.ListBase;
      public collection: eui.ArrayCollection;
      private renderType: number; // 0 for show, 1 for no show, 2 for hot, 3 for cold
      protected rowCount: number;
      protected items: any[];
      protected prefixLabel: ui.RunTimeLabel;
      protected countLabel: ui.RunTimeLabel;
      protected suffixLabel: ui.RunTimeLabel;
      protected bg: ui.RoundRectShape;

      public constructor(renderType: number, rowCount: number, skin: string = null, orientationDependent: boolean = true) {
        super(skin, orientationDependent);
        this.renderType = renderType;
        this.rowCount = rowCount;
        this.collection = new eui.ArrayCollection([
          { item: 'text1' },
          { item: 'text2' },
          { item: 'text3' },
          { item: 'text4' },
          { item: 'text5' },
          { item: 'text6' },
          { item: 'text7' },
          { item: 'text8' },
          { item: 'text9' },
          { item: 'text10' },
        ]);
        this.bg = new ui.RoundRectShape();
        this.addChild(this.bg);
        this.initContent();
      }

      protected childrenCreated(): void {
        super.childrenCreated();
        // this.initContent();
      }

      protected initContent() {
        this.prefixLabel = new ui.RunTimeLabel();
        this.prefixLabel.y = 11;
        this.prefixLabel.x = 12;
        this.prefixLabel.size = 20;
        this.addChild(this.prefixLabel);

        this.countLabel = new ui.RunTimeLabel();
        this.countLabel.fontFamily = 'Barlow';
        this.countLabel.y = 11;
        this.countLabel.x = 61;
        this.countLabel.size = 24;
        this.countLabel.textColor = 0xc59466;
        this.countLabel.text = '0';
        this.addChild(this.countLabel);

        this.suffixLabel = new ui.RunTimeLabel();
        this.suffixLabel.y = 11;
        this.suffixLabel.x = 82;
        this.suffixLabel.size = 20;
        this.addChild(this.suffixLabel);

        this.list = new eui.ListBase();
        this.list.x = 12;
        this.list.y = 42;

        this.list.itemRenderer = LoAnalysisListItem;
        this.list.dataProvider = this.collection;

        const layout = new eui.TileLayout();
        layout.verticalGap = 10;
        layout.horizontalGap = 12;
        layout.orientation = eui.TileOrientation.COLUMNS;
        layout.requestedRowCount = this.rowCount;
        this.list.layout = layout;

        this.addChild(this.list);
        this.changeLang();
      }

      public changeLang() {
        // this.gameIdLabel.text = i18n.t('baccarat.gameroundid') + ' ' + this.gameId;
        if (this.renderType === 0) {
          this.prefixLabel.text = '連出';
        } else if (this.renderType === 1) {
          this.prefixLabel.text = '連不出';
        } else if (this.renderType === 2) {
          this.prefixLabel.text = '出';
        } else if (this.renderType === 3) {
          this.prefixLabel.text = '不出';
        }
        this.suffixLabel.text = '期'; // i18n.t('baccarat.player');

        this.countLabel.x = this.prefixLabel.x + this.prefixLabel.textWidth + 8;
        this.suffixLabel.x = this.countLabel.x + this.countLabel.textWidth + 8;
      }

      public update(input: any) {
        this.countLabel.text = input.Count + '';
        const data = input.Data;
        const rslt = [];

        data.forEach(element => {
          rslt.push({ item: element });
        });
        this.collection.replaceAll(rslt);

        const w = 12 + Math.ceil(rslt.length / this.rowCount) * (130 + 12);
        if (this.rowCount === 3) {
          this.bg.width = w;
          this.bg.height = 183;
          this.bg.setRoundRectStyle(w, 183, { tl: 12, tr: 12, br: 12, bl: 12 }, '0x0e1621', 1, 0);
        } else {
          this.bg.width = w;
          this.bg.height = 264;
          this.bg.setRoundRectStyle(w, 264, { tl: 12, tr: 12, br: 12, bl: 12 }, '0x000d1d', 0.9, 0);
        }
      }
      protected destroy() {}
    }
  }
}
