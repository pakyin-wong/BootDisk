namespace we {
  export namespace dt {
    export class TableLayer extends ui.TableLayer {
      protected _dragonImage: eui.Image;
      protected _tigerImage: eui.Image;
      protected _tieImage: eui.Image;

      protected _dragonLabel: ui.RunTimeLabel;
      protected _tigerLabel: ui.RunTimeLabel;
      protected _tieLabel: ui.RunTimeLabel;

      protected _dragonTotalAmount: eui.Label;
      protected _tigerTotalAmount: eui.Label;

      protected _dragonTotalPerson: eui.Label;
      protected _tigerTotalPerson: eui.Label;

      protected _totalPersonMapping: any; // Total Person for each grid
      protected _totalAmountMapping: any; // Total amount for each grid

      protected _imageSourceMapping: {};

      constructor() {
        super();
        this._betField = dt.BetField;
      }

      protected createMapping() {
        super.createMapping();
        this._imageMapping = {};
        this._imageMapping[dt.BetField.DRAGON] = this._dragonImage;
        this._imageMapping[dt.BetField.TIE] = this._tieImage;
        this._imageMapping[dt.BetField.TIGER] = this._tigerImage;

        this._imageSourceMapping = {};
        this._imageSourceMapping[dt.BetField.DRAGON] = [this._imageMapping[dt.BetField.DRAGON].source, this._imageMapping[dt.BetField.DRAGON].name];
        this._imageSourceMapping[dt.BetField.TIE] = [this._imageMapping[dt.BetField.TIE].source, this._imageMapping[dt.BetField.TIE].name];
        this._imageSourceMapping[dt.BetField.TIGER] = [this._imageMapping[dt.BetField.TIGER].source, this._imageMapping[dt.BetField.TIGER].name];

        this._totalPersonMapping = {};
        this._totalPersonMapping[dt.BetField.DRAGON] = this._dragonTotalPerson;
        this._totalPersonMapping[dt.BetField.TIGER] = this._tigerTotalPerson;

        this._totalAmountMapping = {};
        this._totalAmountMapping[dt.BetField.DRAGON] = this._dragonTotalAmount;
        this._totalAmountMapping[dt.BetField.TIGER] = this._tigerTotalAmount;

        this._tigerLabel.renderText = () => i18n.t('dragontiger.tigerShort');
        this._dragonLabel.renderText = () => i18n.t('dragontiger.dragonShort');
        this._tieLabel.renderText = () => i18n.t('dragontiger.tieShort');
      }

      set totalPerson(persons: any) {
        if (this._totalPersonMapping) {
          Object.keys(persons).map(value => {
            if (this._totalPersonMapping[value]) {
              this._totalPersonMapping[value].text = persons[value];
            }
          });
        }
      }

      get totalPerson() {
        return this._totalPersonMapping;
      }

      set totalAmount(amounts: any) {
        if (this._totalAmountMapping) {
          Object.keys(amounts).map(value => {
            if (this._totalAmountMapping[value]) {
              this._totalAmountMapping[value].text = amounts[value];
            }
          });
        }
      }

      get totalAmount() {
        return this._totalAmountMapping;
      }

      public onRollover(fieldName: string) {
        if (this._imageSourceMapping) {
          const colorMatrix = [1, 0, 0, 0, 100, 0, 1, 0, 0, 100, 0, 0, 1, 0, 100, 0, 0, 0, 1, 0];
          const colorFilter = new egret.ColorMatrixFilter(colorMatrix);
          this._imageMapping[fieldName].filters = [colorFilter];
        }
      }

      public onRollout(fieldName: string) {
        this._imageMapping[fieldName].filters = [];
      }

      public clearAllHighlights() {
        Object.keys(dt.BetField).map(value => {
          this.onRollout(value);
        });
      }

      public async flashFields(gameData: we.data.GameData) {
        const { wintype, issupersix, isbankerpair, isplayerpair } = gameData;
        let fieldOpen;

        switch (wintype) {
          case dt.WinType.DRAGON: {
            fieldOpen = dt.BetField.DRAGON;
            break;
          }
          case dt.WinType.TIGER: {
            fieldOpen = dt.BetField.TIGER;
            break;
          }
          case dt.WinType.TIE: {
            fieldOpen = dt.BetField.TIE;
            break;
          }
          default: {
            break;
          }
        }

        const colorMatrix = [1, 0, 0, 0, 100, 0, 1, 0, 0, 100, 0, 0, 1, 0, 100, 0, 0, 0, 1, 0];
        const brightnessFilter = new we.ui.BrightnessFilter(colorMatrix);
        this._imageMapping[fieldOpen].filters = [brightnessFilter];

        egret.Tween.get(brightnessFilter)
          .to({ alpha: 0 }, 125)
          .to({ alpha: 100 }, 125)
          .to({ alpha: 0 }, 125)
          .to({ alpha: 100 }, 125)
          .to({ alpha: 0 }, 125)
          .to({ alpha: 100 }, 125);
        /*

        // prepare anim
        const initRectPromises = [];
        // init dim rects
        for (const field of Object.keys(dt.BetField)) {
          const group: any = this._imageMapping[field].parent;
          const isWin = field === fieldOpen;
          // try remove existing
          let rect = group.getChildByName('dim');
          if (rect) {
            group.removeChild(rect);
          }
          rect = new eui.Rect();
          rect.name = 'dim';
          rect.alpha = 0;
          rect.fillColor = isWin ? 0xffffff : 0x000000;
          rect.percentWidth = 100;
          rect.percentHeight = 100;
          group.addChildAt(rect, 1);
          const promise = new Promise(resolve => {
            egret.Tween.get(rect)
              .to({ alpha: isWin ? 0 : 0.25 }, 125)
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
            for (const field of Object.keys(dt.BetField)) {
              const group = this._imageMapping[field].parent;
              const rect = group.getChildByName('dim');
              const promise = new Promise(resolve => {
                egret.Tween.get(rect)
                  .to({ alpha: 0 }, 125)
                  .call(() => {
                    if (rect.parent) {
                      rect.parent.removeChild(rect);
                    }
                    resolve();
                  });
              });
              fadeOutPromises.push(promise);
            }
            await Promise.all(fadeOutPromises);
            return;
          }
          const group = this._imageMapping[fieldOpen].parent;
          const rect = group.getChildByName('dim');
          await new Promise(resolve => {
            const alpha = run % 2 === 1 ? 0.25 : 0;
            egret.Tween.get(rect)
              .to({ alpha }, 125)
              .call(resolve);
          });
          run += 1;
          setTimeout(tick, 300);
        };
        setTimeout(tick, 300);
        */
      }
    }
  }
}
