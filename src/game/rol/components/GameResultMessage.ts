namespace we {
  export namespace rol {
    export class GameResultMessage extends ui.GameResultMessage implements ui.IGameResultMessage {
      protected _dbClass = 'roulette_w';
      protected _armatureName = 'Result';

      public constructor() {
        super();
      }

      protected startAnim(gameType: core.GameType, resultData: any) {
        const { gameData, winAmount } = resultData;
        const resultNo = gameData.value;

        this._display.armature.eventDispatcher.addDBEventListener(
          dragonBones.EventObject.COMPLETE,
          () => {
            if (this) {
              this.visible = false;
            }
          },
          this
        );

        const [numLeft, numCenter, numRight] = we.ro.getNeighbour(resultNo, 1);
        const colorMap = {
          [we.ro.Color.BLACK]: 'b',
          [we.ro.Color.GREEN]: 'g',
          [we.ro.Color.RED]: 'r',
        };

        const anim = 'Win_Black';

        const slot = this._display.armature.getSlot('800_Win');
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
