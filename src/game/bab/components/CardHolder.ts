namespace we {
  export namespace bab {
    export class CardHolder extends core.BaseEUI implements ui.IResultDisplay {
      private _gameData: we.bab.GameData;

      protected _playerCard1InitX: number;
      protected _playerCard2InitX: number;
      protected _bankerCard1InitX: number;
      protected _bankerCard2InitX: number;

      protected _smallCard1Exist: boolean;
      protected _smallCard2Exist: boolean;

      protected _playerSum: eui.Label;
      protected _bankerSum: eui.Label;

      protected _factory: dragonBones.EgretFactory;
      protected _ringAnim: dragonBones.EgretArmatureDisplay;

      protected _animRingGroup: eui.Group;
      protected _particleGroup: eui.Group;

      protected _playerCard1Group: eui.Group;
      protected _playerCard2Group: eui.Group;
      protected _playerCard3Group: eui.Group;
      protected _smallCard1Group: eui.Group;

      protected _bankerCard1Group: eui.Group;
      protected _bankerCard2Group: eui.Group;
      protected _bankerCard3Group: eui.Group;
      protected _smallCard2Group: eui.Group;

      protected _smallRedCard : dragonBones.EgretArmatureDisplay;
      protected _smallRedCardGroup : eui.Group;

      protected _playerCard1: dragonBones.EgretArmatureDisplay;
      protected _playerCard2: dragonBones.EgretArmatureDisplay;
      protected _playerCard3: dragonBones.EgretArmatureDisplay;
      protected _smallCard1: dragonBones.EgretArmatureDisplay;
      protected _bankerCard1: dragonBones.EgretArmatureDisplay;
      protected _bankerCard2: dragonBones.EgretArmatureDisplay;
      protected _bankerCard3: dragonBones.EgretArmatureDisplay;
      protected _smallCard2: dragonBones.EgretArmatureDisplay;

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
        this._playerCard1 = this.createCardAnim(); //('vertical');
        this._playerCard2 = this.createCardAnim(); //('vertical');
        this._playerCard3 = this.createCardAnim(); //('horizontal', 90);
        this._smallCard1 = this.createCardAnim();  //('vertical');
        this._bankerCard1 = this.createCardAnim(); //('vertical');
        this._bankerCard2 = this.createCardAnim(); // ('vertical');
        this._bankerCard3 = this.createCardAnim(); //('horizontal', 270);
        this._smallCard2 = this.createCardAnim(); // ('vertical');

        //this._smallRedCard.animation.gotoAndStopByTime('red_poker_in',0)

        this._smallCard1.scaleX = 0.35;
        this._smallCard1.scaleY = 0.35;

        this._smallCard2.scaleX = 0.35;
        this._smallCard2.scaleY = 0.35;

        // this._smallRedCard.scaleX = 0.32;
        // this._smallRedCard.scaleY = 0.32;

        this._playerCard1Group.addChild(this._playerCard1);
        this._playerCard2Group.addChild(this._playerCard2);
        this._playerCard3Group.addChild(this._playerCard3);
        this._smallCard1Group.addChild(this._smallCard1);
        this._bankerCard1Group.addChild(this._bankerCard1);
        this._bankerCard2Group.addChild(this._bankerCard2);
        this._bankerCard3Group.addChild(this._bankerCard3);
        this._smallCard2Group.addChild(this._smallCard2);
        

        this._playerCard1InitX = this._playerCard1Group.x;
        this._playerCard2InitX = this._playerCard2Group.x;
        this._bankerCard1InitX = this._bankerCard1Group.x;
        this._bankerCard2InitX = this._bankerCard2Group.x;
      }

      protected createCardAnim() {
        const cardAnim = this._factory.buildArmatureDisplay('poker');
        return cardAnim;
      }

      public updateResult(gameData: data.GameData, chipLayer: ui.ChipLayer, isInit: boolean) {
        console.log('BAB cardholder::updateResult ', gameData, isInit);

        this._gameData = <bab.GameData>gameData;
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
            this.setStateFinish(isInit);
            break;
          case core.GameState.SHUFFLE:
            this.setStateShuffle(isInit);
            break;
          default:
            break;
        }
      }

      protected async setStateBet(isInit: boolean) {
        console.log('setStateBet() isInit', isInit, this._gameData);
        this.updatePlayerSum();
        this.updateBankerSum();



        if (isInit) {
          console.log('betInitState()');
          this._ringAnim.animation.fadeIn('round_loop_a', 0, 0, 0, 'ROUND_ANIMATION_GROUP');
          this.movePin();
          this.moveShoe();
          if(this._gameData.redcardindex <= this._gameData.currentcardindex + 6){
            this.getRedCardAnim().animation.gotoAndStopByTime('red_poker_loop',0)
          }
          await this.betInitState();
        } else {
          console.log('clearCards()');
          await this.clearCards();
          console.log('distributeCards()');
          await this.distributeCards();
        }
      }

      protected async hideCard(cardAnim, orientation, front = '') {
        //cardAnim.armature.getSlot(`card_number_${orientation}`).display = this.getLabelGroup(number);

        const p1 = we.utils.waitDragonBone(cardAnim);
        cardAnim.animation.play(`${orientation}_out${front}`);
        await p1;

        cardAnim.animation.gotoAndStopByTime(`${orientation}_idle`, 0);
        //console.log('clearCards 1 loop ' + number);

        return new Promise(resolve => resolve())
      }

      protected async clearCards() {
        console.log('clearCards')
        this.hideCard(this._playerCard1, 'vertical', '_front');
        this.hideCard(this._playerCard2, 'vertical', '_front');
        this.hideCard(this._bankerCard1, 'vertical', '_front');
        this.hideCard(this._bankerCard2, 'vertical', '_front');

        if (this._smallCard1Exist) {
          this.hideCard(this._smallCard1, 'vertical', '_back')
        }

        if (this._smallCard2Exist) {
          this.hideCard(this._smallCard2, 'vertical', '_back')
        }

        (async()=>{
        if (this._playerCard3Group.visible === true) {
          await this.hideCard(this._playerCard3, 'horizontal')
          this.moveAndHideB3(200);
        }
        console.log('clearCards 5');
        })();

        (async()=>{
        if (this._bankerCard3Group.visible === true) {
          await this.hideCard(this._bankerCard3, 'horizontal')
          this.moveAndHideA3(200);
        }
        console.log('clearCards 6');
        })();

        const p1 = we.utils.waitDragonBone(this._ringAnim);
        this._ringAnim.animation.fadeIn('round_out', 0, 1, 0, 'ROUND_ANIMATION_GROUP')
        this.movePin();
        this.moveShoe();
        await p1

        return new Promise(resolve => resolve());
      }

      protected getLabelGroup(num: number) {
        const group = new eui.Group();
        const cardLabel = new eui.Label();
        cardLabel.text = num.toString();
        group.addChild(cardLabel);
        cardLabel.anchorOffsetX = cardLabel.height / 2
        cardLabel.anchorOffsetX = cardLabel.width / 2
        return group;
      }

      protected async betInitState(currentIndexOffsetToFirstCard = -1) {
        const cardAnimName = ['_playerCard1', '_bankerCard1', '_playerCard2', '_bankerCard2', '_smallCard1', '_smallCard2'];
        console.log('betInitState() begin');
        for (let i = 0; i < cardAnimName.length; i++) {
          const cardAnim = <dragonBones.EgretArmatureDisplay>this[cardAnimName[i]];
          cardAnim.armature.getSlot('card_number_vertical').display = this.getLabelGroup(this._gameData.currentcardindex - currentIndexOffsetToFirstCard + i);
          cardAnim.animation.gotoAndStopByTime('vertical_loop_back', 0);
        }
        this._playerCard3.armature.getSlot('card_number_horizontal').display = this.getLabelGroup(this._gameData.currentcardindex - currentIndexOffsetToFirstCard + 4);
        this._playerCard3.animation.gotoAndStopByTime('horizontal_loop_back', 0);
        this._bankerCard3.armature.getSlot('card_number_horizontal').display = this.getLabelGroup(this._gameData.currentcardindex - currentIndexOffsetToFirstCard + 5);
        this._bankerCard3.animation.gotoAndStopByTime('horizontal_loop_back', 0);

        this._smallCard2Exist = true;
        this._smallCard1Exist = true;
        console.log('betInitState() end');
        return new Promise(resolve => resolve());
      }

      protected getCurrentIndexOffsetToFirstCard() {
        const cardDataNames = ['b1', 'a1', 'b2', 'a2', 'b3', 'a3'];
        let total = 0;
        for (let i = cardDataNames.length - 1; i >= 0; i--) {
          if (this._gameData[cardDataNames[i]]) {
            total++;
          }
        }
        return total;
      }

      protected getCurrentCard() {
        const cardDataNames = ['b1', 'a1', 'b2', 'a2', 'b3', 'a3'];
        const total = 0;
        for (let i = cardDataNames.length - 1; i >= 0; i--) {
          if (this._gameData[cardDataNames[i]]) {
            return cardDataNames[i];
          }
        }
        return null;
      }

      protected async dealInitState() {
        const currentIndexOffsetToFirstCard = this.getCurrentIndexOffsetToFirstCard();
        const currentCard = this.getCurrentCard();
        if (!currentCard) {
          return;
        }

        console.log('dealInitState 2a currentCard', currentCard);

        const dataNames = ['b1', 'a1', 'b2', 'a2', 'b3', 'a3'];
        console.log('dealInitState 3', this._gameData);
        for (let i = 0, j = 0; i < 6; i++) {
          console.log('dealInitState loop 3a', dataNames[i], this._gameData[dataNames[i]], this._gameData);
          if (!this._gameData[dataNames[i]]) {
            continue;
          }
          console.log('dealInitState loop 3b');
          switch (dataNames[i]) {
            case 'b1':
              this.setCardFrontFace(this._playerCard1, dataNames[i], 'vertical', 0)
              this._playerCard1.armature.getSlot(`card_number_vertical`).display = this.getLabelGroup(this._gameData.currentcardindex - currentIndexOffsetToFirstCard);
              break;
            case 'a1':
              this.setCardFrontFace(this._bankerCard1, dataNames[i], 'vertical', 0)
              this._bankerCard1.armature.getSlot(`card_number_vertical`).display = this.getLabelGroup(this._gameData.currentcardindex - currentIndexOffsetToFirstCard + j);
              break;
            case 'b2':
              this.setCardFrontFace(this._playerCard2, dataNames[i], 'vertical', 0)
              this._playerCard2.armature.getSlot(`card_number_vertical`).display = this.getLabelGroup(this._gameData.currentcardindex - currentIndexOffsetToFirstCard + j);
              this._playerCard1.animation.gotoAndStopByTime(`vertical_loop_front`, 0);
              this._playerCard2.animation.gotoAndStopByTime(`vertical_loop_front`, 0);
              this.updatePlayerSum();
              break;
            case 'a2':
              this.setCardFrontFace(this._bankerCard2, dataNames[i], 'vertical', 0)
              this._bankerCard2.armature.getSlot(`card_number_vertical`).display = this.getLabelGroup(this._gameData.currentcardindex - currentIndexOffsetToFirstCard + j);
              this._bankerCard1.animation.gotoAndStopByTime(`vertical_loop_front`, 0);
              this._bankerCard2.animation.gotoAndStopByTime(`vertical_loop_front`, 0);
              this.updateBankerSum();
              break;
            case 'b3':
              this._smallCard1Exist = false;
              this._smallCard1.animation.gotoAndStopByTime('vertical_idle', 0);
              this.moveAndShowB3(200);
              this.setCardFrontFace(this._playerCard3, dataNames[i], 'horizontal', 90)
              this._playerCard3.armature.getSlot(`card_number_horizontal`).display = this.getLabelGroup(this._gameData.currentcardindex - currentIndexOffsetToFirstCard + j);
              this._playerCard3.animation.gotoAndStopByTime(`horizontal_loop_front`, 0);
              this.updatePlayerSum();
              this.updateBankerSum();
              break;
            case 'a3':
              if (this._smallCard1Exist) {
                this._smallCard1.animation.gotoAndStopByTime('vertical_idle', 0);
                this._smallCard1Exist = false;
              } else {
                this._smallCard2.animation.gotoAndStopByTime('vertical_idle', 0);
                this._smallCard2Exist = false;
              }
              this.moveAndShowA3(200);
              this.setCardFrontFace(this._bankerCard3, dataNames[i], 'horizontal', 90)
              this._bankerCard3.armature.getSlot(`card_number_horizontal`).display = this.getLabelGroup(this._gameData.currentcardindex - currentIndexOffsetToFirstCard + j);
              this._bankerCard3.animation.gotoAndStopByTime(`horizontal_loop_front`, 0);
              this.updatePlayerSum();
              this.updateBankerSum();
              break;
          }
          if (dataNames[i] === currentCard) {
            break;
          }
          j++;
        }

        return new Promise(resolve => resolve());
      }

      protected async moveAndHideB3(interval: number) {
        await new Promise(resolve =>
          egret.Tween.get(this._playerCard3Group)
            .to({ alpha: 0 }, interval)
            .set({ visible: false })
            .call(resolve)
        );
        await new Promise(resolve =>
          egret.Tween.get(this._playerCard1Group)
            .to({ x: this._playerCard1InitX }, interval)
            .call(resolve)
        );
        await new Promise(resolve =>
          egret.Tween.get(this._playerCard2Group)
            .to({ x: this._playerCard2InitX }, interval)
            .call(resolve)
        );
        return new Promise(resolve => resolve())
      }

      protected async moveAndHideA3(interval: number) {
        await new Promise(resolve =>
          egret.Tween.get(this._bankerCard3Group)
            .to({ alpha: 0 }, interval)
            .set({ visible: false })
            .call(resolve)
        );
        await new Promise(resolve =>
          egret.Tween.get(this._bankerCard1Group)
            .to({ x: this._bankerCard1InitX }, interval)
            .call(resolve)
        );
        await new Promise(resolve =>
          egret.Tween.get(this._bankerCard2Group)
            .to({ x: this._bankerCard2InitX }, interval)
            .call(resolve)
        );
        return new Promise(resolve => resolve())
      }

      protected async moveAndShowB3(interval: number) {
        await new Promise(resolve =>
          egret.Tween.get(this._playerCard1Group)
            .to({ x: 715 }, interval)
            .call(resolve)
        );
        await new Promise(resolve =>
          egret.Tween.get(this._playerCard2Group)
            .to({ x: 459 }, interval)
            .call(resolve)
        );
        await new Promise(resolve =>
          egret.Tween.get(this._playerCard3Group)
            .set({ visible: true })
            .to({ alpha: 1 }, interval)
            .call(resolve)
        );
        return new Promise(resolve => resolve())
      }

      protected async moveAndShowA3(interval: number) {
        await new Promise(resolve =>
          egret.Tween.get(this._bankerCard1Group)
            .to({ x: 1907 }, interval)
            .call(resolve)
        );
        await new Promise(resolve =>
          egret.Tween.get(this._bankerCard2Group)
            .to({ x: 1651 }, interval)
            .call(resolve)
        );
        await new Promise(resolve =>
          egret.Tween.get(this._bankerCard3Group)
            .set({ visible: true })
            .to({ alpha: 1 }, interval)
            .call(resolve)
        );
        return new Promise(resolve => resolve())
      }

      protected async flipCards() {
        const currentIndexOffsetToFirstCard = this.getCurrentIndexOffsetToFirstCard();
        const currentCard = this.getCurrentCard();
        if (!currentCard) {
          return;
        }
        const dataNames = ['b1', 'a1', 'b2', 'a2', 'b3', 'a3'];
        console.log('flipCards 3', this._gameData);
        for (let i = dataNames.length - 1; i >= 0; i--) {
          if (!this._gameData[dataNames[i]]) {
            continue;
          }
          switch (dataNames[i]) {
            case 'b1':
              this.setCardFrontFace(this._playerCard1, dataNames[i], 'vertical', 0)
              this._playerCard1.armature.getSlot(`card_number_vertical`).display = this.getLabelGroup(this._gameData.currentcardindex);
              break;
            case 'a1':
              this.setCardFrontFace(this._bankerCard1, dataNames[i], 'vertical', 0)
              this._bankerCard1.armature.getSlot(`card_number_vertical`).display = this.getLabelGroup(this._gameData.currentcardindex);
              break;
            case 'b2':
              this.setCardFrontFace(this._playerCard2, dataNames[i], 'vertical', 0)
              this._playerCard2.armature.getSlot(`card_number_vertical`).display = this.getLabelGroup(this._gameData.currentcardindex);

              this._playerCard1.animation.play(`vertical_flip`, 1);
              this._playerCard2.animation.play(`vertical_flip`, 1);
              this.updatePlayerSum();
              break;
            case 'a2':
              this.setCardFrontFace(this._bankerCard2, dataNames[i], 'vertical', 0)
              this._bankerCard2.armature.getSlot(`card_number_vertical`).display = this.getLabelGroup(this._gameData.currentcardindex);
              this._bankerCard1.animation.play(`vertical_flip`, 1);
              this._bankerCard2.animation.play(`vertical_flip`, 1);
              this.updateBankerSum();
              break;
            case 'b3':
              this.setCardFrontFace(this._playerCard3, dataNames[i], 'horizontal', 90)
              await this.moveAndShowB3(400)
              this._ringAnim.animation.fadeIn('draw', 0, 2, 0, 'DRAW_GROUP');
              this.movePin();
              this.moveShoe();
              this._smallCard1Exist = false;
              this._smallCard1.animation.play('vertical_out_back', 1);
              this._playerCard3.armature.getSlot(`card_number_horizontal`).display = this.getLabelGroup(this._gameData.currentcardindex);
              this._playerCard3.animation.play(`horizontal_flip`, 1);
              this.updatePlayerSum();
              this.updateBankerSum();
              break;
            case 'a3':
              this.setCardFrontFace(this._bankerCard3, dataNames[i], 'horizontal', 90)
              await this.moveAndShowA3(400)
              this._ringAnim.animation.fadeIn('draw', 0, 2, 0, 'DRAW_GROUP');
              this.movePin();
              this.moveShoe();
              if (this._smallCard1Exist) {
                this._smallCard1Exist = false;
                this._smallCard1.animation.play('vertical_out_back', 1);
              } else {
                this._smallCard2Exist = false;
                this._smallCard2.animation.play('vertical_out_back', 1);
              }
              this._bankerCard3.armature.getSlot(`card_number_horizontal`).display = this.getLabelGroup(this._gameData.currentcardindex);
              this._bankerCard3.animation.play(`horizontal_flip`, 1);
              this.updatePlayerSum();
              this.updateBankerSum();
              break;
          }
          if (this._gameData[dataNames[i]]) {
            break;
          }
        }

        return new Promise(resolve => resolve());
      }

      protected setCardFrontFace(cardAnim: dragonBones.EgretArmatureDisplay, currentCard, orientation, rotation) {
        const cardSlot = cardAnim.armature.getSlot(`card_front_${orientation}`);
        const group = new eui.Group();
        const image = new eui.Image();
        image.width = 204;
        image.height = 312;
        image.source = utils.getCardResName(utils.formatCardForFlip(this._gameData[currentCard]));
        image.rotation = rotation;
        image.anchorOffsetX = image.width / 2;
        image.anchorOffsetY = image.height / 2;
        group.addChild(image);
        cardSlot.display = group;
      }

      protected setStateDeal(isInit: boolean) {
        console.log('setStateDeal()', this._gameData);

        (async () => {
          const currentIndexOffsetToFirstCard = this.getCurrentIndexOffsetToFirstCard();
          if(this._gameData.redcardindex <= this._gameData.currentcardindex + 6 - currentIndexOffsetToFirstCard){
              this.getRedCardAnim().animation.gotoAndStopByTime('red_poker_loop',0)
          }

          this._ringAnim.animation.fadeIn('round_loop_a', 0, 0, 0, 'ROUND_ANIMATION_GROUP');
          this.movePin();
          this.moveShoe();

          if (isInit) {
            console.log('dealInitState()');
            await this.betInitState(currentIndexOffsetToFirstCard);
            await this.dealInitState();
          } else {
            console.log('flipCards()');
            await this.flipCards();
          }
        })();
      }

      protected async collapsePin() {
        const bone = this._ringAnim.armature.getBone('red_card');
        const destRad = this.getPinRad(0)
        await new Promise(resolve => egret.Tween.get(bone.animationPose).to({ rotation: destRad }, 1000, function (t) {
          bone.invalidUpdate();
          return t;
        }).call(resolve))
        bone.invalidUpdate();
      }

      protected async collapseShoe() {
        const bone = this._ringAnim.armature.getBone('shoe_bar');
        const destRad = this.getShoeRad(0)
        await new Promise(resolve => egret.Tween.get(bone.animationPose).to({ rotation: destRad }, 1000, function (t) {
          bone.invalidUpdate();
          return t;
        }).call(resolve))
        bone.invalidUpdate();
      }

      protected movePin() {
        const bone = this._ringAnim.armature.getBone('red_card');
        const destRad = this.getPinRad()
        bone.animationPose.rotation = destRad;
        bone.invalidUpdate();
      }

      protected moveShoe() {
        const bone = this._ringAnim.armature.getBone('shoe_bar');
        const destRad = this.getShoeRad()
        bone.animationPose.rotation = destRad;
        bone.invalidUpdate();
      }

      protected async distributeCards() {
        const p1 = we.utils.waitDragonBone(this._ringAnim);
        this._ringAnim.animation.fadeIn('round_in', 0, 1, 0, 'ROUND_ANIMATION_GROUP')
        this.movePin();
        this.moveShoe();
        await p1

        this._ringAnim.animation.fadeIn('round_loop_a', 0, 0, 0, 'ROUND_ANIMATION_GROUP')
        this.movePin();
        this.moveShoe();

        const p2 = we.utils.waitDragonBone(this._ringAnim);
        this._ringAnim.animation.fadeIn('poker_round_in', 0, 1, 0, 'POKER_ROUND_ANIMATION_GROUP');
        this.movePin();
        this.moveShoe();
        await p2

        this._ringAnim.animation.fadeIn('poker_round_loop', 0, 0, 0, 'POKER_ROUND_ANIMATION_GROUP');
        this.movePin();
        this.moveShoe();

        const cardAnimNames = ['_playerCard1', '_bankerCard1', '_playerCard2', '_bankerCard2', '_smallCard1', '_smallCard2'];
        for (let i = 0; i < cardAnimNames.length; i++) {
          switch (cardAnimNames[i]) {
            case '_smallCard1':
            case '_smallCard2':
              this._ringAnim.animation.fadeIn('draw', 0, 3, 0, 'DRAW_GROUP');
              this.movePin();
              this.moveShoe();
            case '_playerCard1':
            case '_bankerCard1':
            case '_playerCard2':
            case '_bankerCard2':
              this._ringAnim.armature.getSlot('card_number_vertical').display = this.getLabelGroup(this._gameData.currentcardindex + i + 1);

              const cardAnim = <dragonBones.EgretArmatureDisplay>this[cardAnimNames[i]];
              cardAnim.armature.getSlot('card_number_vertical').display = this.getLabelGroup(this._gameData.currentcardindex + i + 1);

              const block1 = (async () => {
                const p1 = we.utils.waitDragonBone(cardAnim);
                cardAnim.animation.play('vertical_in', 1);
                await p1;

                cardAnim.animation.gotoAndStopByFrame('vertical_loop_back', 0);

                return new Promise(resolve => resolve())
              })();

              const block2 = (async () => {
                const p1 = we.utils.waitDragonBone(this._ringAnim);
                this._ringAnim.animation.fadeIn('poker_in', 0, 1, 0, 'POKER_ANIMATION_GROUP');
                this.movePin();
                this.moveShoe();
                await p1;

                const p2 = we.utils.waitDragonBone(this._ringAnim);
                this._ringAnim.animation.fadeIn('poker_out', 0, 1, 0, 'POKER_ANIMATION_GROUP');
                this.movePin();
                this.moveShoe();
                await p2;

                return new Promise(resolve => resolve())
              })();

              await block1;
              await block2;
          }

          if (this._gameData.currentcardindex + i + 1 === this._gameData.redcardindex) {
            const block1 = (async()=>{
              const p1 = we.utils.waitDragonBone(this._ringAnim);
              this._ringAnim.animation.fadeIn('red_poker_in', 0, 1, 0, 'POKER_ANIMATION_GROUP');
              this.movePin();
              this.moveShoe();
              await p1

              const p2 = we.utils.waitDragonBone(this._ringAnim);
              this._ringAnim.animation.fadeIn('red_poker_out', 0, 1, 0, 'POKER_ANIMATION_GROUP');
              this.movePin();
              this.moveShoe();
              await p2

              return new Promise(resolve=>resolve());
            })()

            const block2 = we.utils.waitDragonBone(this.getRedCardAnim());
            this.getRedCardAnim().animation.fadeIn('red_poker_in')            
            
            await block1
            await block2
          }
        }

        const p3 = we.utils.waitDragonBone(this._ringAnim);
        this._ringAnim.animation.fadeIn('poker_round_out', 0, 1, 0, 'POKER_ROUND_ANIMATION_GROUP');
        this.movePin();
        this.moveShoe();
        await p3

        this._smallCard2Exist = true;
        this._smallCard1Exist = true;

        return new Promise(resolve => resolve());
      }

      protected updatePlayerSum() {
        if (this._gameData.state === core.GameState.BET) {
          this._playerSum.visible = false;
          this._playerSum.text = '0'
        } else {
          this._playerSum.visible = true;
        }
        this._playerSum.text = this._gameData.playerpoint.toString();
      }

      protected updateBankerSum() {
        if (this._gameData.state === core.GameState.BET) {
          this._bankerSum.visible = false;
          this._bankerSum.text = '0'
        } else {
          this._bankerSum.visible = true;
        }
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

      protected getPinRad(num = this._gameData.currentcardindex){
        const proportion = num / this._gameData.maskedcardssnList.length;
        const angleOffset = 81 * proportion; // -40 to 41
        const destAngle = -40 + angleOffset;
        const destRad = (destAngle * Math.PI) / 180;
        return destRad
      }

      protected getShoeRad(num = this._gameData.redcardindex){
        const proportion = num / this._gameData.maskedcardssnList.length;
        const angleOffset = 81 * proportion; // -72 to 9
        const destAngle = -72 + angleOffset;
        const destRad = (destAngle * Math.PI) / 180;
        return destRad
      }

      protected async animatePin(){
        const bone = this._ringAnim.armature.getBone('red_card');
        const destRad = this.getPinRad();
        await new Promise(resolve => egret.Tween.get(bone.animationPose).to({ rotation: destRad }, 1000, function (t) {
          bone.invalidUpdate();
          return t;
        }).call(resolve))

        return new Promise(resolve=>resolve());
      }
    
      protected async animateShoe(){
        const bone = this._ringAnim.armature.getBone('shoe_bar');
        const destRad = this.getShoeRad();
        await new Promise(resolve => egret.Tween.get(bone.animationPose).to({ rotation: destRad }, 1000, function (t) {
          bone.invalidUpdate();
          return t;
        }).call(resolve))

        return new Promise(resolve=>resolve());
      }

      protected setStateFinish(isInit) {
        console.log('setStateFinish() isInit', isInit, this._gameData);
        if(this._gameData.redcardindex <= this._gameData.currentcardindex){
          this.getRedCardAnim().animation.gotoAndStopByTime('red_poker_loop',0)
        }
        this.updatePlayerSum();
        this.updateBankerSum();

        this._ringAnim.animation.fadeIn('round_loop_a', 0, 0, 0, 'ROUND_ANIMATION_GROUP');
        this.movePin();
        this.moveShoe();
        if (isInit) {
          this.dealInitState();
        }
      }

      protected setStateShuffle(isInit){
        if(isInit){
          this._ringAnim.animation.fadeIn('round_loop_a',0,0,0);
          this.movePin();
          this.moveShoe();

          this.dispatchEvent(new egret.Event('OPEN_SHUFFLE_PANEL',false,false,'init'))
        }else{
          (async()=>{
            await this.clearCards();
            console.log('shuffle start')
            const p1 = utils.waitDragonBone(this.getRedCardAnim());
            this.getRedCardAnim().animation.fadeIn('red_poker_out');
            this._smallRedCardGroup.removeChild(this._smallRedCard);
            this._smallRedCard = null

            const p2 = utils.waitDragonBone(this._ringAnim);
            this._ringAnim.animation.fadeIn('shoe_out',0,1,0);

            await this.collapsePin();
            await this.collapseShoe();

            await p1;
            await p2;

            await this.animateShoe();
            await this.animatePin();

            const p3 = utils.waitDragonBone(this._ringAnim);
            this._ringAnim.animation.fadeIn('shoe_in',0,1,0);
            this.movePin();
            this.moveShoe();
            await p3

            this._ringAnim.animation.fadeIn('round_loop_a',0,0,0);
            this.movePin();
            this.moveShoe();

            this.dispatchEvent(new egret.Event('OPEN_SHUFFLE_PANEL',false,false,'notInit'))

            return new Promise(resolve=>resolve());
          })();
        }
      }

      protected getRedCardAnim(){
        if(!this._smallRedCard){
          this._smallRedCard = this._factory.buildArmatureDisplay('red_card');
          this._smallRedCardGroup.addChild(this._smallRedCard)
        }
        return this._smallRedCard
      }

      public reset() { }
    }
  }
}
