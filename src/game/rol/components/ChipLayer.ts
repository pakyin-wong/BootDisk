namespace we {
  export namespace rol {
    export class ChipLayer extends we.ro.ChipLayer {
      public clearLuckyNumber() {
        if (this._mouseAreaMapping) {
          Object.keys(this._mouseAreaMapping).map(key => {
            if (this._mouseAreaMapping[key]) {
              this._mouseAreaMapping[key].removeChildren();
            }
          });
        }
      }

      protected createLuckyCoinAnim() {
        const skeletonData = RES.getRes(`roulette_w_game_result_ske_json`);
        const textureData = RES.getRes(`roulette_w_game_result_tex_json`);
        const texture = RES.getRes(`roulette_w_game_result_tex_png`);
        const factory = new dragonBones.EgretFactory();
        factory.parseDragonBonesData(skeletonData);
        factory.parseTextureAtlasData(textureData, texture);
        return factory.buildArmatureDisplay('Bet_Effect_Destop');
      }

      public showLuckyNumber() {
        if (this._tableId && env.tableInfos[this._tableId] && env.tableInfos[this._tableId].data && env.tableInfos[this._tableId].data.luckynumber) {
          Object.keys(env.tableInfos[this._tableId].data.luckynumber).map((key, index) => {
            if (this._mouseAreaMapping[ro.BetField['DIRECT_' + key]]) {
              this._mouseAreaMapping[ro.BetField['DIRECT_' + key]].removeChildren();

              const coinAnim = this.createLuckyCoinAnim();
              let color: string;
              switch (we.ro.RACETRACK_COLOR[+key]) {
                case we.ro.Color.GREEN:
                  color = '_Green';
                  break;
                case we.ro.Color.RED:
                  color = '_Red';
                  break;
                case we.ro.Color.BLACK:
                default:
                  color = '_Black';
              }

              const betDetails = this.getConfirmedBetDetails();
              if (betDetails) {
                betDetails.map((detail, index) => {
                  if (detail && detail.field && detail.amount) {
                    const f = this.fieldToValue(detail.field);
                    if (key === f) {
                      if (we.ro.RACETRACK_COLOR[+key] !== we.ro.Color.GREEN) {
                        color = '';
                      }
                    }
                  }
                });
              }

              this._mouseAreaMapping[ro.BetField['DIRECT_' + key]].addChild(coinAnim);

              let state = 0;

              const label = new eui.Label();
              label.verticalCenter = -23;
              label.horizontalCenter = 0;
              label.size = 25;
              label.textColor = 0x83f3af;
              label.text = env.tableInfos[this._tableId].data.luckynumber[key] + 'x';

              this._mouseAreaMapping[ro.BetField['DIRECT_' + key]].addChild(label);
              egret.Tween.get(label)
                .to({ alpha: 0 }, 500)
                .to({ alpha: 1 }, 500)
                .to({ alpha: 0 }, 500)
                .to({ alpha: 1 }, 500)
                .to({ alpha: 0 }, 500)
                .to({ alpha: 1 }, 500);

              coinAnim.armature.eventDispatcher.addDBEventListener(
                dragonBones.EventObject.COMPLETE,
                () => {
                  state++;
                  switch (state) {
                    case 1:
                      coinAnim.animation.play(`Bet${color}_loop`, 3);
                      break;
                    case 2:
                      coinAnim.animation.play(`Bet${color}_out`, 1);
                      break;
                    default:
                      coinAnim.animation.stop();
                      egret.Tween.removeTweens(label);
                      this._mouseAreaMapping[ro.BetField['DIRECT_' + key]].removeChild(label);
                  }
                },
                this
              );
              coinAnim.animation.play(`Bet${color}_in`, 1);
            }
          });
        }
      }

      protected fieldToValue(fieldName: string) {
        if (!fieldName) {
          return null;
        }
        if (fieldName.indexOf('DIRECT_') === -1) {
          return null;
        }
        const result = fieldName.split('DIRECT_');
        if (result && result[1]) {
          return result[1];
        }
        return null;
      }
    }
  }
}
