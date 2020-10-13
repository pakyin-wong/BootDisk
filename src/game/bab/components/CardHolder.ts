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
      protected _smallPlayerCard3Group: eui.Group;

      protected _bankerCard1Group: eui.Group;
      protected _bankerCard2Group: eui.Group;
      protected _bankerCard3Group: eui.Group;
      protected _smallBankerCard3Group: eui.Group;

      protected _playerCard1: dragonBones.EgretArmatureDisplay;
      protected _playerCard2: dragonBones.EgretArmatureDisplay;
      protected _playerCard3: dragonBones.EgretArmatureDisplay;
      protected _smallPlayerCard3: dragonBones.EgretArmatureDisplay;
      protected _bankerCard1: dragonBones.EgretArmatureDisplay;
      protected _bankerCard2: dragonBones.EgretArmatureDisplay;
      protected _bankerCard3: dragonBones.EgretArmatureDisplay;
      protected _smallBankerCard3: dragonBones.EgretArmatureDisplay;

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

      protected createCards() {
        this._playerCard1 = this.getCardAnimation('vertical');
        this._playerCard2 = this.getCardAnimation('vertical');
        this._playerCard3 = this.getCardAnimation('horizontal');
        this._smallPlayerCard3 = this.getCardAnimation('vertical');
        this._bankerCard1 = this.getCardAnimation('vertical');
        this._bankerCard2 = this.getCardAnimation('vertical');
        this._bankerCard3 = this.getCardAnimation('horizontal');
        this._smallBankerCard3 = this.getCardAnimation('vertical');

        this._smallPlayerCard3.scaleX = 0.35;
        this._smallPlayerCard3.scaleY = 0.35;

        this._smallBankerCard3.scaleX = 0.35;
        this._smallBankerCard3.scaleY = 0.35;

        this._playerCard1Group.addChild(this._playerCard1);
        this._playerCard2Group.addChild(this._playerCard2);
        this._playerCard3Group.addChild(this._playerCard3);
        this._smallPlayerCard3Group.addChild(this._smallPlayerCard3);
        this._bankerCard1Group.addChild(this._bankerCard1);
        this._bankerCard2Group.addChild(this._bankerCard2);
        this._bankerCard3Group.addChild(this._bankerCard3);
        this._smallBankerCard3Group.addChild(this._smallBankerCard3);
      }

      protected getCardAnimation(orientation: string) {
        const card = this._factory.buildArmatureDisplay('poker');
        card.animation.play(`${orientation}_idle`, 1);
        return card;
      }

      public updateResult(gameData: data.GameData, chipLayer: ui.ChipLayer, isInit: boolean) {
        console.log('updateResult ', isInit);

        this._gameData = <bab.GameData> gameData;
        // check prev data == current data?
        switch (gameData.state) {
          case core.GameState.BET:
            // check with previous
            this.setStateBet(isInit);
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

      protected async setStateBet(isInit: boolean) {
        console.log('setStateBet() isInit', isInit);
        this.movePin();
        this.moveShoe();
        if (!isInit) {
          this.distributeCards();
        } else {
          this.betFinalState();
        }
      }

      protected async betFinalState() {
        const cardAnimName = ['_playerCard1', '_bankerCard1', '_playerCard2', '_bankerCard2', '_smallPlayerCard3', '_smallBankerCard3'];
        for (let i = 0; i < cardAnimName.length; i++) {
          // const p4 = we.utils.waitDragonBone(this[cardAnimName[i]]);
          const cardAnim = <dragonBones.EgretArmatureDisplay> this[cardAnimName[i]];

          const cardIndexSlot = cardAnim.armature.getSlot('card_number_vertical');
          const cardGroup = new eui.Group();
          const cardLabel = new eui.Label();
          cardLabel.text = this._gameData.currentcardindex + i;
          cardGroup.addChild(cardLabel);
          cardIndexSlot.display = cardGroup;

          const cardSlot = cardAnim.armature.getSlot('card_back_vertical');
          const group = new eui.Group();
          const image = new eui.Image();
          image.width = 204;
          image.height = 312;
          image.source = 'd_sq_ba_card_back_png';
          image.anchorOffsetX = image.width / 2;
          image.anchorOffsetY = image.height / 2;
          group.addChild(image);
          cardSlot.display = group;

          cardAnim.animation.reset();
          cardAnim.animation.stop();
          cardAnim.animation.gotoAndStop('vertical_loop_back', 0);
        }
      }

      protected async ringLoop() {
        this._ringAnim.animation.stop();
        /*
        const p1 = we.utils.waitDragonBone(this._ringAnim);
        this._ringAnim.animation.play('round_loop_a', 5);
        await p1;
        */
        this._ringAnim.animation.fadeIn('round_loop_a', 0, 0, 0, 'NORMAL_ANIMATION_GROUP');
        this._ringAnim.animation.fadeIn('poker_round_in', 0, 0, 0, 'ATTACK_ANIMATION_GROUP');
        this._ringAnim.animation.fadeIn('draw', 0, 0, 0, 'DRAW_ANIMATION_GROUP');
        this.movePin();
      }

      protected setStateDeal() {}

      protected async movePin() {
        const bone = this._ringAnim.armature.getBone('red_card');
        const proportion = this._gameData.currentcardindex / this._gameData.redcardindex;
        const angleOffset = 82 * proportion; // -49 - (-131) = 82
        const destAngle = -49 + angleOffset;
        const destRad = (destAngle * Math.PI) / 180;

        egret.Tween.get(bone.animationPose).to({ rotation: destRad }, 1000, function (t) {
          bone.invalidUpdate();
          return t;
        });
      }

      protected async moveShoe() {
        const bone = this._ringAnim.armature.getBone('shoe_bar');
        const proportion = this._gameData.currentcardindex / this._gameData.maskedcardssnList.length;
        const angleOffset = 82 * proportion; // -49 - (-131) = 82
        const destAngle = -49 + angleOffset;
        const destRad = (destAngle * Math.PI) / 180;

        egret.Tween.get(bone.animationPose).to({ rotation: destRad }, 1000, function (t) {
          bone.invalidUpdate();
          return t;
        });
      }

      protected async distributeCards() {
        this._ringAnim.animation.stop();
        const p1 = we.utils.waitDragonBone(this._ringAnim);
        this._ringAnim.animation.play('round_in', 1);
        await p1;

        const cardAnimName = ['_playerCard1', '_bankerCard1', '_playerCard2', '_bankerCard2', '_smallPlayerCard3', '_smallBankerCard3'];
        for (let i = 0; i < cardAnimName.length; i++) {
          const cardAnim = <dragonBones.EgretArmatureDisplay> this[cardAnimName[i]];
          const cardIndexSlot = cardAnim.armature.getSlot('card_number_vertical');
          const cardGroup = new eui.Group();
          const cardLabel = new eui.Label();
          cardLabel.text = this._gameData.currentcardindex + i;
          cardGroup.addChild(cardLabel);
          cardIndexSlot.display = cardGroup;

          const cardSlot = cardAnim.armature.getSlot('card_back_vertical');
          const group = new eui.Group();
          const image = new eui.Image();
          image.width = 204;
          image.height = 312;
          image.source = 'd_sq_ba_card_back_png';
          image.anchorOffsetX = image.width / 2;
          image.anchorOffsetY = image.height / 2;
          group.addChild(image);
          cardSlot.display = group;

          // cardAnim.animation.stop();

          this._ringAnim.animation.play('poker_in', 1);

          // const p3 = we.utils.waitDragonBone(cardAnim);
          cardAnim.animation.play('vertical_in', 1);
          // await p3;
          // await p2;

          // const p4 = we.utils.waitDragonBone(cardAnim);
          cardAnim.animation.play('vertical_loop_back', 1);

          // const p5 = we.utils.waitDragonBone(this._ringAnim);
          this._ringAnim.animation.play('poker_out', 1);

          // await p4;
          // await p5;

          if (this._gameData.currentcardindex + i === this._gameData.redcardindex) {
            // do red card thing
          }
        }
      }

      public reset() {}
    }
  }
}
