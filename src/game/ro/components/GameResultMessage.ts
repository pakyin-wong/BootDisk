namespace we {
  export namespace ro {
    export class GameResultMessage extends ui.GameResultMessage implements ui.IGameResultMessage {
      protected _dbClass = 'roulette';

      public constructor() {
        super();
      }

      protected startAnim(gameType: core.GameType, resultData: any) {
        const { gameData, winAmount } = resultData;
        const resultNo = gameData.value;

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
          anim += 'no_bets_';
        } else {
          anim += 'win_loss_';
        }
        anim += `${colorMap[we.ro.RACETRACK_COLOR[numLeft]]}${colorMap[we.ro.RACETRACK_COLOR[numCenter]]}${colorMap[we.ro.RACETRACK_COLOR[numRight]]}`;
        logger.l(utils.LogTarget.DEBUG, anim, numLeft, numCenter, numRight);

        // const array = [
        //   ['L_txt', 60, numLeft, 90],
        //   ['middle_txt', 90, numCenter, 90],
        //   ['L_txt3', 60, numRight, 90],
        // ];
        const array = [['result_l', 60, numLeft, 0], ['result_middle', 90, numCenter, 0], ['result_r', 60, numRight, 0]];

        for (const [slotName, fontSize, text, rotate] of array) {
          const slot = this._display.armature.getSlot(<string>slotName);
          const lbl = new eui.Label();
          lbl.text = <string>text;
          lbl.fontFamily = 'Barlow';
          lbl.size = <number>fontSize;
          lbl.anchorOffsetX = lbl.width / 2;
          lbl.anchorOffsetY = lbl.height / 2;
          lbl.rotation = rotate as number;
          const layer = new eui.Group();
          layer.addChild(lbl);
          slot.display = layer;
        }

        // const slot = this._display.armature.getSlot('-800');
        const slot = this._display.armature.getSlot('credit');
        const r = new eui.Label();
        r.fontFamily = 'Barlow';
        r.size = 60;
        r.text = utils.formatNumber(winAmount);
        const shadowFilter: egret.DropShadowFilter = new egret.DropShadowFilter(3, 45, 0x111111, 0.1, 10, 10, 20, egret.BitmapFilterQuality.LOW);
        r.filters = [shadowFilter];
        r.bold = true;
        r.textColor = 0xffffff;
        const layer = new eui.Group();
        layer.addChild(r);
        layer.anchorOffsetX = r.width * 0.5;
        layer.anchorOffsetY = r.height * 0.5;
        slot.display = layer;

        this.visible = true;
        this._display.animation.play(anim, 1);
      }
    }
  }
}
