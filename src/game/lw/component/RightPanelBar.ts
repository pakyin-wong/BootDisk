namespace we {
  export namespace lw {
    export class RightPanelBar extends we.core.BaseEUI {
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

        // draw black bg
        await new Promise(async resolve => {
          const gold = await RES.getResAsync('d_lw_betpool_barchart_gold_png');
          if (RES.hasRes('d_lw_betpool_barchart__background_generated')) {
            resolve();
            return;
          }
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = this.width;
          canvas.height = this.height;
          ctx.drawImage(gold.$bitmapData.$source, 0, 0);
          ctx.globalCompositeOperation = 'source-in';
          ctx.fillStyle = '#000000';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          RES.$addResourceData({ name: 'd_lw_betpool_barchart__background_generated', type: RES.ResourceItem.TYPE_IMAGE, url: canvas.toDataURL('image/png') });
          await RES.getResAsync('d_lw_betpool_barchart__background_generated');
          console.log('once');
          resolve();
        });

        // add background
        const background = new eui.Image();
        background.source = 'd_lw_betpool_barchart__background_generated';
        background.alpha = 0.3;
        this.addChildAt(background, 0);
      }

      public setProgress(value: number) {
        this._bar.x = -this.width * (1 - value);
      }
    }
  }
}
