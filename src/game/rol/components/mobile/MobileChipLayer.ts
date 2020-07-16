namespace we {
  export namespace rol {
    export class MobileChipLayer extends we.ro.MobileChipLayer {
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

      public showWinningNumber() {
        if (!(this._tableId && env.tableInfos[this._tableId] && env.tableInfos[this._tableId].data && env.tableInfos[this._tableId].data.value)) {
          return;
        }

        const key = env.tableInfos[this._tableId].data.value;

        if (!this._mouseAreaMapping[ro.BetField['DIRECT_' + key]]) {
          return;
        }

        const grid = this._mouseAreaMapping[ro.BetField['DIRECT_' + key]];

        const coinAnim = this.createLuckyCoinAnim();

        grid.removeChildren();
        grid.addChild(coinAnim);
        coinAnim.anchorOffsetX = 3;
        coinAnim.anchorOffsetY = 2;

        let color: string;
        switch (we.ro.RACETRACK_COLOR[+key]) {
          case we.ro.Color.GREEN:
            color = '_Green';
            break;
          case we.ro.Color.RED:
          case we.ro.Color.BLACK:
          default:
            color = '';
        }

        (async () => {
          let p = we.utils.waitDragonBone(coinAnim);
          coinAnim.animation.play(`win${color}_in`, 1);
          await p;

          p = we.utils.waitDragonBone(coinAnim);
          coinAnim.animation.play(`win${color}_loop`, 3);
          await p;

          p = we.utils.waitDragonBone(coinAnim);
          coinAnim.animation.play(`win${color}_out`, 1);
          await p;

          coinAnim.animation.stop();
        })();
      }

      protected addGridBg(grid: any, num: number) {
        return (evt: dragonBones.EgretEvent) => {
          if (!evt && !evt.eventObject && evt.eventObject.name !== 'INSERT_GRID_BG') {
            return;
          }
          let source = '';
          switch (we.ro.RACETRACK_COLOR[num]) {
            case we.ro.Color.GREEN:
              source = 'Disc_Green_103x214_png';
              break;
            case we.ro.Color.RED:
              source = 'Disc_Red_84x72_png';
            case we.ro.Color.BLACK:
            default:
              source = 'Disc_Black_84x72_png';
          }
          const img = new eui.Image();
          img.source = source;
          img.verticalCenter = 0;
          img.horizontalCenter = 0;
          img.width = grid.width - 2;
          img.height = grid.height - 2;
          img.alpha = 0.5;
          grid.addChild(img);
        };
      }

      public showLuckyNumber() {
        if (!(this._tableId && env.tableInfos[this._tableId] && env.tableInfos[this._tableId].data && env.tableInfos[this._tableId].data.luckynumber)) {
          return;
        }

        const luckyNumbers = env.tableInfos[this._tableId].data.luckynumber;

        Object.keys(luckyNumbers).map((key, index) => {
          if (!this._mouseAreaMapping[ro.BetField['DIRECT_' + key]]) {
            return;
          }

          const grid = this._mouseAreaMapping[ro.BetField['DIRECT_' + key]];
          grid.removeChildren();

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

          coinAnim.addDBEventListener(dragonBones.EventObject.FRAME_EVENT, this.addGridBg(grid, +key), coinAnim);

          grid.addChild(coinAnim);
          coinAnim.anchorOffsetX = 3;
          coinAnim.anchorOffsetY = 2;

          const label = new eui.Label();
          label.verticalCenter = 0;
          label.horizontalCenter = 0;
          label.fontFamily = 'Barlow';
          label.size = 30;
          label.textColor = 0x83f3af;
          label.text = luckyNumbers[key] + 'x';

          grid.addChild(label);
          egret.Tween.get(label)
            .to({ alpha: 0 }, 1000)
            .to({ alpha: 1 }, 1000)
            .to({ alpha: 0 }, 1000)
            .to({ alpha: 1 }, 1000)
            .to({ alpha: 0 }, 1000);

          (async () => {
            let p = we.utils.waitDragonBone(coinAnim);
            coinAnim.animation.play(`Bet${color}_in`, 1);
            await p;

            p = we.utils.waitDragonBone(coinAnim);
            coinAnim.animation.play(`Bet${color}_loop`, 3);
            await p;

            p = we.utils.waitDragonBone(coinAnim);
            coinAnim.animation.play(`Bet${color}_loop`, 3);
            await p;

            coinAnim.animation.stop();
            egret.Tween.removeTweens(label);
            if (grid.contains(label)) {
              grid.removeChild(label);
            }

            coinAnim.removeDBEventListener('INSERT_GRID_BG', this.addGridBg(grid, +key), this);
          })();
        });
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
