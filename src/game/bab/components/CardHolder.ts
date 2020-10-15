namespace we {
  export namespace bab {
    export class CardHolder extends core.BaseEUI implements ui.IResultDisplay {
      private _gameData: we.bab.GameData;

      protected _prevb1: string;
      protected _prevb2: string;
      protected _prevb3: string;
      protected _preva1: string;
      protected _preva2: string;
      protected _preva3: string;
      protected _prevState: string;

      protected _playerCard1InitX: number;
      protected _playerCard2InitX: number;

      protected _bankerCard1InitX: number;
      protected _bankerCard2InitX: number;

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

      protected _playerCard1Info: eui.Group;
      protected _playerCard2Info: eui.Group;
      protected _bankerCard1Info: eui.Group;
      protected _bankerCard2Info: eui.Group;

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

        this._playerCard1InitX = this._playerCard1Group.x;
        this._playerCard2InitX = this._playerCard2Group.x;
        this._bankerCard1InitX = this._bankerCard2Group.x;
        this._bankerCard2InitX = this._bankerCard2Group.x;
      }

      protected getCardAnimation(orientation: string) {
        const card = this._factory.buildArmatureDisplay('poker');
        card.animation.play(`${orientation}_idle`, 1);
        return card;
      }

      public updateResult(gameData: data.GameData, chipLayer: ui.ChipLayer, isInit: boolean) {
        console.log('updateResult ', isInit);

        if (this._gameData) {
          this._preva1 = this._gameData.a1;
          this._preva2 = this._gameData.a2;
          this._preva3 = this._gameData.a3;
          this._prevb1 = this._gameData.b1;
          this._prevb2 = this._gameData.b2;
          this._prevb3 = this._gameData.b3;
        }
        this._gameData = <bab.GameData>gameData;
        // check prev data == current data?
        switch (gameData.state) {
          case core.GameState.BET:
            // check with previous
            this.setStateBet(isInit);
            break;
          case core.GameState.DEAL:
            this.setStateDeal(isInit);
            break;
          case core.GameState.FINISH:
            this.setStateFinish();
            break;
          default:
            break;
        }
      }

      protected async setStateBet(isInit: boolean) {
        console.log('setStateBet() isInit', isInit);
        await this.movePin();
        await this.moveShoe();
        if (!isInit) {
          await this.betFinalState();
        } else {
          await this.resetCards();
          await this.distributeCards();
        }
      }

      protected async resetCards() {
        if (this._playerCard3Group.visible === true) {
          egret.Tween.get(this._playerCard1Group).to({ x: this._playerCard1InitX });
          egret.Tween.get(this._playerCard2Group).to({ x: this._playerCard2InitX });
          await new Promise(resolve => egret.Tween.get(this._playerCard3Group).to({ alpha: 0 }, 500).set({ visible: false }).call(resolve));
        }
        if (this._bankerCard3Group.visible === true) {
          egret.Tween.get(this._bankerCard1Group).to({ x: this._bankerCard1InitX });
          egret.Tween.get(this._bankerCard2Group).to({ x: this._bankerCard2InitX });

          return new Promise(resolve => egret.Tween.get(this._bankerCard3Group).to({ alpha: 0 }, 500).set({ visible: false }).call(resolve));
        }
      }

      protected async betFinalState() {
        const cardAnimName = ['_playerCard1', '_bankerCard1', '_playerCard2', '_bankerCard2', '_smallPlayerCard3', '_smallBankerCard3'];
        for (let i = 0; i < cardAnimName.length; i++) {
          // const p4 = we.utils.waitDragonBone(this[cardAnimName[i]]);
          const cardAnim = <dragonBones.EgretArmatureDisplay>this[cardAnimName[i]];

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

      protected getCardResName(resName: string) {
        if (!resName) {
          return null;
        }
        if (!env.isMobile) {
          if (resName === 'back') {
            return 'd_sq_ba_card_back_png';
          } else {
            return `d_sq_bac_large_poker_${resName}_png`;
          }
        }

        if (resName === 'back') {
          return 'm_sq_bac_small_poker_backside_png';
        } else {
          return `m_sq_bac_small_poker_${resName}_vertical_png`;
        }
      }

      protected async dealInitState() {
        const cardAnimName = ['_playerCard1', '_bankerCard1', '_playerCard2', '_bankerCard2', '_playerCard3', '_bankerCard3'];
        const arrName = ['b1', 'a1', 'b2', 'a2', 'b3', 'a3'];
        for (let i = 0; i < cardAnimName.length; i++) {
          // const p4 = we.utils.waitDragonBone(this[cardAnimName[i]]);
          if (arrName[i] === 'b3') {
            egret.Tween.get(this._playerCard1Group).to({ x: 459 }, 400);
            egret.Tween.get(this._playerCard2Group).to({ x: 715 }, 400);
            await new Promise(resolve => egret.Tween.get(this._playerCard3Group).set({ visible: true }).to({ alpha: 1 }, 500).call(resolve));
          }
          if (arrName[i] === 'a3') {
            egret.Tween.get(this._bankerCard1Group).to({ x: 1860 }, 400);
            egret.Tween.get(this._bankerCard2Group).to({ x: 2116 }, 400);
            await new Promise(resolve => egret.Tween.get(this._bankerCard3Group).set({ visible: true }).to({ alpha: 1 }, 500).call(resolve));
          }

          const cardAnim = <dragonBones.EgretArmatureDisplay>this[cardAnimName[i]];

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
          image.source = this.getCardResName(utils.formatCardForFlip(this._gameData[arrName[i]]));
          image.anchorOffsetX = image.width / 2;
          image.anchorOffsetY = image.height / 2;
          group.addChild(image);
          cardSlot.display = group;

          if (this._gameData[arrName[i]]) {
            const cardSlot = cardAnim.armature.getSlot('card_front_vertical');
            const group = new eui.Group();
            const image = new eui.Image();
            image.width = 204;
            image.height = 312;
            image.source = this.getCardResName(utils.formatCardForFlip(this._gameData[arrName[i]]));
            image.anchorOffsetX = image.width / 2;
            image.anchorOffsetY = image.height / 2;
            group.addChild(image);
            cardSlot.display = group;
          }

          cardAnim.animation.reset();
          cardAnim.animation.stop();
          if (this._gameData[arrName[i]]) {
            cardAnim.animation.gotoAndStop('vertical_loop_front', 0);
          } else {
            cardAnim.animation.gotoAndStop('vertical_loop_back', 0);
          }
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

      protected async flipCards() {
        const cardAnimName = ['_bankerCard3', '_playerCard3', '_bankerCard2', '_bankerCard1', '_playerCard2', '_playerCard1'];
        const arrName = ['a3', 'b3', 'a2', 'a1', 'b2', 'b1'];
        for (let i = cardAnimName.length - 1; i >= 0; i--) {
          const cardAnim = <dragonBones.EgretArmatureDisplay>this[cardAnimName[i]];
          const cardIndexSlot = cardAnim.armature.getSlot('card_number_vertical');
          const cardGroup = new eui.Group();
          const cardLabel = new eui.Label();
          cardLabel.text = this._gameData.currentcardindex + i;
          cardGroup.addChild(cardLabel);
          cardIndexSlot.display = cardGroup;

          if (!this._gameData[arrName[i]]) {
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
            continue;
          }

          if (this._gameData[arrName[i]]) {
            const cardSlot = cardAnim.armature.getSlot('card_front_vertical');
            const group = new eui.Group();
            const image = new eui.Image();
            image.width = 204;
            image.height = 312;
            image.source = this.getCardResName(utils.formatCardForFlip(this._gameData[arrName[i]]));
            image.anchorOffsetX = image.width / 2;
            image.anchorOffsetY = image.height / 2;
            group.addChild(image);
            cardSlot.display = group;
            if (this._gameData[arrName[i]] === this[`_prev${arrName[i]}`]) {
              cardAnim.animation.gotoAndStop('vertical_loop_front', 0);
            } else {
              const p1 = we.utils.waitDragonBone(cardAnim);
              cardAnim.animation.play('vertical_in');
              await p1;
              cardAnim.animation.gotoAndStop('vertical_loop_front', 0);
            }
          }
        }
      }

      protected getCard(cardString: string) {
        const resName = cardString === 'back' ? 'back' : utils.formatCardForFlip(cardString);

        const image = new eui.Image();
        image.width = 204;
        image.height = 312;
        image.source = this.getCardResName(resName);
        image.anchorOffsetX = image.width / 2;
        image.anchorOffsetY = image.height / 2;
        return image;
      }

      protected setStateDeal(isInit: boolean) {
        (async () => {
          if (isInit) {
            await this.dealInitState();
          }
          await this.flipCards();
        })();
      }

      protected showCardButtonForInfo() {}

      protected async movePin() {
        const bone = this._ringAnim.armature.getBone('red_card');
        const proportion = this._gameData.currentcardindex / this._gameData.redcardindex;
        const angleOffset = 82 * proportion; // -49 - (-131) = 82
        const destAngle = -49 + angleOffset;
        const destRad = (destAngle * Math.PI) / 180;
        bone.animationPose.rotation = destRad;

        /*
        new Promise(resolve => {
          egret.Tween.get(bone.animationPose)
            .to({ rotation: destRad }, 1000, function (t) {
              bone.invalidUpdate();
              return t;
            })
            .call(resolve);
        });
        */
      }

      protected async moveShoe() {
        console.log('moveShoe.gameData', this._gameData);
        console.log(this._gameData.maskedcardssnList);
        const bone = this._ringAnim.armature.getBone('shoe_bar');
        const proportion = this._gameData.currentcardindex / this._gameData.maskedcardssnList.length;
        const angleOffset = 82 * proportion; // -49 - (-131) = 82
        const destAngle = -49 + angleOffset;
        const destRad = (destAngle * Math.PI) / 180;
        bone.animationPose.rotation = destRad;
        /*
      new Promise(resolve => {
        egret.Tween.get(bone.animationPose)
          .to({ rotation: destRad }, 1000, function (t) {
            bone.invalidUpdate();
            return t;
          })
          .call(resolve);
      });
      */
      }

      protected async distributeCards() {
        this._ringAnim.animation.stop();
        const p1 = we.utils.waitDragonBone(this._ringAnim);
        this._ringAnim.animation.play('round_in', 1);
        await p1;

        const cardAnimName = ['_playerCard1', '_bankerCard1', '_playerCard2', '_bankerCard2', '_smallPlayerCard3', '_smallBankerCard3'];
        for (let i = 0; i < cardAnimName.length; i++) {
          const ringNumberSlot = this._ringAnim.armature.getSlot('card_number_vertical');
          const ringNumberGroup = new eui.Group();
          const ringNumberLabel = new eui.Label();
          ringNumberLabel.text = this._gameData.currentcardindex + i;
          ringNumberGroup.addChild(ringNumberLabel);
          ringNumberSlot.display = ringNumberGroup;

          const cardAnim = <dragonBones.EgretArmatureDisplay>this[cardAnimName[i]];
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

          const p2 = we.utils.waitDragonBone(this._ringAnim);
          this._ringAnim.animation.play('poker_in', 1);
          await p2;

          const p3 = we.utils.waitDragonBone(cardAnim);
          cardAnim.animation.play('vertical_in', 1);
          await p3;

          const p4 = we.utils.waitDragonBone(cardAnim);
          cardAnim.animation.play('vertical_loop_back', 1);
          await p4;

          const p5 = we.utils.waitDragonBone(this._ringAnim);
          this._ringAnim.animation.play('poker_out', 1);
          await p5;

          if (this._gameData.currentcardindex + i === this._gameData.redcardindex) {
            // do red card thing
          }
        }
      }

      protected setStateFinish() {}

      public reset() {}
    }
  }
}
