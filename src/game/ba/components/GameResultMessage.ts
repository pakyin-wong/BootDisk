namespace we {
  export namespace ba {
    export class GameResultMessage extends ui.GameResultMessage implements ui.IGameResultMessage {
      protected _display: dragonBones.EgretArmatureDisplay = null;
      protected _dbClass = 'baccarat';

      public constructor() {
        super();
        this.touchEnabled = false;
        this.visible = false;
      }

      protected destroy() {
        super.destroy();
        if (this._display) {
          this._display.dispose();
        }
      }

      public showResult(gameType: core.GameType, resultData: any) {
        if (!this._display) {
          this.createAniamtionObject();
        }

        this.startAnim(gameType, resultData);
      }

      protected getBackground(gameType: core.GameType, winType: number) {
        switch (gameType) {
          case core.GameType.BAC:
          case core.GameType.BAI:
          case core.GameType.BAS:
          case core.GameType.BAM:
            switch (winType) {
              case ba.WinType.BANKER:
                return 'r';
              case ba.WinType.PLAYER:
                return 'b';
              case ba.WinType.TIE:
                return 'g';
              default:
                return null;
            }
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

      public clearMessage() {
        // if (this._display && this._display.animation) {
        //   this._display.animation.stop();
        // }
        // this.visible = false;
      }

      // animation for Baccarat / Dragon Tiger
      protected startAnim(gameType: core.GameType, resultData: any) {
        const winType = resultData.gameData.wintype;
        const winAmount = resultData.winAmount;
        const background = this.getBackground(gameType, winType);

        logger.l(background, gameType, winType, winAmount);

        this._display.armature.eventDispatcher.addDBEventListener(
          dragonBones.EventObject.COMPLETE,
          () => {
            this.visible = false;
          },
          this
        );

        let anim = 'ani_result_';
        if (isNaN(winAmount)) {
          anim += 'no_bets_';
        } else if (winAmount > 0) {
          anim += 'win_';
        } else {
          anim += 'loss_';
        }
        anim += background;

        // update slot text
        for (const slotName of ['win_txt', 'loss_txt']) {
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
          if (winAmount > 0) {
            slotName = '+800';
          } else {
            slotName = '+8001';
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
      }
    }
  }
}
