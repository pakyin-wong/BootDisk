namespace we {
  export namespace rc {
    export class RcRightDrawerPanel extends lo.LoRightDrawerPanel {
      protected road1PageNum: number;
      protected road1NextBtn: eui.Image;
      protected road1BackBtn: eui.Image;

      protected road2PageNum: number;
      protected road2NextBtn: eui.Image;
      protected road2BackBtn: eui.Image;
      protected dtRoadNames: string[] = [
        'dt1v2',
        'dt1v3',
        'dt1v4',
        'dt1v5',
        'dt1v6',
        'dt1v7',
        'dt1v8',
        'dt1v9',
        'dt1v10',
        'dt2v3',
        'dt2v4',
        'dt2v5',
        'dt2v6',
        'dt2v7',
        'dt2v8',
        'dt2v9',
        'dt2v10',
        'dt3v4',
        'dt3v5',
        'dt3v6',
        'dt3v7',
        'dt3v8',
        'dt3v9',
        'dt3v10',
        'dt4v5',
        'dt4v6',
        'dt4v7',
        'dt4v8',
        'dt4v9',
        'dt4v10',
        'dt5v6',
        'dt5v7',
        'dt5v8',
        'dt5v9',
        'dt5v10',
        'dt6v7',
        'dt6v8',
        'dt6v9',
        'dt6v10',
        'dt7v8',
        'dt7v9',
        'dt7v10',
        'dt8v9',
        'dt8v10',
        'dt9v10',
      ];

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

        for (let i = 6; i <= 10; i++) {
          this['road1Btn' + i].addEventListener(eui.UIEvent.CHANGE, this.onRoad1IndexChange, this);
        }

        for (let i = 6; i <= 10; i++) {
          this['road2Btn' + i].addEventListener(eui.UIEvent.CHANGE, this.onRoad2IndexChange, this);
        }

        for (let i = 11; i <= 45; i++) {
          this['road3Btn' + i].addEventListener(eui.UIEvent.CHANGE, this.onRoad3IndexChange, this);
        }

        this.road1NextBtn.touchEnabled = true;
        this.road1NextBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRoad1NextBtnClick, this);

        this.road1BackBtn.touchEnabled = true;
        this.road1BackBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRoad1BackBtnClick, this);

        this.road2NextBtn.touchEnabled = true;
        this.road2NextBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRoad2NextBtnClick, this);

        this.road2BackBtn.touchEnabled = true;
        this.road2BackBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRoad2BackBtnClick, this);

        this.setRoad1PageNum(0);
        this.setRoad2PageNum(0);
      }
      protected onRoad1NextBtnClick(e: egret.TouchEvent) {
        if (this.road1PageNum === 0) {
          this.setRoad1PageNum(++this.road1PageNum);
        }
      }

      protected onRoad1BackBtnClick(e: egret.TouchEvent) {
        if (this.road1PageNum > 0) {
          this.setRoad1PageNum(--this.road1PageNum);
        }
      }
      protected onRoad2NextBtnClick(e: egret.TouchEvent) {
        if (this.road2PageNum === 0) {
          this.setRoad2PageNum(++this.road2PageNum);
        }
      }

      protected onRoad2BackBtnClick(e: egret.TouchEvent) {
        if (this.road2PageNum > 0) {
          this.setRoad2PageNum(--this.road2PageNum);
        }
      }
      protected onRoad3NextBtnClick(e: egret.TouchEvent) {
        if (this.road3PageNum < 8) {
          this.setRoad3PageNum(++this.road3PageNum);
        }
      }

      protected onRoad3BackBtnClick(e: egret.TouchEvent) {
        if (this.road3PageNum > 0) {
          this.setRoad3PageNum(--this.road3PageNum);
        }
      }

      protected setRoad1PageNum(n: number) {
        this.road1PageNum = n;
        if (this.road1PageNum == 0) {
          this.road1NextBtn.visible = true;
          this.road1BackBtn.visible = false;
        } else {
          this.road1NextBtn.visible = false;
          this.road1BackBtn.visible = true;
        }

        const itemPerPage = 6;
        const numBtn = 10;
        for (let i = 0; i < numBtn; i++) {
          const page = Math.floor(i / itemPerPage);
          // check if same page
          this['road1Btn' + (i + 1)].includeInLayout = this['road1Btn' + (i + 1)].visible = page === n;
        }
      }

      protected setRoad2PageNum(n: number) {
        this.road2PageNum = n;
        if (this.road2PageNum == 0) {
          this.road2NextBtn.visible = true;
          this.road2BackBtn.visible = false;
        } else {
          this.road2NextBtn.visible = false;
          this.road2BackBtn.visible = true;
        }

        const itemPerPage = 6;
        const numBtn = 10;
        for (let i = 0; i < numBtn; i++) {
          const page = Math.floor(i / itemPerPage);
          // check if same page
          this['road2Btn' + (i + 1)].includeInLayout = this['road2Btn' + (i + 1)].visible = page === n;
        }
      }

      protected setRoad3PageNum(n: number) {
        this.road3PageNum = n;
        if (this.road3PageNum == 0) {
          this.road3NextBtn.visible = true;
          this.road3BackBtn.visible = false;
        } else if (this.road3PageNum === 8) {
          this.road3NextBtn.visible = false;
          this.road3BackBtn.visible = true;
        } else {
          this.road3NextBtn.visible = true;
          this.road3BackBtn.visible = true;
        }

        const itemPerPage = 6;
        const numBtn = 45;
        for (let i = 0; i < numBtn; i++) {
          const page = Math.floor(i / itemPerPage);
          // check if same page
          this['road3Btn' + (i + 1)].includeInLayout = this['road3Btn' + (i + 1)].visible = page === n;
        }
      }

      public destroy() {
        super.destroy();
        if (this['road1Btn6'].hasEventListener(eui.UIEvent.CHANGE)) {
          for (let i = 6; i <= 10; i++) {
            this['road1Btn' + i].removeEventListener(eui.UIEvent.CHANGE, this.onRoad1IndexChange, this);
          }

          for (let i = 6; i <= 10; i++) {
            this['road2Btn' + i].removeEventListener(eui.UIEvent.CHANGE, this.onRoad2IndexChange, this);
          }

          for (let i = 11; i <= 45; i++) {
            this['road3Btn' + i].removeEventListener(eui.UIEvent.CHANGE, this.onRoad3IndexChange, this);
          }

          this.road1NextBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRoad1NextBtnClick, this);
          this.road1BackBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRoad1BackBtnClick, this);
          this.road2NextBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRoad2NextBtnClick, this);
          this.road2BackBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRoad2BackBtnClick, this);
        }
      }
    }
  }
}
