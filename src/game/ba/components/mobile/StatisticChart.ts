namespace we {
  export namespace ba {
    export class StatisticChart extends core.BaseEUI {
      public tableId: string;

      protected _content: eui.Group;
      protected containerDisplay: egret.Bitmap;
      protected containerRT: egret.RenderTexture;

      protected _title: ui.RunTimeLabel;
      protected _icon: eui.Group;
      protected _icon_pair: eui.Group;

      public firstCount: number = 0;
      public secondCount: number = 0;
      public thirdCount: number = 0;

      // updated when isPairChart === true 
      public fourthCount: number = 0; 

      public firstPercentage: number = 0;
      public secondPercentage: number = 0;
      public thirdPercentage: number = 0;

      // updated when isPairChart === true 
      public fourthPercentage: number = 0; 

      public total: number = 0;
      public chart: ui.SimpleChart;
      public pairChart: ui.MultipleChart;
      public isGrey: boolean = false;

      protected _firstCountLabel: eui.Label;
      protected _firstPercentageLabel: eui.Label;

      protected _secondCountLabel: eui.Label;
      protected _secondPercentageLabel: eui.Label;

      protected _thirdCountLabel: eui.Label;
      protected _thirdPercentageLabel: eui.Label;

      protected _totalLabel: eui.Label;

      protected _thirdColor: number = 0x1f86c;

      // true in Pair Chart
      protected _isPairChart: boolean = false; 

      public constructor(skin) {
        super('ba.StatisticChart', false);
        this.orientationDependent = false;
        this.cacheAsBitmap = true;
      }

      public set isPairChart(value: boolean) {
        this._isPairChart = value;
      }

      public set thirdColor(value: number) {
        this._thirdColor = value;
      }

      public get title(): ui.RunTimeLabel {
        return this._title;
      }

      public setMode(isShowPair: boolean) {
        this._icon_pair.visible = isShowPair;
        this._icon.visible = !isShowPair;
        this.isGrey = isShowPair;
      }

      protected mount() {
        super.mount();
        this.containerRT = new egret.RenderTexture();
        this.containerDisplay = new egret.Bitmap();
        this.containerDisplay.texture = this.containerRT;
        this.addChild(this.containerDisplay);
        if (this._isPairChart === false) {
         this.update();
        } else {
             if (!env.isMobile) {
                this.pairChartUpdate(); 
             }
        }
      }

      public update() {
        this._firstCountLabel.text = this.firstCount.toString();
        this._firstPercentageLabel.text = Math.round(this.firstPercentage * 100).toString();

        this._secondCountLabel.text = this.secondCount.toString();
        this._secondPercentageLabel.text = Math.round(this.secondPercentage * 100).toString();

        if (this._thirdCountLabel && this.thirdCount!==undefined) {
          this._thirdCountLabel.text = this.thirdCount.toString();
          this._thirdPercentageLabel.text = Math.round(this.thirdPercentage * 100).toString();
        }

        this._totalLabel.text = this.total.toString();

        this.chart.firstAngle = this.firstPercentage * 360;
        this.chart.secondAngle = this.secondPercentage * 360;
        this.chart.thirdColor = this._thirdColor;
        this.chart.drawChart(this.isGrey);

        // this.render();
      } 

      public pairChartUpdate() {
          this._firstCountLabel.text = this.firstCount.toString();
          this._firstPercentageLabel.text = Math.round(this.firstPercentage * 100).toString();

          this._secondCountLabel.text = this.secondCount.toString();
          this._secondPercentageLabel.text = Math.round(this.secondPercentage * 100).toString();

          this._thirdCountLabel.text = this.thirdCount.toString();
          this._thirdPercentageLabel.text = Math.round(this.thirdPercentage * 100).toString();

          this._totalLabel.text = this.total.toString();

          this.pairChart.firstAngle = this.firstPercentage * 360;
          this.pairChart.secondAngle = this.secondPercentage * 360;
          this.pairChart.thirdAngle = this.thirdPercentage * 360;
          console.log('[1 2 3]',[this.firstPercentage * 360,this.secondPercentage * 360,this.thirdPercentage * 360])
          this.pairChart.drawPairChart(this.isGrey);
      }

      public render() {
        this._content.visible = true;
        this._content.validateNow();
        this.containerRT.drawToTexture(this._content, this._content.getBounds(), 1);
        this._content.visible = false;
        this.containerDisplay.visible = true;
      }
    }
  }
}
