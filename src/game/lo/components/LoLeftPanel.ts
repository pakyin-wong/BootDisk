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

      protected _border: ui.RoundRectShape;

      protected _chipLayer: ui.ChipLayer;

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

      public constructor(skin?: string) {
        super(skin ? skin : env.isMobile ? '' : 'LoLeftPanel');
      }

      public changeLang() {
        this._btn_roadmap.label.text = 'Road';
        this._btn_analysis.label.text = 'Ay';

        // this.gameIdLabel.text = i18n.t('baccarat.gameroundid') + ' ' + this.gameId;

        this.road1Btn1['labelDisplayDown']['text'] = this.road1Btn1['labelDisplayUp']['text'] = 'First';
        this.road1Btn2['labelDisplayDown']['text'] = this.road1Btn2['labelDisplayUp']['text'] = 'Second';
        this.road1Btn3['labelDisplayDown']['text'] = this.road1Btn3['labelDisplayUp']['text'] = 'Third';
        // this.updateActiveLine(false);
      }

      public set chipLayer(value: ui.ChipLayer) {
        this._chipLayer = value;
      }

      protected setRadioButtons() {
        // this._radioButtons = [this.pageRadioBtn1, this.pageRadioBtn2, this.pageRadioBtn3];
        this._radioButtons = [];
      }

      protected init() {
        this.setRadioButtons();

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

        this.sizeBigRoad = new LoSizeBigRoad(28, 35);
        this.sizeBigRoad.y = 60;
        this.sizeBigRoad.setGridCorners({ tl: 0, tr: 0, br: 12, bl: 12 });
        this.sizeBigRoad.scaleX = 1024 / 1015;
        this.sizeBigRoad.scaleY = 212 / 210;

        this.oddBigRoad = new LoOddBigRoad(29, 30);
        this.oddBigRoad.y = 60;
        this.oddBigRoad.setGridCorners({ tl: 0, tr: 0, br: 12, bl: 12 });
        this.oddBigRoad.scaleX = 1024 / 1015;
        this.oddBigRoad.scaleY = 212 / 210;

        // add road to road stack 1
        const road1Group = this.roadStack.getChildAt(0) as eui.Group;
        road1Group.addChild(this.dtBigRoad);

        // add road to road stack 2
        const road2Group = this.roadStack.getChildAt(1) as eui.Group;
        road2Group.addChild(this.sizeBigRoad);

        // add road to road stack 3
        const road3Group = this.roadStack.getChildAt(2) as eui.Group;
        road3Group.addChild(this.oddBigRoad);

        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        // this.pageRadioBtn1.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);

        this.road1Btn1.addEventListener(eui.UIEvent.CHANGE, this.onRoadIndexChange, this);

        // (this.radioBtn1 as any).buttonImage.width = (this.radioBtn1 as any).labelDisplay.textWidth + 10;

        this._btn_roadmap.active = true;
        this._btn_roadmap.label.top = 0;
        this._btn_roadmap.label.left = 0;
        this._btn_roadmap.label.right = 0;
        this._btn_roadmap.label.bottom = 0;
        this._btn_roadmap.label.size = 20;

        this._btn_analysis.active = false;
        this._btn_analysis.label.top = 0;
        this._btn_analysis.label.left = 0;
        this._btn_analysis.label.right = 0;
        this._btn_analysis.label.bottom = 0;
        this._btn_analysis.label.size = 20;

        this._btn_roadmap.addEventListener('CLICKED', this.onPageChangeRoadmap, this);
        this._btn_analysis.addEventListener('CLICKED', this.onPageChangeAnalysis, this);

        this._border.touchEnabled = false;

        this.changeLang();
      }

      private onRoadTypesSelect(e) {
        const roadTypeIndex = e.data;
        this.panelRoadSelect && this.panelRoadSelect.dropdown.select(roadTypeIndex);
        this.roadStack.selectedIndex = roadTypeIndex;
      }

      protected onPageChangeRoadmap() {
        this.pageStack.selectedIndex = 0;
        this._btn_roadmap.active = true;
        this._btn_analysis.active = false;
      }

      protected onPageChangeAnalysis() {
        this.pageStack.selectedIndex = 1;
        this._btn_roadmap.active = false;
        this._btn_analysis.active = true;
      }

      protected onRoadIndexChange(e: eui.UIEvent) {
        const radio: eui.RadioButton = e.target;
        // this.roadStack.selectedIndex = radio.value;
      }

      public update() {
        if (this.tableInfo) {
          if (this.tableInfo.betInfo) {
            this.changeLang();
          }
        }
      }

      public destroy() {
        super.destroy();

        // this.pageRadioBtn1.removeEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);

        this.dtBigRoad.dispose();
        this.sizeBigRoad.dispose();
        this.oddBigRoad.dispose();
        egret.Tween.removeTweens(this.activeLine);
        if (dir.evtHandler.hasEventListener(core.Event.SWITCH_LANGUAGE)) {
          dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        }
      }
    }
  }
}
