namespace we {
  export namespace lo {
    export class LoSidePanel extends ui.Panel implements we.ui.ILobbyRoad {
      protected beadRoadGrid: egret.Shape;
      protected roadmapData: any;

      public roadGridSize: number;
      public roadCol: number;
      public roadRow: number;
      public roadIndentX: number;
      public roadIndentY: number;
      public roadOffsetX: number;
      public roadOffsetY: number;
      public roadEmptyColor: number;
      public roadEmptyAlpha: number;
      public roadScale: number;

      public dtBigRoad: LoDtBigRoad;
      public sizeBigRoad: LoSizeBigRoad;
      public oddBigRoad: LoOddBigRoad;

      protected road1Btn: eui.RadioButton;
      protected road2Btn: eui.RadioButton;
      protected road3Btn: eui.RadioButton;

      protected gameId: string;

      protected activeLine: egret.Shape;
      protected roadStack: eui.ViewStack;

      protected road1Index: number;
      protected road2Index: number;
      protected road3Index: number;

      protected road1PageNum: number;
      protected road1NextBtn: eui.Image;
      protected road1BackBtn: eui.Image;

      protected road2PageNum: number;
      protected road2NextBtn: eui.Image;
      protected road2BackBtn: eui.Image;

      protected road3PageNum: number;
      protected road3NextBtn: eui.Image;
      protected road3BackBtn: eui.Image;

      protected dtRoadNames: string[] = ['dt1v2', 'dt1v3', 'dt1v4', 'dt1v5', 'dt2v3', 'dt2v4', 'dt2v5', 'dt3v4', 'dt3v5', 'dt4v5'];

      public constructor(skin?: string) {
        super(skin ? skin : env.isMobile ? '' : 'LoSidePanel');
      }

      public drawGridBg(width: number, height: number) {
        this.beadRoadGrid.graphics.beginFill(0x1c1c1e, 1);
        this.beadRoadGrid.graphics.lineStyle(1, 0xafafaf, 1, true);
        RoundRect.drawRoundRect(this.beadRoadGrid.graphics, 0, 0, width, height, { tl: 0, tr: 0, bl: 8, br: 8 });
        this.beadRoadGrid.graphics.endFill();
      }

      public updateRoadData(roadmapData: data.RoadmapData) {
        if (roadmapData) {
          this.roadmapData = roadmapData;
          this.road1Change(this.road1Index);
          this.road2Change(this.road2Index);
          this.road3Change(this.road3Index);
        }
      }

      public updateLobbyRoadData(roadmapData: data.RoadmapData) {
        this.updateRoadData(roadmapData);
      }

      public updateSideBarRoadData(roadmapData: data.RoadmapData) {
        this.updateRoadData(roadmapData);
      }

      public changeLang() {
        this.road1Btn['labelDisplayDown']['text'] = this.road1Btn['labelDisplayUp']['text'] = 'B/S';
        this.road2Btn['labelDisplayDown']['text'] = this.road2Btn['labelDisplayUp']['text'] = 'O/E';
        this.road3Btn['labelDisplayDown']['text'] = this.road3Btn['labelDisplayUp']['text'] = 'DT';

        for (let i = 1; i <= 5; i++) {
          this['road1Btn' + i]['labelDisplayDown']['text'] = this['road1Btn' + i]['labelDisplayUp']['text'] = 'Ball ' + i;
        }

        for (let i = 1; i <= 5; i++) {
          this['road2Btn' + i]['labelDisplayDown']['text'] = this['road2Btn' + i]['labelDisplayUp']['text'] = 'Ball ' + i;
        }

        let c = 0;
        for (let i = 1; i < 5; i++) {
          for (let j = i + 1; j <= 5; j++) {
            c++;
            this['road3Btn' + c]['labelDisplayDown']['text'] = this['road3Btn' + c]['labelDisplayUp']['text'] = i + ' VS ' + j;
          }
        }
        // this.updateActiveLine(false);
      }
      protected childrenCreated() {
        super.childrenCreated();
        this.init();
      }
      protected init() {
        // grid bg rectangle
        this.beadRoadGrid = new egret.Shape();
        this.addChild(this.beadRoadGrid);

        this.road1Index = this.road2Index = this.road3Index = 0;

        this.dtBigRoad = new LoDtBigRoad(16, 20);
        this.dtBigRoad.touchEnabled = false;
        this.dtBigRoad.touchChildren = false;
        this.dtBigRoad.x = 1;
        this.dtBigRoad.scaleX = 334 / 320;
        this.dtBigRoad.scaleY = 126 / 120;

        this.sizeBigRoad = new LoSizeBigRoad(16, 20);
        this.sizeBigRoad.touchEnabled = false;
        this.sizeBigRoad.touchChildren = false;
        this.sizeBigRoad.x = 1;
        this.sizeBigRoad.scaleX = 334 / 320;
        this.sizeBigRoad.scaleY = 126 / 120;

        this.oddBigRoad = new LoOddBigRoad(16, 20);
        this.oddBigRoad.touchEnabled = false;
        this.oddBigRoad.touchChildren = false;
        this.oddBigRoad.x = 1;
        this.oddBigRoad.scaleX = 334 / 320;
        this.oddBigRoad.scaleY = 126 / 120;

        // add road to road stack 1
        const road1Group = this.roadStack.getChildAt(0) as eui.Group;
        road1Group.addChildAt(this.sizeBigRoad, 0);

        // add road to road stack 2
        const road2Group = this.roadStack.getChildAt(1) as eui.Group;
        road2Group.addChildAt(this.oddBigRoad, 0);

        // add road to road stack 3
        const road3Group = this.roadStack.getChildAt(2) as eui.Group;
        road3Group.addChildAt(this.dtBigRoad, 0);

        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        // this.pageRadioBtn1.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);

        // (this.radioBtn1 as any).buttonImage.width = (this.radioBtn1 as any).labelDisplay.textWidth + 10;

        this.road1Btn.addEventListener(eui.UIEvent.CHANGE, this.onRoadChange, this);
        this.road2Btn.addEventListener(eui.UIEvent.CHANGE, this.onRoadChange, this);
        this.road3Btn.addEventListener(eui.UIEvent.CHANGE, this.onRoadChange, this);

        for (let i = 1; i <= 5; i++) {
          this['road1Btn' + i].addEventListener(eui.UIEvent.CHANGE, this.onRoad1IndexChange, this);
        }

        for (let i = 1; i <= 5; i++) {
          this['road2Btn' + i].addEventListener(eui.UIEvent.CHANGE, this.onRoad2IndexChange, this);
        }

        for (let i = 1; i <= 10; i++) {
          this['road3Btn' + i].addEventListener(eui.UIEvent.CHANGE, this.onRoad3IndexChange, this);
        }

        this.road1NextBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.road1NextClick, this);
        this.road1BackBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.road1BackClick, this);
        this.road2NextBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.road2NextClick, this);
        this.road2BackBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.road2BackClick, this);
        this.road3NextBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.road3NextClick, this);
        this.road3BackBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.road3BackClick, this);

        this.road1Change(this.road1Index);
        this.road2Change(this.road2Index);
        this.road3Change(this.road3Index);

        this.setRoad1PageNum(0);
        this.setRoad2PageNum(0);
        this.setRoad3PageNum(0);
        this.changeLang();
      }

      protected road1NextClick(e: egret.TouchEvent) {
        if (this.road1PageNum < 1) {
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
        if (this.road1PageNum == 0) {
          this.road1NextBtn.visible = true;
          this.road1BackBtn.visible = false;
        } else {
          this.road1NextBtn.visible = false;
          this.road1BackBtn.visible = true;
        }

        const itemPerPage = 3;
        const numBtn = 5;
        for (let i = 0; i < numBtn; i++) {
          const page = Math.floor(i / itemPerPage);
          // check if same page
          this['road1Btn' + (i + 1)].includeInLayout = this['road1Btn' + (i + 1)].visible = page === n;
        }
      }

      protected road2NextClick(e: egret.TouchEvent) {
        if (this.road2PageNum < 1) {
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
        if (this.road2PageNum == 0) {
          this.road2NextBtn.visible = true;
          this.road2BackBtn.visible = false;
        } else {
          this.road2NextBtn.visible = false;
          this.road2BackBtn.visible = true;
        }

        const itemPerPage = 3;
        const numBtn = 5;
        for (let i = 0; i < numBtn; i++) {
          const page = Math.floor(i / itemPerPage);
          // check if same page
          this['road2Btn' + (i + 1)].includeInLayout = this['road2Btn' + (i + 1)].visible = page === n;
        }
      }

      protected road3NextClick(e: egret.TouchEvent) {
        if (this.road3PageNum < 3) {
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
        if (this.road3PageNum <= 0) {
          this.road3NextBtn.visible = true;
          this.road3BackBtn.visible = false;
        } else if (this.road3PageNum >= 3) {
          this.road3NextBtn.visible = false;
          this.road3BackBtn.visible = true;
        } else {
          this.road3NextBtn.visible = true;
          this.road3BackBtn.visible = true;
        }

        const itemPerPage = 3;
        const numBtn = 10;
        for (let i = 0; i < numBtn; i++) {
          const page = Math.floor(i / itemPerPage);
          // check if same page
          this['road3Btn' + (i + 1)].includeInLayout = this['road3Btn' + (i + 1)].visible = page === n;
        }
      }

      protected onRoad1IndexChange(e: eui.UIEvent) {
        const radio: eui.RadioButton = e.target;
        this.road1Change(radio.value);
      }
      protected onRoad2IndexChange(e: eui.UIEvent) {
        const radio: eui.RadioButton = e.target;
        this.road2Change(radio.value);
      }
      protected onRoad3IndexChange(e: eui.UIEvent) {
        const radio: eui.RadioButton = e.target;
        this.road3Change(radio.value);
      }

      protected onRoadChange(e: eui.UIEvent) {
        const radio: eui.RadioButton = e.target;
        const index = radio.value - 0;
        this.roadStack.selectedIndex = index;
      }

      protected road1Change(i: number) {
        this.road1Index = i - 0;
        if (this.roadmapData) {
          if (this.sizeBigRoad) {
            this.sizeBigRoad.parseRoadData(this.roadmapData.lobbyUnPro['size' + (this.road1Index + 1)]);
          }
        }
      }

      protected road2Change(i: number) {
        this.road2Index = i - 0;
        if (this.roadmapData) {
          if (this.oddBigRoad) {
            this.oddBigRoad.parseRoadData(this.roadmapData.lobbyUnPro['odd' + (this.road2Index + 1)]);
          }
        }
      }

      protected road3Change(i: number) {
        this.road3Index = i - 0;
        if (this.roadmapData) {
          if (this.dtBigRoad) {
            this.dtBigRoad.parseRoadData(this.roadmapData.lobbyUnPro[this.dtRoadNames[this.road3Index]]);
          }
        }
      }

      public destroy() {
        super.destroy();

        // this.pageRadioBtn1.removeEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);

        this.dtBigRoad.dispose();
        this.sizeBigRoad.dispose();
        this.oddBigRoad.dispose();
        // egret.Tween.removeTweens(this.activeLine);
        if (dir.evtHandler.hasEventListener(core.Event.SWITCH_LANGUAGE)) {
          dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        }

        if (this.road1Btn.hasEventListener(eui.UIEvent.CHANGE)) {
          this.road1Btn.removeEventListener(eui.UIEvent.CHANGE, this.onRoadChange, this);
          this.road2Btn.removeEventListener(eui.UIEvent.CHANGE, this.onRoadChange, this);
          this.road3Btn.removeEventListener(eui.UIEvent.CHANGE, this.onRoadChange, this);

          for (let i = 1; i <= 5; i++) {
            this['road1Btn' + i].removeEventListener(eui.UIEvent.CHANGE, this.onRoad1IndexChange, this);
          }

          for (let i = 1; i <= 5; i++) {
            this['road2Btn' + i].removeEventListener(eui.UIEvent.CHANGE, this.onRoad2IndexChange, this);
          }

          for (let i = 1; i <= 10; i++) {
            this['road3Btn' + i].removeEventListener(eui.UIEvent.CHANGE, this.onRoad3IndexChange, this);
          }

          this.road1NextBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.road1NextClick, this);
          this.road1BackBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.road1BackClick, this);
          this.road2NextBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.road2NextClick, this);
          this.road2BackBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.road2BackClick, this);
          this.road3NextBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.road3NextClick, this);
          this.road3BackBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.road3BackClick, this);
        }
      }
    }
  }
}
