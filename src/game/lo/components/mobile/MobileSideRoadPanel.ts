namespace we {
  export namespace lo {
    export class MobileSideRoadPanel extends ui.Panel implements we.ui.ILobbyRoad {
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

      protected _roadTypeToggler: ui.RunTimeLabel;
      protected _roadIndexToggler1: ui.RunTimeLabel;
      protected _roadIndexToggler2: ui.RunTimeLabel;
      protected _roadIndexToggler3: ui.RunTimeLabel;

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
        super(skin ? skin : 'lo.MobileSideRoadPanel');
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
        /*
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
        }*/
        // this.updateActiveLine(false);

        const dropdownSource1 = ['B/S', 'O/E', 'DT'];

        // this._toggler1.renderText = () => `${i18n.t('baccarat.betLimitshort')} ${items.length > 0 ? items[idx] : ''}`;
        // this._toggler1.renderText = () => `${dropdownSource1[this.roadStack.selectedIndex]}`;
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

        this.dtBigRoad = new LoDtBigRoad(16, 48);
        this.dtBigRoad.setGridCorners({ tl: 0, tr: 0, bl: 12, br: 0 });
        this.dtBigRoad.touchEnabled = false;
        this.dtBigRoad.touchChildren = false;
        this.dtBigRoad.x = 1;
        this.dtBigRoad.scaleX = 769 / 768;
        this.dtBigRoad.scaleY = 291 / 288;

        this.sizeBigRoad = new LoSizeBigRoad(16, 48);
        this.sizeBigRoad.setGridCorners({ tl: 0, tr: 0, bl: 12, br: 0 });
        this.sizeBigRoad.touchEnabled = false;
        this.sizeBigRoad.touchChildren = false;
        this.sizeBigRoad.x = 1;
        this.dtBigRoad.scaleX = 769 / 768;
        this.dtBigRoad.scaleY = 291 / 288;

        this.oddBigRoad = new LoOddBigRoad(16, 48);
        this.oddBigRoad.setGridCorners({ tl: 0, tr: 0, bl: 12, br: 0 });
        this.oddBigRoad.touchEnabled = false;
        this.oddBigRoad.touchChildren = false;
        this.oddBigRoad.x = 1;
        this.dtBigRoad.scaleX = 769 / 768;
        this.dtBigRoad.scaleY = 291 / 288;

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

        /*
                for (let i = 1; i <= 5; i++) {
                  this['road1Btn' + i].addEventListener(eui.UIEvent.CHANGE, this.onRoad1IndexChange, this);
                }

                for (let i = 1; i <= 5; i++) {
                  this['road2Btn' + i].addEventListener(eui.UIEvent.CHANGE, this.onRoad2IndexChange, this);
                }

                for (let i = 1; i <= 10; i++) {
                  this['road3Btn' + i].addEventListener(eui.UIEvent.CHANGE, this.onRoad3IndexChange, this);
                }

                */

        this.road1Change(this.road1Index);
        this.road2Change(this.road2Index);
        this.road3Change(this.road3Index);

        /*this.setRoad1PageNum(0);
        this.setRoad2PageNum(0);
        this.setRoad3PageNum(0);*/

        // init road type dropdown
        const dataSource = ['B/S', 'O/E', 'DT'];
        const dropdownSource = dataSource.map((data, index) => {
          return ui.NewDropdownItem(index, () => `${dataSource[index]}`);
        });

        utils.DropdownCreator.new({
          toggler: this._roadTypeToggler,
          review: this._roadTypeToggler,
          arrCol: new eui.ArrayCollection(dropdownSource),
          // title: () => `${i18n.t('baccarat.betLimitshort')} ${betLimitItems.length > 0 ? betLimitItems[selectedIndex] : ''}`,
          title: () => dataSource[0],
          selected: 0,
        });

        this._roadTypeToggler.addEventListener('DROPDOWN_ITEM_CHANGE', this.onRoadTypeSelected, this);
        this.doRoadTypeChange(0);

        // init road index dropdown
        for (let r = 0; r < 3; r++) {
          const dataSource = [];
          if (r < 2) {
            for (let i = 1; i <= 5; i++) {
              dataSource.push('Ball ' + i);
            }
          } else {
            let c = 0;
            for (let i = 1; i < 5; i++) {
              for (let j = i + 1; j <= 5; j++) {
                c++;
                dataSource.push(i + ' VS ' + j);
              }
            }
          }

          const dropdownSource = dataSource.map((data, index) => {
            return ui.NewDropdownItem(index, () => `${dataSource[index]}`);
          });

          utils.DropdownCreator.new({
            toggler: this['_roadIndexToggler' + (r + 1)],
            review: this['_roadIndexToggler' + (r + 1)],
            arrCol: new eui.ArrayCollection(dropdownSource),
            title: () => dataSource[0],
            selected: 0,
          });

          this['_roadIndexToggler' + (r + 1)].addEventListener('DROPDOWN_ITEM_CHANGE', this['onRoad' + (r + 1) + 'IndexChange'], this);
          this['road' + (r + 1) + 'Change'](0);
          this['_roadIndexToggler' + (r + 1)].text = dataSource[0];
        }

        this.changeLang();
      }

      protected doRoadTypeChange(index: number) {
        this.roadStack.selectedIndex = index - 0;

        const dataSource = ['B/S', 'O/E', 'DT'];
        const dropdownSource = dataSource.map((data, index) => {
          return ui.NewDropdownItem(index, () => `${dataSource[index]}`);
        });
        // this._roadTypeToggler.renderText = () => `${dataSource[this.roadStack.selectedIndex]}`;
        this._roadTypeToggler.text = dataSource[this.roadStack.selectedIndex];
      }

      protected onRoadTypeSelected(evt: egret.Event) {
        const selectedIndex = evt.data - 0;
        this.doRoadTypeChange(selectedIndex);
      }

      protected onRoad1IndexChange(evt: eui.UIEvent) {
        const selectedIndex = evt.data - 0;
        this.road1Change(selectedIndex);

        const dataSource = [];
        for (let i = 1; i <= 5; i++) {
          dataSource.push('Ball ' + i);
        }
        this._roadIndexToggler1.text = dataSource[selectedIndex];
      }

      protected onRoad2IndexChange(evt: eui.UIEvent) {
        const selectedIndex = evt.data - 0;
        this.road2Change(selectedIndex);

        const dataSource = [];
        for (let i = 1; i <= 5; i++) {
          dataSource.push('Ball ' + i);
        }
        this._roadIndexToggler2.text = dataSource[selectedIndex];
      }

      protected onRoad3IndexChange(evt: eui.UIEvent) {
        const selectedIndex = evt.data - 0;
        this.road3Change(selectedIndex);

        const dataSource = [];
        let c = 0;
        for (let i = 1; i < 5; i++) {
          for (let j = i + 1; j <= 5; j++) {
            c++;
            dataSource.push(i + ' VS ' + j);
          }
        }
        this._roadIndexToggler3.text = dataSource[selectedIndex];
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
