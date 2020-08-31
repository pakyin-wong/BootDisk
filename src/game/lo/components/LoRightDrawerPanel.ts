namespace we {
  export namespace lo {
    export class LoRightDrawerPanel extends core.BaseGamePanel {
      protected activeLine: egret.Shape;
      protected panelHideBtn: ui.RoundRectShape;
      protected panelHideImage: eui.Image;

      protected roadmapBtn: ui.RoundRectButton;
      protected analysisBtn: ui.RoundRectButton;
      protected chartBtn: ui.RoundRectButton;
      protected overlay: eui.Group;

      protected gameId: string;
      protected gameIdLabel: ui.RunTimeLabel;

      protected pageStack: eui.ViewStack;
      protected roadStack: eui.ViewStack;
      protected analysisStack: eui.ViewStack;
      protected chartStack: eui.ViewStack;

      protected dtRoadNames: string[] = ['dt1v2', 'dt1v3', 'dt1v4', 'dt1v5', 'dt2v3', 'dt2v4', 'dt2v5', 'dt3v4', 'dt3v5', 'dt4v5'];
      protected chartTypeNames: string[] = ['lucky_time', 'lucky_game', 'fav_bet', 'fav_game'];
      protected chartPeriodNames: string[] = ['day', 'pday', 'week', 'pweek', 'month', 'pmonth'];

      // roadmap
      public dtBigRoad: LoDtBigRoad;
      public sizeBigRoad: LoSizeBigRoad;
      public oddBigRoad: LoOddBigRoad;

      protected dtPageNum: number;
      protected dtNextBtn: eui.Image;

      protected road1Index: number;
      protected road2Index: number;
      protected road3Index: number;

      protected road1Btn: eui.RadioButton;
      protected road2Btn: eui.RadioButton;
      protected road3Btn: eui.RadioButton;

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

      // analysis
      protected analysisBtn1: eui.RadioButton;
      protected analysisBtn2: eui.RadioButton;
      protected analysisBtn3: eui.RadioButton;
      protected analysisBtn4: eui.RadioButton;

      protected listShow: LoAnalysisScrollList;
      protected listNoShow: LoAnalysisScrollList;
      protected listHot: LoAnalysisScrollList;
      protected listCold: LoAnalysisScrollList;

      // chart
      protected chartPeriodIndex: number;

      protected chart1Btn: eui.RadioButton;
      protected chart2Btn: eui.RadioButton;
      protected chart3Btn: eui.RadioButton;
      protected chart4Btn: eui.RadioButton;

      protected chartPeriodBtn1: eui.RadioButton;
      protected chartPeriodBtn2: eui.RadioButton;
      protected chartPeriodBtn3: eui.RadioButton;
      protected chartPeriodBtn4: eui.RadioButton;
      protected chartPeriodBtn5: eui.RadioButton;
      protected chartPeriodBtn6: eui.RadioButton;

      protected _bestTimePieChart: we.di.InteractivePieChart;
      protected _bestGamePieChart: we.di.InteractivePieChart;
      protected _favBetBarChart: we.di.HorizontalBarChart;
      protected _favGameBarChart: we.di.SlopedBarChart;

      public constructor(skin?: string) {
        super(skin ? skin : env.isMobile ? '' : 'LoRightDrawerPanel');
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
        this.roadmapBtn.addEventListener('CLICKED', this.onPageChangeRoadmap, this);
        this.analysisBtn.addEventListener('CLICKED', this.onPageChangeAnalysis, this);
        this.chartBtn.addEventListener('CLICKED', this.onPageChangeChart, this);

        //////////////////////// Roadmap
        this.road1Index = this.road2Index = this.road3Index = 0;

        this.dtBigRoad = new LoDtBigRoad(16, 39);
        this.dtBigRoad.x = 1;
        this.dtBigRoad.y = 43;

        this.sizeBigRoad = new LoSizeBigRoad(16, 39);
        this.sizeBigRoad.x = 1;
        this.sizeBigRoad.y = 43;

        this.oddBigRoad = new LoOddBigRoad(16, 39);
        this.oddBigRoad.x = 1;
        this.oddBigRoad.y = 43;

        // add road to road stack 1
        const road1Group = this.roadStack.getChildAt(0) as eui.Group;
        road1Group.addChild(this.sizeBigRoad);

        // add road to road stack 2
        const road2Group = this.roadStack.getChildAt(1) as eui.Group;
        road2Group.addChild(this.oddBigRoad);

        // add road to road stack 3
        const road3Group = this.roadStack.getChildAt(2) as eui.Group;
        road3Group.addChild(this.dtBigRoad);

        this.road1Btn.addEventListener(eui.UIEvent.CHANGE, this.onRoadTypeChange, this);
        this.road2Btn.addEventListener(eui.UIEvent.CHANGE, this.onRoadTypeChange, this);
        this.road3Btn.addEventListener(eui.UIEvent.CHANGE, this.onRoadTypeChange, this);

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

        this.setDTPageNum(0);

        this.dtNextBtn.touchEnabled = true;
        this.dtNextBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDTNextBtnClick, this);

        /////////////////////// Analysis
        const analysis1Group = this.analysisStack.getChildAt(0) as eui.Group;
        this.listShow = new LoAnalysisScrollList(0, 5, 625, 277, 20);
        this.listShow.y = 45;
        analysis1Group.addChild(this.listShow);

        const analysis2Group = this.analysisStack.getChildAt(1) as eui.Group;
        this.listNoShow = new LoAnalysisScrollList(1, 5, 625, 277, 20);
        this.listNoShow.y = 45;
        analysis2Group.addChild(this.listNoShow);

        const analysis3Group = this.analysisStack.getChildAt(2) as eui.Group;
        this.listHot = new LoAnalysisScrollList(2, 5, 625, 277, 20);
        this.listHot.y = 45;
        analysis3Group.addChild(this.listHot);

        const analysis4Group = this.analysisStack.getChildAt(3) as eui.Group;
        this.listCold = new LoAnalysisScrollList(3, 5, 625, 277, 20);
        this.listCold.y = 45;
        analysis4Group.addChild(this.listCold);

        this.analysisBtn1.addEventListener(eui.UIEvent.CHANGE, this.onAnalysisChange, this);
        this.analysisBtn2.addEventListener(eui.UIEvent.CHANGE, this.onAnalysisChange, this);
        this.analysisBtn3.addEventListener(eui.UIEvent.CHANGE, this.onAnalysisChange, this);
        this.analysisBtn4.addEventListener(eui.UIEvent.CHANGE, this.onAnalysisChange, this);

        ///////////////////////// Chart
        this.chartPeriodIndex = 0;

        this._bestTimePieChart = new we.di.InteractivePieChart();
        this._bestTimePieChart.setChartStyles(
          [
            [[0xff5c00, 0xff9000, 0xff5c00], [1, 1, 1], [0, 128, 255], 0],
            [[0xee4343, 0xe033e7, 0xee4343], [1, 1, 1], [0, 128, 255], 0],
            [[0x5a003e, 0xca0d59, 0x5a003e], [1, 1, 1], [0, 128, 255], 0],
            [[0xc68707, 0xeef700, 0xc68707], [1, 1, 1], [0, 128, 255], 0],
            [[0x2ea853, 0x7cffa0, 0x2ea853], [1, 1, 1], [0, 128, 255], 0],
            [[0x3b7ad6, 0x37fbf1, 0x3b7ad6], [1, 1, 1], [0, 128, 255], 0],
            [[0x115bb7, 0x27abdd, 0x115bb7], [1, 1, 1], [0, 128, 255], 0],
            [[0x05076a, 0x0a4481, 0x05076a], [1, 1, 1], [0, 128, 255], 0],
            [[0x2e219e, 0x5832e5, 0x2e219e], [1, 1, 1], [0, 128, 255], 0],
            [[0x812391, 0x8633e7, 0x812391], [1, 1, 1], [0, 128, 255], 0],
          ],
          37,
          74,
          0
        );
        this._bestTimePieChart.x = 94;
        this._bestTimePieChart.y = 100;
        // add to chart stack 1
        const chat1Group = this.chartStack.getChildAt(0) as eui.Group;
        chat1Group.addChild(this._bestTimePieChart);

        this._bestGamePieChart = new we.di.InteractivePieChart();
        this._bestGamePieChart.setChartStyles(
          [
            [[0xff5c00, 0xff9000, 0xff5c00], [1, 1, 1], [0, 128, 255], 0],
            [[0xee4343, 0xe033e7, 0xee4343], [1, 1, 1], [0, 128, 255], 0],
            [[0x5a003e, 0xca0d59, 0x5a003e], [1, 1, 1], [0, 128, 255], 0],
            [[0xc68707, 0xeef700, 0xc68707], [1, 1, 1], [0, 128, 255], 0],
            [[0x2ea853, 0x7cffa0, 0x2ea853], [1, 1, 1], [0, 128, 255], 0],
            [[0x3b7ad6, 0x37fbf1, 0x3b7ad6], [1, 1, 1], [0, 128, 255], 0],
            [[0x115bb7, 0x27abdd, 0x115bb7], [1, 1, 1], [0, 128, 255], 0],
            [[0x05076a, 0x0a4481, 0x05076a], [1, 1, 1], [0, 128, 255], 0],
            [[0x2e219e, 0x5832e5, 0x2e219e], [1, 1, 1], [0, 128, 255], 0],
            [[0x812391, 0x8633e7, 0x812391], [1, 1, 1], [0, 128, 255], 0],
          ],
          37,
          74,
          0
        );
        this._bestGamePieChart.x = 94;
        this._bestGamePieChart.y = 100;
        this.addChild(this._bestGamePieChart);
        // add road to page stack 2
        const page2Group = this.chartStack.getChildAt(1) as eui.Group;
        page2Group.addChild(this._bestGamePieChart);

        this._favBetBarChart = new we.di.HorizontalBarChart();
        this._favBetBarChart.setChartStyles(
          [
            [[0x2ea853, 0x7cffa0], [1, 1], [0, 255], 0],
            [[0x1aa796, 0x6effd0], [1, 1], [0, 255], 0],
            [[0x3583af, 0x67e8ff], [1, 1], [0, 255], 0],
            [[0x0065dc, 0x008bef], [1, 1], [0, 255], 0],
            [[0x05076a, 0x0a4481], [1, 1], [0, 255], 0],
            [[0x2e219e, 0x5832e5], [1, 1], [0, 255], 0],
          ],
          382,
          16,
          26
        );
        this._favBetBarChart.x = 164;
        this._favBetBarChart.y = 26;
        this.addChild(this._favBetBarChart);
        // add road to page stack 3
        const page3Group = this.chartStack.getChildAt(2) as eui.Group;
        page3Group.addChild(this._favBetBarChart);

        this._favGameBarChart = new we.di.SlopedBarChart();
        this._favGameBarChart.x = 4;
        this._favGameBarChart.y = 20;
        this._favGameBarChart.setChartStyles(
          [
            [[0x2552fc, 0x5ad9ff], [1, 1], [0, 255], 0],
            [[0xe4e85c, 0x1fe479], [1, 1], [0, 255], 0],
            [[0xfc2424, 0xfa936e], [1, 1], [0, 255], 0],
            [[0x2552fc, 0x5ad9ff], [1, 1], [0, 255], 0],
            [[0xe4e85c, 0x1fe479], [1, 1], [0, 255], 0],
            [[0xfc2424, 0xfa936e], [1, 1], [0, 255], 0],
          ],
          168,
          122,
          2
        );
        this._favGameBarChart.setRanksAndAnimate([80, 50, 30, 20, 10]);
        this.addChild(this._favGameBarChart);
        // add road to page stack 4
        const page4Group = this.chartStack.getChildAt(3) as eui.Group;
        page4Group.addChildAt(this._favGameBarChart, 0);

        this.chart1Btn.addEventListener(eui.UIEvent.CHANGE, this.onChartTypeChange, this);
        this.chart2Btn.addEventListener(eui.UIEvent.CHANGE, this.onChartTypeChange, this);
        this.chart3Btn.addEventListener(eui.UIEvent.CHANGE, this.onChartTypeChange, this);
        this.chart4Btn.addEventListener(eui.UIEvent.CHANGE, this.onChartTypeChange, this);

        this.chartPeriodBtn1.addEventListener(eui.UIEvent.CHANGE, this.onChartPeriodIndexChange, this);
        this.chartPeriodBtn2.addEventListener(eui.UIEvent.CHANGE, this.onChartPeriodIndexChange, this);
        this.chartPeriodBtn3.addEventListener(eui.UIEvent.CHANGE, this.onChartPeriodIndexChange, this);
        this.chartPeriodBtn4.addEventListener(eui.UIEvent.CHANGE, this.onChartPeriodIndexChange, this);
        this.chartPeriodBtn5.addEventListener(eui.UIEvent.CHANGE, this.onChartPeriodIndexChange, this);
        this.chartPeriodBtn6.addEventListener(eui.UIEvent.CHANGE, this.onChartPeriodIndexChange, this);

        this.panelHideBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPanelHide, this);

        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        this.changeLang();
      }

      protected onPanelHide(e: egret.TouchEvent) {
        if (this.x === 1763) {
          this.x = 2388;
          this.panelHideBtn.visible = false;
          this.panelHideImage.visible = false;
        } else {
          this.x = 1763;
          this.panelHideBtn.visible = true;
          this.panelHideImage.visible = true;
        }
      }

      protected onChartPeriodIndexChange(e: eui.UIEvent) {
        const radio: eui.RadioButton = e.target;
        this.chartPeriodChange(radio.value);
      }
      protected chartPeriodChange(i: number) {
        this.chartPeriodIndex = i - 0;
        if (this.tableInfo.gamestatistic) {
          // chart1
          let chatType = this.tableInfo.gamestatistic.loChart[this.chartTypeNames[0]];
          let d = chatType[this.chartPeriodNames[this.chartPeriodIndex]];
          let ranks = [];
          d.forEach(element => {
            ranks.push(element.value);
          });
          this._bestTimePieChart.setRanksAndAnimate(ranks, -1);

          // chart2
          chatType = this.tableInfo.gamestatistic.loChart[this.chartTypeNames[1]];
          d = chatType[this.chartPeriodNames[this.chartPeriodIndex]];
          ranks = [];
          d.forEach(element => {
            ranks.push(element.value);
          });
          this._bestGamePieChart.setRanksAndAnimate(ranks, -1);

          // chart3
          chatType = this.tableInfo.gamestatistic.loChart[this.chartTypeNames[2]];
          d = chatType[this.chartPeriodNames[this.chartPeriodIndex]];
          ranks = [];
          d.forEach(element => {
            ranks.push(element.value);
          });
          this._favBetBarChart.setRanksAndAnimate(ranks, -1);

          // chart4
          chatType = this.tableInfo.gamestatistic.loChart[this.chartTypeNames[3]];
          d = chatType[this.chartPeriodNames[this.chartPeriodIndex]];
          ranks = [];
          d.forEach(element => {
            ranks.push(element.value);
          });
          this._favGameBarChart.setRanksAndAnimate(ranks, -1);
        }
        this.checkChartData();
      }

      private onChartTypeChange(e: eui.UIEvent) {
        const chartTypeIndex = e.target.value;
        this.chartStack.selectedIndex = chartTypeIndex;
        this.checkChartData();
      }

      // check chart data and show overlay if no data
      private checkChartData() {
        this.overlay.visible = true;
        if (this.tableInfo) {
          const chatType = this.tableInfo.gamestatistic.loChart[this.chartTypeNames[this.chartStack.selectedIndex]];
          const d = chatType[this.chartPeriodNames[this.chartPeriodIndex]];
          if (d.length > 0) {
            this.overlay.visible = false;
          }
        }
      }

      protected onDTNextBtnClick(e: egret.TouchEvent) {
        this.setDTPageNum(++this.dtPageNum % 2);
        if (this.dtPageNum === 0) {
          this.dtNextBtn.source = 'd_lottery_ent_penal_infopenal_subtag_btn_right_png';
        } else {
          this.dtNextBtn.source = 'd_lottery_ent_penal_infopenal_subtag_btn_left_png';
        }
      }
      private onRoadTypeChange(e) {
        const roadTypeIndex = e.target.value;
        this.roadStack.selectedIndex = roadTypeIndex;

        this.road1Btn1.selected = true;
        this.road2Btn1.selected = true;
        this.road3Btn1.selected = true;
      }

      protected setDTPageNum(n: number) {
        this.dtPageNum = n;
        this.road3Btn5.includeInLayout = this.road3Btn6.includeInLayout = this.dtPageNum === 0;
        this.road3Btn1.includeInLayout = this.road3Btn2.includeInLayout = this.road3Btn3.includeInLayout = this.road3Btn4.includeInLayout = this.road3Btn5.includeInLayout;
        this.road3Btn10.includeInLayout = this.dtPageNum !== 0;
        this.road3Btn7.includeInLayout = this.road3Btn8.includeInLayout = this.road3Btn9.includeInLayout = this.road3Btn10.includeInLayout;
        this.road3Btn1.visible = this.road3Btn2.visible = this.road3Btn3.visible = this.road3Btn4.visible = this.road3Btn5.visible = this.road3Btn6.visible = this.dtPageNum === 0;
        this.road3Btn7.visible = this.road3Btn8.visible = this.road3Btn9.visible = this.road3Btn10.visible = this.dtPageNum !== 0;
      }
      protected onPageChangeRoadmap() {
        this.pageStack.selectedIndex = 0;
        this.roadmapBtn.active = true;
        this.analysisBtn.active = false;
        this.chartBtn.active = false;

        this.x = 1763;
        this.panelHideBtn.visible = true;
        this.panelHideImage.visible = true;
      }

      protected onPageChangeAnalysis() {
        this.pageStack.selectedIndex = 1;
        this.roadmapBtn.active = false;
        this.analysisBtn.active = true;
        this.chartBtn.active = false;

        this.x = 1763;
        this.panelHideBtn.visible = true;
        this.panelHideImage.visible = true;
      }

      protected onPageChangeChart() {
        this.pageStack.selectedIndex = 2;
        this.roadmapBtn.active = false;
        this.analysisBtn.active = false;
        this.chartBtn.active = true;

        this.x = 1763;
        this.panelHideBtn.visible = true;
        this.panelHideImage.visible = true;
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
      protected onAnalysisChange(e: eui.UIEvent) {
        const radio: eui.RadioButton = e.target;
        this.analysisStack.selectedIndex = radio.value;

        this.listShow.resetPosition();
        this.listNoShow.resetPosition();
        this.listHot.resetPosition();
        this.listCold.resetPosition();
      }
      public update() {
        if (this.tableInfo) {
          if (this.tableInfo.betInfo) {
          }

          if (this.tableInfo.roadmap) {
            this.road1Change(this.road1Index);
            this.road2Change(this.road2Index);
            this.road3Change(this.road3Index);
          }

          if (this.tableInfo.gamestatistic) {
            if (this.gameId !== this.tableInfo.gamestatistic.roundId) {
              this.gameId = this.tableInfo.gamestatistic.roundId;

              const history = this.tableInfo.gamestatistic.loHistory;
              const chart = this.tableInfo.gamestatistic.loChart;

              this.listShow.updateList(history.show);
              this.listNoShow.updateList(history.noShow);
              this.listHot.updateList(history.hot);
              this.listCold.updateList(history.cold);

              this.chartPeriodChange(this.chartPeriodIndex);
            }
          }

          this.changeLang();
        }
      }

      public destroy() {
        super.destroy();
      }
    }
  }
}
