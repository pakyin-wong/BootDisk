namespace we {
  export namespace bab {
    export class GameResultMessage extends ui.GameResultMessage implements ui.IGameResultMessage {
      protected _dbClass = 'baccarat';
      protected _skeletonName = 'blockchain'

      public constructor() {
        super();
        // this.touchEnabled = false;
      }

      public showResult(gameType: core.GameType, resultData: any) {
        this._dbClass = 'blockchain';
        super.showResult(gameType, resultData);
      }

      protected getBackground(gameType: core.GameType, winType: number) {
        switch (gameType) {
          case core.GameType.BAC:
          case core.GameType.BAI:
          case core.GameType.BAS:
          case core.GameType.BAM:
          case core.GameType.BAB:
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
          case core.GameType.DTB:
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

      protected createFactory(){

      }

      protected createAniamtionObject() {
                const skeletonData = RES.getRes(`${this._skeletonName}_ske_json`);
        const textureData = RES.getRes(`${this._skeletonName}_tex_json`);
        const texture = RES.getRes(`${this._skeletonName}_tex_png`);
        const factory = new dragonBones.EgretFactory();
        factory.parseDragonBonesData(skeletonData);
        factory.parseTextureAtlasData(textureData, texture);

        this._display = factory.buildArmatureDisplay(this._armatureName);
        this._display.x = this.width / 2;
        this._display.y = this.height / 2;
        this.addChild(this._display);
        if (env.isMobile) {
          if (env.orientation === 'portrait') {
            this._display.scaleX = 830 / this._display.width;
            this._display.scaleY = 300 / this._display.height;
          }
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
          anim += 'no_bets_';
        } else if (winAmount > 0) {
          anim += 'win_';
        } else {
          anim += 'loss_';
        }
        anim += background;

        this.visible = true;
        this._display.animation.play(anim, 1);

        if (!isNaN(winAmount)) {
          let slotName;

          slotName = 'credit';
          const slot = this._display.armature.getSlot(slotName);
          this.setLabel(slot,winAmount)
          /*
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
          */
        }
      }

      protected setLabel(slot: dragonBones.Slot, num: number, size = 60) {
        /*
        const cardLabel = new ui.LabelImage();
        cardLabel.size = size;
        cardLabel.textColor = 0xd2fdff;
        cardLabel.fontFamily = 'BarlowBold';
        cardLabel.bold = true;
        cardLabel.hasShadow = true;
        cardLabel.text = num.toString();
*/
          const r = new ui.LabelImage();
          r.fontFamily = 'barlow';
          r.size = size;
          r.text = utils.formatNumber(num);
          const shadowFilter: egret.DropShadowFilter = new egret.DropShadowFilter(3, 45, 0x111111, 0.1, 10, 10, 20, egret.BitmapFilterQuality.LOW);
          r.filters = [shadowFilter];
          r.bold = true;
          r.textColor = 0xffffff;

        // create a new ImageDisplayData with a EgretTextureData holding the new texture
        const displayData: dragonBones.ImageDisplayData = new dragonBones.ImageDisplayData();
        let textureData: dragonBones.EgretTextureData = new dragonBones.EgretTextureData();
        textureData.renderTexture = r.texture;
        textureData.region.x = 0;
        textureData.region.y = 0;
        textureData.region.width = textureData.renderTexture.textureWidth;
        textureData.region.height = textureData.renderTexture.textureHeight;
        textureData.parent = new dragonBones.EgretTextureAtlasData();
        textureData.parent.scale = 1;
        displayData.texture = textureData;
        displayData.pivot.x = 0.5;
        displayData.pivot.y = 0.5;

        // type 0 is ImageDisplayData
        displayData.type = 0;

        slot.replaceDisplayData(displayData, 0);

        // set the displayIndex to non zero since new value == current index will not trigger redraw
        slot.displayIndex = -1;
        slot.displayIndex = 0;
      }


    }
  }
}
