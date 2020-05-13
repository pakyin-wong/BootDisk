namespace we {
  export namespace lw {
    export class StatisticChartPanelBar extends we.core.BaseEUI {
      public _source: string;
      private _bar;

      set source(value: string) {
        this._source = value;
      }

      get source(): string {
        return this._source;
      }

      public async mount() {
        // add bar first to ensure setProgress works
        this._bar = new eui.Image();
        this._bar.source = this._source;
        this._bar.percentWidth = 100;
        this._bar.percentHeight = 100;
        if (this._source && this._source.indexOf('gold') < 0) {
          const rect: egret.Rectangle = new egret.Rectangle(0, 0, 6, 16);
          this._bar.scale9Grid = rect;
        }
        this.addChild(this._bar);

        // add mask
        const shape = new egret.Shape();
        shape.graphics.beginFill(0xffffff, 1);
        shape.graphics.drawRect(0, 0, this.width, this.height);
        shape.graphics.endFill();
        this.addChild(shape);
        this.mask = shape;

        // // add background
        // const background = new eui.Image();
        // background.source = 'm_lw_hor_betpool_barchart_bg_png';
        // background.alpha = 0.3;
        // this.addChild(background);
      }

      public setProgress(value: number) {
        this._bar.x = -this.width * (1 - value);
      }
    }
  }
}
