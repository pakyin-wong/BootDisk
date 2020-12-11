namespace we {
  export namespace bab {
    export class CardHolder extends blockchain.CardHolder {
      protected _gameData: we.bab.GameData;

      protected _playerCardInitX: number;
      protected _bankerCardInitX: number;

      protected _smallCard1Exist: boolean;
      protected _smallCard2Exist: boolean;

      protected _smallCardScale: number;

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

      protected _bankerCardMoveGroup: eui.Group;
      protected _playerCardMoveGroup: eui.Group;

      protected _smallRedCard: dragonBones.EgretArmatureDisplay;
      protected _smallRedCardGroup: eui.Group;

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

      protected _helper: blockchain.Helper;

      protected _totalCardPerRound: number;

      protected cardAnimNames;

      protected _roundLoopA: string;
      protected _roundLoopB: string;
      protected _verticalFlip: string;

      protected initVariables() {
        super.initVariables();
        this._totalCardPerRound = 6;
        this._smallCardScale = 0.35;
        this._roundLoopA = 'round_loop_a';
        this._roundLoopB = 'round_loop_b';
        this._verticalFlip = 'vertical_flip';

        this.cardAnimNames = ['_playerCard1', '_bankerCard1', '_playerCard2', '_bankerCard2', '_smallCard1', '_smallCard2'];
      }

      public setDefaultStates() {
        this._playerCard1.animation.gotoAndStopByTime('vertical_in', 0);
        this._playerCard2.animation.gotoAndStopByTime('vertical_in', 0);
        this._playerCard3.animation.gotoAndStopByTime('vertical_in', 0);
        this._bankerCard1.animation.gotoAndStopByTime('vertical_in', 0);
        this._bankerCard2.animation.gotoAndStopByTime('vertical_in', 0);
        this._bankerCard3.animation.gotoAndStopByTime('vertical_in', 0);
        if (this._smallCard1Group && this._smallCard2Group) {
          this._smallCard1.animation.gotoAndStopByTime('vertical_in', 0);
          this._smallCard2.animation.gotoAndStopByTime('vertical_in', 0);
        }
      }

      protected createChildren() {
        super.createChildren();
        this.setSkinName();
      }

      protected setSkinName() {
        this.skinName = utils.getSkinByClassname('bab.CardHolderSkin');
      }

      protected addEventListeners() {
        this._infoArray = [-1, -1, -1, -1, -1, -1];
        const infoGroup = ['_playerCard1Info', '_bankerCard1Info', '_playerCard2Info', '_bankerCard2Info', '_playerCard3Info', '_bankerCard3Info'];
        for (let i = 0; i < infoGroup.length; i++) {
          mouse.setButtonMode(this[infoGroup[i]], true);
          this[infoGroup[i]].addEventListener(egret.TouchEvent.TOUCH_TAP, this.openCardInfo(i), this);
        }
      }

      protected destroy() {
        this.destroyAnim(this._playerCard1);
        this.destroyAnim(this._playerCard2);
        this.destroyAnim(this._playerCard3);
        this.destroyAnim(this._bankerCard1);
        this.destroyAnim(this._bankerCard2);
        this.destroyAnim(this._bankerCard3);
        if (this._smallCard1Group && this._smallCard2Group) {
          this.destroyAnim(this._smallCard1);
          this.destroyAnim(this._smallCard2);
        }
        super.destroy();
      }

      protected createFactory() {
        const skeletonData = RES.getRes(`blockchain_ske_dbbin`);
        const textureData = RES.getRes(`blockchain_tex_json`);
        const texture = RES.getRes(`blockchain_tex_png`);
        this._factory = new dragonBones.EgretFactory();
        this._factory.parseDragonBonesData(skeletonData);
        this._factory.parseTextureAtlasData(textureData, texture);
      }

      protected createCards() {
        this._playerCard1 = this.createCardAnim(); // ('vertical');
        this._playerCard2 = this.createCardAnim(); // ('vertical');
        this._playerCard3 = this.createCardAnim(); // ('horizontal', 90);

        this._bankerCard1 = this.createCardAnim(); // ('vertical');
        this._bankerCard2 = this.createCardAnim(); // ('vertical');
        this._bankerCard3 = this.createCardAnim(); // ('horizontal', 270);

        if (this._smallCard1Group && this._smallCard2Group) {
          this._smallCard1 = this.createCardAnim(); // ('vertical');
          this._smallCard2 = this.createCardAnim(); // ('vertical');

          this._smallCard1.scaleX = this._smallCardScale;
          this._smallCard1.scaleY = this._smallCardScale;

          this._smallCard2.scaleX = this._smallCardScale;
          this._smallCard2.scaleY = this._smallCardScale;
        }

        // this._smallRedCard.scaleX = 0.32;
        // this._smallRedCard.scaleY = 0.32;

        this._playerCard1Group.addChild(this._playerCard1);
        this._playerCard2Group.addChild(this._playerCard2);
        this._playerCard3Group.addChild(this._playerCard3);
        if (this._smallCard1Group) {
          this._smallCard1Group.addChild(this._smallCard1);
        }
        this._bankerCard1Group.addChild(this._bankerCard1);
        this._bankerCard2Group.addChild(this._bankerCard2);
        this._bankerCard3Group.addChild(this._bankerCard3);
        if (this._smallCard2Group) {
          this._smallCard2Group.addChild(this._smallCard2);
        }

        this._playerCardInitX = this._playerCardMoveGroup.x;
        this._bankerCardInitX = this._bankerCardMoveGroup.x;
      }

      protected updateAllSum() {
        this.updatePlayerSum();
        this.updateBankerSum();
      }

      protected async clearCards() {
        // console.log('clearCards');
        this.hideCard(this._playerCard1, 'vertical', '_front');
        this.hideCard(this._playerCard2, 'vertical', '_front');
        this.hideCard(this._bankerCard1, 'vertical', '_front');
        this.hideCard(this._bankerCard2, 'vertical', '_front');

        if (this._smallCard1Exist && this._smallCard1Group) {
          this.hideCard(this._smallCard1, 'vertical', '_back');
        }

        if (this._smallCard2Exist && this._smallCard2Group) {
          this.hideCard(this._smallCard2, 'vertical', '_back');
        }

        (async () => {
            await this.hideCard(this._playerCard3, 'horizontal');
            this.moveAndHideB3(200);
          // console.log('clearCards 5');
        })();

        (async () => {
            await this.hideCard(this._bankerCard3, 'horizontal');
            this.moveAndHideA3(200);
          // console.log('clearCards 6');
        })();

        await this.roundOut();
        return new Promise(resolve => resolve());
      }

      protected async roundOut() {
        await utils.playAnimation(this._ringAnim, 'round_out', 1, 'ROUND_ANIMATION_GROUP');
        return new Promise(resolve => resolve());
      }

      protected async roundIn() {
        await utils.playAnimation(this._ringAnim, 'round_in', 1, 'ROUND_ANIMATION_GROUP');
        return new Promise(resolve => resolve());
      }

      protected async betInitState(gameState: core.GameState) {
        // console.log('betInitState() begin');
        const cardData = ['b1', 'a1', 'b2', 'a2', 'b3', 'a3'];
        for (let i = 0; i < this.cardAnimNames.length; i++) {
          const cardAnim = <dragonBones.EgretArmatureDisplay>this[this.cardAnimNames[i]];
          if (this.cardAnimNames[i] === '_smallCard1' || this.cardAnimNames[i] === '_smallCard2') {
            this.setLabel(cardAnim.armature.getSlot('card_number_vertical'), this.getCardIndex(cardData[i], core.GameState.BET),66);
          } else {
            this.setLabel(cardAnim.armature.getSlot('card_number_vertical'), this.getCardIndex(cardData[i], core.GameState.BET));
          }
          this.showVerticalLoopBack(cardAnim, 0);
        }

        // the following two only for DEAL State
        this.setLabel(this._playerCard3.armature.getSlot('card_number_horizontal'), this.getCardIndex('b3', core.GameState.DEAL));
        this.showHorizontalLoopBack(this._playerCard3, 0);
        this.setLabel(this._bankerCard3.armature.getSlot('card_number_horizontal'), this.getCardIndex('a3', core.GameState.DEAL));
        this.showHorizontalLoopBack(this._bankerCard3, 0);

        this._smallCard2Exist = true;
        this._smallCard1Exist = true;
        // console.log('betInitState() end');
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
        return total - 1;
      }

      protected getCurrentCard() {
        const cardDataNames = ['b1', 'a1', 'b2', 'a2', 'b3', 'a3'];
        for (let i = cardDataNames.length - 1; i >= 0; i--) {
          if (this._gameData[cardDataNames[i]]) {
            return cardDataNames[i];
          }
        }
        return null;
      }

      protected getBetCardIndices() {
        // for first four cards and small cards .. actually not for b3/a3
        // not for bet state
        const indices = { b1: 0, a1: 0, b2: 0, a2: 0, b3: 0, a3: 0 };
        const cardDataNames = ['b1', 'a1', 'b2', 'a2', 'b3', 'a3'];
        const total = 0;
        for (let i = 0; i < 6; i++) {
          indices[cardDataNames[i]] = this._gameData.currentcardindex - this.getCurrentIndexOffsetToFirstCard() + i;
        }
        return indices;
      }

      protected getDealCardIndices() {
        // not for bet state
        const indices = { b1: 0, a1: 0, b2: 0, a2: 0, b3: 0, a3: 0 };
        const cardDataNames = ['b1', 'a1', 'b2', 'a2', 'b3', 'a3'];
        let total = -1;
        // let currentDataIndex = 0;
        for (let i = 0; i < 6; i++) {
          if (this._gameData[cardDataNames[i]]) {
            // currentDataIndex = i
            total++;
          }
        }
        for (let i = 0; i < 4; i++) {
          indices[cardDataNames[i]] = this._gameData.currentcardindex - total + i;
        }
        for (let i = 4, j = 4; i < 6; i++) {
          if (this._gameData[cardDataNames[i]]) {
            indices[cardDataNames[i]] = this._gameData.currentcardindex - total + j;
            j++;
          }
        }
        return indices;
      }

      protected getCardIndex(cardName: string, state: core.GameState) {
        if (state === core.GameState.BET) {
          // console.log('betCardIndices', this.getBetCardIndices());
          return this.getBetCardIndices()[cardName];
        }
        // console.log('dealCardIndices', this.getDealCardIndices());
        return this.getDealCardIndices()[cardName];
      }

      protected async dealInitState() {
        // const currentIndexOffsetToFirstCard = this.getCurrentIndexOffsetToFirstCard();
        const currentCard = this.getCurrentCard();
        if (!currentCard) {
          return;
        }

        // console.log('dealInitState 2a currentCard', currentCard);

        const dataNames = ['b1', 'a1', 'b2', 'a2', 'b3', 'a3'];
        // console.log('dealInitState 3', this._gameData);
        for (let i = 0, j = 0; i < 6; i++) {
          // console.log('dealInitState loop 3a', dataNames[i], this._gameData[dataNames[i]], this._gameData);
          if (!this._gameData[dataNames[i]]) {
            continue;
          }
          // console.log('dealInitState loop 3b');
          switch (dataNames[i]) {
            case 'b1':
              this.setCardFrontFace(this._playerCard1, dataNames[i], 'vertical', 0);
              this.setLabel(this._playerCard1.armature.getSlot(`card_number_vertical`), this.getCardIndex('b1', core.GameState.DEAL)); // this._gameData.currentcardindex - currentIndexOffsetToFirstCard);
              break;
            case 'a1':
              this.setCardFrontFace(this._bankerCard1, dataNames[i], 'vertical', 0);
              this.setLabel(this._bankerCard1.armature.getSlot(`card_number_vertical`), this.getCardIndex('a1', core.GameState.DEAL)); // this._gameData.currentcardindex - currentIndexOffsetToFirstCard + j);
              break;
            case 'b2':
              this.setCardFrontFace(this._playerCard2, dataNames[i], 'vertical', 0);
              this.setLabel(this._playerCard2.armature.getSlot(`card_number_vertical`), this.getCardIndex('b2', core.GameState.DEAL)); // this._gameData.currentcardindex - currentIndexOffsetToFirstCard + j);
              this._playerCard1.animation.gotoAndStopByTime(`vertical_loop_front`, 0);
              this._playerCard2.animation.gotoAndStopByTime(`vertical_loop_front`, 0);
              this.updatePlayerSum();
              break;
            case 'a2':
              this.setCardFrontFace(this._bankerCard2, dataNames[i], 'vertical', 0);
              this.setLabel(this._bankerCard2.armature.getSlot(`card_number_vertical`), this.getCardIndex('a2', core.GameState.DEAL)); // this._gameData.currentcardindex - currentIndexOffsetToFirstCard + j);
              this._bankerCard1.animation.gotoAndStopByTime(`vertical_loop_front`, 0);
              this._bankerCard2.animation.gotoAndStopByTime(`vertical_loop_front`, 0);
              this.updateBankerSum();
              break;
            case 'b3':
              if (this._smallCard1Group) {
                this._smallCard1Exist = false;
                this._smallCard1.animation.gotoAndStopByTime('vertical_idle', 0);
              }
              this.moveAndShowB3(200);
              this.setCardFrontFace(this._playerCard3, dataNames[i], 'horizontal', 90);
              this.setLabel(this._playerCard3.armature.getSlot(`card_number_horizontal`), this.getCardIndex('b2', core.GameState.DEAL)); // this._gameData.currentcardindex - currentIndexOffsetToFirstCard + j);
              this._playerCard3.animation.gotoAndStopByTime(`horizontal_loop_front`, 0);
              this.updatePlayerSum();
              this.updateBankerSum();
              break;
            case 'a3':
              if (this._smallCard1Group && this._smallCard2Group) {
                if (this._smallCard1Exist) {
                  this._smallCard1.animation.gotoAndStopByTime('vertical_idle', 0);
                  this._smallCard1Exist = false;
                } else {
                  this._smallCard2.animation.gotoAndStopByTime('vertical_idle', 0);
                  this._smallCard2Exist = false;
                }
              }
              this.moveAndShowA3(200);
              this.setCardFrontFace(this._bankerCard3, dataNames[i], 'horizontal', 90);
              this.setLabel(this._bankerCard3.armature.getSlot(`card_number_horizontal`), this.getCardIndex('a3', core.GameState.DEAL)); // this._gameData.currentcardindex - currentIndexOffsetToFirstCard + j);
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
        await new Promise(resolve => egret.Tween.get(this._playerCard3Group).to({ alpha: 0 }, interval).set({ visible: false }).call(resolve));
        await new Promise(resolve => egret.Tween.get(this._playerCardMoveGroup).to({ x: this._playerCardInitX }, interval).call(resolve));
        return new Promise(resolve => resolve());
      }

      protected async moveAndHideA3(interval: number) {
        await new Promise(resolve => egret.Tween.get(this._bankerCard3Group).to({ alpha: 0 }, interval).set({ visible: false }).call(resolve));
        await new Promise(resolve => egret.Tween.get(this._bankerCardMoveGroup).to({ x: this._bankerCardInitX }, interval).call(resolve));
        return new Promise(resolve => resolve());
      }

      protected async moveAndShowB3(interval: number) {
        await new Promise(resolve => egret.Tween.get(this._playerCardMoveGroup).to({ x: 459 }, interval).call(resolve));
        await new Promise(resolve => egret.Tween.get(this._playerCard3Group).set({ visible: true }).to({ alpha: 1 }, interval).call(resolve));
        return new Promise(resolve => resolve());
      }

      protected async moveAndShowA3(interval: number) {
        await new Promise(resolve => egret.Tween.get(this._bankerCardMoveGroup).to({ x: 1651 }, interval).call(resolve));
        await new Promise(resolve => egret.Tween.get(this._bankerCard3Group).set({ visible: true }).to({ alpha: 1 }, interval).call(resolve));
        return new Promise(resolve => resolve());
      }

      protected async flipCards() {
        // const currentIndexOffsetToFirstCard = this.getCurrentIndexOffsetToFirstCard();
        const currentCard = this.getCurrentCard();
        if (!currentCard) {
          return;
        }
        const dataNames = ['b1', 'a1', 'b2', 'a2', 'b3', 'a3'];
        // console.log('flipCards 3', this._gameData);
        for (let i = dataNames.length - 1; i >= 0; i--) {
          if (!this._gameData[dataNames[i]]) {
            continue;
          }
          // console.log('flipCards loop ', i);

          switch (dataNames[i]) {
            case 'b1':
              this.setCardFrontFace(this._playerCard1, dataNames[i], 'vertical', 0);
              this.setLabel(this._playerCard1.armature.getSlot(`card_number_vertical`), this._gameData.currentcardindex);
              break;
            case 'a1':
              this.setCardFrontFace(this._bankerCard1, dataNames[i], 'vertical', 0);
              this.setLabel(this._bankerCard1.armature.getSlot(`card_number_vertical`), this._gameData.currentcardindex);
              break;
            case 'b2':
              this.setCardFrontFace(this._playerCard2, dataNames[i], 'vertical', 0);
              this.setLabel(this._playerCard2.armature.getSlot(`card_number_vertical`), this._gameData.currentcardindex);

              await utils.playAnimation(this._playerCard1, this._verticalFlip, 1);
              await utils.playAnimation(this._playerCard2, this._verticalFlip, 1);

              this.updatePlayerSum();
              break;
            case 'a2':
              this.setCardFrontFace(this._bankerCard2, dataNames[i], 'vertical', 0);
              this.setLabel(this._bankerCard2.armature.getSlot(`card_number_vertical`), this._gameData.currentcardindex);

              await utils.playAnimation(this._bankerCard1, this._verticalFlip, 1);
              await utils.playAnimation(this._bankerCard2, this._verticalFlip, 1);

              this.updateBankerSum();
              break;
            case 'b3':
              this.setCardFrontFace(this._playerCard3, dataNames[i], 'horizontal', 90);
              await this.moveAndShowB3(400);
              this.draw(2);
              // this._ringAnim.animation.fadeIn('draw', 0, 2, 0, 'DRAW_GROUP');
              this._smallCard1Exist = false;
              if (this._smallCard1Group) {
                this.showVerticalOutBack(this._smallCard1, 1);
                // this._smallCard1.animation.play('vertical_out_back', 1);
              }
              this.setLabel(this._playerCard3.armature.getSlot(`card_number_horizontal`), this._gameData.currentcardindex);
              this._playerCard3.animation.play(`horizontal_flip`, 1);
              this.updatePlayerSum();
              this.updateBankerSum();
              break;
            case 'a3':
              this.setCardFrontFace(this._bankerCard3, dataNames[i], 'horizontal', 90);
              await this.moveAndShowA3(400);
              this.draw(2);
              // this._ringAnim.animation.fadeIn('draw', 0, 2, 0, 'DRAW_GROUP');
              if (this._smallCard1Group && this._smallCard2Group) {
                if (this._smallCard1Exist) {
                  this._smallCard1Exist = false;
                  this.showVerticalOutBack(this._smallCard1, 1);
                  // this._smallCard1.animation.play('vertical_out_back', 1);
                } else {
                  this._smallCard2Exist = false;
                  this.showVerticalOutBack(this._smallCard2, 1);
                  // this._smallCard2.animation.play('vertical_out_back', 1);
                }
              }
              this.setLabel(this._bankerCard3.armature.getSlot(`card_number_horizontal`), this._gameData.currentcardindex);
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

      protected showVerticalOutBack(display: dragonBones.EgretArmatureDisplay, playTimes: number) {
        display.animation.play('vertical_out_back', playTimes);
      }

      protected showVerticalLoopBack(display: dragonBones.EgretArmatureDisplay, time: number) {
        display.animation.gotoAndStopByTime('vertical_loop_back', time);
      }

      protected showHorizontalLoopBack(display: dragonBones.EgretArmatureDisplay, time: number) {
        display.animation.gotoAndStopByTime('horizontal_loop_back', time);
      }

      protected async setStateBet(isInit: boolean) {
        super.setStateBet(isInit);
        this.movePin();
        this.moveShoe();
        return new Promise(resolve => resolve());
      }

      protected setStateDeal(isInit: boolean) {
        // console.log('setStateDeal()', this._gameData);

        (async () => {
          const currentIndexOffsetToFirstCard = this.getCurrentIndexOffsetToFirstCard();
          if (this._gameData.redcardindex <= this._gameData.currentcardindex + 5 - currentIndexOffsetToFirstCard) {
            this.getRedCardAnim().animation.gotoAndStopByTime('red_poker_loop', 0);
          }

          this._ringAnim.animation.fadeIn(this._roundLoopB, 0, 0, 0, 'ROUND_ANIMATION_GROUP');

          if (isInit) {
            this.movePin();
            this.moveShoe();
            // console.log('dealInitState()');
            await this.betInitState(core.GameState.DEAL);
            await this.dealInitState();
          } else {
            // console.log('flipCards()');
            await this.flipCards();
          }
        })();
      }

      protected draw(loop: number) {
        this._ringAnim.animation.fadeIn('draw', 0, loop, 0, 'DRAW_GROUP');
      }

      protected pokerRoundLoop() {
        this._ringAnim.animation.fadeIn('poker_round_loop', 0, 0, 0, 'POKER_ROUND_ANIMATION_GROUP');
      }

      protected async distributeCards() {
        await this.roundIn();

        this._ringAnim.animation.fadeIn(this._roundLoopA, 0, 0, 0, 'ROUND_ANIMATION_GROUP');

        await utils.playAnimation(this._ringAnim, 'poker_round_in', 1, 'POKER_ROUND_ANIMATION_GROUP');
        this.pokerRoundLoop();

        for (let i = 0; i < this.cardAnimNames.length; i++) {
          switch (this.cardAnimNames[i]) {
            case '_smallCard1':
            case '_smallCard2':
              this.draw(3);
            case '_playerCard1':
            case '_bankerCard1':
            case '_playerCard2':
            case '_bankerCard2':
              this.setLabel(this._ringAnim.armature.getSlot('card_number_vertical'), this._gameData.currentcardindex + i + 1);
              const cardAnim = <dragonBones.EgretArmatureDisplay>this[this.cardAnimNames[i]];
              if (this.cardAnimNames[i] === '_smallCard1' || this.cardAnimNames[i] === '_smallCard2') {
                this.setLabel(cardAnim.armature.getSlot('card_number_vertical'), this._gameData.currentcardindex + i + 1,66);
              } else {
                this.setLabel(cardAnim.armature.getSlot('card_number_vertical'), this._gameData.currentcardindex + i + 1);
              }
              await utils.playAnimation(this._ringAnim, 'poker_in', 1, 'POKER_ROUND_ANIMATION_GROUP');
              await utils.playAnimation(this._ringAnim, 'poker_out', 1, 'POKER_ROUND_ANIMATION_GROUP');

              await utils.playAnimation(cardAnim, 'vertical_in', 1);
              this.showVerticalLoopBack(cardAnim, 0);
            // cardAnim.animation.gotoAndStopByTime('vertical_loop_back', 0);
          }

          if (this._gameData.currentcardindex + i + 1 === this._gameData.redcardindex) {
            // this.dispatchEvent(new egret.Event('DRAW_RED_CARD'))
            await utils.playAnimation(this._ringAnim, 'red_poker_in', 1, 'POKER_ROUND_ANIMATION_GROUP');
            await utils.playAnimation(this._ringAnim, 'red_poker_out', 1, 'POKER_ROUND_ANIMATION_GROUP');
            await utils.playAnimation(this.getRedCardAnim(), 'red_poker_in', 1);
          }
        }
        await utils.playAnimation(this._ringAnim, 'poker_round_out', 1, 'POKER_ROUND_ANIMATION_GROUP');
        await utils.playAnimation(this._ringAnim, this._roundLoopA, 1, 'ROUND_ANIMATION_GROUP');
        await this.lastCard();

        this._ringAnim.animation.fadeIn(this._roundLoopB, 0, 0, 0, 'ROUND_ANIMATION_GROUP');

        this._smallCard2Exist = true;
        this._smallCard1Exist = true;

        return new Promise(resolve => resolve());
      }

      protected async lastCard() {
        await utils.playAnimation(this._ringAnim, 'round_last_card', 1, 'ROUND_ANIMATION_GROUP');
        return new Promise(resolve => resolve());
      }

      protected updatePlayerSum() {
        if (this._gameData.state === core.GameState.BET) {
          this._playerSum.visible = false;
          this._playerSum.text = '0';
        } else {
          this._playerSum.visible = true;
        }
        this._playerSum.text = this._gameData.playerpoint.toString();
      }

      protected updateBankerSum() {
        if (this._gameData.state === core.GameState.BET) {
          this._bankerSum.visible = false;
          this._bankerSum.text = '0';
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
          // console.log('BET infoArray', this._infoArray);
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
          // console.log('DEAL infoArray', this._infoArray);
          return;
        }
      }

      protected setStateFinish(isInit) {
        // console.log('setStateFinish() isInit', isInit, this._gameData);
        if (this._gameData.redcardindex <= this._gameData.currentcardindex) {
          this.getRedCardAnim().animation.gotoAndStopByTime('red_poker_loop', 0);
        }
        this.updateAllSum();

        this._ringAnim.animation.fadeIn(this._roundLoopB, 0, 0, 0, 'ROUND_ANIMATION_GROUP');

        if (isInit) {
          this.movePin();
          this.moveShoe();
          // const currentIndexOffsetToFirstCard = this.getCurrentIndexOffsetToFirstCard();
          this.betInitState(core.GameState.DEAL);
          this.dealInitState();
        }
      }

      protected async closeShoe(){
            await utils.playAnimation(this._ringAnim, 'shoe_out', 1);
            // await p1;
            // await p2;

            await this.animateShoe();
            await this.animatePin();

            await utils.playAnimation(this._ringAnim, 'shoe_in', 1);
            return new Promise(resolve=>resolve())
      }

      protected setStateShuffle(isInit) {
        if (isInit) {
          (async () => {
            this._smallCard1Exist = true;
            this._smallCard2Exist = true;
            this.movePin();
            this.moveShoe();
            await this.clearCards();
            this._ringAnim.animation.fadeIn(this._roundLoopB, 0, 0, 0);
            this.dispatchEvent(new egret.Event('OPEN_SHUFFLE_PANEL', false, false, 'init'));
          })();
        } else {
          (async () => {
            await this.clearCards();
            // console.log('shuffle start');

            // const p1 = utils.waitDragonBone(this.getRedCardAnim());
            // this.getRedCardAnim().animation.fadeIn('red_poker_out');
            this._smallRedCardGroup.removeChild(this._smallRedCard);
            this._smallRedCard = null;

            // const p2 = utils.waitDragonBone(this._ringAnim);
            // this._ringAnim.animation.fadeIn('shoe_out', 0, 1, 0);

            await this.collapsePin();
            await this.collapseShoe();

            await utils.playAnimation(this.getRedCardAnim(), 'red_poker_out', 1);
            await this.closeShoe();

            // const p3 = utils.waitDragonBone(this._ringAnim);
            // this._ringAnim.animation.fadeIn('shoe_in', 0, 1, 0);
            // await p3;

            this._ringAnim.animation.fadeIn(this._roundLoopB, 0, 0, 0);

            this.dispatchEvent(new egret.Event('OPEN_SHUFFLE_PANEL', false, false, 'notInit'));

            return new Promise(resolve => resolve());
          })();
        }
      }
    }
  }
}
