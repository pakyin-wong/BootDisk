namespace we {
  export namespace rc {
    export class RcSidePanel extends lo.LoSidePanel {
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
        super(skin ? skin : env.isMobile ? '' : 'RcSidePanel');
      }

      public changeLang() {
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
      protected road1NextClick(e: egret.TouchEvent) {
        if (this.road1PageNum < 3) {
          this.setRoad1PageNum(this.road1PageNum + 1);
        }
      }

      protected road1BackClick(e: egret.TouchEvent) {
        if (this.road1PageNum > 0) {
          this.setRoad1PageNum(this.road1PageNum - 1);
        }
      }

      protected setRoad1PageNum(n: number) {
        this.road1PageNum = n;
        if (this.road1PageNum < 1) {
          this.road1NextBtn.visible = true;
          this.road1BackBtn.visible = false;
        } else if (this.road1PageNum > 2) {
          this.road1NextBtn.visible = false;
          this.road1BackBtn.visible = true;
        } else {
          this.road1NextBtn.visible = true;
          this.road1BackBtn.visible = true;
        }

        const itemPerPage = 3;
        const numBtn = 10;
        for (let i = 0; i < numBtn; i++) {
          const page = Math.floor(i / itemPerPage);
          // check if same page
          this['road1Btn' + (i + 1)].includeInLayout = this['road1Btn' + (i + 1)].visible = page === n;
        }
      }

      protected road2NextClick(e: egret.TouchEvent) {
        if (this.road2PageNum < 3) {
          this.setRoad2PageNum(this.road2PageNum + 1);
        }
      }

      protected road2BackClick(e: egret.TouchEvent) {
        if (this.road2PageNum > 0) {
          this.setRoad2PageNum(this.road2PageNum - 1);
        }
      }

      protected setRoad2PageNum(n: number) {
        this.road2PageNum = n;
        if (this.road2PageNum < 1) {
          this.road2NextBtn.visible = true;
          this.road2BackBtn.visible = false;
        } else if (this.road2PageNum > 2) {
          this.road2NextBtn.visible = false;
          this.road2BackBtn.visible = true;
        } else {
          this.road2NextBtn.visible = true;
          this.road2BackBtn.visible = true;
        }

        const itemPerPage = 3;
        const numBtn = 10;
        for (let i = 0; i < numBtn; i++) {
          const page = Math.floor(i / itemPerPage);
          // check if same page
          this['road2Btn' + (i + 1)].includeInLayout = this['road2Btn' + (i + 1)].visible = page === n;
        }
      }

      protected road3NextClick(e: egret.TouchEvent) {
        if (this.road3PageNum < 14) {
          this.setRoad3PageNum(this.road3PageNum + 1);
        }
      }

      protected road3BackClick(e: egret.TouchEvent) {
        if (this.road3PageNum > 0) {
          this.setRoad3PageNum(this.road3PageNum - 1);
        }
      }

      protected setRoad3PageNum(n: number) {
        this.road3PageNum = n;
        if (this.road3PageNum < 1) {
          this.road3NextBtn.visible = true;
          this.road3BackBtn.visible = false;
        } else if (this.road3PageNum > 13) {
          this.road3NextBtn.visible = false;
          this.road3BackBtn.visible = true;
        } else {
          this.road3NextBtn.visible = true;
          this.road3BackBtn.visible = true;
        }

        const itemPerPage = 3;
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
        }
      }
    }
  }
}
