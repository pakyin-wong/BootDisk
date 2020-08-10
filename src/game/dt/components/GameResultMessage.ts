namespace we {
  export namespace dt {
    export class GameResultMessage extends ui.GameResultMessage implements ui.IGameResultMessage {
      // protected _display: dragonBones.EgretArmatureDisplay = null;
      // protected _dbClass = 'dragon_tiger';

      public constructor() {
        super();
        // this.touchEnabled = false;
      }

      public showResult(gameType: core.GameType, resultData: any) {
        this._dbClass = 'dragon_tiger';
        super.showResult(gameType, resultData);
      }

      protected getBackground(gameType: core.GameType, winType: number) {
        switch (gameType) {
          case core.GameType.DT:
            switch (winType) {
              case dt.WinType.DRAGON:
                return 'b';
              case dt.WinType.TIGER:
                return 'r';
              case dt.WinType.TIE:
                return 'g';
              default:
                return null;
            }
          default:
            return null;
        }
      }

      // public clearMessage() {
      //   // if (this._display && this._display.animation) {
      //   //   this._display.animation.stop();
      //   // }
      //   // this.visible = false;
      // }

      // animation for Baccarat / Dragon Tiger
      protected startAnim(gameType: core.GameType, resultData: any) {
        const winType = resultData.gameData.wintype;
        const winAmount = resultData.winAmount;
        const background = this.getBackground(gameType, winType);

        logger.l(we.utils.LogTarget.DEBUG, background, gameType, winType, winAmount);

        this._display.armature.eventDispatcher.addDBEventListener(
          dragonBones.EventObject.COMPLETE,
          () => {
            this.visible = false;
          },
          this
        );

        let anim = 'ani_result_';
        if (isNaN(winAmount)) {
          anim += 'nobets_';
        } else if (winAmount > 0) {
          anim += 'win_';
        } else {
          anim += 'loss_';
        }
        anim += background;

        // update slot text
        // for (const slotName of ['win_txt', 'loss_txt']) {
        // for (const slotName of ['Result_Txt_Win', 'Result_Txt_Loss']) {
        for (const slotName of ['result_win', 'result_loss']) {
          const slot = this._display.armature.getSlot(slotName);
          const text: eui.Label = new eui.Label();
          text.width = 320;
          text.height = 50;
          text.size = 50;
          text.anchorOffsetX = 160;
          text.anchorOffsetY = 25;
          text.verticalAlign = egret.VerticalAlign.MIDDLE;
          text.textAlign = egret.HorizontalAlign.CENTER;
          text.text = i18n.t(utils.getWinMessageKey(gameType, winType));
          this.visible = true;
          this._display.animation.play(anim, 1);
          slot.display = text;
        }

        if (!isNaN(winAmount)) {
          let slotName;
          // if (winAmount > 0) {
          //   slotName = '+800';
          // } else {
          //   slotName = '+8001';
          // }
          if (winAmount > 0) {
            slotName = 'credit_win';
          } else {
            slotName = 'credit_loss';
          }
          const slot = this._display.armature.getSlot(slotName);
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
        }

        this.visible = true;
        this._display.animation.play(anim, 1);
      }
    }
  }
}
