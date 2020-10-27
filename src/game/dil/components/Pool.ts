namespace we {
  export namespace dil {
    export class Pool extends ui.Panel {
      protected TableInfo: data.TableInfo;

      public _sum3Percent: ui.RunTimeLabel;
      public _sum4Percent: ui.RunTimeLabel;
      public _sum5Percent: ui.RunTimeLabel;
      public _sum6Percent: ui.RunTimeLabel;
      public _sum7Percent: ui.RunTimeLabel;
      public _sum8Percent: ui.RunTimeLabel;
      public _sum9Percent: ui.RunTimeLabel;
      public _sum10Percent: ui.RunTimeLabel;
      public _sum11Percent: ui.RunTimeLabel;
      public _sum12Percent: ui.RunTimeLabel;
      public _sum13Percent: ui.RunTimeLabel;
      public _sum14Percent: ui.RunTimeLabel;
      public _sum15Percent: ui.RunTimeLabel;
      public _sum16Percent: ui.RunTimeLabel;
      public _sum17Percent: ui.RunTimeLabel;
      public _sum18Percent: ui.RunTimeLabel;

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
    }
  }
}
