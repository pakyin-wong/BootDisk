namespace we {
  export namespace dil {
    export class GameResultMessage extends ui.GameResultMessage implements ui.IGameResultMessage {
      protected _dbClass = 'dice_w';
      protected _armatureName = 'Result';

      public constructor() {
        super();
      }

      protected fillSlotWinAmount(winAmount: number, hasBet) {
        let winStatus = 'No_Bet';

        if (winAmount === 0 && !hasBet) {
          return winStatus;
        }

        const winAmountSlot = this._display.armature.getSlot('800');
        const winAmountLabel = new eui.Label();
        winAmountLabel.fontFamily = 'Barlow';
        winAmountLabel.size = 55;
        if (winAmount < 0) {
          winStatus = 'Loss';
          winAmountLabel.text = utils.formatNumber(winAmount, false);
        } else if (winAmount >= 0) {
          winStatus = 'Win';
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
        const oddSlot = this._display.armature.getSlot('Base_Odd');

        const oddLabel = new eui.Label();
        oddLabel.fontFamily = 'NeonOne';
        oddLabel.size = 60;
        oddLabel.text = luckyNumber[resultNo].toString() + 'X';
        oddLabel.textColor = 0x2ab9c6;

        const layer = new eui.Group();
        layer.addChild(oddLabel);
        layer.anchorOffsetX = oddLabel.width * 0.5;
        layer.anchorOffsetY = oddLabel.height * 0.5;
        oddSlot.display = layer;

        luckyStatus = '_LuckyNo';
        return luckyStatus;
      }

      protected fillSlotResultNo(dices: number[], resultNo: number) {
        const resultSlot = this._display.armature.getSlot('Base_Number');

        const resultLabel = new eui.Label();
        resultLabel.fontFamily = 'NeonOne';
        resultLabel.size = 140;
        resultLabel.text = resultNo.toString();
        resultLabel.textColor = 0x2ab9c6;

        const layer = new eui.Group();
        layer.addChild(resultLabel);
        layer.anchorOffsetX = resultLabel.width * 0.5;
        layer.anchorOffsetY = resultLabel.height * 0.5;
        resultSlot.display = layer;

        const diceArmartureName = ['Base_Dice', 'Base_Dice2', 'Base_Dice3', 'Base_Dice4', 'Base_Dice5', 'Base_Dice6'];
        for (let i = 0; i < 3; i++) {
          const diceSlot = this._display.armature.getSlot(diceArmartureName[i]);

          const diceImage = new eui.Image();
          diceImage.source = `Base_Dice_${dices[i]}_png`;

          const layerDice = new eui.Group();
          layerDice.addChild(diceImage);
          layerDice.anchorOffsetX = 61; // diceImage.width * 0.5;
          layerDice.anchorOffsetY = 61; // diceImage.height * 0.5;
          diceSlot.display = layerDice;

          const diceFlashSlot = this._display.armature.getSlot(diceArmartureName[5 - i]);
          const diceFlashImage = new eui.Image();
          diceFlashImage.source = `Base_Dice_${dices[i]}_png`;

          const layerFlashDice = new eui.Group();
          layerFlashDice.addChild(diceFlashImage);
          layerFlashDice.anchorOffsetX = 61; // diceFlashImage.width * 0.5;
          layerFlashDice.anchorOffsetY = 61; // diceFlashImage.height * 0.5;

          diceFlashSlot.display = layerFlashDice;
        }
      }

      protected startAnim(gameType: core.GameType, resultData: any) {
        const { gameData, winAmount } = resultData;
        const resultNo = gameData.dice1 + gameData.dice2 + gameData.dice3;
        const luckyNumber = gameData.luckynumber;
        const hasBet = gameData.hasBet;

        this.fillSlotResultNo([gameData.dice1, gameData.dice2, gameData.dice3], resultNo);
        const luckyStatus = this.fillSlotLuckyNumberOdd(luckyNumber, resultNo);
        const winStatus = this.fillSlotWinAmount(winAmount, hasBet);

        this.visible = true;

        const anim = `${winStatus}${luckyStatus}`;
        console.log('dil result Anim', anim);
        this._display.animation.play(anim, 1);
      }
    }
  }
}
