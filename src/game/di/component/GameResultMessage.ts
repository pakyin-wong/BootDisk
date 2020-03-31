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

        this._display.armature.eventDispatcher.addDBEventListener(
          dragonBones.EventObject.COMPLETE,
          () => {
            this.visible = false;
          },
          this
        );

        const { dice1, dice2, dice3, size, odd, total } = <di.GameData>gameData;
        logger.l(dice1, dice2, dice3, size, odd, total);

        let anim = 'ani_result_';
        let isWin = false;
        if (isNaN(winAmount)) {
          anim += 'no_bets';
        } else if (winAmount <= 0) {
          anim += 'loss';
        } else {
          anim += 'win';
          isWin = true;
        }

        for (let i = 1; i <= 3; i += 1) {
          const slot = this._display.armature.getSlot(`dice_${i + (isWin ? 6 : 9)}`);
          const img = new eui.Image();
          img.source = RES.getRes(`d_sic_history_lv3_dice-${i}_png`);
          // cannot use image.width
          img.anchorOffsetX = 27;
          img.anchorOffsetY = 27;
          slot.display = img;
        }

        const array = [
          [isWin ? '15' : '16', 60, total.toString()],
          [isWin ? 'red2' : 'red3', 40, size === 1 ? '小' : '大'],
          [isWin ? 'blue2' : 'blue3', 40, odd === 1 ? '單' : '雙'],
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

        this.visible = true;
        this._display.animation.play(anim, 1);
      }
    }
  }
}
