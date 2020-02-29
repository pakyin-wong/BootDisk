namespace we {
  export namespace ro {
    export class GameResultMessage extends ui.GameResultMessage implements ui.IGameResultMessage {
      public constructor() {
        super();
        this.visible = !this.testing;
      }

      public showResult(gameType: core.GameType, resultData: any) {
        this._dbClass = 'roulette';
        super.showResult(gameType, resultData);
      }

      protected startAnim(gameType: core.GameType, resultData: any) {
        const { resultNo, winAmount } = resultData;

        this._display.armature.eventDispatcher.addDBEventListener(
          dragonBones.EventObject.FRAME_EVENT,
          xxx => {
            logger.l(xxx);
          },
          this
        );

        this._display.armature.eventDispatcher.addDBEventListener(
          dragonBones.EventObject.COMPLETE,
          () => {
            this.visible = false;
          },
          this
        );

        const [numLeft, numCenter, numRight] = we.ro.getNeighbour(resultNo, 1);
        const colorMap = {
          [we.ro.Color.BLACK]: 'b',
          [we.ro.Color.GREEN]: 'g',
          [we.ro.Color.RED]: 'r',
        };

        let anim = 'ani_result_';
        if (isNaN(winAmount)) {
          anim += 'nobet_';
        } else {
          anim += 'win_loss_';
        }
        anim += `${colorMap[we.ro.RACETRACK_COLOR[numLeft]]}${colorMap[we.ro.RACETRACK_COLOR[numCenter]]}${colorMap[we.ro.RACETRACK_COLOR[numRight]]}`;

        const array = [
          ['L_txt', 60, numLeft, -16],
          ['middle_txt', 90, numCenter, 0],
          ['L_txt3', 60, numRight, 16],
        ];

        for (const [slotName, fontSize, text, rotate] of array) {
          const slot = this._display.armature.getSlot(<string> slotName);
          const lbl = new eui.Label();
          lbl.text = <string> text;
          lbl.fontFamily = 'Barlow';
          lbl.size = <number> fontSize;
          lbl.width = lbl.size * 2;
          lbl.height = lbl.size;
          lbl.anchorOffsetX = lbl.size;
          lbl.anchorOffsetY = lbl.size / 2;
          lbl.textAlign = egret.HorizontalAlign.CENTER;
          lbl.verticalAlign = egret.VerticalAlign.MIDDLE;
          slot.display = lbl;
          slot.display.rotation = <number> rotate;
        }

        this.visible = true;
        this._display.animation.play(anim, 1);

        if (this.testing) {
          setTimeout(() => {
            this._display.animation.timeScale = 0;
          }, 1500);
        }
      }
    }
  }
}
