namespace we {
  export namespace ui {
    export interface IGameResultMessage {
      showResult(gameType: core.GameType, resultData: any);
      clearMessage();
    }

    export class GameResultMessage extends core.BaseEUI implements IGameResultMessage {
      protected _display: dragonBones.EgretArmatureDisplay = null;
      protected _factory: dragonBones.EgretFactory = null;
      protected _dbClass;

      // protected _armatureName = 'armatureName';
      //////////////////////////////
      protected _armatureName = 'result';

      public constructor() {
        super();
        this.touchEnabled = false;
        this.visible = false;
      }

      protected destroy() {
        if (this._display) {
          this._display.animation.stop();
          this._display.armature.dispose();
          this._display.dispose();
          this._display.parent.removeChild(this._display);
        }
        if (this._factory) {
          this._factory.clear(true);
        }
        super.destroy();
      }

      public showResult(gameType: core.GameType, resultData: any) {
        if (!this._display) {
          this.createAniamtionObject();
        }

        this.startAnim(gameType, resultData);
      }

      protected createAniamtionObject() {
        if (!this._factory) {
          const skeletonData = RES.getRes(`${this._dbClass}_game_result_ske_json`);
          const textureData = RES.getRes(`${this._dbClass}_game_result_tex_json`);
          const texture = RES.getRes(`${this._dbClass}_game_result_tex_png`);
          const factory = new dragonBones.EgretFactory();
          factory.parseDragonBonesData(skeletonData);
          factory.parseTextureAtlasData(textureData, texture);
          this._factory = factory;
        }
        this._display = this._factory.buildArmatureDisplay(this._armatureName);
        utils.dblistenToSoundEffect(this._display);
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
          case core.GameType.BAB:
          case core.GameType.BAMB:
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
