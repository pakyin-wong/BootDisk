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
        this._playerCard1 = this.getCardAnim('vertical');
        this._playerCard2 = this.getCardAnim('vertical');
        this._playerCard3 = this.getCardAnim('horizontal');
        this._smallPlayerCard3 = this.getCardAnim('vertical');
        this._bankerCard1 = this.getCardAnim('vertical');
        this._bankerCard2 = this.getCardAnim('vertical');
        this._bankerCard3 = this.getCardAnim('horizontal');
        this._smallBankerCard3 = this.getCardAnim('vertical');

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

      protected getCardAnim(orientation: string) {
        const cardAnim = this._factory.buildArmatureDisplay('poker');
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
        cardAnim.animation.gotoAndStopByTime(`${orientation}_idle`, 0);
        return cardAnim;
      }

      public updateResult(gameData: data.GameData, chipLayer: ui.ChipLayer, isInit: boolean) {
        console.log('BAM cardholder::updateResult ', gameData, isInit);

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
        console.log('setStateBet() isInit', isInit, this._gameData);
        this.updateSum();
        console.log('movePin()');
        this.movePin();
        console.log('moveShoe()');
        this.moveShoe();
        if (isInit) {
          console.log('betFinalState()');
          await this.betFinalState();
        } else {
          console.log('resetRound()');
          await this.resetRound();
          console.log('distributeCards()');
          await this.distributeCards();
        }
      }

      protected async resetRound() {
        let cardAnimNames = ['_playerCard1', '_bankerCard1', '_playerCard2', '_bankerCard2'];
        console.log('resetRound 1')
        for (let i = 0; i < cardAnimNames.length; i++) {
          const cardAnim = <dragonBones.EgretArmatureDisplay>this[cardAnimNames[i]];
          cardAnim.armature.getSlot('card_number_vertical').display = this.getLabelGroup(this._gameData.currentcardindex + i);

          const p1 = we.utils.waitDragonBone(cardAnim);
          cardAnim.animation.play('vertical_in');
          await p1;

          cardAnim.animation.gotoAndStopByTime('vertical_loop_back', 0);
          console.log('resetRound 1 loop ' + (i + 1));
        }

        if (this._playerCard3Group.visible === true) {
          await new Promise(resolve => egret.Tween.get(this._playerCard3Group).to({ alpha: 0 }, 500).set({ visible: false }).call(resolve));
          await new Promise(resolve => egret.Tween.get(this._playerCard1Group).to({ x: this._playerCard1InitX }, 500).call(resolve));
          await new Promise(resolve => egret.Tween.get(this._playerCard2Group).to({ x: this._playerCard2InitX }, 500).call(resolve));
        }
        console.log('resetRound 5');

        if (this._bankerCard3Group.visible === true) {
          await new Promise(resolve => egret.Tween.get(this._bankerCard3Group).to({ alpha: 0 }, 500).set({ visible: false }).call(resolve));
          await new Promise(resolve => egret.Tween.get(this._bankerCard1Group).to({ x: this._bankerCard1InitX }, 500).call(resolve));
          await new Promise(resolve => egret.Tween.get(this._bankerCard2Group).to({ x: this._bankerCard2InitX }, 500).call(resolve));
        }
        console.log('resetRound 6');

        cardAnimNames = ['_smallPlayerCard3', '_smallBankerCard3'];
        for (let i = 0; i < cardAnimNames.length; i++) {
          const cardAnim = <dragonBones.EgretArmatureDisplay>this[cardAnimNames[i]];
          cardAnim.armature.getSlot('card_number_vertical').display = this.getLabelGroup(this._gameData.currentcardindex + i);

          const p1 = we.utils.waitDragonBone(cardAnim);
          cardAnim.animation.play('vertical_in');
          await p1;

          cardAnim.animation.gotoAndStopByTime('vertical_loop_back', 0);

          console.log('resetRound loop 2' + (i + 1));
        }

        return new Promise(resolve => resolve);
      }

      protected getLabelGroup(num: number) {
        const group = new eui.Group();
        const cardLabel = new eui.Label();
        cardLabel.text = num.toString();
        group.addChild(cardLabel);
        return group;
      }

      protected async betFinalState(currentIndexAnchor = 0) {
        const cardAnimName = ['_playerCard1', '_bankerCard1', '_playerCard2', '_bankerCard2', '_smallPlayerCard3', '_smallBankerCard3'];
        for (let i = 0; i < cardAnimName.length; i++) {
          const cardAnim = <dragonBones.EgretArmatureDisplay>this[cardAnimName[i]];
          cardAnim.armature.getSlot('card_number_vertical').display = this.getLabelGroup(this._gameData.currentcardindex - (currentIndexAnchor - i));
          cardAnim.animation.reset();
          cardAnim.animation.stop();
          cardAnim.animation.gotoAndStopByTime('vertical_loop_back', 0);
        }
        return new Promise(resolve=>resolve);
      }

      protected getCurrentIndexAnchor() {
        const dataNames = ['b1', 'a1', 'b2', 'a2', 'b3', 'a3'];
        for (let i = dataNames.length - 1; i >= 0; i--) {
          if (this._gameData[dataNames[i]]) {
            return i;
          }
        }
        return 0;
      }

      protected async dealInitState() {
        const currentIndexAnchor = this.getCurrentIndexAnchor();
        console.log('dealInitState 1');
        await this.betFinalState(currentIndexAnchor);
        console.log('dealInitState 2');

        if (this._gameData.a2 === null) {
          return new Promise(resolve=>resolve);
        }
        const cardAnimNames = ['_playerCard1', '_bankerCard1', '_playerCard2', '_bankerCard2', '_playerCard3', '_bankerCard3'];
        const dataName = ['b1', 'a1', 'b2', 'a2', 'b3', 'a3'];

        console.log('dealInitState 3');
        for (let i = 0; i < cardAnimNames.length; i++) {
          const cardAnim = <dragonBones.EgretArmatureDisplay>this[cardAnimNames[i]];
          const currentCardData = this._gameData[dataName[i]];

          if (!currentCardData) {
            continue;
          }

          console.log('dealInitState 4');

          if (dataName[i] === 'b3') {
            await new Promise(resolve => egret.Tween.get(this._playerCard1Group).to({ x: 459 }, 400).call(resolve));
            await new Promise(resolve => egret.Tween.get(this._playerCard2Group).to({ x: 715 }, 400).call(resolve));
            await new Promise(resolve => egret.Tween.get(this._playerCard3Group).set({ visible: true }).to({ alpha: 1 }, 500).call(resolve));
          }

          if (dataName[i] === 'a3') {
            await new Promise(resolve => egret.Tween.get(this._bankerCard1Group).to({ x: 1860 }, 400).call(resolve));
            await new Promise(resolve => egret.Tween.get(this._bankerCard2Group).to({ x: 2116 }, 400).call(resolve));
            await new Promise(resolve => egret.Tween.get(this._bankerCard3Group).set({ visible: true }).to({ alpha: 1 }, 500).call(resolve));
          }

          cardAnim.armature.getSlot('card_number_vertical').display = this.getLabelGroup(this._gameData.currentcardindex - (currentIndexAnchor - i));

          console.log('dealInitState 5');
          const cardSlot = cardAnim.armature.getSlot('card_front_vertical');
          const group = new eui.Group();
          const image = new eui.Image();
          image.width = 204;
          image.height = 312;
          image.source = utils.getCardResName(utils.formatCardForFlip(currentCardData));
          image.anchorOffsetX = image.width / 2;
          image.anchorOffsetY = image.height / 2;
          group.addChild(image);
          cardSlot.display = group;

          console.log('dealInitState 6');

          cardAnim.animation.reset();
          cardAnim.animation.stop();
          cardAnim.animation.gotoAndStopByTime('vertical_loop_front', 0);
        }

        return new Promise(resolve=>resolve);
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
        // this.movePin();
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
            cardAnim.animation.gotoAndStopByTime('vertical_loop_back', 0);
            continue;
          }

          if (this._gameData[arrName[i]]) {
            const cardSlot = cardAnim.armature.getSlot('card_front_vertical');
            const group = new eui.Group();
            const image = new eui.Image();
            image.width = 204;
            image.height = 312;
            image.source = utils.getCardResName(utils.formatCardForFlip(this._gameData[arrName[i]]));
            image.anchorOffsetX = image.width / 2;
            image.anchorOffsetY = image.height / 2;
            group.addChild(image);
            cardSlot.display = group;
            if (this._gameData[arrName[i]] === this[`_prev${arrName[i]}`]) {
              cardAnim.animation.gotoAndStopByTime('vertical_loop_front', 0);
            } else {
              const p1 = we.utils.waitDragonBone(cardAnim);
              cardAnim.animation.play('vertical_in');
              await p1;
              cardAnim.animation.gotoAndStopByTime('vertical_loop_front', 0);
            }
          }
        }
      }

      protected getCard(cardString: string) {
        const resName = cardString === 'back' ? 'back' : utils.formatCardForFlip(cardString);

        const image = new eui.Image();
        image.width = 204;
        image.height = 312;
        image.source = utils.getCardResName(resName);
        image.anchorOffsetX = image.width / 2;
        image.anchorOffsetY = image.height / 2;
        return image;
      }

      protected setStateDeal(isInit: boolean) {
        console.log('setStateDeal()', this._gameData)
        this.updateSum();
        console.log('movePin()');
        this.movePin();
        console.log('moveShoe()');
        this.moveShoe();
        (async () => {
          if (isInit) {
            console.log('dealInitState()');
            await this.dealInitState();
          } else {
            console.log('flipCards()');
            await this.flipCards();
          }
        })();
      }

      protected showCardButtonForInfo() {}

      protected movePin() {
        const bone = this._ringAnim.armature.getBone('red_card');
        const proportion = this._gameData.currentcardindex / this._gameData.redcardindex;
        const angleOffset = 82 * proportion; // -49 - (-131) = 82
        const destAngle = -49 + angleOffset;
        const destRad = (destAngle * Math.PI) / 180;
        bone.animationPose.rotation = destRad;
        bone.invalidUpdate();
      }

      protected moveShoe() {
        const bone = this._ringAnim.armature.getBone('shoe_bar');
        const proportion = this._gameData.currentcardindex / this._gameData.maskedcardssnList.length;
        const angleOffset = 82 * proportion; // -49 - (-131) = 82
        const destAngle = -49 + angleOffset;
        const destRad = (destAngle * Math.PI) / 180;
        bone.animationPose.rotation = destRad;
        bone.invalidUpdate();
      }

      protected async distributeCards() {
        this._ringAnim.animation.stop();

        const p1 = we.utils.waitDragonBone(this._ringAnim);
        this._ringAnim.animation.play('round_in', 0);
        await p1;

        const cardAnimNames = ['_playerCard1', '_bankerCard1', '_playerCard2', '_bankerCard2', '_smallPlayerCard3', '_smallBankerCard3'];
        for (let i = 0; i < cardAnimNames.length; i++) {
          const cardAnim = <dragonBones.EgretArmatureDisplay>this[cardAnimNames[i]];
          cardAnim.armature.getSlot('card_number_vertical').display = this.getLabelGroup(this._gameData.currentcardindex + i);

          this._ringAnim.armature.getSlot('card_number_vertical').display = this.getLabelGroup(this._gameData.currentcardindex + i);

          const p3 = we.utils.waitDragonBone(cardAnim);
          cardAnim.animation.play('vertical_in', 1);

          const p2 = we.utils.waitDragonBone(this._ringAnim);
          this._ringAnim.animation.play('poker_in', 1);
          await p2;

          await p3;

          const p4 = we.utils.waitDragonBone(cardAnim);
          cardAnim.animation.play('vertical_loop_back', 1);

          const p5 = we.utils.waitDragonBone(this._ringAnim);
          this._ringAnim.animation.play('poker_out', 1);
          await p5;

          await p4;

          if (this._gameData.currentcardindex + i === this._gameData.redcardindex) {
            // do red card thing
          }
        }
        return new Promise(resolve=>resolve)
      }

      protected updateSum(){
        if(this._gameData.state === core.GameState.BET || this._gameData.state === core.GameState.SHUFFLE){
          this._playerSum.visible = false
          this._playerSum.visible = false
        }else{
          this._playerSum.visible = true
          this._playerSum.visible = true
        }

        this._playerSum.text = this._gameData.playerpoint.toString();
        this._bankerSum.text = this._gameData.bankerpoint.toString();
      }

      protected setStateFinish() {}

      public reset() {}
    }
  }
}
