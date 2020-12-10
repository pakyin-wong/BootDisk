// TypeScript file
namespace we {
  export namespace ui {
    export class AnimLoadingUI extends core.BaseEUI implements ILoadingUI {
      protected _loadingGroup: eui.Group;

      protected _factory: dragonBones.EgretFactory;
      protected _loadingAnim: dragonBones.EgretArmatureDisplay;

      constructor() {
        super('AnimLoadingUISkin', false);
      }

      public mount() {
        this.createFactory();
        this._loadingAnim = this._factory.buildArmatureDisplay('armatureName');
        this._loadingGroup.addChild(this._loadingAnim);
        this._loadingAnim.animation.play('animation',0);
      }

      protected createFactory() {
         const skeletonData = RES.getRes(`lobby_ui_ske_json`);
         const textureData = RES.getRes(`lobby_ui_tex_json`);
         const texture = RES.getRes(`lobby_ui_tex_png`);
         this._factory = new dragonBones.EgretFactory();
         this._factory.parseDragonBonesData(skeletonData);
         this._factory.parseTextureAtlasData(textureData, texture);
      }

      public onProgress(progress, current, total) {
        // if (this._loadingAnim) {
        //   this._loadingAnim.animation.gotoAndPlayByProgress('animation', progress);
        // }
      }
    }
  }
}
