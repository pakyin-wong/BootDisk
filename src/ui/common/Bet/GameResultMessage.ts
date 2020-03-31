namespace we {
  export namespace ui {
    export interface IGameResultMessage {
      showResult(gameType: core.GameType, resultData: any);
      clearMessage();
    }

    export class GameResultMessage extends core.BaseEUI implements IGameResultMessage {
      protected _display: dragonBones.EgretArmatureDisplay = null;
      protected _dbClass;

      public constructor() {
        super();
        this.touchEnabled = false;
        this.visible = false;
      }

      public showResult(gameType: core.GameType, resultData: any) {
        switch (gameType) {
          case core.GameType.BAC:
          case core.GameType.BAI:
          case core.GameType.BAS: {
            this._dbClass = 'baccarat';
            break;
          }
          case core.GameType.DT: {
            this._dbClass = 'dragon_tiger';
            break;
          }
          default:
            break;
        }

        if (!this._display) {
          this.createAniamtionObject();
        }

        this.startAnim(gameType, resultData);
      }

      protected createAniamtionObject() {
        const skeletonData = RES.getRes(`${this._dbClass}_game_result_ske_json`);
        const textureData = RES.getRes(`${this._dbClass}_game_result_tex_json`);
        const texture = RES.getRes(`${this._dbClass}_game_result_tex_png`);
        const factory = new dragonBones.EgretFactory();
        factory.parseDragonBonesData(skeletonData);
        factory.parseTextureAtlasData(textureData, texture);
        this._display = factory.buildArmatureDisplay('armatureName');
        this._display.x = this.width / 2;
        this._display.y = this.height / 2;
        this.addChild(this._display);
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
        // if (this._display && this._display.animation) {
        //   this._display.animation.stop();
        // }
        // this.visible = false;
      }

      // animation for Baccarat / Dragon Tiger
      protected startAnim(gameType: core.GameType, resultData: any) {
        const { winType, winAmount, gameData } = resultData;
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

          // const bmfont: eui.BitmapLabel = new eui.BitmapLabel();
          // bmfont.font = RES.getRes('font_fnt');
          // // bmfont.text = utils.formatNumber(winAmount);
          // bmfont.text = 'This2.00';
          // bmfont.width = 320;
          // bmfont.height = 60;
          // bmfont.anchorOffsetX = 160;
          // bmfont.anchorOffsetY = 30;
          // bmfont.verticalAlign = egret.VerticalAlign.MIDDLE;
          // bmfont.textAlign = egret.HorizontalAlign.CENTER;
          // slot.display = bmfont;
        }
      }
    }
  }
}
