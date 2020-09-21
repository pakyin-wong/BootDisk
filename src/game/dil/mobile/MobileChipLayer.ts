namespace we {
  export namespace dil {
    export class MobileChipLayer extends we.dil.ChipLayer {
      protected animString;

      constructor() {
        super();
        this._betField = dil.BetField;
      }

      public showWinningNumber() {
        if (
          !(
            this._tableId &&
            env.tableInfos[this._tableId] &&
            env.tableInfos[this._tableId].data &&
            env.tableInfos[this._tableId].data.dice1 &&
            env.tableInfos[this._tableId].data.dice2 &&
            env.tableInfos[this._tableId].data.dice3
          )
        ) {
          return;
        }

        const sum = env.tableInfos[this._tableId].data.dice1 + env.tableInfos[this._tableId].data.dice2 + env.tableInfos[this._tableId].data.dice3;

        if (!this._mouseAreaMapping[dil.BetField['SUM_' + sum]]) {
          return;
        }

        this.clearWinningAnim();
        this.clearLuckyAnim();

        if (env.orientation === 'portrait') {
          this.animString = 'bet_effect_vertical';
        } else {
          this.animString = 'bet_effect_horizontal';
        }

        this._winningAnim = this.createAnim(this.animString);
        const grid = this._mouseAreaMapping[dil.BetField['SUM_' + sum]];
        grid.addChild(this._winningAnim);
        this._winningAnim.anchorOffsetX = 0;
        this._winningAnim.anchorOffsetY = 0;
        if (env.orientation === 'portrait') {
          this._winningAnim.scaleX = 1.1;
          this._winningAnim.scaleY = 1.1;
        } else {
          this._winningAnim.scaleX = 1.6;
          this._winningAnim.scaleY = 1.6;
        }
        console.log('showWinningNumber', this._winningAnim);

        (async () => {
          const p = we.utils.waitDragonBone(this._winningAnim);
          this._winningAnim.animation.play(`win`, 1);
          await p;

          this._winningAnim.animation.stop();
        })();
      }

      public getAnimName(sum: number) {
        let animName;
        if (sum <= 10) {
          const firstPart = sum;
          const secondPart = 21 - sum;
          animName = `${firstPart}_${secondPart}`;
        } else {
          const firstPart = 21 - sum;
          const secondPart = sum;
          animName = `${firstPart}_${secondPart}`;
        }
        return animName;
      }

      public showLuckyNumber() {
        if (!(this._tableId && env.tableInfos[this._tableId] && env.tableInfos[this._tableId].data && env.tableInfos[this._tableId].data.luckynumber)) {
          return;
        }

        this.clearLuckyAnim();
        this.clearWinningAnim();

        const luckyNumbers = env.tableInfos[this._tableId].data.luckynumber;

        this._luckyAnims = new Array<dragonBones.EgretArmatureDisplay>();

        Object.keys(luckyNumbers).map((key, index) => {
          if (!this._mouseAreaMapping[dil.BetField['SUM_' + key]]) {
            return;
          }

          const grid = this._mouseAreaMapping[dil.BetField['SUM_' + key]];

          if (env.orientation === 'portrait') {
            this.animString = 'bet_effect_vertical';
          } else {
            this.animString = 'bet_effect_horizontal';
          }

          const luckyAnim = this.createAnim(this.animString);
          luckyAnim.addDBEventListener(dragonBones.EventObject.FRAME_EVENT, this.addGridBg(grid, +key), luckyAnim);

          grid.addChild(luckyAnim);
          luckyAnim.anchorOffsetX = 0;
          luckyAnim.anchorOffsetY = 0;
          if (env.orientation === 'portrait') {
            luckyAnim.scaleX = 1.1;
            luckyAnim.scaleY = 1.1;
          } else {
            luckyAnim.scaleX = 1.6;
            luckyAnim.scaleY = 1.6;
          }

          this._flashingOdd = new eui.Label();
          this._flashingOdd.verticalCenter = 0;
          this._flashingOdd.horizontalCenter = 0;
          this._flashingOdd.fontFamily = 'Barlow';
          this._flashingOdd.size = 50;
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

          const animName = this.getAnimName(+key);
          console.log('showLuckyNumber');

          (async () => {
            let p = we.utils.waitDragonBone(luckyAnim);
            luckyAnim.animation.play(`${animName}_in`, 1);
            await p;

            luckyAnim.removeDBEventListener(dragonBones.EventObject.FRAME_EVENT, this.addGridBg(grid, +key), luckyAnim);

            p = we.utils.waitDragonBone(luckyAnim);
            luckyAnim.animation.play(`${animName}_loop`, 0);
            await p;
          })();
        });
      }
    }
  }
}
