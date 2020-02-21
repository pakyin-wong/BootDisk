namespace we {
  export namespace ui {
    export class GameResultMessage extends core.BaseEUI {
      private _display: dragonBones.EgretArmatureDisplay = null;

      public constructor() {
        super();
        this.visible = false;
        // this.skinName = 'GameResultNormalSkin';
      }

      public showResult(gameType: core.GameType, winType: number, winAmount: number = NaN) {
        if (!this._display) {
          const skeletonData = RES.getRes('baccarat_game_result_ske_json');
          const textureData = RES.getRes('baccarat_game_result_tex_json');
          const texture = RES.getRes('baccarat_game_result_tex_png');
          const factory = new dragonBones.EgretFactory();
          factory.parseDragonBonesData(skeletonData);
          factory.parseTextureAtlasData(textureData, texture);
          this._display = factory.buildArmatureDisplay('armatureName');
          this._display.x = this.width / 2;
          this._display.y = this.height / 2;
          this.addChild(this._display);
        }

        this.startDragonBoneAnim(gameType, winType, winAmount);
      }

      protected getBackground(gameType: core.GameType, winType: number, isWin: boolean) {
        switch (gameType) {
          case core.GameType.BAC:
          case core.GameType.BAI:
          case core.GameType.BAS:
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
        if (this._display && this._display.animation) {
          this._display.animation.stop();
        }
        this.visible = false;
      }

      protected startDragonBoneAnim(gameType: core.GameType, winType: number, winAmount: number) {
        const isWin = !isNaN(winAmount) && winAmount > 0;
        const background = this.getBackground(gameType, winType, isWin);

        this.visible = true;
        logger.l(i18n.t(utils.getWinMessageKey(gameType, winType)), background, gameType, winType, winAmount);

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
        } else if (isWin) {
          anim += 'win_';
        } else {
          anim += 'loss_';
        }
        anim += background;
        this._display.animation.play(anim, 1);
      }
    }
  }
}
