namespace we {
  export namespace lw {
    export class StatisticChartPanel extends ui.Panel {
      protected tableInfo: data.TableInfo;
      // public _progress_East: lw.StatisticChartPanelBar;
      // public _progress_South: lw.StatisticChartPanelBar;
      // public _progress_West: lw.StatisticChartPanelBar;
      // public _progress_North: lw.StatisticChartPanelBar;
      // public _progress_White: lw.StatisticChartPanelBar;
      // public _progress_Red: lw.StatisticChartPanelBar;
      // public _progress_Green: lw.StatisticChartPanelBar;
      // public _lbl_East: ui.RunTimeLabel;
      // public _lbl_South: ui.RunTimeLabel;
      // public _lbl_West: ui.RunTimeLabel;
      // public _lbl_North: ui.RunTimeLabel;
      // public _lbl_White: ui.RunTimeLabel;
      // public _lbl_Red: ui.RunTimeLabel;
      // public _lbl_Green: ui.RunTimeLabel;
      public _lbl_lwValue0: ui.RunTimeLabel;
      public _lbl_lwValue1: ui.RunTimeLabel;
      public _lbl_lwValue2: ui.RunTimeLabel;
      public _lbl_lwValue3: ui.RunTimeLabel;
      public _lbl_lwValue4: ui.RunTimeLabel;
      public _lbl_lwValue5: ui.RunTimeLabel;
      public _lbl_lwValue6: ui.RunTimeLabel;
      public _betInfo: any;

      protected _horizontalBarChart1: we.di.HorizontalBarChart;//p:east,south,west,north l:east,south,west
      protected _horizontalBarChart2: we.di.HorizontalBarChart;//p:white,red,green l:north,white
      protected _horizontalBarChart3: we.di.HorizontalBarChart;//l:red,green

      public constructor(skin?: string) {
        super(skin ? skin : env.isMobile ? '' : 'lw.StatisticChartPanel');

      }

      public mount() {
        if (env.orientation === 'portrait') { //portrait
          this._horizontalBarChart1 = new we.di.HorizontalBarChart();
          this._horizontalBarChart2 = new we.di.HorizontalBarChart();
          this._horizontalBarChart1.setChartStyles(
            [
              [[0x2c77cc, 0x2c77cc], [1, 1], [0, 255], 0,1],
              [[0x528f5b, 0x528f5b], [1, 1], [0, 255], 0,1],
              [[0xe99744, 0xe99744], [1, 1], [0, 255], 0,1],
              [[0xd95139, 0xd95139], [1, 1], [0, 255], 0,1],
              [[0xffe6bd, 0x9b6d34], [1, 1], [0, 255], 0,0],
              [[0xffe6bd, 0x9b6d34], [1, 1], [0, 255], 0,0],
              [[0xffe6bd, 0x9b6d34], [1, 1], [0, 255], 0,0],
              [[0xffe6bd, 0x9b6d34], [1, 1], [0, 255], 0,0],
              [[0xffe6bd, 0x9b6d34], [1, 1], [0, 255], 0,0],
              [[0xffe6bd, 0x9b6d34], [1, 1], [0, 255], 0,0],
            ],
            547,
            26,
            89
          );
          this._horizontalBarChart2.setChartStyles(
            [
              [[0xb750c5, 0xb750c5], [1, 1], [0, 255], 0,1],
              [[0xffe6bd, 0x9b6d34], [1, 1], [0, 255], 0,1],
              [[0xffe6bd, 0x9b6d34], [1, 1], [0, 255], 0,1],
              [[0x2c77cc, 0x2c77cc], [1, 1], [0, 255], 0,0],
              [[0x528f5b, 0x528f5b], [1, 1], [0, 255], 0,0],
              [[0xe99744, 0xe99744], [1, 1], [0, 255], 0,0],
              [[0xd95139, 0xd95139], [1, 1], [0, 255], 0,0],
              [[0xffe6bd, 0x9b6d34], [1, 1], [0, 255], 0,0],
              [[0xffe6bd, 0x9b6d34], [1, 1], [0, 255], 0,0],
              [[0xffe6bd, 0x9b6d34], [1, 1], [0, 255], 0,0],
            ],
            547,
            26,
            89
          );
          this._horizontalBarChart1.x = 43;
          this._horizontalBarChart1.y = 111;  
          this._horizontalBarChart2.x = 648;
          this._horizontalBarChart2.y = 111;  
          this.addChild(this._horizontalBarChart1);
          this.addChild(this._horizontalBarChart2);    

        } else if (env.orientation === 'landscape') {//landscape
          this._horizontalBarChart1 = new we.di.HorizontalBarChart();
          this._horizontalBarChart2 = new we.di.HorizontalBarChart();
          this._horizontalBarChart3 = new we.di.HorizontalBarChart();
          this._horizontalBarChart1.setChartStyles(
            [
              [[0x2c77cc, 0x2c77cc], [1, 1], [0, 255], 0,1],
              [[0x528f5b, 0x528f5b], [1, 1], [0, 255], 0,1],
              [[0xe99744, 0xe99744], [1, 1], [0, 255], 0,1],
              [[0xd95139, 0xd95139], [1, 1], [0, 255], 0,0],
              [[0xffe6bd, 0x9b6d34], [1, 1], [0, 255], 0,0],
              [[0xffe6bd, 0x9b6d34], [1, 1], [0, 255], 0,0],
              [[0xffe6bd, 0x9b6d34], [1, 1], [0, 255], 0,0],
              [[0xffe6bd, 0x9b6d34], [1, 1], [0, 255], 0,0],
              [[0xffe6bd, 0x9b6d34], [1, 1], [0, 255], 0,0],
              [[0xffe6bd, 0x9b6d34], [1, 1], [0, 255], 0,0],
            ],
            300,
            26,
            62
          );
          this._horizontalBarChart2.setChartStyles(
            [
              [[0xd95139, 0xd95139], [1, 1], [0, 255], 0,1],
              [[0xb750c5, 0xb750c5], [1, 1], [0, 255], 0,1],
              [[0x2c77cc, 0x2c77cc], [1, 1], [0, 255], 0,0],
              [[0x528f5b, 0x528f5b], [1, 1], [0, 255], 0,0],
              [[0xe99744, 0xe99744], [1, 1], [0, 255], 0,0],
              [[0xffe6bd, 0x9b6d34], [1, 1], [0, 255], 0,0],
              [[0xffe6bd, 0x9b6d34], [1, 1], [0, 255], 0,0],
              [[0xffe6bd, 0x9b6d34], [1, 1], [0, 255], 0,0],
              [[0xffe6bd, 0x9b6d34], [1, 1], [0, 255], 0,0],
              [[0xffe6bd, 0x9b6d34], [1, 1], [0, 255], 0,0],
            ],
            300,
            26,
            62
          );
          this._horizontalBarChart3.setChartStyles(
            [
              [[0xffe6bd, 0x9b6d34], [1, 1], [0, 255], 0,1],
              [[0xffe6bd, 0x9b6d34], [1, 1], [0, 255], 0,1],
              [[0x2c77cc, 0x2c77cc], [1, 1], [0, 255], 0,0],
              [[0x528f5b, 0x528f5b], [1, 1], [0, 255], 0,0],
              [[0xe99744, 0xe99744], [1, 1], [0, 255], 0,0],
              [[0xd95139, 0xd95139], [1, 1], [0, 255], 0,0],
              [[0xffe6bd, 0x9b6d34], [1, 1], [0, 255], 0,0],
              [[0xffe6bd, 0x9b6d34], [1, 1], [0, 255], 0,0],
              [[0xffe6bd, 0x9b6d34], [1, 1], [0, 255], 0,0],
              [[0xffe6bd, 0x9b6d34], [1, 1], [0, 255], 0,0],
            ],
            300,
            26,
            62
          );
          this._horizontalBarChart1.x = 31;
          this._horizontalBarChart1.y = 56;  
          this._horizontalBarChart2.x = 391;
          this._horizontalBarChart2.y = 56;  
          this._horizontalBarChart3.x = 751;
          this._horizontalBarChart3.y = 56;  
          this.addChild(this._horizontalBarChart1);
          this.addChild(this._horizontalBarChart2);    
          this.addChild(this._horizontalBarChart3); 
        }
        // this._progress_East.setProgress(0.05);
        // this._progress_South.setProgress(0.2);
        // this._progress_West.setProgress(0.5);
        // this._progress_North.setProgress(0.6);
        // this._progress_White.setProgress(0.8);
        // this._progress_Red.setProgress(0.95);
        // this._progress_Green.setProgress(1);
      }

      public setValue(tableInfo: data.TableInfo) { //called when bet start
        this.tableInfo = tableInfo;
        console.log('this.tableinfo',this.tableInfo)
        this._betInfo = this.tableInfo.betInfo;
        // update bar chart 
        this.updateBarChart();

      }

      // update bat chart when bet info update
       public updateTableBetInfo() {
        this._betInfo = this.tableInfo.betInfo;
        console.log('this._betInfo = this.tableInfo.betInfo',this.tableInfo.betInfo)
        this.updateBarChart();  

    
        logger.l(utils.LogTarget.DEBUG, JSON.stringify(this.tableInfo.betInfo.count));
        logger.l(utils.LogTarget.DEBUG, JSON.stringify(this.tableInfo.betInfo.amount));
      }     
      // update bar chart method
      public updateBarChart() {
        
        if (this._betInfo) {
          console.log('updatebarchart:::',this._betInfo)
          const arr = ['LW_0', 'LW_1', 'LW_2', 'LW_3', 'LW_4', 'LW_5', 'LW_6'];
          const amount = this._betInfo.amount;
          const amountArr = arr.map(key => {
            if (!amount[key]) {
              amount[key] = 0;
            }
            return amount[key];
          });
          for (let i = 0; i < 7; i += 1) {
            this[`_lbl_lwValue${i}`].text = amount[`LW_${i}`] ? we.utils.formatNumber(amount[`LW_${i}`], false) : 0;
          }
          if (env.orientation === 'portrait') { //portrait
            const newarr = [amountArr[4],amountArr[5],amountArr[6],amountArr[0],amountArr[1],amountArr[2],amountArr[3]]  
            this._horizontalBarChart1.setRanksAndAnimate(amountArr);
            this._horizontalBarChart2.setRanksAndAnimate(newarr);     
          } else if (env.orientation === 'landscape' ) {//landscape
            const newarr1 = [amountArr[3],amountArr[4],amountArr[5],amountArr[6],amountArr[0],amountArr[1],amountArr[2]];
            const newarr2 = [amountArr[5],amountArr[6],amountArr[0],amountArr[1],amountArr[2],amountArr[3],amountArr[4]];
            this._horizontalBarChart1.setRanksAndAnimate(amountArr);
            this._horizontalBarChart2.setRanksAndAnimate(newarr1);    
            this._horizontalBarChart3.setRanksAndAnimate(newarr2);
          }
        }
      }

    }
  }
}
