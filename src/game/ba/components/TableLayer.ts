namespace we {
  export namespace ba {
    export class TableLayer extends ui.TableLayer {
      protected _playerPairImage: eui.Image;
      protected _bankerPairImage: eui.Image;
      protected _playerImage: eui.Image;
      protected _tieImage: eui.Image;
      protected _bankerImage: eui.Image;
      protected _superSixImage: eui.Image;
      protected _superSixBankerImage: eui.Image;

      protected _playerPairLabel: ui.RunTimeLabel;
      protected _bankerPairLabel: ui.RunTimeLabel;
      protected _playerLabel: ui.RunTimeLabel;
      protected _tieLabel: ui.RunTimeLabel;
      protected _bankerLabel: ui.RunTimeLabel;
      protected _superSixLabel: ui.RunTimeLabel;
      protected _superSixBankerLabel: ui.RunTimeLabel;

      protected _playerTotalAmount: eui.Label;
      protected _bankerTotalAmount: eui.Label;

      protected _playerTotalPerson: eui.Label;
      protected _bankerTotalPerson: eui.Label;

      protected _totalPersonMapping: any; // Total Person for each grid
      protected _totalAmountMapping: any; // Total amount for each grid

      protected _imageSourceMapping: {};

      constructor() {
        super();
        this._betField = ba.BetField;
      }

      protected createMapping() {
        super.createMapping();
        let image;
        this._imageMapping = {};
        this._imageSourceMapping = {};

        this._imageMapping[ba.BetField.PLAYER] = this._playerImage;
        this._imageMapping[ba.BetField.BANKER] = this._bankerImage;
        this._imageMapping[ba.BetField.PLAYER_PAIR] = this._playerPairImage;
        this._imageMapping[ba.BetField.TIE] = this._tieImage;
        this._imageMapping[ba.BetField.BANKER_PAIR] = this._bankerPairImage;
        this._imageMapping[ba.BetField.SUPER_SIX_BANKER] = this._superSixBankerImage;
        this._imageMapping[ba.BetField.SUPER_SIX] = this._superSixImage;

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

        this._totalPersonMapping = {};
        this._totalPersonMapping[ba.BetField.PLAYER] = this._playerTotalPerson;
        this._totalPersonMapping[ba.BetField.BANKER] = this._bankerTotalPerson;

        this._totalAmountMapping = {};
        this._totalAmountMapping[ba.BetField.PLAYER] = this._playerTotalAmount;
        this._totalAmountMapping[ba.BetField.BANKER] = this._bankerTotalAmount;

        this._playerLabel.renderText = () => i18n.t('baccarat.player');
        this._bankerLabel.renderText = () => i18n.t('baccarat.banker');
        this._playerPairLabel.renderText = () => i18n.t('baccarat.playerPair');
        this._tieLabel.renderText = () => i18n.t('baccarat.tie');
        this._bankerPairLabel.renderText = () => i18n.t('baccarat.bankerPair');
        this._superSixBankerLabel.renderText = () => i18n.t('baccarat.banker');
        this._superSixLabel.renderText = () => i18n.t('baccarat.superSix');
      }

      public onRollover(fieldName: string) {
        if (this._imageSourceMapping) {
          this._imageMapping[fieldName].source = this._imageSourceMapping[fieldName][1];
        }
      }

      public onRollout(fieldName: string) {
        this._imageMapping[fieldName].source = this._imageSourceMapping[fieldName][0];
      }

      public clearAllHighlights() {
        Object.keys(ba.BetField).map(value => {
          this.onRollout(value);
        });
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

      public async flashFields(gameData: we.data.GameData) {
        const { wintype, issupersix, isbankerpair, isplayerpair } = gameData;
        let fieldOpen;

        switch (wintype) {
          case ba.WinType.BANKER: {
            if (issupersix) {
              fieldOpen = ba.BetField.SUPER_SIX_BANKER;
            } else if (isbankerpair) {
              fieldOpen = ba.BetField.BANKER_PAIR;
            } else {
              fieldOpen = ba.BetField.BANKER;
            }
            break;
          }
          case ba.WinType.PLAYER: {
            if (isplayerpair) {
              fieldOpen = ba.BetField.PLAYER_PAIR;
            } else {
              fieldOpen = ba.BetField.PLAYER;
            }
            break;
          }
          case ba.WinType.TIE: {
            if (issupersix) {
              fieldOpen = ba.BetField.SUPER_SIX;
            } else {
              fieldOpen = ba.BetField.TIE;
            }
            break;
          }
          default: {
            break;
          }
        }

        // prepare anim
        const initRectPromises = [];
        // init dim rects
        for (const field of Object.keys(ba.BetField)) {
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
            for (const field of Object.keys(ba.BetField)) {
              const group: any = this._imageMapping[field].parent;
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
      }
    }
  }
}
