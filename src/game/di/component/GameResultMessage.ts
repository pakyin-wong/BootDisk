namespace we {
  export namespace di {
    export class GameResultMessage extends ui.GameResultMessage implements ui.IGameResultMessage {
      public constructor() {
        super();
      }

      public showResult(gameType: core.GameType, resultData: any) {
        this._dbClass = 'roulette';
        super.showResult(gameType, resultData);
      }

      protected startAnim(gameType: core.GameType, resultData: any) {
        const { gameData, winAmount } = resultData;
        console.log('GameResultMessage::startAnim() gameData ', gameData);

        this._display.armature.eventDispatcher.addDBEventListener(
          dragonBones.EventObject.COMPLETE,
          () => {
            this.visible = false;
          },
          this
        );

        // const [numLeft, numCenter, numRight] = we.ro.getNeighbour(resultNo, 1);
        const [numLeft, numCenter, numRight] = [(<di.GameData> gameData).dice1, (<di.GameData> gameData).dice2, (<di.GameData> gameData).dice3];
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
        anim += `brb`;
        logger.l(anim, numLeft, numCenter, numRight);

        const array = [['L_txt', 60, numLeft, 90], ['middle_txt', 90, numCenter, 90], ['L_txt3', 60, numRight, 90]];

        for (const [slotName, fontSize, text, rotate] of array) {
          const slot = this._display.armature.getSlot(<string> slotName);
          const lbl = new eui.Label();
          lbl.text = <string> text;
          lbl.fontFamily = 'Barlow';
          lbl.size = <number> fontSize;
          lbl.anchorOffsetX = lbl.width / 2;
          lbl.anchorOffsetY = lbl.height / 2;
          lbl.rotation = rotate as number;
          const layer = new eui.Group();
          layer.addChild(lbl);
          slot.display = layer;
        }

        const slot = this._display.armature.getSlot('-800');
        const r = new eui.Label();
        r.fontFamily = 'barlow';
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
