namespace we {
  export namespace lo {
    export class LoAnalysisMobileListItem extends ui.ItemRenderer {
      private bg: ui.RoundRectShape;
      private label: ui.RunTimeLabel;
      private renderType: number; // 0 for show, 1 for no show, 2 for hot, 3 for cold

      public constructor(renderType: number) {
        super();
        this.renderType = renderType;

        this.bg = new ui.RoundRectShape();
        this.bg.width = 260;
        this.bg.height = 76;
        this.bg.setRoundRectStyle(260, 76, { tl: 12, tr: 12, bl: 12, br: 12 }, '0x0d3057', 1, 0);

        this.label = new ui.RunTimeLabel();
        this.label.width = 260;
        this.label.height = 76;
        this.label.verticalAlign = 'middle';
        this.label.textAlign = 'center';
        this.label.size = 40;

        this.addChild(this.bg);
        this.addChild(this.label);
      }

      public itemDataChanged() {
        super.itemDataChanged();
        this.skin.minHeight = 76;
        // this.label.text = this.itemData;
        this.changeLang();
      }

      public changeLang() {
        // this.label.text = i18n.t('baccarat.playerPair');
        const dataArr = this.itemData.split('_');
        const data0 = dataArr[0];
        const data1 = dataArr[1];
        const data0Head = data0.substring(0, 2);
        let rslt = this.itemData;

        if (data0.endsWith('SIZEPARITY2')) {
          const s1 = this.getUnitString(data0Head);
          const s2 = data1 === 'BIG' ? '大' : data1 === 'SMALL' ? '小' : data1 === 'ODD' ? '单' : '双';
          rslt = s1 + '位 - ' + s2;
        } else if (data0.endsWith('THREESPECIAL')) {
          const s1 = data0Head === '12' ? '前三' : data1 === '23' ? '中三' : '后三';
          const s2 = data1 === 'SAME' ? '豹子' : data1 === 'ORDER' ? '顺子' : data1 === 'DOUBLE' ? '对子' : data1 === 'HALFORDER' ? '半顺' : '杂六';
          rslt = s1 + ' - ' + s2;
        } else if (data0.endsWith('SUMSIZEPARITY')) {
          const s1 = data1 === 'BIG' ? '大' : data1 === 'SMALL' ? '小' : data1 === 'ODD' ? '单' : '双';
          rslt = '总和 - ' + s1;
        } else if (data0.endsWith('NUM')) {
          const s1 = this.getUnitString(data0Head);
          rslt = s1 + '位 - ' + data1;
        } else if (data0.endsWith('DT2')) {
          const s1 = this.getUnitString(data0.substring(0, 1));
          const s2 = this.getUnitString(data0.substring(1, 2));
          const s3 = data1 === 'DRAGON' ? '龙' : '虎';
          rslt = s1 + s2 + ' - ' + s3;
        } else if (data0.endsWith('INTEREST1SPECIAL')) {
          rslt = '全五中 - ' + data1;
        } else if (data0.endsWith('FIXPOS2')) {
          const s1 = this.getPK10UnitString(data0.substring(0, 2));
          rslt = s1 + ' - ' + data1;
        } else if (data0.indexOf('Ball') === 0) {
          const s1 = this.getUnitString(data0.substring(4));
          rslt = s1 + '位 - ' + data1;
        }
        this.label.text = rslt;

        /*if (i18n.lang === "sc" || i18n.lang === "tc") {

        } else {

        }
        */
      }

      protected getPK10UnitString(input: string): string {
        switch (input) {
          case '1F':
            return '第一名';
          case '2F':
            return '第二名';
          case '3F':
            return '第三名';
          case '4F':
            return '第四名';
          case '5F':
            return '第五名';
          case '6F':
            return '第六名';
          case '7F':
            return '第七名';
          case '8F':
            return '第八名';
          case '9F':
            return '第九名';
          case '10':
            return '第十名';
        }
      }

      protected getUnitString(input: string): string {
        switch (input) {
          case '1':
          case 'MI':
            return '万';
          case '2':
          case 'TH':
            return '千';
          case '3':
          case 'HU':
            return '百';
          case '4':
          case 'TE':
            return '十';
          case '5':
          case 'SI':
            return '个';
        }
      }

      protected endsWith(str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
      }

      protected destroy() {}
    }
  }
}
