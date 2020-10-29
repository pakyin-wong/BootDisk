namespace we {
  export namespace rol {
    export class ChipLayer extends we.ro.ChipLayer {
      protected _flashingOdds: eui.Label[];
      protected _luckyAnims: dragonBones.EgretArmatureDisplay[];
      protected _winningAnim: dragonBones.EgretArmatureDisplay;

      protected factory: dragonBones.EgretFactory;

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

      public init() {
        super.init();
        this.initFactory();
      }

      protected initFactory() {
        const skeletonData = RES.getRes(`roulette_w_game_result_ske_json`);
        const textureData = RES.getRes(`roulette_w_game_result_tex_json`);
        const texture = RES.getRes(`roulette_w_game_result_tex_png`);
        const factory = new dragonBones.EgretFactory();
        factory.parseDragonBonesData(skeletonData);
        factory.parseTextureAtlasData(textureData, texture);
        this.factory = factory;
      }

      protected createAnim() {
        return this.factory.buildArmatureDisplay('bet_effect');
      }

      protected clearWinningAnim() {
        if (this._winningAnim) {
          if (this._winningAnim.animation) {
            this._winningAnim.animation.stop();
          }
          if (this._winningAnim.parent) {
            this._winningAnim.dispose();
            this._winningAnim.parent.removeChild(this._winningAnim);
          }
        }
      }

      protected clearLuckyAnim() {
        if (this._luckyAnims) {
          for (const luckyAnim of this._luckyAnims) {
            if (luckyAnim.animation) {
              luckyAnim.animation.stop();
            }
            if (luckyAnim.parent) {
              luckyAnim.dispose();
              luckyAnim.parent.removeChild(luckyAnim);
            }
          }
          this._luckyAnims = null
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

        this._winningAnim = this.createAnim();

        this.clearLuckyAnim();

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
              source = 'Disc_Green_103x214_png';
            break;
            case 'bet_red_in':
              source = 'Disc_Red_84x72_png';
            break;
            case 'bet_black_in':
              source = 'Disc_Black_84x72_png';
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
          luckyAnim.name = key;
          luckyAnim.addDBEventListener(dragonBones.EventObject.FRAME_EVENT, this.addLuckyGridBg, this);

          grid.addChild(luckyAnim);
          luckyAnim.anchorOffsetX = 3;
          luckyAnim.anchorOffsetY = 2;

          const flashingOdd = new eui.Label();
          flashingOdd.verticalCenter = 0;
          flashingOdd.horizontalCenter = 0;
          flashingOdd.fontFamily = 'Barlow';
          flashingOdd.size = 30;
          flashingOdd.textColor = 0x83f3af;
          flashingOdd.text = luckyNumbers[key] + 'x';

          grid.addChild(flashingOdd);
          egret.Tween.get(flashingOdd)
            .to({ alpha: 0 }, 1000)
            .to({ alpha: 1 }, 1000)
            .to({ alpha: 0 }, 1000)
            .to({ alpha: 1 }, 1000)
            .to({ alpha: 0 }, 1000)
            .to({ alpha: 1 }, 1000);

          this._luckyAnims.push(luckyAnim);
          this._flashingOdds.push(flashingOdd);

          (async () => {
            let p = we.utils.waitDragonBone(luckyAnim);
            luckyAnim.animation.play(`bet${color}_in`, 1);
            await p;

            luckyAnim.removeDBEventListener(dragonBones.EventObject.FRAME_EVENT, this.addLuckyGridBg, this);

            luckyAnim.animation.play(`bet${color}_loop`, 0);

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
