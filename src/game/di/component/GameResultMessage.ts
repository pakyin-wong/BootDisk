namespace we {
  export namespace di {
    export class GameResultMessage extends ui.GameResultMessage implements ui.IGameResultMessage {
      public constructor() {
        super();
      }
      public showResult(gameType: core.GameType, resultData: any) {
        this._dbClass = 'sicbo';
        super.showResult(gameType, resultData);
      }

      protected startAnim(gameType: core.GameType, resultData: any) {
        const { gameData, winAmount } = resultData;
        console.log('this._display.armature', this._display.armature);

        this._display.armature.eventDispatcher.addDBEventListener(
          dragonBones.EventObject.COMPLETE,
          () => {
            this.visible = false;
          },
          this
        );

        const { dice1, dice2, dice3, size, odd } = <di.GameData>gameData;
        logger.l(utils.LogTarget.DEBUG, dice1, dice2, dice3, size, odd);

        const total = isNaN((gameData as di.GameData).total) ? dice1 + dice2 + dice3 : (gameData as di.GameData).total;

        let anim = 'ani_result_';
        let txtSlot = null;
        let isWin = false;
        if (isNaN(winAmount)) {
          anim += 'no_bets';
        } else if (winAmount <= 0) {
          anim += 'loss';
          txtSlot = 'loss_txt';
        } else {
          anim += 'win';
          txtSlot = 'L1_txt';
          isWin = true;
        }

        const diceResults = [dice1, dice1, dice2, dice3];
        for (let i = 1; i <= 3; i += 1) {
          const slot = this._display.armature.getSlot(`dice_${i + (isWin ? 6 : 9)}`);
          const img = new eui.Image();
          // img.source = `d_sic_history_lv3_dice-${diceResults[i]}_png`; // RES.getRes(`d_sic_history_lv3_dice-${diceResults[i]}_png`);
          img.source = `Dice${diceResults[i]}_png`; // RES.getRes(`d_sic_history_lv3_dice-${diceResults[i]}_png`);

          // cannot use image.width
          img.anchorOffsetX = 27;
          img.anchorOffsetY = 27;
          img.width = 54;
          img.height = 54;
          slot.display = img;
        }

        const array = [
          [isWin ? '15' : '16', 60, total.toString()],
          [isWin ? 'red_txt2' : 'red_txt3', 40, size === 1 ? '小' : '大'],
          [isWin ? 'blue_txt2' : 'blue_txt3', 40, odd === 1 ? '單' : '雙'],
        ];

        for (const [slotName, fontSize, text] of array) {
          const slot = this._display.armature.getSlot(<string>slotName);
          const r = new eui.Label();
          r.fontFamily = 'Barlow';
          r.size = <number>fontSize;
          r.text = <string>text;
          if (fontSize === 60) {
            const shadowFilter: egret.DropShadowFilter = new egret.DropShadowFilter(3, 45, 0x111111, 0.1, 10, 10, 20, egret.BitmapFilterQuality.LOW);
            r.filters = [shadowFilter];
            r.bold = true;
          }
          r.textColor = 0xffffff;
          r.anchorOffsetX = r.width / 2;
          r.anchorOffsetY = r.height / 2;
          slot.display = r;
        }

        if (txtSlot) {
          const slot = this._display.armature.getSlot(txtSlot);
          const r = new eui.Label();
          r.fontFamily = 'Barlow';
          r.size = 60;
          r.text = utils.formatNumber(winAmount);
          const shadowFilter: egret.DropShadowFilter = new egret.DropShadowFilter(3, 45, 0x111111, 0.1, 10, 10, 20, egret.BitmapFilterQuality.LOW);
          r.filters = [shadowFilter];
          r.bold = true;
          r.textColor = 0xffffff;
          r.anchorOffsetX = r.width / 2;
          r.anchorOffsetY = r.height / 2;
          slot.display = r;
        }

        this.visible = true;
        this._display.animation.play(anim, 1);
      }
    }
  }
}
