namespace we {
  export namespace rc {
    export class RcLeftPanel extends lo.LoLeftPanel {

      public constructor(skin?: string) {
        super(skin ? skin : env.isMobile ? '' : 'RcLeftPanel');
      }

      public changeLang() {
        this._btn_roadmap.label.text = 'Roadmap';
        this._btn_analysis.label.text = 'Analysis';

        this.gameIdLabel.text = i18n.t('baccarat.gameroundid') + ' ' + this.gameId;

        for (let i = 1; i <= 10; i++) {
          this['road1Btn' + i]['labelDisplayDown']['text'] = this['road1Btn' + i]['labelDisplayUp']['text'] = 'Ball ' + i;
        }

        for (let i = 1; i <= 10; i++) {
          this['road2Btn' + i]['labelDisplayDown']['text'] = this['road2Btn' + i]['labelDisplayUp']['text'] = 'Ball ' + i;
        }

        let c = 0;
        for (let i = 1; i < 10; i++) {
          for (let j = i + 1; j <= 10; j++) {
            c++;
            this['road3Btn' + c]['labelDisplayDown']['text'] = this['road3Btn' + c]['labelDisplayUp']['text'] = i + ' VS ' + j;
          }
        }

        this.analysisBtn1['labelDisplayDown']['text'] = this.analysisBtn1['labelDisplayUp']['text'] = 'Show';
        this.analysisBtn2['labelDisplayDown']['text'] = this.analysisBtn2['labelDisplayUp']['text'] = 'NoShow';
        this.analysisBtn3['labelDisplayDown']['text'] = this.analysisBtn3['labelDisplayUp']['text'] = 'Hot';
        this.analysisBtn4['labelDisplayDown']['text'] = this.analysisBtn4['labelDisplayUp']['text'] = 'Cold';

        // this.updateActiveLine(false);
      }


      protected init() {
        super.init();

        for (let i = 6; i <= 10; i++) {
          this['road1Btn' + i].addEventListener(eui.UIEvent.CHANGE, this.onRoad1IndexChange, this);
        }

        for (let i = 6; i <= 10; i++) {
          this['road2Btn' + i].addEventListener(eui.UIEvent.CHANGE, this.onRoad2IndexChange, this);
        }

        for (let i = 11; i <= 45; i++) {
          this['road3Btn' + i].addEventListener(eui.UIEvent.CHANGE, this.onRoad3IndexChange, this);
        }
      }



      protected setRoad3PageNum(n: number) {
        this.road3PageNum = n;
        if (this.road3PageNum == 0) {
          this.road3NextBtn.visible = true;
          this.road3BackBtn.visible = false;
        } else {
          this.road3NextBtn.visible = false;
          this.road3BackBtn.visible = true;
        }

        const itemPerPage = 5;
        const numBtn = 10;
        for (let i = 0; i < numBtn; i++) {
          const page = Math.floor(i / itemPerPage);
          // check if same page
          this['road3Btn' + (i + 1)].includeInLayout = this['road3Btn' + (i + 1)].visible = page === n;
        }
      }

      public destroy() {
        super.destroy();

        if (this["road1Btn6"].hasEventListener(eui.UIEvent.CHANGE)) {
          for (let i = 6; i <= 10; i++) {
            this['road1Btn' + i].removeEventListener(eui.UIEvent.CHANGE, this.onRoad1IndexChange, this);
          }

          for (let i = 6; i <= 10; i++) {
            this['road2Btn' + i].removeEventListener(eui.UIEvent.CHANGE, this.onRoad2IndexChange, this);
          }

          for (let i = 11; i <= 45; i++) {
            this['road3Btn' + i].removeEventListener(eui.UIEvent.CHANGE, this.onRoad3IndexChange, this);
          }
        }
      }
    }
  }
}
