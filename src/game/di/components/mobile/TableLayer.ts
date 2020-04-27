// TypeScript file
namespace we {
  export namespace di {
    export class MobileTableLayer extends we.di.TableLayer {
      // group
      protected _small_percent: eui.Label;
      protected _odd_percent: eui.Label;
      protected _even_percent: eui.Label;
      protected _big_percent: eui.Label;

      protected createMapping() {
        super.createMapping();
        this._groupHoverImageMapping = {};
        Object.keys(we.di.BETFIELD_IMAGE_MAPPING).map(value => {
          this._groupHoverImageMapping[value] = we.di.MOBILE_BETFIELD_IMAGE_MAPPING[value];
        });
      }

      public updateText(tableInfo: data.TableInfo) {
        if (tableInfo.gamestatistic.diSize) {
          this._small_percent.text = tableInfo.gamestatistic.diSize.small + '%';
          this._big_percent.text = tableInfo.gamestatistic.diSize.big + '%';
        }
        if (tableInfo.gamestatistic.diOdd) {
          this._odd_percent.text = tableInfo.gamestatistic.diOdd.odd + '%';
          this._even_percent.text = tableInfo.gamestatistic.diOdd.even + '%';
        }
      }

      public onRollover(fieldName: string) {}

      public onRollout(fieldName: string) {}

      public clearAllHighlights() {}

      public async flashFields(data) {
        if (!data) {
          return;
        }

        const winningFields = di.getWinningFields(data);

        const initRectPromises = [];

        for (const field of Object.keys(this._groupMapping)) {
          const group = this._groupMapping[field];
          const isWin = winningFields.indexOf(field) >= 0;
          // try remove existing
          let image = group.getChildByName('image');
          if (image) {
            group.removeChild(image);
          }

          image = new eui.Image();
          image.name = 'image';
          image.alpha = 0;
          image.percentWidth = image.percentHeight = 100;
          image.source = this._groupHoverImageMapping[field];
          group.addChildAt(image, 0);

          const promise = new Promise(resolve => {
            egret.Tween.get(image)
              .to({ alpha: isWin ? 1 : 0 }, 125)
              .call(resolve);
          });
          initRectPromises.push(promise);
        }
        await Promise.all(initRectPromises);
        // start flashing
        let run = 1;
        const tick = async () => {
          // end flashing
          if (run >= 6) {
            const fadeOutPromises = [];
            for (const field of Object.keys(this._groupMapping)) {
              const group = this._groupMapping[field];
              const image = group.getChildByName('image');
              if (!image) {
                continue;
              }
              const promise = new Promise(resolve => {
                egret.Tween.get(image)
                  .to({ alpha: 0 }, 125)
                  .call(() => {
                    if (image.parent) {
                      image.parent.removeChild(image);
                    }
                    resolve();
                  });
              });
              fadeOutPromises.push(promise);
            }
            await Promise.all(fadeOutPromises);
            return;
          }
          const tickFlashPromises = [];
          for (const field of winningFields) {
            const group = this._groupMapping[field];
            const image = group.getChildByName('image');
            if (!image) {
              continue;
            }
            const prom = new Promise(resolve => {
              const alpha = run % 2 === 1 ? 1 : 0;
              egret.Tween.get(image)
                .to({ alpha }, 125)
                .call(resolve);
            });
            tickFlashPromises.push(prom);
          }
          await Promise.all(tickFlashPromises);
          run += 1;
          setTimeout(tick, 300);
        };
        setTimeout(tick, 300);
      }
    }
  }
}
