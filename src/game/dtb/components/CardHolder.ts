namespace we {
  export namespace dtb {
    export class CardHolder extends blockchain.CardHolder {
      protected _gameData: we.dtb.GameData;

      protected _factory: dragonBones.EgretFactory;
      protected _ringAnim: dragonBones.EgretArmatureDisplay;

      protected _animRingGroup: eui.Group;
      protected _particleGroup: eui.Group;

      protected _dragonSum: eui.Label;
      protected _tigerSum: eui.Label;

      protected _dragonCardGroup: eui.Group;
      protected _tigerCardGroup: eui.Group;

      protected _smallRedCard: dragonBones.EgretArmatureDisplay;
      protected _smallRedCardGroup: eui.Group;

      protected _dragonCard: dragonBones.EgretArmatureDisplay;
      protected _tigerCard: dragonBones.EgretArmatureDisplay;

      protected _dragonCardInfo: eui.Group;
      protected _tigerCardInfo: eui.Group;
      protected _infoArray: number[];

      protected _dragonAnimGroup: eui.Group;
      protected _tigerAnimGroup: eui.Group;
      protected _dragonAnim: dragonBones.EgretArmatureDisplay;
      protected _tigerAnim: dragonBones.EgretArmatureDisplay;

      protected mount(){
        super.mount();
        this._dragonAnim = this.createDragonTigerAnim('dragon',0.8)
        this._tigerAnim = this.createDragonTigerAnim('tiger',0.8)
        this._dragonAnimGroup.addChild(this._dragonAnim);
        this._tigerAnimGroup.addChild(this._tigerAnim);
        this._dragonAnim.animation.play('loop',0)
        this._tigerAnim.animation.play('loop',0)
      }

      protected createDragonTigerAnim(skeletonName: string, scale: number){
        const skeletonData = RES.getRes(`${skeletonName}_ske_json`);
        const textureData = RES.getRes(`${skeletonName}_tex_json`);
        const texture = RES.getRes(`${skeletonName}_tex_png`);
        const factory = new dragonBones.EgretFactory();
        factory.parseDragonBonesData(skeletonData);
        factory.parseTextureAtlasData(textureData, texture);
        const anim = factory.buildArmatureDisplay(skeletonName);
        anim.scaleX = anim.scaleY = scale
        return anim
      }

      protected createChildren() {
        super.createChildren();
        this.skinName = utils.getSkinByClassname('dtb.CardHolderSkin');
      }

      protected addEventListeners() {
        this._infoArray = [-1, -1];
        mouse.setButtonMode(this._dragonCardInfo, true);
        this._dragonCardInfo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openCardInfo(0), this);
        mouse.setButtonMode(this._tigerCardInfo, true);
        this._tigerCardInfo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openCardInfo(1), this);
      }


      protected createFactory() {
        const skeletonData = RES.getRes(`blockchain_dt_ske_json`);
        const textureData = RES.getRes(`blockchain_dt_tex_json`);
        const texture = RES.getRes(`blockchain_dt_tex_png`);
        this._factory = new dragonBones.EgretFactory();
        this._factory.parseDragonBonesData(skeletonData);
        this._factory.parseTextureAtlasData(textureData, texture);
      }

      protected createCards() {
        this._dragonCard = this.createCardAnim(); //('vertical');
        this._tigerCard = this.createCardAnim(); //('vertical');

        this._dragonCardGroup.addChild(this._dragonCard);
        this._tigerCardGroup.addChild(this._tigerCard);
      }

      protected updateAllSum() {
        this.updateDragonSum();
        this.updateTigerSum();
      }

      protected async clearCards() {
        console.log('clearCards')
        this.hideCard(this._dragonCard, 'vertical', '_front');
        this.hideCard(this._tigerCard, 'vertical', '_front');

        const p1 = we.utils.waitDragonBone(this._ringAnim);
        this._ringAnim.animation.fadeIn('round_out', 0, 1, 0, 'ROUND_ANIMATION_GROUP')
        await p1

        return new Promise(resolve => resolve());
      }

      protected async betInitState(currentIndexOffsetToFirstCard = -1) {
        console.log('betInitState() begin');

        this.setLabel(this._dragonCard.armature.getSlot('card_number_vertical'), this._gameData.currentcardindex + 2)
        this._dragonCard.animation.gotoAndStopByTime('vertical_loop_back', 0);

        this.setLabel(this._tigerCard.armature.getSlot('card_number_vertical'), this._gameData.currentcardindex + 3)
        this._tigerCard.animation.gotoAndStopByTime('vertical_loop_back', 0);

        console.log('betInitState() end');
        return new Promise(resolve => resolve());
      }

      protected getCurrentIndexOffsetToFirstCard() {
        if(!this._gameData.d){
          return 0;
        }
        if(this._gameData.d === 'remove'){
          return 1;
        }
        if(!this._gameData.t){
          return 2;
        }
        
        return 3;
      }

      protected getCurrentDIndex() {
        if (!this._gameData.d) {
          return this._gameData.currentcardindex + 2
        }
        if (this._gameData.d === 'remove') {
          return this._gameData.currentcardindex + 1
        }
        if (!this._gameData.t) {
          return this._gameData.currentcardindex
        }
        if (this._gameData.d) {
          return this._gameData.currentcardindex - 1
        }
      }

      protected getCurrentTIndex() {
        if (!this._gameData.d) {
          return this._gameData.currentcardindex + 3
        }
        if (this._gameData.d === 'remove') {
          return this._gameData.currentcardindex + 2
        }
        if (!this._gameData.t) {
          return this._gameData.currentcardindex + 1
        }
        if (this._gameData.d) {
          return this._gameData.currentcardindex
        }
      }

      protected async dealInitState() {
        if (!this._gameData.d || this._gameData.d === 'remove') {
          return new Promise(resolve => resolve());
        }

        if (this._gameData.d) {
          this.setCardFrontFace(this._dragonCard, 'd', 'vertical', 0)
          this.setLabel(this._dragonCard.armature.getSlot(`card_number_vertical`), this.getCurrentDIndex());
          this._dragonCard.animation.gotoAndStopByTime(`vertical_loop_front`, 0);
        }

        if (this._gameData.t) {
          console.log('dealInitState t');
          this.setCardFrontFace(this._tigerCard, 't', 'vertical', 0)
          this.setLabel(this._tigerCard.armature.getSlot(`card_number_vertical`), this.getCurrentTIndex())
          this._tigerCard.animation.gotoAndStopByTime(`vertical_loop_front`, 0);
        }

        return new Promise(resolve => resolve());
      }

      protected async flipCards() {
        if (!this._gameData.d || this._gameData.d === 'remove') {
          return new Promise(resolve => resolve());
        }

        if (this._gameData.d) {
          this.setCardFrontFace(this._dragonCard, 'd', 'vertical', 0)
          this.setLabel(this._dragonCard.armature.getSlot(`card_number_vertical`), this.getCurrentDIndex());
          const p4 = utils.waitDragonBone(this._dragonCard)
          this._dragonCard.animation.play(`vertical_flip`, 1);
          await p4
          this.updateDragonSum();
        }

        if (this._gameData.t) {
          console.log('dealInitState t');
          this.setCardFrontFace(this._tigerCard, 't', 'vertical', 0)
          this.setLabel(this._tigerCard.armature.getSlot(`card_number_vertical`), this.getCurrentTIndex())
          const p5 = utils.waitDragonBone(this._tigerCard)
          this._tigerCard.animation.play(`vertical_flip`, 1);
          await p5
          this.updateTigerSum();
        }

        return new Promise(resolve => resolve());
      }

      protected setStateDeal(isInit: boolean) {
        console.log('setStateDeal()', this._gameData);

        (async () => {
          const currentIndexOffsetToFirstCard = this.getCurrentIndexOffsetToFirstCard();
          if (this._gameData.redcardindex <= this._gameData.currentcardindex + 3 - currentIndexOffsetToFirstCard) {
            this.getRedCardAnim().animation.gotoAndStopByTime('red_poker_loop', 0)
          }

          this._ringAnim.animation.fadeIn('round_loop_a', 0, 0, 0, 'ROUND_ANIMATION_GROUP');

          if (isInit) {
            this.movePin();
            this.moveShoe();
            console.log('dealInitState()');
            await this.betInitState(currentIndexOffsetToFirstCard);
            await this.dealInitState();
          } else {
            console.log('flipCards()');
            await this.flipCards();
          }
        })();
      }

      protected async distributeCards() {
        this._dragonAnim.animation.play('loop',0)
        this._tigerAnim.animation.play('loop',0)

        const p1 = we.utils.waitDragonBone(this._ringAnim);
        this._ringAnim.animation.fadeIn('round_in', 0, 1, 0, 'ROUND_ANIMATION_GROUP')
        await p1

        this._ringAnim.animation.fadeIn('round_loop_a', 0, 0, 0, 'ROUND_ANIMATION_GROUP')

        const p2 = we.utils.waitDragonBone(this._ringAnim);
        this._ringAnim.animation.fadeIn('poker_round_in', 0, 1, 0, 'POKER_ROUND_ANIMATION_GROUP');
        await p2

        this._ringAnim.animation.fadeIn('poker_round_loop', 0, 0, 0, 'POKER_ROUND_ANIMATION_GROUP');

        await (async () => {
          this.setLabel(this._ringAnim.armature.getSlot('card_number_vertical'), this._gameData.currentcardindex + 1);

          const p1 = we.utils.waitDragonBone(this._ringAnim);
          this._ringAnim.animation.fadeIn('poker_in', 0, 1, 0, 'POKER_ROUND_ANIMATION_GROUP');
          await p1;

          const p2 = we.utils.waitDragonBone(this._ringAnim);
          this._ringAnim.animation.fadeIn('poker_out', 0, 1, 0, 'POKER_ROUND_ANIMATION_GROUP');
          await p2;

          return new Promise(resolve => resolve())
        })();


        const cardAnimNames = ['_dragonCard', '_tigerCard'];
        for (let i = 0; i < cardAnimNames.length; i++) {
          switch (cardAnimNames[i]) {
            case '_dragonCard':
            case '_tigerCard':
              this.setLabel(this._ringAnim.armature.getSlot('card_number_vertical'), this._gameData.currentcardindex + i + 2);

              const cardAnim = <dragonBones.EgretArmatureDisplay>this[cardAnimNames[i]];
              this.setLabel(cardAnim.armature.getSlot('card_number_vertical'), this._gameData.currentcardindex + i + 2)

              const block1 = (async () => {
                const p1 = we.utils.waitDragonBone(cardAnim);
                cardAnim.animation.play('vertical_in', 1);
                await p1;

                cardAnim.animation.gotoAndStopByFrame('vertical_loop_back', 0);

                return new Promise(resolve => resolve())
              })();

              const block2 = (async () => {
                const p1 = we.utils.waitDragonBone(this._ringAnim);
                this._ringAnim.animation.fadeIn('poker_in', 0, 1, 0, 'POKER_ROUND_ANIMATION_GROUP');
                await p1;

                const p2 = we.utils.waitDragonBone(this._ringAnim);
                this._ringAnim.animation.fadeIn('poker_out', 0, 1, 0, 'POKER_ROUND_ANIMATION_GROUP');
                await p2;

                return new Promise(resolve => resolve())
              })();

              await block1;
              await block2;
          }

          if (this._gameData.currentcardindex + i + 1 === this._gameData.redcardindex) {
            const block1 = (async () => {
              const p1 = we.utils.waitDragonBone(this._ringAnim);
              this._ringAnim.animation.fadeIn('red_poker_in', 0, 1, 0, 'POKER_ROUND_ANIMATION_GROUP');
              await p1

              const p2 = we.utils.waitDragonBone(this._ringAnim);
              this._ringAnim.animation.fadeIn('red_poker_out', 0, 1, 0, 'POKER_ROUND_ANIMATION_GROUP');
              await p2

              return new Promise(resolve => resolve());
            })()

            const block2 = we.utils.waitDragonBone(this.getRedCardAnim());
            this.getRedCardAnim().animation.fadeIn('red_poker_in')

            await block1
            await block2
          }
        }

        const p3 = we.utils.waitDragonBone(this._ringAnim);
        this._ringAnim.animation.fadeIn('poker_round_out', 0, 1, 0, 'POKER_ROUND_ANIMATION_GROUP');
        await p3

        return new Promise(resolve => resolve());
      }

      protected updateDragonSum() {
        if (this._gameData.state === core.GameState.BET) {
          this._dragonSum.visible = false;
          this._dragonSum.text = '0'
        } else {
          this._dragonSum.visible = true;
        }
        this._dragonSum.text = this._gameData.dragonpoint.toString();
      }

      protected updateTigerSum() {
        if (this._gameData.state === core.GameState.BET) {
          this._tigerSum.visible = false;
          this._tigerSum.text = '0'
        } else {
          this._tigerSum.visible = true;
        }
        this._tigerSum.text = this._gameData.tigerpoint.toString();
      }

      protected updateCardInfoButtons() {
        if (this._gameData.state === core.GameState.BET) {
          this._infoArray = new Array();
          for (let i = 0; i < 2; i++) {
            this._infoArray.push(this._gameData.currentcardindex + 1 + i);
          }
          console.log('BET infoArray', this._infoArray);
          return;
        }
        if (this._gameData.state === core.GameState.DEAL || this._gameData.state === core.GameState.FINISH) {
          let j = 0;
          const dataNames = ['d', 't'];
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

      protected setStateFinish(isInit) {
        console.log('setStateFinish() isInit', isInit, this._gameData);
        if (this._gameData.redcardindex <= this._gameData.currentcardindex) {
          this.getRedCardAnim().animation.gotoAndStopByTime('red_poker_loop', 0)
        }
        this.updateAllSum();

        this._ringAnim.animation.fadeIn('round_loop_a', 0, 0, 0, 'ROUND_ANIMATION_GROUP');

        if(this._gameData.wintype === dt.WinType.DRAGON){
          (async()=>{
          const p1 = utils.waitDragonBone(this._dragonAnim)
          this._dragonAnim.animation.play('win',2);
          await p1;

          this._dragonAnim.animation.play('loop',0)
          })();
        }

        if(this._gameData.wintype === dt.WinType.TIGER){
          (async()=>{
          const p1 = utils.waitDragonBone(this._tigerAnim)
          this._tigerAnim.animation.play('win',2);
          await p1

          this._tigerAnim.animation.play('loop',0)
          })();
        }

        if (isInit) {
          this.movePin();
          this.moveShoe();
          const currentIndexOffsetToFirstCard = this.getCurrentIndexOffsetToFirstCard();
          this.betInitState(currentIndexOffsetToFirstCard)
          this.dealInitState();
        }
      }

      protected setStateShuffle(isInit) {
        if (isInit) {
          (async () => {
            this.movePin();
            this.moveShoe();
            await this.clearCards();
            this._ringAnim.animation.fadeIn('round_loop_a', 0, 0, 0);
            this.dispatchEvent(new egret.Event('OPEN_SHUFFLE_PANEL', false, false, 'init'))

          })();
        } else {
          (async () => {
            await this.clearCards();
            console.log('shuffle start')
            const p1 = utils.waitDragonBone(this.getRedCardAnim());
            this.getRedCardAnim().animation.fadeIn('red_poker_out');
            this._smallRedCardGroup.removeChild(this._smallRedCard);
            this._smallRedCard = null

            const p2 = utils.waitDragonBone(this._ringAnim);
            const p2a = (async()=>{
              const dragonBlock = utils.waitDragonBone(this._dragonAnim);
              const tigerBlock = utils.waitDragonBone(this._tigerAnim);

              this._dragonAnim.animation.play('shoe_out',1)
              this._tigerAnim.animation.play('shoe_out',1)

              await dragonBlock;
              await tigerBlock;

              return new Promise(resolve=>resolve())
            })();
            this._ringAnim.animation.fadeIn('shoe_out', 0, 1, 0);

            await this.collapsePin();
            await this.collapseShoe();

            await p1;
            await p2;
            await p2a;

            await this.animateShoe();
            await this.animatePin();

            const p3 = utils.waitDragonBone(this._ringAnim);
            this._ringAnim.animation.fadeIn('shoe_in', 0, 1, 0);


            const p3a = (async()=>{
              const dragonBlock = utils.waitDragonBone(this._dragonAnim);
              const tigerBlock = utils.waitDragonBone(this._tigerAnim);

              this._dragonAnim.animation.play('shoe_in',1)
              this._tigerAnim.animation.play('shoe_int',1)

              await dragonBlock;
              await tigerBlock;

              return new Promise(resolve=>resolve())
            })();

            await p3
            await p3a

            this._ringAnim.animation.fadeIn('round_loop_a', 0, 0, 0);

            this.dispatchEvent(new egret.Event('OPEN_SHUFFLE_PANEL', false, false, 'notInit'))

            return new Promise(resolve => resolve());
          })();
        }
      }

      protected showStaticRedCard() {

      }

    }
  }
}
