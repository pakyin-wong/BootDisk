namespace we {
  export namespace bab {
    export class CardHolder extends core.BaseEUI implements ui.IResultDisplay {
      private _gameData: we.bab.GameData;

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

      protected _playerCard1: dragonBones.EgretArmatureDisplay;
      protected _playerCard2: dragonBones.EgretArmatureDisplay;
      protected _playerCard3: dragonBones.EgretArmatureDisplay;
      protected _smallPlayerCard3: dragonBones.EgretArmatureDisplay;
      protected _bankerCard1: dragonBones.EgretArmatureDisplay;
      protected _bankerCard2: dragonBones.EgretArmatureDisplay;
      protected _bankerCard3: dragonBones.EgretArmatureDisplay;
      protected _smallBankerCard3: dragonBones.EgretArmatureDisplay;

      protected _playerCard1Info: eui.Group;
      protected _playerCard2Info: eui.Group;
      protected _playerCard3Info: eui.Group;
      protected _bankerCard1Info: eui.Group;
      protected _bankerCard2Info: eui.Group;
      protected _bankerCard3Info: eui.Group;
      protected _infoArray: number[];

      protected mount() {
        this.reset();
        this.createParticles();
        this.createFactory();
        this.createRingAnim();
        this.createCards();
        this.addEventListeners();
      }

      protected createChildren() {
        super.createChildren();
        this.skinName = utils.getSkinByClassname('bab.CardHolderSkin');
      }

      protected addEventListeners() {
        this._infoArray = [-1, -1, -1, -1, -1, -1];
        const infoGroup = ['_playerCard1Info', '_bankerCard1Info', '_playerCard2Info', '_bankerCard2Info', '_playerCard3Info', '_bankerCard3Info'];
        for (let i = 0; i < infoGroup.length; i++) {
          mouse.setButtonMode(this[infoGroup[i]], true);
          this[infoGroup[i]].addEventListener(
            egret.TouchEvent.TOUCH_TAP,
            () => {
              console.log('dispatch OPEN_CARDINFO_PANEL', this._infoArray[i]);
              if (this._infoArray[i] !== -1) {
                this.dispatchEvent(new egret.Event('OPEN_CARDINFO_PANEL', false, false, this._infoArray[i]));
              }
            },
            this
          );
        }
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
        this._playerCard3 = this.getCardAnim('horizontal', 90);
        this._smallPlayerCard3 = this.getCardAnim('vertical');
        this._bankerCard1 = this.getCardAnim('vertical');
        this._bankerCard2 = this.getCardAnim('vertical');
        this._bankerCard3 = this.getCardAnim('horizontal', 270);
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
        this._bankerCard1InitX = this._bankerCard1Group.x;
        this._bankerCard2InitX = this._bankerCard2Group.x;
      }

      protected getCardAnim(orientation: string, angle: number = 90) {
        const cardAnim = this._factory.buildArmatureDisplay('poker');
        const cardSlot = cardAnim.armature.getSlot(`card_back_${orientation}`);
        const group = new eui.Group();
        const image = new eui.Image();
        image.width = 204;
        image.height = 312;
        image.source = 'd_sq_ba_card_back_png';
        image.anchorOffsetX = image.width / 2;
        image.anchorOffsetY = image.height / 2;

        if (orientation === 'horizontal' && angle === 90) {
          image.rotation = angle;
        }
        if (orientation === 'horizontal' && angle === 270) {
          image.rotation = angle;
        }

        group.addChild(image);
        cardSlot.display = group;
        cardAnim.animation.gotoAndStopByTime(`${orientation}_idle`, 0);

        if (orientation === 'horizontal') {
          cardAnim.anchorOffsetY = image.width / 2 - 10;
        }

        return cardAnim;
      }

      public updateResult(gameData: data.GameData, chipLayer: ui.ChipLayer, isInit: boolean) {
        console.log('BAB cardholder::updateResult ', gameData, isInit);

        this._gameData = <bab.GameData> gameData;
        this.updateCardInfoButtons();
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
          console.log('betInitState()');
          await this.betInitState();
        } else {
          console.log('resetRound()');
          await this.resetRound();
          console.log('distributeCards()');
          await this.distributeCards();
        }
      }

      protected async resetRound() {
        let cardAnimNames = ['_playerCard1', '_bankerCard1', '_playerCard2', '_bankerCard2', '_playerCard3', '_bankerCard3'];
        console.log('resetRound 1');
        for (let i = 0; i < cardAnimNames.length; i++) {
          const cardAnim = <dragonBones.EgretArmatureDisplay> this[cardAnimNames[i]];
          let orientation = 'vertical';
          if (cardAnimNames[i] === '_playerCard3' || cardAnimNames[i] === '_bankerCard3') {
            orientation = 'horizontal';
          }
          cardAnim.armature.getSlot(`card_number_${orientation}`).display = this.getLabelGroup(this._gameData.currentcardindex + 1 + i);

          const p1 = we.utils.waitDragonBone(cardAnim);
          cardAnim.animation.play(`${orientation}_in`);
          await p1;

          cardAnim.animation.gotoAndStopByTime(`${orientation}_loop_back`, 0);
          console.log('resetRound 1 loop ' + (i + 1));
        }

        if (this._playerCard3Group.visible === true) {
          await new Promise(resolve =>
            egret.Tween.get(this._playerCard3Group)
              .to({ alpha: 0 }, 500)
              .set({ visible: false })
              .call(resolve)
          );
          await new Promise(resolve =>
            egret.Tween.get(this._playerCard1Group)
              .to({ x: this._playerCard1InitX }, 500)
              .call(resolve)
          );
          await new Promise(resolve =>
            egret.Tween.get(this._playerCard2Group)
              .to({ x: this._playerCard2InitX }, 500)
              .call(resolve)
          );
        }
        console.log('resetRound 5');

        if (this._bankerCard3Group.visible === true) {
          await new Promise(resolve =>
            egret.Tween.get(this._bankerCard3Group)
              .to({ alpha: 0 }, 500)
              .set({ visible: false })
              .call(resolve)
          );
          await new Promise(resolve =>
            egret.Tween.get(this._bankerCard1Group)
              .to({ x: this._bankerCard1InitX }, 500)
              .call(resolve)
          );
          await new Promise(resolve =>
            egret.Tween.get(this._bankerCard2Group)
              .to({ x: this._bankerCard2InitX }, 500)
              .call(resolve)
          );
        }
        console.log('resetRound 6');

        cardAnimNames = ['_smallPlayerCard3', '_smallBankerCard3'];
        for (let i = 0; i < cardAnimNames.length; i++) {
          const cardAnim = <dragonBones.EgretArmatureDisplay> this[cardAnimNames[i]];
          cardAnim.armature.getSlot('card_number_vertical').display = this.getLabelGroup(this._gameData.currentcardindex + i + 5);

          const p1 = we.utils.waitDragonBone(cardAnim);
          cardAnim.animation.play('vertical_in');
          await p1;

          cardAnim.animation.gotoAndStopByTime('vertical_loop_back', 0);

          console.log('resetRound loop 2' + (i + 4));
        }

        return new Promise(resolve => resolve());
      }

      protected getLabelGroup(num: number) {
        const group = new eui.Group();
        const cardLabel = new eui.Label();
        cardLabel.text = num.toString();
        group.addChild(cardLabel);
        return group;
      }

      protected async betInitState(currentIndexAnchor = -1) {
        const cardAnimName = ['_playerCard1', '_bankerCard1', '_playerCard2', '_bankerCard2', '_smallPlayerCard3', '_smallBankerCard3'];
        console.log('betinit begin');
        for (let i = 0; i < cardAnimName.length; i++) {
          const cardAnim = <dragonBones.EgretArmatureDisplay> this[cardAnimName[i]];
          cardAnim.armature.getSlot('card_number_vertical').display = this.getLabelGroup(this._gameData.currentcardindex - currentIndexAnchor + i);
          cardAnim.animation.gotoAndStopByTime('vertical_loop_back', 0);
        }
        console.log('betinit end');
        return new Promise(resolve => resolve());
      }

      protected getCurrentIndexAnchor() {
        const dataNames = ['b1', 'a1', 'b2', 'a2', 'b3', 'a3'];
        let total = 0;
        for (let i = dataNames.length - 1; i >= 0; i--) {
          if (this._gameData[dataNames[i]]) {
            total++;
          }
        }
        return total;
      }

      protected async dealInitState() {
        const currentIndexAnchor = this.getCurrentIndexAnchor();
        console.log('dealInitState 1');
        await this.betInitState(currentIndexAnchor);
        console.log('dealInitState 2');

        const cardAnimNames = ['_playerCard1', '_bankerCard1', '_playerCard2', '_bankerCard2', '_playerCard3', '_bankerCard3'];
        const dataName = ['b1', 'a1', 'b2', 'a2', 'b3', 'a3'];

        console.log('dealInitState 3');
        let j = 0;
        for (let i = 0; i < cardAnimNames.length; i++) {
          const cardAnim = <dragonBones.EgretArmatureDisplay> this[cardAnimNames[i]];
          const currentCardData = this._gameData[dataName[i]];
          let orientation = 'vertical';
          if (cardAnimNames[i] === '_playerCard3' || cardAnimNames[i] === '_bankerCard3') {
            orientation = 'horizontal';
          }
          if (!currentCardData) {
            continue;
          }
          j++;
          this.setCardFrontFace(cardAnim,currentCardData,currentIndexAnchor,j,cardAnimNames,i,orientation)
          if (cardAnimNames[i] === '_playerCard1' || cardAnimNames[i] === '_bankerCard1') {
            continue;
          }


          console.log('dealInitState 4');

          if (dataName[i] === 'b3') {
            console.log('dealInitState 4');
            await new Promise(resolve =>
              egret.Tween.get(this._playerCard1Group)
                .to({ x: 459 }, 200)
                .call(resolve)
            );
            await new Promise(resolve =>
              egret.Tween.get(this._playerCard2Group)
                .to({ x: 715 }, 200)
                .call(resolve)
            );
            await new Promise(resolve =>
              egret.Tween.get(this._playerCard3Group)
                .set({ visible: true })
                .to({ alpha: 1 }, 500)
                .call(resolve)
            );
          }

          if (dataName[i] === 'a3') {
            await new Promise(resolve =>
              egret.Tween.get(this._bankerCard1Group)
                .to({ x: 1651 }, 200)
                .call(resolve)
            );
            await new Promise(resolve =>
              egret.Tween.get(this._bankerCard2Group)
                .to({ x: 1907 }, 200)
                .call(resolve)
            );
            await new Promise(resolve =>
              egret.Tween.get(this._bankerCard3Group)
                .set({ visible: true })
                .to({ alpha: 1 }, 500)
                .call(resolve)
            );
          }

          console.log('dealInitState 6');

          cardAnim.animation.gotoAndStopByTime(`${orientation}_loop_front`, 0);

          this.updateSum();

          if (orientation !== 'horizontal') {
            <dragonBones.EgretArmatureDisplay> this[cardAnimNames[i - 2]].animation.gotoAndStopByTime(`vertical_loop_front`, 0);
          }
        }

        return new Promise(resolve => resolve());
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
        const currentIndexAnchor = this.getCurrentIndexAnchor();
        console.log('flipCards 1');

        const cardAnimNames = ['_playerCard1', '_bankerCard1', '_playerCard2', '_bankerCard2', '_playerCard3', '_bankerCard3'];
        const dataName = ['b1', 'a1', 'b2', 'a2', 'b3', 'a3'];

        console.log('flipCards 3');

        // find current field
        let currentField = -1;
        for (let i = dataName.length - 1; i >= 0; i--) {
          if (this._gameData[dataName[i]]) {
            currentField = i;
            break;
          }
        }

        console.log('flipCard currentfield', currentField);
        for (let i = currentField; i >= 0; i--) {
          const cardAnim = <dragonBones.EgretArmatureDisplay> this[cardAnimNames[i]];
          let orientation = 'vertical';
          if (cardAnimNames[i] === '_playerCard3' || cardAnimNames[i] === '_bankerCard3') {
            orientation = 'horizontal';
          }

          const currentCardData = this._gameData[dataName[i]];
          this.setCardFrontFace(cardAnim,currentCardData,currentField,i,cardAnimNames,i,orientation)
          if (!currentCardData) {
            continue;
          }

          if (cardAnimNames[i] === '_playerCard1' || cardAnimNames[i] === '_bankerCard1') {
            continue;
          }
          console.log('flipCards 4');

          if (dataName[i] === 'b3') {
            console.log('flipCards 4 b3');
            await new Promise(resolve =>
              egret.Tween.get(this._playerCard1Group)
                .to({ x: 459 }, 400)
                .call(resolve)
            );
            await new Promise(resolve =>
              egret.Tween.get(this._playerCard2Group)
                .to({ x: 715 }, 400)
                .call(resolve)
            );
            await new Promise(resolve =>
              egret.Tween.get(this._playerCard3Group)
                .set({ visible: true })
                .to({ alpha: 1 }, 500)
                .call(resolve)
            );
          }

          if (dataName[i] === 'a3') {
            console.log('flipCards 4 a3');
            await new Promise(resolve =>
              egret.Tween.get(this._bankerCard1Group)
                .to({ x: 1651 }, 400)
                .call(resolve)
            );
            await new Promise(resolve =>
              egret.Tween.get(this._bankerCard2Group)
                .to({ x: 1907 }, 400)
                .call(resolve)
            );
            await new Promise(resolve =>
              egret.Tween.get(this._bankerCard3Group)
                .set({ visible: true })
                .to({ alpha: 1 }, 500)
                .call(resolve)
            );
          }



          console.log('flipCards 6');

          if (dataName[i] === 'a3' || dataName[i] === 'b3') {
            cardAnim.animation.play('horizontal_flip', 1);
          } else {
            cardAnim.animation.play('vertical_flip', 1);
            <dragonBones.EgretArmatureDisplay> this[cardAnimNames[i - 2]].animation.play('vertical_flip', 1);
          }

          this.updateSum();

          if (currentCardData) {
            break;
          }
        }

        return new Promise(resolve => resolve());
      }

      protected setCardFrontFace(cardAnim: dragonBones.EgretArmatureDisplay,currentCardData,currentField,minus,cardAnimNames,idx,orientation){
          cardAnim.armature.getSlot(`card_number_${orientation}`).display = this.getLabelGroup(this._gameData.currentcardindex - (currentField - minus));

          console.log('flipCards 5');
          const cardSlot = cardAnim.armature.getSlot(`card_front_${orientation}`);
          const group = new eui.Group();
          const image = new eui.Image();
          image.width = 204;
          image.height = 312;
          console.log('flipcard card', currentCardData, utils.formatCardForFlip(currentCardData))
          image.source = utils.getCardResName(utils.formatCardForFlip(currentCardData));
          if (cardAnimNames[idx] === '_playerCard3') {
            image.rotation = 90;
          }
          if (cardAnimNames[idx] === '_bankerCard3') {
            image.rotation = 270;
          }
          image.anchorOffsetX = image.width / 2;
          image.anchorOffsetY = image.height / 2;
          group.addChild(image);
          cardSlot.display = group;
      }

      protected setStateDeal(isInit: boolean) {
        console.log('setStateDeal()', this._gameData);
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
          const cardAnim = <dragonBones.EgretArmatureDisplay> this[cardAnimNames[i]];
          cardAnim.armature.getSlot('card_number_vertical').display = this.getLabelGroup(this._gameData.currentcardindex + i + 1);

          this._ringAnim.armature.getSlot('card_number_vertical').display = this.getLabelGroup(this._gameData.currentcardindex + i + 1);

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

        return new Promise(resolve => resolve());
      }

      protected updateSum() {
        if (this._gameData.state === core.GameState.BET) {
          this._playerSum.visible = false;
          this._bankerSum.visible = false;
        } else {
          this._playerSum.visible = true;
          this._bankerSum.visible = true;
        }

        this._playerSum.text = this._gameData.playerpoint.toString();
        this._bankerSum.text = this._gameData.bankerpoint.toString();
      }

      protected updateCardInfoButtons() {
        if (this._gameData.state === core.GameState.BET) {
          this._infoArray = new Array();
          for (let i = 0; i < 6; i++) {
            this._infoArray.push(this._gameData.currentcardindex + 1 + i);
          }
          console.log('BET infoArray', this._infoArray);
          return;
        }
        if (this._gameData.state === core.GameState.DEAL || this._gameData.state === core.GameState.FINISH) {
          let j = 0;
          const dataNames = ['b1', 'a1', 'b2', 'a2', 'b3', 'a3'];
          this._infoArray = new Array();
          for (let i = dataNames.length - 1; i >= 0; i--) {
            if (this._gameData[dataNames[i]]) {
              this._infoArray = [this._gameData.currentcardindex - j].concat(this._infoArray);
              j++;
            } else {
              this._infoArray = [-1].concat(this._infoArray);
            }
          }
          console.log('DEAL infoArray', this._infoArray);
          return;
        }
      }
      protected setStateFinish() {}

      public reset() {}
    }
  }
}
