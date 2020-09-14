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

      protected road1Btn: eui.RadioButton;
      protected road2Btn: eui.RadioButton;
      protected road3Btn: eui.RadioButton;

      protected gameId: string;

      protected activeLine: egret.Shape;
      protected roadStack: eui.ViewStack;

      protected road1Index: number;
      protected road2Index: number;
      protected road3Index: number;

      protected dtRoadNames: string[] = ['dt1v2', 'dt1v3', 'dt1v4', 'dt1v5', 'dt2v3', 'dt2v4', 'dt2v5', 'dt3v4', 'dt3v5', 'dt4v5'];

      protected road1SelectPanel: ui.Panel;
      protected road1SelectBtn: egret.DisplayObject;
      protected road1SelectTxt: ui.RunTimeLabel;

      protected road2SelectPanel: ui.Panel;
      protected road2SelectBtn: egret.DisplayObject;
      protected road2SelectTxt: ui.RunTimeLabel;

      protected road3SelectPanel: ui.Panel;
      protected road3SelectBtn: egret.DisplayObject;
      protected road3SelectTxt: ui.RunTimeLabel;

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
        this.road1Btn['labelDisplayDown']['text'] = this.road1Btn['labelDisplayUp']['text'] = 'B/S';
        this.road2Btn['labelDisplayDown']['text'] = this.road2Btn['labelDisplayUp']['text'] = 'O/E';
        this.road3Btn['labelDisplayDown']['text'] = this.road3Btn['labelDisplayUp']['text'] = 'DT';
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

        this.dtBigRoad = new LoDtBigRoad(16, 35);
        this.dtBigRoad.y = 60;
        this.dtBigRoad.scaleX = 578 / 560;
        this.dtBigRoad.scaleY = 213 / 210;
        this.dtBigRoad.setGridCorners({ tl: 0, tr: 0, br: 10, bl: 10 });

        this.sizeBigRoad = new LoSizeBigRoad(16, 35);
        this.sizeBigRoad.y = 60;
        this.sizeBigRoad.scaleX = 578 / 560;
        this.sizeBigRoad.scaleY = 213 / 210;
        this.sizeBigRoad.setGridCorners({ tl: 0, tr: 0, br: 10, bl: 10 });

        this.oddBigRoad = new LoOddBigRoad(16, 35);
        this.oddBigRoad.y = 60;
        this.oddBigRoad.scaleX = 578 / 560;
        this.oddBigRoad.scaleY = 213 / 210;
        this.oddBigRoad.setGridCorners({ tl: 0, tr: 0, br: 10, bl: 10 });

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

        this.road1Change(this.road1Index);
        this.road2Change(this.road2Index);
        this.road3Change(this.road3Index);

        // dropdown 1
        let arrColRoadTypes = new eui.ArrayCollection([
          ui.NewDropdownItem(0, () => `Ball 1`),
          ui.NewDropdownItem(1, () => `Ball 2`),
          ui.NewDropdownItem(2, () => `Ball 3`),
          ui.NewDropdownItem(3, () => `Ball 4`),
          ui.NewDropdownItem(4, () => `Ball 5`),
        ]);
        this.road1SelectPanel.isDropdown = true;
        this.road1SelectPanel.isPoppable = true;
        this.road1SelectPanel.dismissOnClickOutside = true;
        this.road1SelectPanel.setToggler(this.road1SelectBtn);
        this.road1SelectPanel.dropdown.review = this.road1SelectTxt;
        this.road1SelectPanel.dropdown.data.replaceAll(arrColRoadTypes.source);
        this.road1SelectPanel.dropdown.select(0);
        this.road1SelectPanel.addEventListener('DROPDOWN_ITEM_CHANGE', this.onRoad1IndexSelect, this);

        // dropdown 2
        arrColRoadTypes = new eui.ArrayCollection([
          ui.NewDropdownItem(0, () => `Ball 1`),
          ui.NewDropdownItem(1, () => `Ball 2`),
          ui.NewDropdownItem(2, () => `Ball 3`),
          ui.NewDropdownItem(3, () => `Ball 4`),
          ui.NewDropdownItem(4, () => `Ball 5`),
        ]);
        this.road2SelectPanel.isDropdown = true;
        this.road2SelectPanel.isPoppable = true;
        this.road2SelectPanel.dismissOnClickOutside = true;
        this.road2SelectPanel.setToggler(this.road2SelectBtn);
        this.road2SelectPanel.dropdown.review = this.road2SelectTxt;
        this.road2SelectPanel.dropdown.data.replaceAll(arrColRoadTypes.source);
        this.road2SelectPanel.dropdown.select(0);
        this.road2SelectPanel.addEventListener('DROPDOWN_ITEM_CHANGE', this.onRoad2IndexSelect, this);

        // dropdown 3
        arrColRoadTypes = new eui.ArrayCollection([
          ui.NewDropdownItem(0, () => `1 VS 2`),
          ui.NewDropdownItem(1, () => `1 VS 3`),
          ui.NewDropdownItem(2, () => `1 VS 4`),
          ui.NewDropdownItem(3, () => `1 VS 5`),
          ui.NewDropdownItem(4, () => `2 VS 3`),
          ui.NewDropdownItem(0, () => `2 VS 4`),
          ui.NewDropdownItem(1, () => `2 VS 5`),
          ui.NewDropdownItem(2, () => `3 VS 4`),
          ui.NewDropdownItem(3, () => `3 VS 5`),
          ui.NewDropdownItem(4, () => `4 VS 5`),
        ]);
        this.road3SelectPanel.isDropdown = true;
        this.road3SelectPanel.isPoppable = true;
        this.road3SelectPanel.dismissOnClickOutside = true;
        this.road3SelectPanel.setToggler(this.road3SelectBtn);
        this.road3SelectPanel.dropdown.review = this.road3SelectTxt;
        this.road3SelectPanel.dropdown.data.replaceAll(arrColRoadTypes.source);
        this.road3SelectPanel.dropdown.select(0);
        this.road3SelectPanel.addEventListener('DROPDOWN_ITEM_CHANGE', this.onRoad3IndexSelect, this);

        this.changeLang();
      }

      private onRoad1IndexSelect(e) {
        const roadTypeIndex = e.data;
        this.road1SelectPanel && this.road1SelectPanel.dropdown.select(roadTypeIndex);
        this.road1Change(roadTypeIndex);
      }

      private onRoad2IndexSelect(e) {
        const roadTypeIndex = e.data;
        this.road2SelectPanel && this.road2SelectPanel.dropdown.select(roadTypeIndex);
        this.road2Change(roadTypeIndex);
      }

      private onRoad3IndexSelect(e) {
        const roadTypeIndex = e.data;
        this.road3SelectPanel && this.road3SelectPanel.dropdown.select(roadTypeIndex);
        this.road3Change(roadTypeIndex);
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
      }
    }
  }
}
