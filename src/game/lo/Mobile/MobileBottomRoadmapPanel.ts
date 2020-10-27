// TypeScript file
// TypeScript file
namespace we {
  export namespace lo {
    export class MobileBottomRoadmapPanel extends core.BaseGamePanel {
      protected roadStack: eui.ViewStack;

      protected dtRoadNames: string[] = ['dt1v2', 'dt1v3', 'dt1v4', 'dt1v5', 'dt2v3', 'dt2v4', 'dt2v5', 'dt3v4', 'dt3v5', 'dt4v5'];

      public dtBigRoad: LoDtBigRoad;
      public sizeBigRoad: LoSizeBigRoad;
      public oddBigRoad: LoOddBigRoad;

      protected road3PageNum: number;
      protected road3NextBtn: eui.Image;
      protected road3BackBtn: eui.Image;

      protected road1Index: number;
      protected road2Index: number;
      protected road3Index: number;

      protected pType: ui.RunTimeLabel;
      protected typeNames: string[] = ['B/S', 'O/E', 'DT'];

      public constructor() {
        super();
      }

      protected mount() {
        super.mount();

        this.initTypeSelector();
        this.initRoadMap();

        this.updateText();
        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.updateText, this);

        this.roadStack.selectedIndex = 0;
      }

      protected initRoadMap() {
        this.road1Index = this.road2Index = this.road3Index = 0;

        this.dtBigRoad = new LoDtBigRoad(18, 70);
        this.dtBigRoad.x = 8;
        this.dtBigRoad.y = 8;

        this.sizeBigRoad = new LoSizeBigRoad(18, 70);
        this.sizeBigRoad.x = 8;
        this.sizeBigRoad.y = 8;

        this.oddBigRoad = new LoOddBigRoad(18, 70);
        this.oddBigRoad.x = 8;
        this.oddBigRoad.y = 8;

        // add road to road stack 1
        const road1Group = this.roadStack.getChildAt(0) as eui.Group;
        road1Group.addChild(this.sizeBigRoad);

        // add road to road stack 2
        const road2Group = this.roadStack.getChildAt(1) as eui.Group;
        road2Group.addChild(this.oddBigRoad);

        // add road to road stack 3
        const road3Group = this.roadStack.getChildAt(2) as eui.Group;
        road3Group.addChild(this.dtBigRoad);

        // this.road1Btn.addEventListener(eui.UIEvent.CHANGE, this.onRoadTypeChange, this);
        // this.road2Btn.addEventListener(eui.UIEvent.CHANGE, this.onRoadTypeChange, this);
        // this.road3Btn.addEventListener(eui.UIEvent.CHANGE, this.onRoadTypeChange, this);

        for (let i = 1; i <= 5; i++) {
          this['road1Btn' + i].addEventListener(eui.UIEvent.CHANGE, this.onRoad1IndexChange, this);
        }

        for (let i = 1; i <= 5; i++) {
          this['road2Btn' + i].addEventListener(eui.UIEvent.CHANGE, this.onRoad2IndexChange, this);
        }

        for (let i = 1; i <= 10; i++) {
          this['road3Btn' + i].addEventListener(eui.UIEvent.CHANGE, this.onRoad3IndexChange, this);
        }

        this.setRoad3PageNum(0);

        this.road3NextBtn.touchEnabled = true;
        this.road3NextBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRoad3NextBtnClick, this);

        this.road3BackBtn.touchEnabled = true;
        this.road3BackBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRoad3BackBtnClick, this);
      }

      protected initTypeSelector() {
        const dropdownSource = this.typeNames.map((data, index) => {
          return ui.NewDropdownItem(index, () => `${data}`);
        });

        utils.DropdownCreator.new({
          toggler: this.pType,
          review: this.pType,
          arrCol: new eui.ArrayCollection(dropdownSource),
          title: () => `${this.typeNames.length > 0 ? this.typeNames[0] : ''}`,
          selected: 0,
        });
        // this.updateBetLimit(selectedIndex);

        this.pType.addEventListener('DROPDOWN_ITEM_CHANGE', this.onRoadTypeChange, this);
      }

      public destroy() {
        super.destroy();
        if (this['road1Btn1'].hasEventListener(eui.UIEvent.CHANGE)) {

          this.road3NextBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRoad3NextBtnClick, this);
          this.road3BackBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRoad3BackBtnClick, this);

          for (let i = 1; i <= 5; i++) {
            this['road1Btn' + i].removeEventListener(eui.UIEvent.CHANGE, this.onRoad1IndexChange, this);
          }

          for (let i = 1; i <= 5; i++) {
            this['road2Btn' + i].removeEventListener(eui.UIEvent.CHANGE, this.onRoad2IndexChange, this);
          }

          for (let i = 1; i <= 10; i++) {
            this['road3Btn' + i].removeEventListener(eui.UIEvent.CHANGE, this.onRoad3IndexChange, this);
          }
        }
        dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this.updateText, this);
      }

      public updateText() {

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
      protected onRoadTypeChange(e) {
        this.roadStack.selectedIndex = e.data;

        this['road1Btn1'].selected = true;
        this['road2Btn1'].selected = true;
        this['road3Btn1'].selected = true;
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

        const itemPerPage = 6;
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

      protected road1Change(i: number) {
        this.road1Index = i - 0;
        if (this.tableInfo.roadmap) {
          this.sizeBigRoad.parseRoadData(this.tableInfo.roadmap.sideBar['size' + (this.road1Index + 1)]);
        }
      }

      protected road2Change(i: number) {
        this.road2Index = i - 0;
        if (this.tableInfo.roadmap) {
          this.oddBigRoad.parseRoadData(this.tableInfo.roadmap.sideBar['odd' + (this.road2Index + 1)]);
        }
      }

      protected road3Change(i: number) {
        this.road3Index = i - 0;
        if (this.tableInfo.roadmap) {
          this.dtBigRoad.parseRoadData(this.tableInfo.roadmap.sideBar[this.dtRoadNames[this.road3Index]]);
        }
      }

      public update() {
        if (this.tableInfo.roadmap) {
          this.road1Change(this.road1Index);
          this.road2Change(this.road2Index);
          this.road3Change(this.road3Index);
        }
      }
    }
  }
}
