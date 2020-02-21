namespace we {
  export namespace ui {
    export class GameResultMessage extends core.BaseEUI {
      private _display: dragonBones.EgretArmatureDisplay = null;

      public constructor() {
        super();
        this.visible = false;
        // this.skinName = 'GameResultNormalSkin';
      }

      public showResult(gameType: core.GameType, resultData: any) {
        let dbClass;
        let handler;
        switch (gameType) {
          case core.GameType.BAC:
          case core.GameType.BAI:
          case core.GameType.BAS: {
            dbClass = 'baccarat';
            handler = 'startAnimBADT';
            break;
          }
          case core.GameType.DT: {
            dbClass = 'dragon_tiger';
            handler = 'startAnimBADT';
            break;
          }
          case core.GameType.RO: {
            dbClass = 'roulette';
            break;
          }
          default:
            break;
        }
        if (!this._display) {
          const skeletonData = RES.getRes(`${dbClass}_game_result_ske_json`);
          const textureData = RES.getRes(`${dbClass}_game_result_tex_json`);
          const texture = RES.getRes(`${dbClass}_game_result_tex_png`);
          const factory = new dragonBones.EgretFactory();
          factory.parseDragonBonesData(skeletonData);
          factory.parseTextureAtlasData(textureData, texture);
          this._display = factory.buildArmatureDisplay('armatureName');
          this._display.x = this.width / 2;
          this._display.y = this.height / 2;
          this.addChild(this._display);
        }

        this[handler](gameType, resultData);
      }

      protected getBackground(gameType: core.GameType, winType: number) {
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

      // animation for Baccarat / Dragon Tiger
      protected startAnimBADT(gameType: core.GameType, resultData: any) {
        const { winType, winAmount } = resultData;
        const background = this.getBackground(gameType, winType);

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
        } else if (winAmount > 0) {
          anim += 'win_';
        } else {
          anim += 'loss_';
        }
        anim += background;

        this.visible = true;
        this._display.animation.play(anim, 1);
      }

      protected startAnimRO(gameType: core.GameType, resultData: any) {
        this.visible = true;
      }
    }
  }
}
