namespace we {
  export namespace rol {
    export class ChipLayer extends we.ro.ChipLayer {
      protected _flashingOdd: eui.Label;
      protected _luckyAnims: dragonBones.EgretArmatureDisplay[];
      protected _winningAnim: dragonBones.EgretArmatureDisplay;

      public clearLuckyNumber() {
        if (!this._mouseAreaMapping) {
          return;
        }
        Object.keys(this._mouseAreaMapping).map(key => {
          if (this._mouseAreaMapping[key]) {
            this._mouseAreaMapping[key].removeChildren();
          }
        });
      }

      protected createAnim() {
        const skeletonData = RES.getRes(`roulette_w_game_result_ske_json`);
        const textureData = RES.getRes(`roulette_w_game_result_tex_json`);
        const texture = RES.getRes(`roulette_w_game_result_tex_png`);
        const factory = new dragonBones.EgretFactory();
        factory.parseDragonBonesData(skeletonData);
        factory.parseTextureAtlasData(textureData, texture);
        return factory.buildArmatureDisplay('bet_effect');
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

        this._winningAnim = this.createAnim();

        if (this._luckyAnims) {
          for (const luckyAnim of this._luckyAnims) {
            luckyAnim.animation.stop();
          }
        }
        if (this._flashingOdd) {
          egret.Tween.removeTweens(this._flashingOdd);
        }
        grid.removeChildren();
        grid.addChild(this._winningAnim);
        this._winningAnim.anchorOffsetX = 3;
        this._winningAnim.anchorOffsetY = 2;

        let color: string;
        switch (we.ro.RACETRACK_COLOR[+key]) {
          case we.ro.Color.GREEN:
            color = '_green';
            break;
          case we.ro.Color.RED:
          case we.ro.Color.BLACK:
          default:
            color = '';
        }

        (async () => {
          let p = we.utils.waitDragonBone(this._winningAnim);
          this._winningAnim.animation.play(`win${color}_in`, 1);
          await p;

          p = we.utils.waitDragonBone(this._winningAnim);
          this._winningAnim.animation.play(`win${color}_loop`, 6);
          await p;

          p = we.utils.waitDragonBone(this._winningAnim);
          this._winningAnim.animation.play(`win${color}_out`, 1);
          await p;

          this._winningAnim.animation.stop();
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

        this._luckyAnims = new Array<dragonBones.EgretArmatureDisplay>();

        Object.keys(luckyNumbers).map((key, index) => {
          if (!this._mouseAreaMapping[ro.BetField['DIRECT_' + key]]) {
            return;
          }

          const grid = this._mouseAreaMapping[ro.BetField['DIRECT_' + key]];
          grid.removeChildren();

          const luckyAnim = this.createAnim();
          let color: string;
          switch (we.ro.RACETRACK_COLOR[+key]) {
            case we.ro.Color.GREEN:
              color = '_green';
              break;
            case we.ro.Color.RED:
              color = '_red';
              break;
            case we.ro.Color.BLACK:
            default:
              color = '_black';
          }

          luckyAnim.addDBEventListener(dragonBones.EventObject.FRAME_EVENT, this.addGridBg(grid, +key), luckyAnim);

          grid.addChild(luckyAnim);
          luckyAnim.anchorOffsetX = 3;
          luckyAnim.anchorOffsetY = 2;

          this._flashingOdd = new eui.Label();
          this._flashingOdd.verticalCenter = 0;
          this._flashingOdd.horizontalCenter = 0;
          this._flashingOdd.fontFamily = 'Barlow';
          this._flashingOdd.size = 30;
          this._flashingOdd.textColor = 0x83f3af;
          this._flashingOdd.text = luckyNumbers[key] + 'x';

          grid.addChild(this._flashingOdd);
          egret.Tween.get(this._flashingOdd)
            .to({ alpha: 0 }, 1000)
            .to({ alpha: 1 }, 1000)
            .to({ alpha: 0 }, 1000)
            .to({ alpha: 1 }, 1000)
            .to({ alpha: 0 }, 1000);

          this._luckyAnims.push(luckyAnim);

          (async () => {
            let p = we.utils.waitDragonBone(luckyAnim);
            luckyAnim.animation.play(`bet${color}_in`, 1);
            await p;

            luckyAnim.removeDBEventListener(dragonBones.EventObject.FRAME_EVENT, this.addGridBg(grid, +key), luckyAnim);

            p = we.utils.waitDragonBone(luckyAnim);
            luckyAnim.animation.play(`bet${color}_loop`, 0);
            await p;

            /*
            p = we.utils.waitDragonBone(this._luckyAnim);
            this._luckyAnim.animation.play(`Bet${color}_loop`, 3);
            await p;
            */
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
