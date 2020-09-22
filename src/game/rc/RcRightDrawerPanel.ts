namespace we {
  export namespace rc {
    export class RcRightDrawerPanel extends lo.LoRightDrawerPanel {

      public constructor(skin?: string) {
        super(skin ? skin : env.isMobile ? '' : 'RcRightDrawerPanel');
      }

      public changeLang() {
        this.roadmapBtn.label.renderText = () => 'Roadmap'; // `${i18n.t('baccarat.noCommission')}`;
        this.analysisBtn.label.renderText = () => 'Analysis';
        this.chartBtn.label.renderText = () => 'Chart';

        this.roadmapBtn.label.top = 0;
        this.roadmapBtn.label.bottom = 0;
        this.roadmapBtn.label.left = 8;
        this.roadmapBtn.label.width = 134 - 16;
        this.roadmapBtn.label.targetWidth = 134 - 16;
        this.roadmapBtn.label.size = 24;

        this.analysisBtn.label.top = 0;
        this.analysisBtn.label.bottom = 0;
        this.analysisBtn.label.left = 8;
        this.analysisBtn.label.width = 134 - 16;
        this.analysisBtn.label.targetWidth = 134 - 16;
        this.analysisBtn.label.size = 24;

        this.chartBtn.label.top = 0;
        this.chartBtn.label.bottom = 0;
        this.chartBtn.label.left = 8;
        this.chartBtn.label.width = 134 - 16;
        this.chartBtn.label.targetWidth = 134 - 16;
        this.chartBtn.label.size = 24;

        this.road1Btn['labelDisplayDown']['text'] = this.road1Btn['labelDisplayUp']['text'] = 'B/S';
        this.road2Btn['labelDisplayDown']['text'] = this.road2Btn['labelDisplayUp']['text'] = 'O/E';
        this.road3Btn['labelDisplayDown']['text'] = this.road3Btn['labelDisplayUp']['text'] = 'DT';

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

        this.chart1Btn['labelDisplayDown']['text'] = this.chart1Btn['labelDisplayUp']['text'] = 'L.Time';
        this.chart2Btn['labelDisplayDown']['text'] = this.chart2Btn['labelDisplayUp']['text'] = 'L.Game';
        this.chart3Btn['labelDisplayDown']['text'] = this.chart3Btn['labelDisplayUp']['text'] = 'Fav.Bet';
        this.chart4Btn['labelDisplayDown']['text'] = this.chart4Btn['labelDisplayUp']['text'] = 'Fav.Game';

        this.chartPeriodBtn1['labelDisplayDown']['text'] = this.chartPeriodBtn1['labelDisplayUp']['text'] = 'Day';
        this.chartPeriodBtn2['labelDisplayDown']['text'] = this.chartPeriodBtn2['labelDisplayUp']['text'] = 'pDay';
        this.chartPeriodBtn3['labelDisplayDown']['text'] = this.chartPeriodBtn3['labelDisplayUp']['text'] = 'Week';
        this.chartPeriodBtn4['labelDisplayDown']['text'] = this.chartPeriodBtn4['labelDisplayUp']['text'] = 'pWeek';
        this.chartPeriodBtn5['labelDisplayDown']['text'] = this.chartPeriodBtn5['labelDisplayUp']['text'] = 'Mon';
        this.chartPeriodBtn6['labelDisplayDown']['text'] = this.chartPeriodBtn6['labelDisplayUp']['text'] = 'pMon';
      }

      protected init() {
        super.init();

      }

      public destroy() {
        super.destroy();
      }
    }
  }
}
