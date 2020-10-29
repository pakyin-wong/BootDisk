// TypeScript file
namespace we {
  export namespace lo {
    export class StatisticChartPanel extends ui.Panel {
      protected tableInfo: data.TableInfo;

      protected chartStack: eui.ViewStack;

      protected noDataOverlay: eui.Group;
      protected loadingOverlay: eui.Group;

      protected chartTypeNames: string[] = ['lucky_time', 'lucky_game', 'fav_bet', 'fav_game'];
      protected chartPeriodNames: string[] = ['day', 'pday', 'week', 'pweek', 'month', 'pmonth'];
      protected chartTypeMapping: number[] = [2, 3, 0, 1];

      protected chartPeriodIndex: number;
      protected chartTypeIndex: number;

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

      protected pType: ui.RunTimeLabel;

      public constructor() {
        super();
      }

      protected mount() {
        super.mount();
        this.initTypeSelector();
      }

      public setTableInfo(tableInfo: data.TableInfo) {
        this.tableInfo = tableInfo;

        if (!this.tableInfo.gamestatistic) {
          return;
        } else {
          this.init();
        }
      }

      protected init() {
        this.chartPeriodIndex = 0;
        this.chartTypeIndex = 0;
        this.loadingOverlay.visible = true;

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
          118,
          236,
          0
        );
        this._bestTimePieChart.x = 50;
        this._bestTimePieChart.y = 30;
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
          118,
          236,
          0
        );
        this._bestGamePieChart.x = 50;
        this._bestGamePieChart.y = 30;
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
          800,
          30,
          34
        );
        this._favBetBarChart.x = 300;
        this._favBetBarChart.y = 36;
        this.addChild(this._favBetBarChart);
        // add road to page stack 3
        const page3Group = this.chartStack.getChildAt(2) as eui.Group;
        page3Group.addChild(this._favBetBarChart);

        this._favGameBarChart = new we.di.SlopedBarChart();
        this._favGameBarChart.x = 9;
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
          270,
          240,
          6
        );
        this._favGameBarChart.setRanksAndAnimate([80, 50, 30, 20, 10]);
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

        const filter = { operatorID: 'IBC-sjfbshd', timeFilter: '', typeFilter: 2 }; // typeFilter 0: favourite bet, 1: favourite game, 2: lucky time, 3: lucky game
        dir.evtHandler.addEventListener(core.Event.PLAYER_LOTTERY_STAT, this.onPlayerLotteryStatisticUpdate, this);
        dir.socket.getPlayerLotteryStatistic(filter);

        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        this.changeLang();
      }

      protected destroy() {
        super.destroy();

        this.chartPeriodBtn1.removeEventListener(eui.UIEvent.CHANGE, this.onChartPeriodIndexChange, this);
        this.chartPeriodBtn2.removeEventListener(eui.UIEvent.CHANGE, this.onChartPeriodIndexChange, this);
        this.chartPeriodBtn3.removeEventListener(eui.UIEvent.CHANGE, this.onChartPeriodIndexChange, this);
        this.chartPeriodBtn4.removeEventListener(eui.UIEvent.CHANGE, this.onChartPeriodIndexChange, this);
        this.chartPeriodBtn5.removeEventListener(eui.UIEvent.CHANGE, this.onChartPeriodIndexChange, this);
        this.chartPeriodBtn6.removeEventListener(eui.UIEvent.CHANGE, this.onChartPeriodIndexChange, this);

        dir.evtHandler.removeEventListener(core.Event.PLAYER_LOTTERY_STAT, this.onPlayerLotteryStatisticUpdate, this);
        dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
      }

      protected onChartPeriodIndexChange(e: eui.UIEvent) {
        const radio: eui.RadioButton = e.target;
        this.chartPeriodIndex = radio.value - 0;
        this.readPlayerLotteryResult();
      }

      protected readPlayerLotteryResult() {
        this.noDataOverlay.visible = true;
        const chartData = env.playerLotteryStat;
        let d = [];
        let ranks = [];
        let count = 0;
        let i = 0;
        if (this.chartTypeIndex === 0) {
          // chart1
          d = chartData[this.chartPeriodNames[this.chartPeriodIndex]].dataarrayList;
          ranks = [];
          for (i = 0; i < 10; i++) {
            this['luckyTimeTxt' + (i + 1)].text = '-';
          }
          if (d.length > 0) {
            d.forEach(element => {
              count++;
              this['luckyTimeTxt' + count].text = element.key;
              ranks.push(element.value);
            });
            this._bestTimePieChart.setRanksAndAnimate(ranks, -1);
            this['luckyTimeTitleValue'].text = d[0].key + '';
          }
        } else if (this.chartTypeIndex === 1) {
          // chart2
          d = chartData[this.chartPeriodNames[this.chartPeriodIndex]].dataarrayList;
          ranks = [];
          for (i = 0; i < 10; i++) {
            this['luckyGameTxt' + (i + 1)].text = '-';
          }
          if (d.length > 0) {
            d.forEach(element => {
              count++;
              this['luckyGameTxt' + count].text = element.key;
              ranks.push(element.value);
            });
            this['luckyGameTitleValue'].text = d[0].key;
            this._bestGamePieChart.setRanksAndAnimate(ranks, -1);
          }
        } else if (this.chartTypeIndex === 2) {
          // chart3
          d = chartData[this.chartPeriodNames[this.chartPeriodIndex]].dataarrayList;
          ranks = [0, 0, 0, 0, 0, 0];
          for (i = 0; i < 6; i++) {
            this['favBetTxt' + (i + 1)].text = '-';
            this['favBetTxtValue' + (i + 1)].text = '-';
          }
          if (d.length > 0) {
            d.forEach(element => {
              count++;
              this['favBetTxt' + count].text = element.key;
              this['favBetTxtValue' + count].text = element.value;
              ranks[count - 1] = element.value;
            });
            this._favBetBarChart.setRanksAndAnimate(ranks, -1);
          }
        } else if (this.chartTypeIndex === 3) {
          // chart4
          d = chartData[this.chartPeriodNames[this.chartPeriodIndex]].dataarrayList;
          ranks = [];
          for (i = 0; i < 5; i++) {
            this['favGameTxtPercent' + (i + 1)].text = '';
            this['favGameTxt' + (i + 1)].text = '';
            this['favGameTxtValue' + (i + 1)].text = '';
          }
          if (d.length > 0) {
            d.forEach(element => {
              count++;
              const percent = Math.round((element.value / d[0].value) * 100);
              this['favGameTxtPercent' + count].text = percent + '%';
              this['favGameTxt' + count].text = element.key;
              this['favGameTxtValue' + count].text = element.value;
              ranks.push(element.value);
            });
            this._favGameBarChart.setRanksAndAnimate(ranks, -1);
          }
        }
        if (d.length > 0) {
          this.noDataOverlay.visible = false;
        }
      }

      protected onChartTypeChange(e) {
        this.chartTypeIndex = e.target.value - 0;
        this.chartStack.selectedIndex = e.data;

        this.loadingOverlay.visible = true;
        const filter = { operatorID: 'IBC-sjfbshd', timeFilter: '', typeFilter: this.chartTypeMapping[this.chartTypeIndex] };
        dir.socket.getPlayerLotteryStatistic(filter);
      }

      protected onPlayerLotteryStatisticUpdate(evt: egret.Event) {
        this.loadingOverlay.visible = false;
        this.readPlayerLotteryResult();
      }

      public update() {
        this.changeLang();
        if (this.tableInfo && this.tableInfo.gamestatistic) {
          this.setTableInfo(this.tableInfo);
        }
      }

      protected initTypeSelector() {
        const dropdownSource = this.chartTypeNames.map((data, index) => { 
          return ui.NewDropdownItem(index, () => `${data}`);
        });

        utils.DropdownCreator.new({
          toggler: this.pType,
          review: this.pType,
          arrCol: new eui.ArrayCollection(dropdownSource),
          title: () => `${this.chartTypeNames.length > 0 ? this.chartTypeNames[0] : ''}`,
          selected: 0,
        });
        // this.updateBetLimit(selectedIndex);

        this.pType.addEventListener('DROPDOWN_ITEM_CHANGE', this.onChartTypeChange, this);
      }

      public changeLang() {
        this.chartPeriodBtn1['labelDisplayDown']['text'] = this.chartPeriodBtn1['labelDisplayUp']['text'] = 'Day';
        this.chartPeriodBtn2['labelDisplayDown']['text'] = this.chartPeriodBtn2['labelDisplayUp']['text'] = 'pDay';
        this.chartPeriodBtn3['labelDisplayDown']['text'] = this.chartPeriodBtn3['labelDisplayUp']['text'] = 'Week';
        this.chartPeriodBtn4['labelDisplayDown']['text'] = this.chartPeriodBtn4['labelDisplayUp']['text'] = 'pWeek';
        this.chartPeriodBtn5['labelDisplayDown']['text'] = this.chartPeriodBtn5['labelDisplayUp']['text'] = 'Mon';
        this.chartPeriodBtn6['labelDisplayDown']['text'] = this.chartPeriodBtn6['labelDisplayUp']['text'] = 'pMon';
      }
    }
  }
}
