namespace we {
  export namespace lo {
    export class LoLobbyRoadPanel extends ui.Panel implements we.ui.ILobbyRoad {
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

      protected roadBtn1: ui.RoundRectButton;
      protected roadBtn2: ui.RoundRectButton;
      protected roadBtn3: ui.RoundRectButton;

      protected gameId: string;

      protected road1Btn1: eui.RadioButton;
      protected road1Btn2: eui.RadioButton;
      protected road1Btn3: eui.RadioButton;
      protected road1Btn4: eui.RadioButton;
      protected road1Btn5: eui.RadioButton;

      protected road2Btn1: eui.RadioButton;
      protected road2Btn2: eui.RadioButton;
      protected road2Btn3: eui.RadioButton;
      protected road2Btn4: eui.RadioButton;
      protected road2Btn5: eui.RadioButton;

      protected road3Btn1: eui.RadioButton;
      protected road3Btn2: eui.RadioButton;
      protected road3Btn3: eui.RadioButton;
      protected road3Btn4: eui.RadioButton;
      protected road3Btn5: eui.RadioButton;
      protected road3Btn6: eui.RadioButton;
      protected road3Btn7: eui.RadioButton;
      protected road3Btn8: eui.RadioButton;
      protected road3Btn9: eui.RadioButton;
      protected road3Btn10: eui.RadioButton;

      protected activeLine: egret.Shape;
      protected roadStack: eui.ViewStack;

      protected dtPageNum: number;
      protected dtNextBtn: eui.Image;

      protected road1Index: number;
      protected road2Index: number;
      protected road3Index: number;

      protected dtRoadNames: string[] = ['dt1v2', 'dt1v3', 'dt1v4', 'dt1v5', 'dt2v3', 'dt2v4', 'dt2v5', 'dt3v4', 'dt3v5', 'dt4v5'];

      public constructor(skin?: string) {
        super(skin ? skin : env.isMobile ? '' : 'LoLobbyRoadPanel');
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
        this.roadBtn1.label.text = 'B/S';
        this.roadBtn2.label.text = 'O/E';
        this.roadBtn3.label.text = 'DT';

        this.road1Btn1['labelDisplayDown']['text'] = this.road1Btn1['labelDisplayUp']['text'] = '1st Ball';
        this.road1Btn2['labelDisplayDown']['text'] = this.road1Btn2['labelDisplayUp']['text'] = '2nd Ball';
        this.road1Btn3['labelDisplayDown']['text'] = this.road1Btn3['labelDisplayUp']['text'] = '3rd Ball';
        this.road1Btn4['labelDisplayDown']['text'] = this.road1Btn4['labelDisplayUp']['text'] = '4th Ball';
        this.road1Btn5['labelDisplayDown']['text'] = this.road1Btn5['labelDisplayUp']['text'] = '5th Ball';

        this.road2Btn1['labelDisplayDown']['text'] = this.road2Btn1['labelDisplayUp']['text'] = '1st Ball';
        this.road2Btn2['labelDisplayDown']['text'] = this.road2Btn2['labelDisplayUp']['text'] = '2nd Ball';
        this.road2Btn3['labelDisplayDown']['text'] = this.road2Btn3['labelDisplayUp']['text'] = '3rd Ball';
        this.road2Btn4['labelDisplayDown']['text'] = this.road2Btn4['labelDisplayUp']['text'] = '4th Ball';
        this.road2Btn5['labelDisplayDown']['text'] = this.road2Btn5['labelDisplayUp']['text'] = '5th Ball';

        this.road3Btn1['labelDisplayDown']['text'] = this.road3Btn1['labelDisplayUp']['text'] = '1 VS 2';
        this.road3Btn2['labelDisplayDown']['text'] = this.road3Btn2['labelDisplayUp']['text'] = '1 VS 3';
        this.road3Btn3['labelDisplayDown']['text'] = this.road3Btn3['labelDisplayUp']['text'] = '1 VS 4';
        this.road3Btn4['labelDisplayDown']['text'] = this.road3Btn4['labelDisplayUp']['text'] = '1 VS 5';
        this.road3Btn5['labelDisplayDown']['text'] = this.road3Btn5['labelDisplayUp']['text'] = '2 VS 3';
        this.road3Btn6['labelDisplayDown']['text'] = this.road3Btn6['labelDisplayUp']['text'] = '2 VS 4';
        this.road3Btn7['labelDisplayDown']['text'] = this.road3Btn7['labelDisplayUp']['text'] = '2 VS 5';
        this.road3Btn8['labelDisplayDown']['text'] = this.road3Btn8['labelDisplayUp']['text'] = '3 VS 4';
        this.road3Btn9['labelDisplayDown']['text'] = this.road3Btn9['labelDisplayUp']['text'] = '3 VS 5';
        this.road3Btn10['labelDisplayDown']['text'] = this.road3Btn10['labelDisplayUp']['text'] = '4 VS 5';

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

        this.dtBigRoad = new LoDtBigRoad(21, 35);
        this.dtBigRoad.y = 60;
        this.dtBigRoad.setGridCorners({ tl: 0, tr: 0, br: 10, bl: 10 });

        this.sizeBigRoad = new LoSizeBigRoad(21, 35);
        this.sizeBigRoad.y = 60;
        this.sizeBigRoad.setGridCorners({ tl: 0, tr: 0, br: 10, bl: 10 });

        this.oddBigRoad = new LoOddBigRoad(21, 35);
        this.oddBigRoad.y = 60;
        this.oddBigRoad.setGridCorners({ tl: 0, tr: 0, br: 10, bl: 10 });

        // add road to road stack 1
        const road1Group = this.roadStack.getChildAt(0) as eui.Group;
        road1Group.addChild(this.sizeBigRoad);

        // add road to road stack 2
        const road2Group = this.roadStack.getChildAt(1) as eui.Group;
        road2Group.addChild(this.oddBigRoad);

        // add road to road stack 3
        const road3Group = this.roadStack.getChildAt(2) as eui.Group;
        road3Group.addChild(this.dtBigRoad);

        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        // this.pageRadioBtn1.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);

        this.road1Btn1.addEventListener(eui.UIEvent.CHANGE, this.onRoad1IndexChange, this);
        this.road1Btn2.addEventListener(eui.UIEvent.CHANGE, this.onRoad1IndexChange, this);
        this.road1Btn3.addEventListener(eui.UIEvent.CHANGE, this.onRoad1IndexChange, this);
        this.road1Btn4.addEventListener(eui.UIEvent.CHANGE, this.onRoad1IndexChange, this);
        this.road1Btn5.addEventListener(eui.UIEvent.CHANGE, this.onRoad1IndexChange, this);

        this.road2Btn1.addEventListener(eui.UIEvent.CHANGE, this.onRoad2IndexChange, this);
        this.road2Btn2.addEventListener(eui.UIEvent.CHANGE, this.onRoad2IndexChange, this);
        this.road2Btn3.addEventListener(eui.UIEvent.CHANGE, this.onRoad2IndexChange, this);
        this.road2Btn4.addEventListener(eui.UIEvent.CHANGE, this.onRoad2IndexChange, this);
        this.road2Btn5.addEventListener(eui.UIEvent.CHANGE, this.onRoad2IndexChange, this);

        this.road3Btn1.addEventListener(eui.UIEvent.CHANGE, this.onRoad3IndexChange, this);
        this.road3Btn2.addEventListener(eui.UIEvent.CHANGE, this.onRoad3IndexChange, this);
        this.road3Btn3.addEventListener(eui.UIEvent.CHANGE, this.onRoad3IndexChange, this);
        this.road3Btn4.addEventListener(eui.UIEvent.CHANGE, this.onRoad3IndexChange, this);
        this.road3Btn5.addEventListener(eui.UIEvent.CHANGE, this.onRoad3IndexChange, this);
        this.road3Btn6.addEventListener(eui.UIEvent.CHANGE, this.onRoad3IndexChange, this);
        this.road3Btn7.addEventListener(eui.UIEvent.CHANGE, this.onRoad3IndexChange, this);
        this.road3Btn8.addEventListener(eui.UIEvent.CHANGE, this.onRoad3IndexChange, this);
        this.road3Btn9.addEventListener(eui.UIEvent.CHANGE, this.onRoad3IndexChange, this);
        this.road3Btn10.addEventListener(eui.UIEvent.CHANGE, this.onRoad3IndexChange, this);

        // (this.radioBtn1 as any).buttonImage.width = (this.radioBtn1 as any).labelDisplay.textWidth + 10;

        this.roadBtn1.active = true;
        this.roadBtn1.label.top = 0;
        this.roadBtn1.label.bottom = 0;
        this.roadBtn1.label.left = 8;
        this.roadBtn1.label.width = 75;
        this.roadBtn1.label.targetWidth = 75;
        this.roadBtn1.label.size = 20;

        this.roadBtn2.active = false;
        this.roadBtn2.label.top = 0;
        this.roadBtn2.label.bottom = 0;
        this.roadBtn2.label.left = 8;
        this.roadBtn2.label.width = 75;
        this.roadBtn2.label.targetWidth = 75;
        this.roadBtn2.label.size = 20;

        this.roadBtn3.active = false;
        this.roadBtn3.label.top = 0;
        this.roadBtn3.label.bottom = 0;
        this.roadBtn3.label.left = 8;
        this.roadBtn3.label.width = 75;
        this.roadBtn3.label.targetWidth = 75;
        this.roadBtn3.label.size = 20;

        this.roadBtn1.addEventListener('CLICKED', this.onRoadChange1, this);
        this.roadBtn2.addEventListener('CLICKED', this.onRoadChange2, this);
        this.roadBtn3.addEventListener('CLICKED', this.onRoadChange3, this);

        this.dtNextBtn.touchEnabled = true;
        this.dtNextBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDTNextBtnClick, this);

        this.setDTPageNum(0);
        this.road1Change(this.road1Index);
        this.road2Change(this.road2Index);
        this.road3Change(this.road3Index);

        this.changeLang();
      }

      protected onDTNextBtnClick(e: egret.TouchEvent) {
        this.setDTPageNum(++this.dtPageNum % 2);
        if (this.dtPageNum === 0) {
          this.dtNextBtn.source = 'd_lottery_ent_penal_infopenal_subtag_btn_right_png';
        } else {
          this.dtNextBtn.source = 'd_lottery_ent_penal_infopenal_subtag_btn_left_png';
        }
      }

      protected setDTPageNum(n: number) {
        this.dtPageNum = n;
        this.road3Btn1.includeInLayout = this.road3Btn2.includeInLayout = this.road3Btn3.includeInLayout = this.road3Btn4.includeInLayout = this.road3Btn5.includeInLayout = this.dtPageNum === 0;
        this.road3Btn6.includeInLayout = this.road3Btn7.includeInLayout = this.road3Btn8.includeInLayout = this.road3Btn9.includeInLayout = this.road3Btn10.includeInLayout = this.dtPageNum !== 0;
        this.road3Btn1.visible = this.road3Btn2.visible = this.road3Btn3.visible = this.road3Btn4.visible = this.road3Btn5.visible = this.dtPageNum === 0;
        this.road3Btn6.visible = this.road3Btn7.visible = this.road3Btn8.visible = this.road3Btn9.visible = this.road3Btn10.visible = this.dtPageNum !== 0;
      }

      protected onRoadChange1() {
        this.roadStack.selectedIndex = 0;
        this.roadBtn1.active = true;
        this.roadBtn2.active = false;
        this.roadBtn3.active = false;
      }

      protected onRoadChange2() {
        this.roadStack.selectedIndex = 1;
        this.roadBtn1.active = false;
        this.roadBtn2.active = true;
        this.roadBtn3.active = false;
      }

      protected onRoadChange3() {
        this.roadStack.selectedIndex = 2;
        this.roadBtn1.active = false;
        this.roadBtn2.active = false;
        this.roadBtn3.active = true;
        this.setDTPageNum(0);
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

      protected road1Change(i: number) {
        this.road1Index = i;
        if (this.roadmapData) {
          if (this.sizeBigRoad) {
            this.sizeBigRoad.parseRoadData(this.roadmapData.inGame['size' + (this.road1Index + 1)]);
          }
        }
      }

      protected road2Change(i: number) {
        this.road2Index = i;
        if (this.roadmapData) {
          if (this.oddBigRoad) {
            this.oddBigRoad.parseRoadData(this.roadmapData.inGame['odd' + (this.road2Index + 1)]);
          }
        }
      }

      protected road3Change(i: number) {
        this.road3Index = i;
        if (this.roadmapData) {
          if (this.dtBigRoad) {
            this.dtBigRoad.parseRoadData(this.roadmapData.inGame[this.dtRoadNames[this.road3Index]]);
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
        if (this.dtNextBtn.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
          this.dtNextBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDTNextBtnClick, this);
        }
      }
    }
  }
}
