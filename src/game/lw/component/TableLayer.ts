namespace we {
  export namespace lw {
    export class TableLayer extends ui.TableLayer {
      protected _oneCircleImage: eui.Image;
      protected _threeCircleImage: eui.Image;
      protected _fiveCircleImage: eui.Image;
      protected _redDragonImage: eui.Image;
      protected _greenDragonImage: eui.Image;
      protected _whiteDragonImage: eui.Image;
      protected _weImage: eui.Image;

      protected _imageSourceMapping: {};

      constructor() {
        super();
        this._betField = lw.BetField;
      }

      protected createMapping() {
        super.createMapping();
        // let image;
        this._imageMapping = {};
        this._imageSourceMapping = {};

        this._imageMapping[lw.BetField.LW_0] = this._oneCircleImage;
        this._imageMapping[lw.BetField.LW_1] = this._threeCircleImage;
        this._imageMapping[lw.BetField.LW_2] = this._fiveCircleImage;
        this._imageMapping[lw.BetField.LW_3] = this._redDragonImage;
        this._imageMapping[lw.BetField.LW_4] = this._greenDragonImage;
        this._imageMapping[lw.BetField.LW_5] = this._whiteDragonImage;
        this._imageMapping[lw.BetField.LW_6] = this._weImage;

        /*
        image = this._imageMapping[ba.BetField.PLAYER];
        this._imageSourceMapping[ba.BetField.PLAYER] = [image.source, image.name ? image.name : image.source];
        image = this._imageMapping[ba.BetField.BANKER];
        this._imageSourceMapping[ba.BetField.BANKER] = [image.source, image.name ? image.name : image.source];
        image = this._imageMapping[ba.BetField.PLAYER_PAIR];
        this._imageSourceMapping[ba.BetField.PLAYER_PAIR] = [image.source, image.name ? image.name : image.source];
        image = this._imageMapping[ba.BetField.TIE];
        this._imageSourceMapping[ba.BetField.TIE] = [image.source, image.name ? image.name : image.source];
        image = this._imageMapping[ba.BetField.BANKER_PAIR];
        this._imageSourceMapping[ba.BetField.BANKER_PAIR] = [image.source, image.name ? image.name : image.source];
        image = this._imageMapping[ba.BetField.SUPER_SIX_BANKER];
        this._imageSourceMapping[ba.BetField.SUPER_SIX_BANKER] = [image.source, image.name ? image.name : image.source];
        image = this._imageMapping[ba.BetField.SUPER_SIX];
        this._imageSourceMapping[ba.BetField.SUPER_SIX] = [image.source, image.name ? image.name : image.source];
        */
      }

      public onRollover(fieldName: string) {
        if (this._imageSourceMapping) {
          const name = this._imageMapping[fieldName].source.toString();
          this._imageMapping[fieldName].source = this._imageMapping[fieldName].name;
          this._imageMapping[fieldName].name = name;
        }
      }

      public onRollout(fieldName: string) {
        const name = this._imageMapping[fieldName].source.toString();
        this._imageMapping[fieldName].source = this._imageMapping[fieldName].name;
        this._imageMapping[fieldName].name = name;
      }

      public clearAllHighlights() {
        Object.keys(lw.BetField).map(value => {
          this.onRollout(value);
        });
      }

      public async flashFields(fieldName: string) {
        const promise = new Promise(resolve => {
          egret.Tween.get(this._imageMapping[fieldName])
            .to({ alpha: 0 }, 125)
            .to({ alpha: 1 }, 125)
            .to({ alpha: 0 }, 125)
            .to({ alpha: 1 }, 125)
            .to({ alpha: 0 }, 125)
            .to({ alpha: 1 }, 125)
            .to({ alpha: 0 }, 125)
            .to({ alpha: 1 }, 125)
            .call(resolve);
        });
      }
      /*
      const winningFields = [];
      const { wintype, issupersix, isbankerpair, isplayerpair } = gameData;

      if (isbankerpair) {
        winningFields.push(ba.BetField.BANKER_PAIR);
      }
      if (isplayerpair) {
        winningFields.push(ba.BetField.PLAYER_PAIR);
      }
      if (issupersix) {
        winningFields.push(ba.BetField.SUPER_SIX);
      }

      switch (wintype) {
        case ba.WinType.BANKER: {
          if (superSixMode) {
            winningFields.push(ba.BetField.SUPER_SIX_BANKER);
          } else {
            winningFields.push(ba.BetField.BANKER);
          }
          break;
        }
        case ba.WinType.PLAYER: {
          winningFields.push(ba.BetField.PLAYER);
          break;
        }
        case ba.WinType.TIE: {
          winningFields.push(ba.BetField.TIE);
          break;
        }
        default: {
          break;
        }
      }

      const initRectPromises = [];
      // init dim rects
      for (const field of Object.keys(ba.BetField)) {
        const group: any = this._imageMapping[field].parent;
        const isWin = winningFields.indexOf(field) >= 0;
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
          for (const field of Object.keys(ba.BetField)) {
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
        const tickFlashPromises = [];
        for (const field of winningFields) {
          const group = this._imageMapping[field].parent;
          const rect = group.getChildByName('dim');
          const prom = new Promise(resolve => {
            const alpha = run % 2 === 1 ? 0.25 : 0;
            egret.Tween.get(rect)
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
      */
    }
  }
}
