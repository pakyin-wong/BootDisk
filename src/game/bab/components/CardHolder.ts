namespace we {
  export namespace bab {
    export class CardHolder extends core.BaseEUI implements ui.IResultDisplay {
      private _gameData: we.bab.GameData;

      protected _playerSum: eui.Label;
      protected _bankerSum: eui.Label;

      protected _factory: dragonBones.EgretFactory;
      protected _ringAnim: dragonBones.EgretArmatureDisplay;

      protected _animRingGroup: eui.Group;
      protected _particleGroup: eui.Group;

      protected _playerCard1Group: eui.Group;
      protected _playerCard2Group: eui.Group;
      protected _playerCard3Group: eui.Group;
      protected _bankerCard1Group: eui.Group;
      protected _bankerCard2Group: eui.Group;
      protected _bankerCard3Group: eui.Group;

      protected _playerCard1: dragonBones.EgretArmatureDisplay;
      protected _playerCard2: dragonBones.EgretArmatureDisplay;
      protected _playerCard3: dragonBones.EgretArmatureDisplay;
      protected _bankerCard1: dragonBones.EgretArmatureDisplay;
      protected _bankerCard2: dragonBones.EgretArmatureDisplay;
      protected _bankerCard3: dragonBones.EgretArmatureDisplay;

      protected mount() {
        this.reset();
        this.createParticles();
        this.createFactory();
        this.createRingAnim();
        this.createCards();
      }

      protected createChildren() {
        super.createChildren();
        this.skinName = utils.getSkinByClassname('bab.CardHolderSkin');
      }

      protected createParticles() {
        const mcFactory = new ui.SeqMovieClipFactory();
        for (let i = 0; i < 4; i++) {
          const mc: egret.MovieClip = mcFactory.createMovieClip('d_bcba_animation_particle', 0, 150, 30, [{ name: 'play', frame: 1, end: 151 }], 5);
          this._particleGroup.addChild(mc);
          const j = i % 2;
          mc.x = 1300 * Math.floor(i / 2);
          mc.y = 760 * j;
          mc.gotoAndPlay('play', -1);
        }
      }

      protected createFactory() {
        const skeletonData = RES.getRes(`blockchain_ske_json`);
        const textureData = RES.getRes(`blockchain_tex_json`);
        const texture = RES.getRes(`blockchain_tex_png`);
        this._factory = new dragonBones.EgretFactory();
        this._factory.parseDragonBonesData(skeletonData);
        this._factory.parseTextureAtlasData(textureData, texture);
      }

      protected createRingAnim() {
        this._ringAnim = this._factory.buildArmatureDisplay('blockchain');
        this._animRingGroup.addChild(this._ringAnim);
      }

      protected createCards(){
        this._playerCard1 = this.getCardAnimation('vertical')
        this._playerCard2 = this.getCardAnimation('vertical')
        this._playerCard3 = this.getCardAnimation('horizontal')
        this._bankerCard1 = this.getCardAnimation('vertical')
        this._bankerCard2 = this.getCardAnimation('vertical')
        this._bankerCard3 = this.getCardAnimation('horizontal')
        this._playerCard1Group.addChild(this._playerCard1);
        this._playerCard2Group.addChild(this._playerCard2);
        this._playerCard3Group.addChild(this._playerCard3);
        this._bankerCard1Group.addChild(this._bankerCard1);
        this._bankerCard2Group.addChild(this._bankerCard2);
        this._bankerCard3Group.addChild(this._bankerCard3);
      }

      protected getCardAnimation(orientation: string) {
        const card = this._factory.buildArmatureDisplay('poker');
        card.animation.play(`${orientation}_idle`, 1);
        return card;
      }

      public updateResult(gameData: data.GameData) {
        this._gameData = <bab.GameData>gameData;
        // check prev data == current data?
        switch (gameData.state) {
          case core.GameState.BET:
            //check with previous
            this.setStateBet();
            break;
          case core.GameState.DEAL:
            this.setStateDeal();
            break;
          case core.GameState.FINISH:
            break;
          case core.GameState.SHUFFLE:
            break;
          default:
            break;
        }
      }

      protected setStateBet() {
        this.ringLoop();
      }

      protected async ringLoop(){
        this._ringAnim.animation.stop();
        /*
        const p1 = we.utils.waitDragonBone(this._ringAnim);
        this._ringAnim.animation.play('round_loop_a', 5);
        await p1;
        */
        this._ringAnim.animation.fadeIn("round_loop_a", 0, 0, 0, "NORMAL_ANIMATION_GROUP");
        this._ringAnim.animation.fadeIn("poker_round_in", 0, 0, 0, "ATTACK_ANIMATION_GROUP");
        this._ringAnim.animation.fadeIn("draw", 0, 0, 0, "DRAW_ANIMATION_GROUP");
        this.movePin();
      }

      protected setStateDeal() {
        if(this._gameData.a1 === null && this._gameData.a2 === null && this._gameData.b1 === null && this._gameData.b2 === null){
          this.distributeFirst4Cards();
        }
      }

      protected async movePin(){
        const bone = this._ringAnim.armature.getBone('red_card');
        egret.Tween.get(bone.animationPose).to({rotation: 3.4},1000,function (t) {
          bone.invalidUpdate();
          return t;
        
        })
      }

      protected async distributeFirst4Cards() {
        this._ringAnim.animation.stop();
        const p1 = we.utils.waitDragonBone(this._ringAnim);
        this._ringAnim.animation.play('round_in');
        await p1;

        const cardAnimName = ['_playerCard1','_playerCard2','_bankerCard1','_bankerCard2']
        for(let i = 0; i < 4; i++){
          const p2 = we.utils.waitDragonBone(this._ringAnim);
          this._ringAnim.animation.play('poker_round_in', 1);

          const p3 = we.utils.waitDragonBone(this[cardAnimName[i]]);
          this[cardAnimName[i]].animation.play('vertical_in',1);
          await p3

          const p4 = we.utils.waitDragonBone(this[cardAnimName[i]]);
          this[cardAnimName[i]].animation.play('vertical_loop_back',1);

          const p5 = we.utils.waitDragonBone(this._ringAnim);
          this._ringAnim.animation.play('poker_round_out', 1);
          await p5
        }
      }

      public reset() {}
    }
  }
}
