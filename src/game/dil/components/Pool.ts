namespace we {
  export namespace dil {
    export class Pool extends ui.Panel {
      protected tableInfo: data.TableInfo;

      public _SUM_3Percent: ui.RunTimeLabel;
      public _SUM_4Percent: ui.RunTimeLabel;
      public _SUM_5Percent: ui.RunTimeLabel;
      public _SUM_6Percent: ui.RunTimeLabel;
      public _SUM_7Percent: ui.RunTimeLabel;
      public _SUM_8Percent: ui.RunTimeLabel;
      public _SUM_9Percent: ui.RunTimeLabel;
      public _SUM_10Percent: ui.RunTimeLabel;
      public _SUM_11Percent: ui.RunTimeLabel;
      public _SUM_12Percent: ui.RunTimeLabel;
      public _SUM_13Percent: ui.RunTimeLabel;
      public _SUM_14Percent: ui.RunTimeLabel;
      public _SUM_15Percent: ui.RunTimeLabel;
      public _SUM_16Percent: ui.RunTimeLabel;
      public _SUM_17Percent: ui.RunTimeLabel;
      public _SUM_18Percent: ui.RunTimeLabel;

      public _betInfo: any;

      protected _horizontalBarChart1: we.di.HorizontalBarChart;//desktop:3~10
      protected _horizontalBarChart2: we.di.HorizontalBarChart;//desktop:11~18

      
      public constructor(skin: string = null) {
        super(skin);
      }
      protected mount() {
        if (env.isMobile ===false) {
          console.log('desktop')// desktop
          this._horizontalBarChart1 = new we.di.HorizontalBarChart();
          this._horizontalBarChart2 = new we.di.HorizontalBarChart();
          this._horizontalBarChart1.setChartStyles(
            [
              [[0xd7d93b, 0xd7d93b], [1, 1], [0, 255], 0,1],
              [[0xd98c20, 0xd98c20], [1, 1], [0, 255], 0,1],
              [[0xd94341, 0xd94341], [1, 1], [0, 255], 0,1],
              [[0xd93b96, 0xd93b96], [1, 1], [0, 255], 0,1],
              [[0xa73ad9, 0xa73ad9], [1, 1], [0, 255], 0,1],
              [[0x1c75d9, 0x1c75d9], [1, 1], [0, 255], 0,1],
              [[0x3cd9cd, 0x3cd9cd], [1, 1], [0, 255], 0,1],
              [[0x36d943, 0x36d943], [1, 1], [0, 255], 0,1],
              [[0xffe6bd, 0x9b6d34], [1, 1], [0, 255], 0,0],
              [[0xffe6bd, 0x9b6d34], [1, 1], [0, 255], 0,0],
            ],
            160,
            20,
            8
          );
          this._horizontalBarChart2.setChartStyles(
            [
              [[0x36d943, 0x36d943], [1, 1], [0, 255], 0,1],
              [[0x3cd9cd, 0x3cd9cd], [1, 1], [0, 255], 0,1],
              [[0x1c75d9, 0x1c75d9], [1, 1], [0, 255], 0,1],
              [[0xa73ad9, 0xa73ad9], [1, 1], [0, 255], 0,1],
              [[0xd93b96, 0xd93b96], [1, 1], [0, 255], 0,1],
              [[0xd94341, 0xd94341], [1, 1], [0, 255], 0,1],
              [[0x3cd9cd, 0x3cd9cd], [1, 1], [0, 255], 0,1],
              [[0xd98c20, 0xd98c20], [1, 1], [0, 255], 0,1],
              [[0xd7d93b, 0xd7d93b], [1, 1], [0, 255], 0,0],
              [[0xffe6bd, 0x9b6d34], [1, 1], [0, 255], 0,0],
            ],
            160,
            20,
            8
          );
          this._horizontalBarChart1.x = 62;
          this._horizontalBarChart1.y = 20;  
          this._horizontalBarChart2.x = 348;
          this._horizontalBarChart2.y = 20;  
          this.addChild(this._horizontalBarChart1);
          this.addChild(this._horizontalBarChart2);    

        } else {
          if ( env.orientation === 'landscape') {
            console.log('landscape') //landscape
          } else {
            console.log('portrait') //portrait
          }
        }
      }

      public setValue(tableInfo: data.TableInfo) { //called when bet start
        this.tableInfo = tableInfo;
        console.log('setValue', this.tableInfo)
        this._betInfo = this.tableInfo.betInfo;
        // update bar chart 
        this.updateBarChart();

      }

      // update bat chart when bet info update
       public updateTableBetInfo() {
        this._betInfo = this.tableInfo.betInfo;
        console.log('updateTableBetInfo::this.tableInfo.betInfo',this.tableInfo.betInfo)
        this.updateBarChart();  

    
        logger.l(utils.LogTarget.DEBUG, JSON.stringify(this.tableInfo.betInfo.count));
        logger.l(utils.LogTarget.DEBUG, JSON.stringify(this.tableInfo.betInfo.amount));
      }     

      public updateBarChart() {
        console.log('updateBarChart:: hi')
        if (this._betInfo) {
          const arr =['SUM_3','SUM_4',
                      'SUM_5','SUM_6',
                      'SUM_7','SUM_8',
                      'SUM_9','SUM_10',
                      'SUM_11','SUM_12',
                      'SUM_13','SUM_14',
                      'SUM_15','SUM_16',
                      'SUM_17','SUM_18'];
          const amount = this._betInfo.amount;
          const amountArr = arr.map(key => {
            if (!amount[key]) {
              amount[key] = 0;
            }
            return amount[key];
          });
          for (let i = 0; i < 17; i++){
            console.log('amountArr',amountArr)
            // this[`_SUM_${i+3}Percent`].text = amount[`SUM_${i+3}`] ? we.utils.formatNumber(amount[`SUM_${i+3}`], false) : 0;
          }
        }
      }


    }
  }
}
