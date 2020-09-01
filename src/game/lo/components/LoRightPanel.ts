namespace we {
  export namespace lo {
    export class LoRightPanel extends core.BaseGamePanel {
      protected gameId: string;
      protected panelPageSelect: ui.Panel;
      protected btnPageSelect: egret.DisplayObject;
      protected txtPageSelect: ui.RunTimeLabel;
      protected overlay: eui.Group;

      protected chartStack: eui.ViewStack;
      protected chartPeriodIndex: number;

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

      // lucky time
      protected luckyTimeTitle: ui.RunTimeLabel;
      protected luckyTimeTitleValue: ui.RunTimeLabel;

      protected luckyTimeIcon1: ui.RoundRectShape;
      protected luckyTimeTxt1: ui.RunTimeLabel;
      protected luckyTimeTxtValue1: ui.RunTimeLabel;
      protected luckyTimeIcon2: ui.RoundRectShape;
      protected luckyTimeTxt2: ui.RunTimeLabel;
      protected luckyTimeTxtValue2: ui.RunTimeLabel;
      protected luckyTimeIcon3: ui.RoundRectShape;
      protected luckyTimeTxt3: ui.RunTimeLabel;
      protected luckyTimeTxtValue3: ui.RunTimeLabel;
      protected luckyTimeIcon4: ui.RoundRectShape;
      protected luckyTimeTxt4: ui.RunTimeLabel;
      protected luckyTimeTxtValue4: ui.RunTimeLabel;
      protected luckyTimeIcon5: ui.RoundRectShape;
      protected luckyTimeTxt5: ui.RunTimeLabel;
      protected luckyTimeTxtValue5: ui.RunTimeLabel;
      protected luckyTimeIcon6: ui.RoundRectShape;
      protected luckyTimeTxt6: ui.RunTimeLabel;
      protected luckyTimeTxtValue6: ui.RunTimeLabel;
      protected luckyTimeIcon7: ui.RoundRectShape;
      protected luckyTimeTxt7: ui.RunTimeLabel;
      protected luckyTimeTxtValue7: ui.RunTimeLabel;
      protected luckyTimeIcon8: ui.RoundRectShape;
      protected luckyTimeTxt8: ui.RunTimeLabel;
      protected luckyTimeTxtValue8: ui.RunTimeLabel;
      protected luckyTimeIcon9: ui.RoundRectShape;
      protected luckyTimeTxt9: ui.RunTimeLabel;
      protected luckyTimeTxtValue9: ui.RunTimeLabel;
      protected luckyTimeIcon10: ui.RoundRectShape;
      protected luckyTimeTxt10: ui.RunTimeLabel;
      protected luckyTimeTxtValue10: ui.RunTimeLabel;

      // lucky Game
      protected luckyGameTitle: ui.RunTimeLabel;
      protected luckyGameTitleValue: ui.RunTimeLabel;

      protected luckyGameIcon1: ui.RoundRectShape;
      protected luckyGameTxt1: ui.RunTimeLabel;
      protected luckyGameTxtValue1: ui.RunTimeLabel;
      protected luckyGameIcon2: ui.RoundRectShape;
      protected luckyGameTxt2: ui.RunTimeLabel;
      protected luckyGameTxtValue2: ui.RunTimeLabel;
      protected luckyGameIcon3: ui.RoundRectShape;
      protected luckyGameTxt3: ui.RunTimeLabel;
      protected luckyGameTxtValue3: ui.RunTimeLabel;
      protected luckyGameIcon4: ui.RoundRectShape;
      protected luckyGameTxt4: ui.RunTimeLabel;
      protected luckyGameTxtValue4: ui.RunTimeLabel;
      protected luckyGameIcon5: ui.RoundRectShape;
      protected luckyGameTxt5: ui.RunTimeLabel;
      protected luckyGameTxtValue5: ui.RunTimeLabel;
      protected luckyGameIcon6: ui.RoundRectShape;
      protected luckyGameTxt6: ui.RunTimeLabel;
      protected luckyGameTxtValue6: ui.RunTimeLabel;
      protected luckyGameIcon7: ui.RoundRectShape;
      protected luckyGameTxt7: ui.RunTimeLabel;
      protected luckyGameTxtValue7: ui.RunTimeLabel;
      protected luckyGameIcon8: ui.RoundRectShape;
      protected luckyGameTxt8: ui.RunTimeLabel;
      protected luckyGameTxtValue8: ui.RunTimeLabel;
      protected luckyGameIcon9: ui.RoundRectShape;
      protected luckyGameTxt9: ui.RunTimeLabel;
      protected luckyGameTxtValue9: ui.RunTimeLabel;
      protected luckyGameIcon10: ui.RoundRectShape;
      protected luckyGameTxt10: ui.RunTimeLabel;
      protected luckyGameTxtValue10: ui.RunTimeLabel;

      // fav bet
      protected favBetTxt1: ui.RunTimeLabel;
      protected favBetTxtValue1: ui.RunTimeLabel;
      protected favBetTxt2: ui.RunTimeLabel;
      protected favBetTxtValue2: ui.RunTimeLabel;
      protected favBetTxt3: ui.RunTimeLabel;
      protected favBetTxtValue3: ui.RunTimeLabel;
      protected favBetTxt4: ui.RunTimeLabel;
      protected favBetTxtValue4: ui.RunTimeLabel;
      protected favBetTxt5: ui.RunTimeLabel;
      protected favBetTxtValue5: ui.RunTimeLabel;
      protected favBetTxt6: ui.RunTimeLabel;
      protected favBetTxtValue6: ui.RunTimeLabel;

      // fav game
      protected favGameTxtPercent1: ui.RunTimeLabel;
      protected favGameTxt1: ui.RunTimeLabel;
      protected favGameTxtValue1: ui.RunTimeLabel;
      protected favGameTxtPercent2: ui.RunTimeLabel;
      protected favGameTxt2: ui.RunTimeLabel;
      protected favGameTxtValue2: ui.RunTimeLabel;
      protected favGameTxtPercent3: ui.RunTimeLabel;
      protected favGameTxt3: ui.RunTimeLabel;
      protected favGameTxtValue3: ui.RunTimeLabel;
      protected favGameTxtPercent4: ui.RunTimeLabel;
      protected favGameTxt4: ui.RunTimeLabel;
      protected favGameTxtValue4: ui.RunTimeLabel;
      protected favGameTxtPercent5: ui.RunTimeLabel;
      protected favGameTxt5: ui.RunTimeLabel;
      protected favGameTxtValue5: ui.RunTimeLabel;

      protected chartPeriodNames: string[] = ['day', 'pday', 'week', 'pweek', 'month', 'pmonth'];
      protected chartTypeNames: string[] = ['lucky_time', 'lucky_game', 'fav_bet', 'fav_game'];

      public constructor(skin?: string) {
        super(skin ? skin : env.isMobile ? '' : 'LoRightPanel');
      }

      public changeLang() {
        this.chartPeriodBtn1['labelDisplayDown']['text'] = this.chartPeriodBtn1['labelDisplayUp']['text'] = 'Day';
        this.chartPeriodBtn2['labelDisplayDown']['text'] = this.chartPeriodBtn2['labelDisplayUp']['text'] = 'pDay';
        this.chartPeriodBtn3['labelDisplayDown']['text'] = this.chartPeriodBtn3['labelDisplayUp']['text'] = 'Week';
        this.chartPeriodBtn4['labelDisplayDown']['text'] = this.chartPeriodBtn4['labelDisplayUp']['text'] = 'pWeek';
        this.chartPeriodBtn5['labelDisplayDown']['text'] = this.chartPeriodBtn5['labelDisplayUp']['text'] = 'Mon';
        this.chartPeriodBtn6['labelDisplayDown']['text'] = this.chartPeriodBtn6['labelDisplayUp']['text'] = 'pMon';
      }
      protected init() {
        this.chartPeriodIndex = 0;

        const arrColRoadTypes = new eui.ArrayCollection([
          ui.NewDropdownItem(0, () => `lucky time`),
          ui.NewDropdownItem(1, () => `lucky game`),
          ui.NewDropdownItem(2, () => `fav bet`),
          ui.NewDropdownItem(3, () => `fav game`),
        ]);
        this.panelPageSelect.isDropdown = true;
        this.panelPageSelect.isPoppable = true;
        this.panelPageSelect.dismissOnClickOutside = true;
        this.panelPageSelect.setToggler(this.btnPageSelect);
        this.panelPageSelect.dropdown.review = this.txtPageSelect;
        this.panelPageSelect.dropdown.data.replaceAll(arrColRoadTypes.source);
        this.panelPageSelect.dropdown.select(0);
        this.panelPageSelect.addEventListener('DROPDOWN_ITEM_CHANGE', this.onChartTypesSelect, this);

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
          50,
          107,
          0
        );
        this._bestTimePieChart.x = 295;
        this._bestTimePieChart.y = 192;
        // add road to page stack 1
        const page1Group = this.chartStack.getChildAt(0) as eui.Group;
        page1Group.addChild(this._bestTimePieChart);

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
          50,
          107,
          0
        );
        this._bestGamePieChart.x = 295;
        this._bestGamePieChart.y = 192;
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
          768,
          16,
          26
        );
        this._favBetBarChart.x = 175;
        this._favBetBarChart.y = 81;
        this.addChild(this._favBetBarChart);
        // add road to page stack 3
        const page3Group = this.chartStack.getChildAt(2) as eui.Group;
        page3Group.addChild(this._favBetBarChart);

        this._favGameBarChart = new we.di.SlopedBarChart();
        this._favGameBarChart.x = 8;
        this._favGameBarChart.y = 72;
        this._favGameBarChart.setChartStyles(
          [
            [[0x2552fc, 0x5ad9ff], [1, 1], [0, 255], 0],
            [[0xe4e85c, 0x1fe479], [1, 1], [0, 255], 0],
            [[0xfc2424, 0xfa936e], [1, 1], [0, 255], 0],
            [[0x2552fc, 0x5ad9ff], [1, 1], [0, 255], 0],
            [[0xe4e85c, 0x1fe479], [1, 1], [0, 255], 0],
            [[0xfc2424, 0xfa936e], [1, 1], [0, 255], 0],
          ],
          188,
          198,
          4
        );
        this.addChild(this._favGameBarChart);
        // add road to page stack 4
        const page4Group = this.chartStack.getChildAt(3) as eui.Group;
        page4Group.addChildAt(this._favGameBarChart, 0);

        this.chartPeriodBtn1.addEventListener(eui.UIEvent.CHANGE, this.onChartPeriodIndexChange, this);
        this.chartPeriodBtn2.addEventListener(eui.UIEvent.CHANGE, this.onChartPeriodIndexChange, this);
        this.chartPeriodBtn3.addEventListener(eui.UIEvent.CHANGE, this.onChartPeriodIndexChange, this);
        this.chartPeriodBtn4.addEventListener(eui.UIEvent.CHANGE, this.onChartPeriodIndexChange, this);
        this.chartPeriodBtn5.addEventListener(eui.UIEvent.CHANGE, this.onChartPeriodIndexChange, this);
        this.chartPeriodBtn6.addEventListener(eui.UIEvent.CHANGE, this.onChartPeriodIndexChange, this);
      }

      protected onChartPeriodIndexChange(e: eui.UIEvent) {
        const radio: eui.RadioButton = e.target;
        this.chartPeriodChange(radio.value);
      }
      protected chartPeriodChange(i: number) {
        this.chartPeriodIndex = i - 0;
        let count = 0;
        if (this.tableInfo.gamestatistic) {
          // chart1
          let chatType = this.tableInfo.gamestatistic.loChart[this.chartTypeNames[0]];
          let d = chatType[this.chartPeriodNames[this.chartPeriodIndex]];
          let ranks = [];
          count = 0;
          if (d.length > 0) {
            d.forEach(element => {
              count++;
              this['luckyTimeTxt' + count].text = element.key;
              this['luckyTimeTxtValue' + count].text = element.value;
              ranks.push(element.value);
            });
            this._bestTimePieChart.setRanksAndAnimate(ranks, -1);
            this.luckyTimeTitleValue.text = d[0].key + '';
          }

          // chart2
          chatType = this.tableInfo.gamestatistic.loChart[this.chartTypeNames[1]];
          d = chatType[this.chartPeriodNames[this.chartPeriodIndex]];
          ranks = [];
          count = 0;
          if (d.length > 0) {
            d.forEach(element => {
              count++;
              this['luckyGameTxt' + count].text = element.key;
              this['luckyGameTxtValue' + count].text = element.value;
              ranks.push(element.value);
            });
            this._bestGamePieChart.setRanksAndAnimate(ranks, -1);
            this.luckyGameTitleValue.text = d[0].key + '';
          }

          // chart3
          chatType = this.tableInfo.gamestatistic.loChart[this.chartTypeNames[2]];
          d = chatType[this.chartPeriodNames[this.chartPeriodIndex]];
          ranks = [];
          count = 0;
          if (d.length > 0) {
            d.forEach(element => {
              count++;
              ranks.push(element.value);
            });
            this._favBetBarChart.setRanksAndAnimate(ranks, -1);
          }

          // chart4
          chatType = this.tableInfo.gamestatistic.loChart[this.chartTypeNames[3]];
          d = chatType[this.chartPeriodNames[this.chartPeriodIndex]];
          ranks = [];
          count = 0;
          if (d.length > 0) {
            d.forEach(element => {
              count++;
              ranks.push(element.value);
            });
            this._favGameBarChart.setRanksAndAnimate(ranks, -1);
          }
        }
        this.checkChartData();
      }

      private onChartTypesSelect(e) {
        const chartTypeIndex = e.data;
        this.panelPageSelect && this.panelPageSelect.dropdown.select(chartTypeIndex);
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

      public update() {
        if (this.tableInfo) {
          if (this.tableInfo.betInfo) {
            this.changeLang();
          }

          if (this.tableInfo.gamestatistic) {
            if (this.gameId !== this.tableInfo.gamestatistic.roundId) {
              this.gameId = this.tableInfo.gamestatistic.roundId;

              const history = this.tableInfo.gamestatistic.loHistory;
              const chart = this.tableInfo.gamestatistic.loChart;

              this.chartPeriodChange(this.chartPeriodIndex);

              this.changeLang();
            }
          }
        }
      }

      public destroy() {
        super.destroy();
      }
    }
  }
}
