namespace we {
  export namespace rol {
    export class MobileChipLayer extends we.ro.MobileChipLayer {
      protected factory: dragonBones.EgretFactory;
      protected _flashingOdds: eui.Label[];
      protected _luckyAnims: dragonBones.EgretArmatureDisplay[];
      protected _winningAnim: dragonBones.EgretArmatureDisplay;

      public clearLuckyNumber() {
        if (this._mouseAreaMapping) {
          Object.keys(this._mouseAreaMapping).map(key => {
            if (this._mouseAreaMapping[key]) {
              this._mouseAreaMapping[key].removeChildren();
            }
          });
        }
      }

      public init() {
        super.init();
        this.initFactory();
      }

      protected initFactory() {
        if (!this.factory) {
          const skeletonData = RES.getRes(`roulette_w_game_result_ske_json`);
          const textureData = RES.getRes(`roulette_w_game_result_tex_json`);
          const texture = RES.getRes(`roulette_w_game_result_tex_png`);
          const factory = new dragonBones.EgretFactory();
          factory.parseDragonBonesData(skeletonData);
          factory.parseTextureAtlasData(textureData, texture);
          this.factory = factory;
        }
      }

      protected createLuckyCoinAnim() {
        if (env.orientation === 'portrait') {
          return this.factory.buildArmatureDisplay('bet_effect_vertical');
        } else {
          return this.factory.buildArmatureDisplay('bet_effect_horizontal');
        }
      }

      protected clearWinningAnim() {
        if (this._winningAnim && this._winningAnim.animation) {
          this._winningAnim.animation.stop();
        }
        if (this._winningAnim) {
          this._winningAnim.armature.dispose();
          this._winningAnim.dispose();
        }
        if (this._winningAnim && this._winningAnim.parent) {
          this._winningAnim.parent.removeChild(this._winningAnim);
        }
        this._winningAnim = null;
      }

      protected clearLuckyAnim() {
        if (this._luckyAnims) {
          for (const luckyAnim of this._luckyAnims) {
            if (luckyAnim.animation) {
              luckyAnim.animation.stop();
            }
            luckyAnim.armature.dispose();
            luckyAnim.dispose();
            if (luckyAnim.parent) {
              luckyAnim.parent.removeChild(luckyAnim);
            }
          }
          this._luckyAnims = null;
        }
        if (this._flashingOdds) {
          for (const flashingOdd of this._flashingOdds) {
            egret.Tween.removeTweens(flashingOdd);
          }
          this._flashingOdds = null;
        }
      }

      protected destroy() {
        this.clearWinningAnim();
        this.clearLuckyAnim();
        this.factory.clear(true);
        super.destroy();
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
        utils.dblistenToSoundEffect(coinAnim);
        this._winningAnim = coinAnim;

        this.clearLuckyAnim();

        grid.removeChildren();
        grid.addChild(coinAnim);
        // coinAnim.anchorOffsetX = 3;
        // coinAnim.anchorOffsetY = 2;
        if (env.orientation === 'landscape') {
          coinAnim.scaleX = 1.4;
          coinAnim.scaleY = 1.4;
        }

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
          let p = we.utils.waitDragonBone(coinAnim);
          coinAnim.animation.play(`win${color}_in`, 1);
          await p;

          p = we.utils.waitDragonBone(coinAnim);
          coinAnim.animation.play(`win${color}_loop`, 3);
          await p;

          p = we.utils.waitDragonBone(coinAnim);
          coinAnim.animation.play(`win${color}_out`, 1);
          await p;

          this.clearWinningAnim();
        })();
      }

      protected addLuckyGridBg(evt: dragonBones.EgretEvent) {
        if (!evt && !evt.eventObject && evt.eventObject.name !== 'INSERT_GRID_BG') {
          return;
        }
        let source = '';
        switch (evt.animationName) {
          case 'bet_green_in':
            if (env.orientation === 'portrait') {
              source = 'Disc_Green_650x123_png';
            } else {
              source = 'Disc_Green_140x444_png';
            }
            break;
          case 'bet_red_in':
            if (env.orientation === 'portrait') {
              source = 'Disc_Red_218x128_png';
            } else {
              source = 'Disc_Red_148x148_png';
            }
            break;
          case 'bet_black_in':
            if (env.orientation === 'portrait') {
              source = 'Disc_Black_218x128_png';
            } else {
              source = 'Disc_Black_148x148_png';
            }
            break;
        }
        const grid = this._mouseAreaMapping[ro.BetField['DIRECT_' + evt.target.name]];
        const img = new eui.Image();
        img.source = source;
        img.verticalCenter = 0;
        img.horizontalCenter = 0;
        img.width = grid.width - 2;
        img.height = grid.height - 2;
        img.alpha = 0.5;
        grid.addChild(img);
      }

      public showLuckyNumber() {
        if (!(this._tableId && env.tableInfos[this._tableId] && env.tableInfos[this._tableId].data && env.tableInfos[this._tableId].data.luckynumber)) {
          return;
        }

        const luckyNumbers = env.tableInfos[this._tableId].data.luckynumber;

        this._luckyAnims = new Array<dragonBones.EgretArmatureDisplay>();
        this._flashingOdds = new Array<eui.Label>();

        Object.keys(luckyNumbers).map((key, index) => {
          if (!this._mouseAreaMapping[ro.BetField['DIRECT_' + key]]) {
            return;
          }

          const grid = this._mouseAreaMapping[ro.BetField['DIRECT_' + key]];
          grid.removeChildren();

          const coinAnim = this.createLuckyCoinAnim();
          utils.dblistenToSoundEffect(coinAnim);
          if (env.orientation === 'landscape') {
            coinAnim.scaleX = 1.4;
            coinAnim.scaleY = 1.4;
          }
          let color: string;
          switch (we.ro.RACETRACK_COLOR[+key]) {
            case we.ro.Color.GREEN:
              color = '_green';
              if (env.orientation === 'landscape') {
                coinAnim.scaleY = 1.45;
              }
              break;
            case we.ro.Color.RED:
              color = '_red';
              break;
            case we.ro.Color.BLACK:
            default:
              color = '_black';
          }
          coinAnim.name = key;
          coinAnim.addDBEventListener(dragonBones.EventObject.FRAME_EVENT, this.addLuckyGridBg, this);

          grid.addChild(coinAnim);
          // coinAnim.anchorOffsetX = 3;
          // coinAnim.anchorOffsetY = 2;

          const label = new eui.Label();
          label.verticalCenter = 0;
          label.horizontalCenter = 0;
          label.fontFamily = 'Barlow';
          label.size = 60;
          label.textColor = 0x80fbfd;
          label.text = luckyNumbers[key] + 'x';

          grid.addChild(label);
          egret.Tween.get(label)
            .to({ alpha: 0 }, 1000)
            .to({ alpha: 1 }, 1000)
            .to({ alpha: 0 }, 1000)
            .to({ alpha: 1 }, 1000)
            .to({ alpha: 0 }, 1000)
            .to({ alpha: 1 }, 1000);

          this._luckyAnims.push(coinAnim);
          this._flashingOdds.push(label);

          (async () => {
            const p = we.utils.waitDragonBone(coinAnim);
            coinAnim.animation.play(`bet${color}_in`, 1);
            await p;

            coinAnim.removeDBEventListener(dragonBones.EventObject.FRAME_EVENT, this.addLuckyGridBg, this);

            if (coinAnim && coinAnim.animation) {
              coinAnim.animation.play(`bet${color}_loop`, 0);
            }

            // p = we.utils.waitDragonBone(coinAnim);
            // coinAnim.animation.play(`bet${color}_loop`, 3);
            // await p;

            // coinAnim.animation.stop();
            // egret.Tween.removeTweens(label);
            // if (grid.contains(label)) {
            //   grid.removeChild(label);
            // }
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
