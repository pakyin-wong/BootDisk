namespace we {
  export namespace ui {
    export class GameResultMessage extends core.BaseEUI {
      private _display: dragonBones.EgretArmatureDisplay = null;
      private testing = true;

      public constructor() {
        super();
        this.visible = !this.testing;
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
            handler = 'startAnimRO';
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
        if (this.testing) {
          return;
        }

        if (this._display && this._display.animation) {
          this._display.animation.stop();
        }
        this.visible = true;
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

        // update slot text
        const slot = this._display.armature.getSlot('win_txt');
        const slot2 = this._display.armature.getSlot('loss_txt');
        const bmfont: eui.BitmapLabel = new eui.BitmapLabel();
        bmfont.font = RES.getRes('font_fnt');
        bmfont.text = 'This';
        const bmfont2: eui.BitmapLabel = new eui.BitmapLabel();
        bmfont2.font = RES.getRes('font_fnt');
        bmfont2.text = 'This';
        this.visible = true;
        this._display.animation.play(anim, 1);

        // setTimeout(() => {
        //   slot.display = bmfont;
        //   slot2.display = bmfont2;
        // }, 100);
      }

      protected startAnimRO(gameType: core.GameType, resultData: any) {
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

        let anim = 'ani_result_';
        if (isNaN(winAmount)) {
          anim += 'nobet_';
        } else {
          anim += 'win_loss_';
        }
        anim += 'bgr'; // todo

        const array = [['L_txt', 60, '5', 16], ['middle_txt', 90, '32', 0], ['L_txt3', 60, '12', 16]];

        for (const [slotName, fontSize, text, rotate] of array) {
          console.log(this._display);
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
