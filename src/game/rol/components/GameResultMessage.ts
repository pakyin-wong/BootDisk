namespace we {
  export namespace rol {
    export class GameResultMessage extends ui.GameResultMessage implements ui.IGameResultMessage {
      protected _dbClass = 'roulette_w';
      protected _armatureName = 'result';

      public constructor() {
        super();
      }

      protected fillSlotWinAmount(winAmount: number, hasBet) {
        let winStatus = 'no_bet';
        if (winAmount === 0 && !hasBet) {
          return winStatus;
        }

        const winAmountSlot = this._display.armature.getSlot('credit');
        const winAmountLabel = new eui.Label();
        winAmountLabel.fontFamily = 'Barlow';
        winAmountLabel.size = 55;
        if (winAmount < 0) {
          winStatus = 'loss';
          winAmountLabel.text = utils.formatNumber(winAmount, false);
        } else if (winAmount >= 0) {
          winStatus = 'win';
          winAmountLabel.text = '+' + utils.formatNumber(winAmount, false);
        }

        const color: number = 0x33ccff;
        const alpha: number = 0.8;
        const blurX: number = 35;
        const blurY: number = 35;
        const strength: number = 2;
        const quality: number = egret.BitmapFilterQuality.HIGH;
        const inner: boolean = false;
        const knockout: boolean = false;
        const glowFilter: egret.GlowFilter = new egret.GlowFilter(color, alpha, blurX, blurY, strength, quality, inner, knockout);
        winAmountLabel.filters = [glowFilter];
        winAmountLabel.bold = true;
        winAmountLabel.textColor = 0x2ab9c6;

        const layer = new eui.Group();
        layer.addChild(winAmountLabel);
        layer.anchorOffsetX = winAmountLabel.width * 0.5;
        layer.anchorOffsetY = winAmountLabel.height * 0.5;
        winAmountSlot.display = layer;

        return winStatus;
      }

      protected fillSlotLuckyNumberOdd(luckyNumber, resultNo: number) {
        let luckyStatus = '';
        if (luckyNumber[resultNo] === undefined) {
          return luckyStatus;
        }
        const oddSlot = this._display.armature.getSlot('odds');

        const oddLabel = new eui.Label();
        oddLabel.fontFamily = 'NeonOne';
        oddLabel.size = 60;
        oddLabel.text = luckyNumber[resultNo].toString() + 'X';

        /*
        const color: number = 0x33ccff;
        const alpha: number = 0.8;
        const blurX: number = 35;
        const blurY: number = 35;
        const strength: number = 2;
        const quality: number = egret.BitmapFilterQuality.HIGH;
        const inner: boolean = false;
        const knockout: boolean = false;
        const glowFilter: egret.GlowFilter = new egret.GlowFilter(color, alpha, blurX, blurY, strength, quality, inner, knockout);
        oddLabel.filters = [glowFilter];
        */
        // oddLabel.bold = true;
        oddLabel.textColor = 0x2ab9c6;

        const layer = new eui.Group();
        layer.addChild(oddLabel);
        layer.anchorOffsetX = oddLabel.width * 0.5;
        layer.anchorOffsetY = oddLabel.height * 0.5;
        oddSlot.display = layer;

        luckyStatus = '_odds';
        return luckyStatus;
      }

      protected fillSlotResultNo(resultNo: number) {
        const resultSlot = this._display.armature.getSlot('result');

        const resultLabel = new eui.Label();
        resultLabel.fontFamily = 'NeonOne';
        resultLabel.size = 140;
        resultLabel.text = resultNo.toString();

        /*
        const shadowFilter: egret.DropShadowFilter = new egret.DropShadowFilter(3, 45, 0x111111, 0.1, 10, 10, 20, egret.BitmapFilterQuality.LOW);
        resultLabel.filters = [shadowFilter];
        */
        // resultLabel.bold = true;
        resultLabel.textColor = 0x2ab9c6;

        const layer = new eui.Group();
        layer.addChild(resultLabel);
        layer.anchorOffsetX = resultLabel.width * 0.5;
        layer.anchorOffsetY = resultLabel.height * 0.5;
        resultSlot.display = layer;
      }

      protected startAnim(gameType: core.GameType, resultData: any) {
        const { gameData, winAmount } = resultData;
        const resultNo = gameData.value;
        const luckyNumber = gameData.luckynumber;
        const hasBet = gameData.hasBet;

        this.fillSlotResultNo(resultNo);
        const luckyStatus = this.fillSlotLuckyNumberOdd(luckyNumber, resultNo);
        const winStatus = this.fillSlotWinAmount(winAmount, hasBet);

        const colorMap = {
          [we.ro.Color.BLACK]: '_black',
          [we.ro.Color.GREEN]: '_green',
          [we.ro.Color.RED]: '_red',
        };

        const colorStatus = colorMap[we.ro.RACETRACK_COLOR[resultNo]];

        this.visible = true;

        const anim = `${winStatus}${colorStatus}${luckyStatus}`;
        console.log('rol result Anim', anim);
        this._display.animation.play(anim, 1);
      }
    }
  }
}
