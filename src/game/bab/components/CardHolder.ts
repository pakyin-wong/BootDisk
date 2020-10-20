namespace we {
  export namespace bab {
    export class CardHolder extends core.BaseEUI implements ui.IResultDisplay {
      private _gameData: we.bab.GameData;

      protected _playerCard1InitX: number;
      protected _playerCard2InitX: number;
      protected _bankerCard1InitX: number;
      protected _bankerCard2InitX: number;

      protected _smallPlayerCard3Exist: boolean;
      protected _smallBankerCard3Exist: boolean;

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
        this._playerCard1 = this.createCardAnim('vertical');
        this._playerCard2 = this.createCardAnim('vertical');
        this._playerCard3 = this.createCardAnim('horizontal', 90);
        this._smallPlayerCard3 = this.createCardAnim('vertical');
        this._bankerCard1 = this.createCardAnim('vertical');
        this._bankerCard2 = this.createCardAnim('vertical');
        this._bankerCard3 = this.createCardAnim('horizontal', 270);
        this._smallBankerCard3 = this.createCardAnim('vertical');

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

      protected createCardAnim(orientation: string, angle: number = 90) {
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
          this._ringAnim.animation.fadeIn('round_loop_a', 0, 0, 0, 'ROUND_BACKGROUND_ANIMATION_GROUP');
          await this.betInitState();
        } else {
          this._ringAnim.animation.stop();
          console.log('clearCards()');
          await this.clearCards();
          console.log('distributeCards()');
          await this.distributeCards();
        }
      }

      protected async hideCard(cardAnim, orientation,front = ''){
          //cardAnim.armature.getSlot(`card_number_${orientation}`).display = this.getLabelGroup(number);

          const p1 = we.utils.waitDragonBone(cardAnim);
          cardAnim.animation.play(`${orientation}_out${front}`);
          await p1;

          cardAnim.animation.gotoAndStopByTime(`${orientation}_idle`, 0);
          //console.log('clearCards 1 loop ' + number);
          
          return new Promise(resolve=>resolve())
      }

      protected async clearCards() {
        console.log('clearCards')
        await this.hideCard(this._playerCard1, 'vertical', '_front')
        await this.hideCard(this._playerCard2, 'vertical', '_front')
        await this.hideCard(this._bankerCard1, 'vertical', '_front')
        await this.hideCard(this._bankerCard2, 'vertical', '_front')

        if (this._playerCard3Group.visible === true) {
          await this.hideCard(this._playerCard3, 'horizontal' )
          this.moveAndHideB3(200);          
        }
        console.log('clearCards 5');

        if (this._bankerCard3Group.visible === true) {
          await this.hideCard(this._bankerCard3, 'horizontal')        
          this.moveAndHideA3(200);          
        }
        console.log('clearCards 6');

        if(this._smallPlayerCard3Exist){
          await this.hideCard(this._smallPlayerCard3, 'vertical', '_front')
        }

        if(this._smallBankerCard3Exist){
          await this.hideCard(this._smallBankerCard3, 'vertical', '_front')
        }

        this._ringAnim.animation.fadeIn('round_out',0,1,0,'ROUND_BACKGROUND_ANIMATION_GROUP')

        return new Promise(resolve => resolve());
      }

      protected getLabelGroup(num: number) {
        const group = new eui.Group();
        const cardLabel = new eui.Label();
        cardLabel.text = num.toString();
        group.addChild(cardLabel);
        return group;
      }

      protected async betInitState(currentIndexOffsetToFirstCard = -1) {
        const cardAnimName = ['_playerCard1', '_bankerCard1', '_playerCard2', '_bankerCard2', '_smallPlayerCard3', '_smallBankerCard3'];
        console.log('betInitState() begin');
        for (let i = 0; i < cardAnimName.length; i++) {
          const cardAnim = <dragonBones.EgretArmatureDisplay> this[cardAnimName[i]];
          cardAnim.armature.getSlot('card_number_vertical').display = this.getLabelGroup(this._gameData.currentcardindex - currentIndexOffsetToFirstCard + i);
          cardAnim.animation.gotoAndStopByTime('vertical_loop_back', 0);
        }
        this._playerCard3.armature.getSlot('card_number_horizontal').display = this.getLabelGroup(this._gameData.currentcardindex - currentIndexOffsetToFirstCard + 4);
        this._playerCard3.animation.gotoAndStopByTime('horizontal_loop_back', 0);
        this._bankerCard3.armature.getSlot('card_number_horizontal').display = this.getLabelGroup(this._gameData.currentcardindex - currentIndexOffsetToFirstCard + 5);
        this._bankerCard3.animation.gotoAndStopByTime('horizontal_loop_back', 0);

        this._smallBankerCard3Exist = true;
        this._smallPlayerCard3Exist = true;
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
        console.log('dealInitState 1');
        await this.betInitState(currentIndexOffsetToFirstCard);
        console.log('dealInitState 2');

        const currentCard = this.getCurrentCard();
        if (!currentCard) {
          return;
        }

        const dataNames = ['b1', 'a1', 'b2', 'a2', 'b3', 'a3'];
        console.log('dealInitState 3');
        for (let i = 0, j = 0; dataNames[i] === currentCard; i++) {
          if (this._gameData[dataNames[i]]) {
            continue;
          }
          switch (dataNames[i]) {
            case 'b1':
              this.setCardFrontFace(this._playerCard1,dataNames[i],'vertical',0)
              this._playerCard1.armature.getSlot(`card_number_vertical`).display = this.getLabelGroup(this._gameData.currentcardindex - currentIndexOffsetToFirstCard);
              break;
            case 'a1':
              this.setCardFrontFace(this._bankerCard1,dataNames[i],'vertical',0)
              this._bankerCard1.armature.getSlot(`card_number_vertical`).display = this.getLabelGroup(this._gameData.currentcardindex - currentIndexOffsetToFirstCard + j);
              break;
            case 'b2':
              this.setCardFrontFace(this._playerCard2,dataNames[i],'vertical',0)
              this._playerCard2.armature.getSlot(`card_number_vertical`).display = this.getLabelGroup(this._gameData.currentcardindex - currentIndexOffsetToFirstCard + j);
              this._playerCard1.animation.gotoAndStopByTime(`vertical_loop_front`, 0);
              this._playerCard2.animation.gotoAndStopByTime(`vertical_loop_front`, 0);
              this.updateSum();
              break;
            case 'a2':
              this.setCardFrontFace(this._bankerCard2,dataNames[i],'vertical', 0)
              this._bankerCard2.armature.getSlot(`card_number_vertical`).display = this.getLabelGroup(this._gameData.currentcardindex - currentIndexOffsetToFirstCard + j);
              this._bankerCard1.animation.gotoAndStopByTime(`vertical_loop_front`, 0);
              this._bankerCard2.animation.gotoAndStopByTime(`vertical_loop_front`, 0);
              this.updateSum();
              break;
            case 'b3':
              this.moveAndShowB3(200);
              this.setCardFrontFace(this._playerCard3,dataNames[i],'vertical', 270)
              this._playerCard3.armature.getSlot(`card_number_horizontal`).display = this.getLabelGroup(this._gameData.currentcardindex - currentIndexOffsetToFirstCard + j);
              this._playerCard3.animation.gotoAndStopByTime(`horizontal_loop_front`, 0);
              this.updateSum();
              break;
            case 'a3':
              this.moveAndShowA3(200);
              this.setCardFrontFace(this._bankerCard3,dataNames[i],'vertical', 270)
              this._bankerCard3.armature.getSlot(`card_number_horizontal`).display = this.getLabelGroup(this._gameData.currentcardindex - currentIndexOffsetToFirstCard + j);
              this._bankerCard3.animation.gotoAndStopByTime(`horizontal_loop_front`, 0);
              this.updateSum();
              break;
          }
          j++;
        }

        return new Promise(resolve => resolve());
      }

      protected async moveAndHideB3(interval: number){
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
          return new Promise(resolve=>resolve())
      }

      protected async moveAndHideA3(interval: number){
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
          return new Promise(resolve=>resolve())
      }

      protected async moveAndShowB3(interval: number) {
        await new Promise(resolve =>
          egret.Tween.get(this._playerCard1Group)
            .to({ x: 459 }, interval)
            .call(resolve)
        );
        await new Promise(resolve =>
          egret.Tween.get(this._playerCard2Group)
            .to({ x: 715 }, interval)
            .call(resolve)
        );
        await new Promise(resolve =>
          egret.Tween.get(this._playerCard3Group)
            .set({ visible: true })
            .to({ alpha: 1 }, interval)
            .call(resolve)
        );
        return new Promise(resolve=>resolve())
      }

      protected async moveAndShowA3(interval: number) {
        await new Promise(resolve =>
          egret.Tween.get(this._bankerCard1Group)
            .to({ x: 1651 }, interval)
            .call(resolve)
        );
        await new Promise(resolve =>
          egret.Tween.get(this._bankerCard2Group)
            .to({ x: 1907 }, interval)
            .call(resolve)
        );
        await new Promise(resolve =>
          egret.Tween.get(this._bankerCard3Group)
            .set({ visible: true })
            .to({ alpha: 1 }, interval)
            .call(resolve)
        );
        return new Promise(resolve=>resolve())
      }

      protected async flipCards() {
        const currentIndexOffsetToFirstCard = this.getCurrentIndexOffsetToFirstCard();
        const currentCard = this.getCurrentCard();
        if (!currentCard) {
          return;
        }
        const dataNames = ['b1', 'a1', 'b2', 'a2', 'b3', 'a3'];
        console.log('flipCards 3' , this._gameData);
        for (let i = dataNames.length - 1; i >= 0; i--) {
          if (!this._gameData[dataNames[i]]) {
            continue;
          }
          switch (dataNames[i]) {
            case 'b1':
              this.setCardFrontFace(this._playerCard1,dataNames[i],'vertical',0)
              this._playerCard1.armature.getSlot(`card_number_vertical`).display = this.getLabelGroup(this._gameData.currentcardindex);
              break;
            case 'a1':
              this.setCardFrontFace(this._bankerCard1,dataNames[i],'vertical',0)
              this._bankerCard1.armature.getSlot(`card_number_vertical`).display = this.getLabelGroup(this._gameData.currentcardindex);
              break;
            case 'b2':
            this.setCardFrontFace(this._playerCard2,dataNames[i],'vertical',0)  
              this._playerCard2.armature.getSlot(`card_number_vertical`).display = this.getLabelGroup(this._gameData.currentcardindex);
              this._playerCard1.animation.play(`vertical_flip`, 1);
              this._playerCard2.animation.play(`vertical_flip`, 1);
              this.updateSum();
              break;
            case 'a2':
            this.setCardFrontFace(this._bankerCard2,dataNames[i],'vertical',0)  
              this._bankerCard2.armature.getSlot(`card_number_vertical`).display = this.getLabelGroup(this._gameData.currentcardindex);
              this._bankerCard1.animation.play(`vertical_flip`, 1);
              this._bankerCard2.animation.play(`vertical_flip`, 1);
              this.updateSum();
              break;
            case 'b3':
              this.setCardFrontFace(this._playerCard3,dataNames[i],'vertical',0)  
              await this.moveAndShowB3(400)
              this._playerCard3.armature.getSlot(`card_number_horizontal`).display = this.getLabelGroup(this._gameData.currentcardindex);
              this._playerCard3.animation.play(`horizontal_flip`, 1);
              this.updateSum();
              break;
            case 'a3':
              this.setCardFrontFace(this._bankerCard3,dataNames[i],'vertical',0)  
              await this.moveAndShowA3(400)
              this._bankerCard3.armature.getSlot(`card_number_horizontal`).display = this.getLabelGroup(this._gameData.currentcardindex);
              this._bankerCard3.animation.play(`horizontal_flip`, 1);
              this.updateSum();
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
        //console.log('flipcard card', this[currentCard], utils.formatCardForFlip(currentCardData));
        image.source = utils.getCardResName(utils.formatCardForFlip(this._gameData[currentCard]));
        image.rotation = rotation;
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

        //const p1 = we.utils.waitDragonBone(this._ringAnim);
        this._ringAnim.animation.stop();
        this._ringAnim.animation.fadeIn('round_loop_a', 0, 0, 0, 'ROUND_BACKGROUND_ANIMATION_GROUP');
        //await p1;

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
        this._ringAnim.animation.fadeIn('round_in',0,1,0,'ROUND_BACKGROUND_ANIMATION_GROUP')

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

          cardAnim.animation.gotoAndStopByFrame('vertical_loop_back', 0);

          const p5 = we.utils.waitDragonBone(this._ringAnim);
          this._ringAnim.animation.play('poker_out', 1);
          await p5;

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
      protected setStateFinish() {
        this.dealInitState();
      }

      public reset() {}
    }
  }
}
