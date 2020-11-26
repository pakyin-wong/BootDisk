// TypeScript file
namespace we {
  export namespace blockchain {
    export class MobileBlockchainBar extends core.BaseEUI {

      protected _anim : dragonBones.EgretArmatureDisplay;
      
      protected factor = 100;

      protected _redBarLimit ;
      protected _blueBarLimit;

      protected _blueEffectInitX;
      protected _redEffectInitX;

      protected _blueBarEffectOriginX ;
      protected _redBarEffectOriginX ;
      protected _centerControl :dragonBones.Bone;
      protected _redBarEffect;
      protected _blueBarEffect;

      protected _barOffsetX = 555;
      protected _effectCenter = 553;
      protected _centerOriginX = 0;

      protected _labelGrp : eui.Group;
      protected _content : eui.Group;
      protected _lblRed : ui.RunTimeLabel;
      protected _lblBlue : ui.RunTimeLabel;

      protected _blueTargetNumber : number;
      protected _redTargetNumber : number;

      protected _isUpdating : boolean = false;

      protected currentProgress : number = 0;
      protected _barGrp : eui.Group;
      protected _gameType : string;

      constructor(blue : number, red : number, gameType : string){
        super();

        this._blueTargetNumber = blue;
        this._redTargetNumber = red;

        this._gameType = gameType;

        this.initSkin();
      }

      protected initSkin(){
        if(env.orientation === 'portrait'){
          this.skinName = 'skin_mobile_portrait.MobileBlockchainBar';
          this._skinKey = 'MobileBlockchainBar';
        }else{
          this.skinName = 'skin_mobile_landscape.MobileBlockchainBar';
          this._skinKey = 'MobileBlockchainBar';
        }
      }

      protected mount(){
        super.mount();
      }

      protected initComponents(){
        super.initComponents();

        const skeletonData = RES.getRes(`blockchain_ske_json`);
        const textureData = RES.getRes(`blockchain_tex_json`);
        const texture = RES.getRes(`blockchain_tex_png`);
        const factory: dragonBones.EgretFactory = new dragonBones.EgretFactory();
        factory.parseDragonBonesData(skeletonData);
        factory.parseTextureAtlasData(textureData, texture);
        // const chip = factory.buildArmatureDisplay('poker');
        this._anim = factory.buildArmatureDisplay('bet_bar');

        const bar = this._anim.armature.getBone('bar_group');
        this._centerControl = bar.armature.getBone('bar_center_control');

        this._redBarLimit = bar.armature.getBone('red_bar_limit');
        this._blueBarLimit = bar.armature.getBone('blue_bar_limit');

        this._redBarEffect = this._redBarLimit.armature.getBone('red_effect_position');
        this._blueBarEffect = this._blueBarLimit.armature.getBone('blue_effect_position');

        this._blueEffectInitX = this._blueBarEffect.origin.x;
        this._redEffectInitX = this._redBarEffect.origin.x;

        this._barGrp.addChild(this._anim);
        this._barGrp.width = this._anim.width;
        this._barGrp.horizontalCenter = 0;
      }

      protected arrangeComponents(){
        super.arrangeComponents();

        const bar = this._anim.armature.getBone('bar_group');
        this._centerControl = bar.armature.getBone('bar_center_control');

        this._redBarLimit = bar.armature.getBone('red_bar_limit');
        this._blueBarLimit = bar.armature.getBone('blue_bar_limit');

        this._redBarEffect = this._redBarLimit.armature.getBone('red_effect_position');
        this._blueBarEffect = this._blueBarLimit.armature.getBone('blue_effect_position');

        this._centerControl.origin.x = 0;
        this._centerOriginX = this._centerControl.origin.x;

        this._anim.x = this._anim.width/2;
        this._anim.y = -this._anim.height/2;

        this._blueBarEffect.origin.x = this._blueEffectInitX;
        this._redBarEffect.origin.x = this._redEffectInitX;

        dir.meterCtr.register('blockchainlblblue',this._lblBlue);
        dir.meterCtr.register('blockchainlblred',this._lblRed);

        this.initBarProgress();
      }

      public resetAnimation(){
        this._blueTargetNumber = 0;
        this._redTargetNumber = 0;

        this.initBarProgress();
      }

      protected initBarProgress(){
        egret.Tween.removeTweens(this._centerControl.origin);
        egret.Tween.removeTweens(this._redBarEffect.origin);
        egret.Tween.removeTweens(this._blueBarEffect.origin);

        switch(this._gameType){
          case 'dt':
            if(env.orientation === 'portrait'){
              this._barOffsetX = 551;
              this._effectCenter = 551;
              this.width = 1242;
              this.y = 190;
            }else{
              this._barOffsetX = 551;
              this._effectCenter = 551;
              this.width = 2424;
              this.y = 175;
            }
          break;
          case 'ba':
            if(env.orientation === 'portrait'){
              this._barOffsetX = 551;
              this._effectCenter = 551;
              this.width = 1242;
              this.y = 190;
            }else{
              this._barOffsetX = 761;
              this._effectCenter = 761;
              this.width = 2424;
              this.horizontalCenter = 0;
              this.y = 170;
            }
          break;
        }
        this._anim.x = this._anim.width/2;

        this._redBarEffect.origin.x = this._redEffectInitX;
        this._blueBarEffect.origin.x = this._blueEffectInitX;

        this._redBarLimit.origin.x = this._barOffsetX;
        this._blueBarLimit.origin.x = -this._barOffsetX;

        this.currentProgress = (this._blueTargetNumber - this._redTargetNumber ) / (this._redTargetNumber + this._blueTargetNumber);
        
        if(isNaN(this.currentProgress)){
          this.currentProgress = 0;
        }

        this._centerControl.origin.x = this._centerOriginX + this.currentProgress * this._barOffsetX;

        if(this._redTargetNumber === 0 && this._blueTargetNumber === 0){
          this._centerControl.origin.x = this._centerOriginX;
        }

        this._centerControl.invalidUpdate();
        this._blueBarLimit.invalidUpdate();
        this._redBarLimit.invalidUpdate();
        this._blueBarEffect.invalidUpdate();
        this._redBarEffect.invalidUpdate();
        
        this._labelGrp.width = this.width;
        this._content.width = this.width;

        this._barGrp.width = this._anim.width;
        this._barGrp.horizontalCenter = 0;

        this._lblBlue.renderText = () => `${utils.formatNumber(this._blueTargetNumber, true)}`;
        this._lblRed.renderText = () => `${utils.formatNumber(this._redTargetNumber, true)}`;
      }

      public playAnim(red : number, blue : number){
        if(this._redTargetNumber === red && this._blueTargetNumber === blue){
          return;
        }

        this.updateBarInfo(red, blue);
      }

      protected moveEffect(r, b){

        egret.Tween.removeTweens(this._centerControl.origin);
        egret.Tween.removeTweens(this._redBarEffect.origin);
        egret.Tween.removeTweens(this._blueBarEffect.origin);

        this._blueTargetNumber = b;
        this._redTargetNumber = r;

        dir.meterCtr.rackTo('blockchainlblblue',this._blueTargetNumber,700);
        dir.meterCtr.rackTo('blockchainlblred',this._redTargetNumber,700);

        this.currentProgress = (this._blueTargetNumber - this._redTargetNumber ) / (this._redTargetNumber + this._blueTargetNumber);
        if(isNaN(this.currentProgress)){
          this.currentProgress = 0;
        }

        let des = Math.floor(this._centerOriginX + this.currentProgress * this._barOffsetX);
        if(r === 0 && b ===0){
          des = this._centerOriginX;
        }

        const tweenComplete = function (): void {
          this.onTweenFinished();
        }.bind(this); 

        egret.Tween.get(this._centerControl.origin)
          .to({ x: des }, 230, t => {
            this._centerControl.invalidUpdate();
            return t;
        });

        const desBlue = this._effectCenter + des;

        egret.Tween.get(this._blueBarEffect.origin)
          .to({ x: desBlue}, 230, t => {
            this._blueBarEffect.invalidUpdate();
            return t;
        });

        const desRed = -this._effectCenter + des;

        egret.Tween.get(this._redBarEffect.origin)
          .to({ x: desRed}, 230, t => {
            this._redBarEffect.invalidUpdate();
            return t;
        }).wait(100).call(tweenComplete);
      }

      protected updateBarInfo(red : number, blue : number){

        this.moveEffect(red, blue);

        if(this._isUpdating){
          return;
        }

        this._isUpdating = true;
        // const barEffect = des > 0 ? this._blueBarEffect : this._redBarEffect;
        // const effectOffset = des > 0 ? 1 : -1; 
        // const effectDes = this._effectCenter  * effectOffset + des;
        // const barAnim = des > 0 ? 'effect_blue' : 'effect_red';

        // this._anim.once(dragonBones.AnimationEvent.COMPLETE,this.onAnimCompleted,this);

        // this._anim.animation.play(barAnim,1);
        this._anim.animation.fadeIn('effect_red',0,1,0,'redeffectgroup');
        this._anim.animation.fadeIn('effect_blue',0,1,0,'blueeffectgroup');
        // this._anim.animation.fadeIn('effect_center',230,1,0,'centereffect');
      }

      protected onTweenFinished(e = null){
        if(!this._anim){
          return;
        }
        // this.resetAnim();
        // this._anim.animation.reset();
        this._centerControl.invalidUpdate();
        this._redBarEffect.invalidUpdate();
        this._blueBarEffect.invalidUpdate();

        egret.Tween.removeTweens(this._centerControl.origin);
        egret.Tween.removeTweens(this._redBarEffect.origin);
        egret.Tween.removeTweens(this._blueBarEffect.origin);
        
        this._anim.once(dragonBones.AnimationEvent.COMPLETE,this.resetAnim,this);
        this._anim.animation.play('effect_center',1);
      }

      protected resetAnim(e:dragonBones.AnimationEvent = null){
        if(!this._anim){
          return;
        }
        // const anim : dragonBones.EgretArmatureDisplay = e.target;
        if(this._anim.animation){
          this._anim.animation.stop();
        }

        this._lblBlue.renderText = () => `${utils.formatNumber(this._blueTargetNumber, true)}`;
        this._lblRed.renderText = () => `${utils.formatNumber(this._redTargetNumber, true)}`;

        this._redBarEffect.origin.x = this._redEffectInitX;
        this._blueBarEffect.origin.x = this._blueEffectInitX;

        this._blueBarEffectOriginX = this._redBarEffect.origin.x;
        this._redBarEffectOriginX = this._blueBarEffect.origin.x;

        this._isUpdating = false;

        // const a = 1000;
        // const red = 500 - this.factor;

        // this.playAnim(red,1000);
        // this.factor *= -1;
      }

      protected destroy(){
        this.resetAnim();
        this._anim.dispose();
        super.destroy();

        dir.meterCtr.drop('blockchainlblblue',this._lblBlue);
        dir.meterCtr.drop('blockchainlblred',this._lblRed);      
      }
    }
  }
}