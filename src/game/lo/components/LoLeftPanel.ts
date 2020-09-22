namespace we {
  export namespace lo {
    export class LoLeftPanel extends core.BaseGamePanel {
      public dtBigRoad: LoDtBigRoad;
      public sizeBigRoad: LoSizeBigRoad;
      public oddBigRoad: LoOddBigRoad;

      protected _btn_roadmap: ui.RoundRectButton;
      protected _btn_analysis: ui.RoundRectButton;

      protected panelRoadSelect: ui.Panel;
      protected btnRoadSelect: egret.DisplayObject;
      protected txtRoadSelect: ui.RunTimeLabel;

      protected gameId: string;
      protected gameIdLabel: ui.RunTimeLabel;

      protected analysisBtn1: eui.RadioButton;
      protected analysisBtn2: eui.RadioButton;
      protected analysisBtn3: eui.RadioButton;
      protected analysisBtn4: eui.RadioButton;
      protected analysisBtn5: eui.RadioButton;

      protected activeLine: egret.Shape;

      protected pageStack: eui.ViewStack;
      protected roadStack: eui.ViewStack;
      protected analysisStack: eui.ViewStack;

      protected _radioButtons: eui.RadioButton[];

      protected road3PageNum: number;
      protected road3NextBtn: eui.Image;
      protected road3BackBtn: eui.Image;

      protected road1Index: number;
      protected road2Index: number;
      protected road3Index: number;

      protected listShow: LoAnalysisScrollList;
      protected listNoShow: LoAnalysisScrollList;
      protected listHot: LoAnalysisScrollList;
      protected listCold: LoAnalysisScrollList;

      protected dtRoadNames: string[] = ['dt1v2', 'dt1v3', 'dt1v4', 'dt1v5', 'dt2v3', 'dt2v4', 'dt2v5', 'dt3v4', 'dt3v5', 'dt4v5'];

      public constructor(skin?: string) {
        super(skin ? skin : env.isMobile ? '' : 'LoLeftPanel');
      }

      public changeLang() {
        this._btn_roadmap.label.text = 'Roadmap';
        this._btn_analysis.label.text = 'Analysis';

        this.gameIdLabel.text = i18n.t('baccarat.gameroundid') + ' ' + this.gameId;

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

        this.analysisBtn1['labelDisplayDown']['text'] = this.analysisBtn1['labelDisplayUp']['text'] = 'Show';
        this.analysisBtn2['labelDisplayDown']['text'] = this.analysisBtn2['labelDisplayUp']['text'] = 'NoShow';
        this.analysisBtn3['labelDisplayDown']['text'] = this.analysisBtn3['labelDisplayUp']['text'] = 'Hot';
        this.analysisBtn4['labelDisplayDown']['text'] = this.analysisBtn4['labelDisplayUp']['text'] = 'Cold';

        // this.updateActiveLine(false);
      }

      protected setRadioButtons() {
        // this._radioButtons = [this.pageRadioBtn1, this.pageRadioBtn2, this.pageRadioBtn3];
        this._radioButtons = [];
      }

      protected init() {
        this.setRadioButtons();
        this.road1Index = this.road2Index = this.road3Index = 0;

        const page1Group = this.pageStack.getChildAt(0) as eui.Group;
        const page2Group = this.pageStack.getChildAt(1) as eui.Group;

        const arrColRoadTypes = new eui.ArrayCollection([ui.NewDropdownItem(0, () => `Size`), ui.NewDropdownItem(1, () => `Odd`), ui.NewDropdownItem(2, () => `Dragon/Tiger`)]);
        this.panelRoadSelect.isDropdown = true;
        this.panelRoadSelect.isPoppable = true;
        this.panelRoadSelect.dismissOnClickOutside = true;
        this.panelRoadSelect.setToggler(this.btnRoadSelect);
        this.panelRoadSelect.dropdown.review = this.txtRoadSelect;
        this.panelRoadSelect.dropdown.data.replaceAll(arrColRoadTypes.source);
        this.panelRoadSelect.dropdown.select(0);
        this.panelRoadSelect.addEventListener('DROPDOWN_ITEM_CHANGE', this.onRoadTypesSelect, this);

        this.dtBigRoad = new LoDtBigRoad(29, 35);
        this.dtBigRoad.y = 60;
        this.dtBigRoad.setGridCorners({ tl: 0, tr: 0, br: 12, bl: 12 });
        this.dtBigRoad.scaleX = 1024 / 1015;
        this.dtBigRoad.scaleY = 212 / 210;

        this.sizeBigRoad = new LoSizeBigRoad(29, 35);
        this.sizeBigRoad.y = 60;
        this.sizeBigRoad.setGridCorners({ tl: 0, tr: 0, br: 12, bl: 12 });
        this.sizeBigRoad.scaleX = 1024 / 1015;
        this.sizeBigRoad.scaleY = 212 / 210;

        this.oddBigRoad = new LoOddBigRoad(29, 35);
        this.oddBigRoad.y = 60;
        this.oddBigRoad.setGridCorners({ tl: 0, tr: 0, br: 12, bl: 12 });
        this.oddBigRoad.scaleX = 1024 / 1015;
        this.oddBigRoad.scaleY = 212 / 210;

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

        for (let i = 1; i <= 5; i++) {
          this['road1Btn' + i].addEventListener(eui.UIEvent.CHANGE, this.onRoad1IndexChange, this);
        }

        for (let i = 1; i <= 5; i++) {
          this['road2Btn' + i].addEventListener(eui.UIEvent.CHANGE, this.onRoad2IndexChange, this);
        }

        for (let i = 1; i <= 10; i++) {
          this['road3Btn' + i].addEventListener(eui.UIEvent.CHANGE, this.onRoad3IndexChange, this);
        }

        const analysis1Group = this.analysisStack.getChildAt(0) as eui.Group;
        this.listShow = new LoAnalysisScrollList(1, 3, 1024, 211, 22);
        this.listShow.y = 73;
        analysis1Group.addChild(this.listShow);

        const analysis2Group = this.analysisStack.getChildAt(1) as eui.Group;
        this.listNoShow = new LoAnalysisScrollList(1, 3, 1024, 211, 22);
        this.listNoShow.y = 73;
        analysis2Group.addChild(this.listNoShow);

        const analysis3Group = this.analysisStack.getChildAt(2) as eui.Group;
        this.listHot = new LoAnalysisScrollList(1, 3, 1024, 211, 22);
        this.listHot.y = 73;
        analysis3Group.addChild(this.listHot);

        const analysis4Group = this.analysisStack.getChildAt(3) as eui.Group;
        this.listCold = new LoAnalysisScrollList(1, 3, 1024, 211, 22);
        this.listCold.y = 73;
        analysis4Group.addChild(this.listCold);

        this.analysisBtn1.addEventListener(eui.UIEvent.CHANGE, this.onAnalysisChange, this);
        this.analysisBtn2.addEventListener(eui.UIEvent.CHANGE, this.onAnalysisChange, this);
        this.analysisBtn3.addEventListener(eui.UIEvent.CHANGE, this.onAnalysisChange, this);
        this.analysisBtn4.addEventListener(eui.UIEvent.CHANGE, this.onAnalysisChange, this);

        // (this.radioBtn1 as any).buttonImage.width = (this.radioBtn1 as any).labelDisplay.textWidth + 10;

        this._btn_roadmap.active = true;
        this._btn_roadmap.label.top = 0;
        this._btn_roadmap.label.bottom = 0;
        this._btn_roadmap.label.left = 8;
        this._btn_roadmap.label.width = 95 - 16;
        this._btn_roadmap.label.targetWidth = 95 - 16;
        this._btn_roadmap.label.size = 18;

        this._btn_analysis.active = false;
        this._btn_analysis.label.top = 0;
        this._btn_analysis.label.bottom = 0;
        this._btn_analysis.label.left = 8;
        this._btn_analysis.label.width = 95 - 16;
        this._btn_analysis.label.targetWidth = 95 - 16;
        this._btn_analysis.label.size = 18;

        this._btn_roadmap.addEventListener('CLICKED', this.onPageChangeRoadmap, this);
        this._btn_analysis.addEventListener('CLICKED', this.onPageChangeAnalysis, this);

        this.road3NextBtn.touchEnabled = true;
        this.road3NextBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRoad3NextBtnClick, this);

        this.road3BackBtn.touchEnabled = true;
        this.road3BackBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRoad3BackBtnClick, this);

        this.setRoad3PageNum(0);

        this.changeLang();
      }

      protected onRoad3NextBtnClick(e: egret.TouchEvent) {
        if (this.road3PageNum === 0) {
          this.setRoad3PageNum(++this.road3PageNum);
        }
      }

      protected onRoad3BackBtnClick(e: egret.TouchEvent) {
        if (this.road3PageNum > 0) {
          this.setRoad3PageNum(--this.road3PageNum);
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

      protected onRoadTypesSelect(e) {
        const roadTypeIndex = e.data;
        this.panelRoadSelect && this.panelRoadSelect.dropdown.select(roadTypeIndex);
        this.roadStack.selectedIndex = roadTypeIndex;

        this['road1Btn1'].selected = true;
        this['road2Btn1'].selected = true;
        this['road3Btn1'].selected = true;
      }

      protected onPageChangeRoadmap() {
        this.pageStack.selectedIndex = 0;
        this._btn_roadmap.active = true;
        this._btn_analysis.active = false;

        // select the first button
        if (this.pageStack.selectedIndex === 0) {
          this.setRoad3PageNum(0);
          this['road1Btn1'].selected = true;
          this['road2Btn1'].selected = true;
          this['road3Btn1'].selected = true;
        } else {
          this.analysisBtn1.selected = true;
        }
      }

      protected onPageChangeAnalysis() {
        this.pageStack.selectedIndex = 1;
        this._btn_roadmap.active = false;
        this._btn_analysis.active = true;
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

      protected onAnalysisChange(e: eui.UIEvent) {
        const radio: eui.RadioButton = e.target;
        this.analysisStack.selectedIndex = radio.value;

        this.listShow.resetPosition();
        this.listNoShow.resetPosition();
        this.listHot.resetPosition();
        this.listCold.resetPosition();
      }

      protected road1Change(i: number) {
        this.road1Index = i - 0;
        if (this.tableInfo.roadmap) {
          this.sizeBigRoad.parseRoadData(this.tableInfo.roadmap.inGame['size' + (this.road1Index + 1)]);
        }
      }

      protected road2Change(i: number) {
        this.road2Index = i - 0;
        if (this.tableInfo.roadmap) {
          this.oddBigRoad.parseRoadData(this.tableInfo.roadmap.inGame['odd' + (this.road2Index + 1)]);
        }
      }

      protected road3Change(i: number) {
        this.road3Index = i - 0;
        if (this.tableInfo.roadmap) {
          this.dtBigRoad.parseRoadData(this.tableInfo.roadmap.inGame[this.dtRoadNames[this.road3Index]]);
        }
      }

      public update() {
        if (this.tableInfo) {
          if (this.tableInfo.betInfo) {
            this.changeLang();
          }

          if (this.tableInfo.roadmap) {
            this.road1Change(this.road1Index);
            this.road2Change(this.road2Index);
            this.road3Change(this.road3Index);
          }

          if (this.tableInfo.gamestatistic) {
            if (this.gameId !== this.tableInfo.roundid) {
              this.gameId = this.tableInfo.roundid;

              const history = this.tableInfo.gamestatistic.loHistory;
              const chart = this.tableInfo.gamestatistic.loChart;

              this.listShow.updateList(history.show);
              this.listNoShow.updateList(history.noShow);
              this.listHot.updateList(history.hot);
              this.listCold.updateList(history.cold);

              this.changeLang();
            }
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

        if (this['road1Btn1'].hasEventListener(eui.UIEvent.CHANGE)) {

          this.panelRoadSelect.removeEventListener('DROPDOWN_ITEM_CHANGE', this.onRoadTypesSelect, this);
          this.analysisBtn1.removeEventListener(eui.UIEvent.CHANGE, this.onAnalysisChange, this);
          this.analysisBtn2.removeEventListener(eui.UIEvent.CHANGE, this.onAnalysisChange, this);
          this.analysisBtn3.removeEventListener(eui.UIEvent.CHANGE, this.onAnalysisChange, this);
          this.analysisBtn4.removeEventListener(eui.UIEvent.CHANGE, this.onAnalysisChange, this);


          for (let i = 1; i <= 5; i++) {
            this['road1Btn' + i].removeEventListener(eui.UIEvent.CHANGE, this.onRoad1IndexChange, this);
          }

          for (let i = 1; i <= 5; i++) {
            this['road2Btn' + i].removeEventListener(eui.UIEvent.CHANGE, this.onRoad2IndexChange, this);
          }

          for (let i = 1; i <= 10; i++) {
            this['road3Btn' + i].removeEventListener(eui.UIEvent.CHANGE, this.onRoad3IndexChange, this);
          }

          this._btn_roadmap.removeEventListener('CLICKED', this.onPageChangeRoadmap, this);
          this._btn_analysis.removeEventListener('CLICKED', this.onPageChangeAnalysis, this);
          this.road3NextBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRoad3NextBtnClick, this);
          this.road3BackBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRoad3BackBtnClick, this);
        }


        if (dir.evtHandler.hasEventListener(core.Event.SWITCH_LANGUAGE)) {
          dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        }
      }
    }
  }
}
