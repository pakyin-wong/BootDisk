namespace we {
  export namespace ui {
    export interface IGameResultMessage {
      showResult(gameType: core.GameType, resultData: any);
      clearMessage();
    }

    export class GameResultMessage extends core.BaseEUI implements IGameResultMessage {
      protected _display: dragonBones.EgretArmatureDisplay = null;
      protected _dbClass;
      protected _armatureName = 'armatureName';

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

      protected createAniamtionObject() {
        const skeletonData = RES.getRes(`${this._dbClass}_game_result_ske_json`);
        const textureData = RES.getRes(`${this._dbClass}_game_result_tex_json`);
        const texture = RES.getRes(`${this._dbClass}_game_result_tex_png`);
        const factory = new dragonBones.EgretFactory();
        factory.parseDragonBonesData(skeletonData);
        factory.parseTextureAtlasData(textureData, texture);
        this._display = factory.buildArmatureDisplay(this._armatureName);
        this._display.x = this.width / 2;
        this._display.y = this.height / 2;
        this.addChild(this._display);
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
      protected startAnim(gameType: core.GameType, resultData: any) {}
    }
  }
}
