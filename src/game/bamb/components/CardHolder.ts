namespace we {
  export namespace bamb {
    export class CardHolder extends bab.CardHolder {
      protected _centerVCard: ba.FlipCard;
      protected _centerVTweenCardBack: eui.Image;
      protected _centerVTweenCardFront: eui.Image;

      protected _centerHCard: ba.FlipCard;
      protected _centerHTweenCardBack: eui.Image;
      protected _centerHTweenCardFront: eui.Image;

      protected _centerVCardGroup: eui.Group;
      protected _centerHCardGroup: eui.Group;

      protected _centerCardData;

      protected _chipLayer: ui.ChipLayer
      protected _openAllPlayerGroup: eui.Group;
      protected _openAllBankerGroup: eui.Group;

      protected _playerCard1TouchGroup : eui.Group;
      protected _playerCard2TouchGroup : eui.Group;
      protected _bankerCard1TouchGroup : eui.Group;
      protected _bankerCard2TouchGroup : eui.Group;

      protected _currentFocusCard: dragonBones.EgretArmatureDisplay;

      protected mount() {
        super.mount();
        this.storeCenterCardOriginalHeight();
        this._centerVCard.addEventListener(we.core.Event.CARD_FLIPPED, this.centerCardFlipped('vertical'), this);
        this._centerHCard.addEventListener(we.core.Event.CARD_FLIPPED, this.centerCardFlipped('horizontal'), this);
        this._playerCard1TouchGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.focusCard(this._playerCard1, 'b1', 'vertical'), this)
        this._playerCard2TouchGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.focusCard(this._playerCard2, 'b2', 'vertical'), this)
        this._playerCard3Group.addEventListener(egret.TouchEvent.TOUCH_TAP, this.focusCard(this._playerCard3, 'b3', 'horizontal'), this)
        this._bankerCard1TouchGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.focusCard(this._bankerCard1, 'a1', 'vertical'), this)
        this._bankerCard2TouchGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.focusCard(this._bankerCard2, 'a2', 'vertical'), this)
        this._bankerCard3Group.addEventListener(egret.TouchEvent.TOUCH_TAP, this.focusCard(this._bankerCard3, 'a3', 'horizontal'), this)
        this._openAllBankerGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openAll('banker'), this);
        this._openAllPlayerGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openAll('player'), this);
      }

      public updateResult(gameData: data.GameData, chipLayer: ui.ChipLayer, isInit: boolean) {
        super.updateResult(gameData, chipLayer, isInit);
        this._chipLayer = chipLayer;
        switch (gameData.state) {
          case core.GameState.PEEK:
            // check with previous
            this.setStatePeek(isInit);
            break;
          case core.GameState.PEEK_BANKER:
            this.setStatePeekBanker(isInit);
            break;
          case core.GameState.PEEK_PLAYER:
            this.setStatePeekPlayer(isInit);
            break;
          default:
            break;
        }
      }

      protected updatePlayerSum() {
        const getPointFromCard = (card: dragonBones.EgretArmatureDisplay, data: string) => {
          if (card.name === 'flipped') {
            return utils.stat.ba.translateCardToPoint(data)
          }
          return 0;
        }

        if (this._gameData.state === core.GameState.BET) {
          this._playerSum.visible = false;
          this._playerSum.text = '0';
        } else {
          this._playerSum.visible = true;
        }
        let playerSum = 0;
        playerSum += getPointFromCard(this._playerCard1, this._gameData.b1)
        playerSum += getPointFromCard(this._playerCard2, this._gameData.b2)
        playerSum += getPointFromCard(this._playerCard3, this._gameData.b3)
        playerSum = playerSum % 10;
        this._playerSum.text = playerSum.toString();
      }

      protected updateBankerSum() {
        const getPointFromCard = (card: dragonBones.EgretArmatureDisplay, data: string) => {
          if (card.name === 'flipped') {
            return utils.stat.ba.translateCardToPoint(data)
          }
          return 0;
        }
        if (this._gameData.state === core.GameState.BET) {
          this._bankerSum.visible = false;
          this._bankerSum.text = '0';
        } else {
          this._bankerSum.visible = true;
        }

        let bankerSum = 0;
        bankerSum += getPointFromCard(this._bankerCard1, this._gameData.a1)
        bankerSum += getPointFromCard(this._bankerCard2, this._gameData.a2)
        bankerSum += getPointFromCard(this._bankerCard3, this._gameData.a3)
        bankerSum = bankerSum % 10;
        this._bankerSum.text = bankerSum.toString();

      }

      protected setStateDeal(isInit: boolean) {
        this.movePin();
        this.moveShoe();
        if (isInit) {
          console.log('setStateDeal isInit')
          this.betInitState(core.GameState.DEAL);
        }
      }

      protected setFirst4Cards() {
        this.setCardFrontFace(this._playerCard1, 'b1', 'vertical', 0);
        this.setLabel(this._playerCard1.armature.getSlot(`card_number_vertical`), this.getCardIndex('b1', core.GameState.DEAL));

        this.setCardFrontFace(this._bankerCard1, 'a1', 'vertical', 0);
        this.setLabel(this._bankerCard1.armature.getSlot(`card_number_vertical`), this.getCardIndex('a1', core.GameState.DEAL));

        this.setCardFrontFace(this._playerCard2, 'b2', 'vertical', 0);
        this.setLabel(this._playerCard2.armature.getSlot(`card_number_vertical`), this.getCardIndex('b2', core.GameState.DEAL));

        this.setCardFrontFace(this._bankerCard2, 'a2', 'vertical', 0);
        this.setLabel(this._bankerCard2.armature.getSlot(`card_number_vertical`), this.getCardIndex('a2', core.GameState.DEAL));
      }

      protected setPlayerB3Card() {
        this.setCardFrontFace(this._playerCard3, 'b3', 'horizontal', 0);
        this.setLabel(this._playerCard3.armature.getSlot(`card_number_horizontal`), this.getCardIndex('b3', core.GameState.DEAL));
      }

      protected disableFlippedCardMouseEvent(){
        if(utils.bam.isPlayerFlipAllowed(this._chipLayer)){
          this._playerCard1TouchGroup.touchEnabled = !(this._playerCard1.name === 'flipped') 
          this._playerCard2TouchGroup.touchEnabled = !(this._playerCard2.name === 'flipped') 
          this._playerCard3Group.touchEnabled = !(this._playerCard3.name === 'flipped') 
        }else{
          this._playerCard1TouchGroup.touchEnabled = false;
          this._playerCard2TouchGroup.touchEnabled = false;
          this._playerCard3Group.touchEnabled = false;
        }
        if(utils.bam.isBankerFlipAllowed(this._chipLayer)){
          this._bankerCard1TouchGroup.touchEnabled = !(this._bankerCard1.name === 'flipped') 
          this._bankerCard2TouchGroup.touchEnabled = !(this._bankerCard2.name === 'flipped') 
          this._bankerCard3Group.touchEnabled = !(this._bankerCard3.name === 'flipped')
        }else{
          this._bankerCard1TouchGroup.touchEnabled = false;
          this._bankerCard2TouchGroup.touchEnabled = false;
          this._bankerCard3Group.touchEnabled = false;
        }
      }


      protected setBankerA3Card() {
        this.setCardFrontFace(this._bankerCard3, 'a3', 'horizontal', 0);
        this.setLabel(this._bankerCard3.armature.getSlot(`card_number_horizontal`), this.getCardIndex('a3', core.GameState.DEAL));
      }

      protected setCenterFlipCard(data: string, orientation: string) {
        let card = (orientation === 'vertical') ? this._centerVCard : this._centerHCard;
        card.setCardImage(
          'd_sq_ba_card_back_png',
          `d_sq_bac_large_poker_${utils.formatCardForFlip(this._gameData[data])}_png`,
          `d_sq_bac_large_poker_${utils.formatCardForFlip(this._gameData[data])}_png`
        )
      }

      protected setCenterTweenFlipCardFront(data: string, orientation: string) {
        let card = (orientation === 'vertical') ? this._centerVTweenCardFront : this._centerHTweenCardFront;
        card.source = 
          `d_sq_bac_large_poker_${utils.formatCardForFlip(this._gameData[data])}_png`
      }

      protected flipRemainingFirst4Card() {
        const darkPlayer = utils.bam.isPlayerFlipAllowed(this._chipLayer) ? '' : 'dark_'
        this.flipCard(this._playerCard1, 'vertical', darkPlayer)
        this.flipCard(this._playerCard2, 'vertical', darkPlayer)
        this._playerCard1.touchEnabled = false;
        this._playerCard2.touchEnabled = false;

        const darkBanker = utils.bam.isBankerFlipAllowed(this._chipLayer) ? '' : 'dark_'
        this.flipCard(this._bankerCard1, 'vertical', darkBanker)
        this.flipCard(this._bankerCard2, 'vertical', darkBanker)
        this._bankerCard1.touchEnabled = false;
        this._bankerCard2.touchEnabled = false;
      }

      protected flipAll() {
        const darkPlayer = utils.bam.isPlayerFlipAllowed(this._chipLayer) ? '' : 'dark_'
        this.flipCard(this._playerCard1, 'vertical', darkPlayer)
        this.flipCard(this._playerCard2, 'vertical', darkPlayer)
        this.flipCard(this._playerCard3, 'horizontal', darkPlayer)
        this._playerCard1.touchEnabled = false;
        this._playerCard2.touchEnabled = false;
        this._playerCard3.touchEnabled = false;

        const darkBanker = utils.bam.isPlayerFlipAllowed(this._chipLayer) ? '' : 'dark_'
        this.flipCard(this._bankerCard1, 'vertical', darkBanker)
        this.flipCard(this._bankerCard2, 'vertical', darkBanker)
        this.flipCard(this._bankerCard3, 'horizontal', darkBanker)
        this._bankerCard1.touchEnabled = false;
        this._bankerCard2.touchEnabled = false;
        this._bankerCard3.touchEnabled = false;

      }

      protected async flipCard(card: dragonBones.EgretArmatureDisplay, orientation: string, dark = '') {
        if (card.name !== 'flipped') {
          card.name = 'flipped';
          await utils.playAnimation( card,`sq_${orientation}_${dark}flip`,1);
          this.updateAllSum();
        }

        return new Promise(resolve=>resolve())
      }

      protected cardToData(card: dragonBones.EgretArmatureDisplay) {
        let result = null
        result = (card === this._playerCard1) ? 'b1' : result;
        result = (card === this._playerCard2) ? 'b2' : result;
        result = (card === this._playerCard3) ? 'b3' : result;
        result = (card === this._bankerCard1) ? 'a1' : result;
        result = (card === this._bankerCard2) ? 'a2' : result;
        result = (card === this._bankerCard3) ? 'a3' : result;
        return result;
      }


      protected setStatePeek(isInit: boolean) {
        this.movePin();
        this.moveShoe();
        if (isInit) {
          console.log('setStatePeek isInit')
          this.betInitState(core.GameState.DEAL);
        }
        this.setFirst4Cards();
        if (utils.bam.isPlayerFlipAllowed(this._chipLayer)) {
          this._playerCard1TouchGroup.touchEnabled = true;
          this._playerCard2TouchGroup.touchEnabled = true;
          this._openAllPlayerGroup.visible = true;
          this._currentFocusCard = this._playerCard1;
          if (isInit) {
            console.log('isinit setstatepeek play')
            this._playerCard1.animation.gotoAndStopByFrame('sq_vertical_select_loop', 0);
          } else {
            console.log('isinit setstatepeek play 2')
            this._playerCard1.animation.play('sq_vertical_select_in', 1);
          }
          this.setCenterFlipCard('b1', 'vertical')
          this.changeCenterCardBackAnim('vertical');
          this._centerVCard.visible = true;
          this._centerVCard.touchEnabled = true;
        } else {
          this._playerCard1TouchGroup.touchEnabled = false;
          this._playerCard2TouchGroup.touchEnabled = false;
          this._openAllPlayerGroup.visible = false;

          if (isInit) {
            console.log('isinit setstatepeek play 3')
            this._playerCard1.animation.gotoAndStopByFrame('sq_vertical_dark_loop_back', 0)
            this._playerCard2.animation.gotoAndStopByFrame('sq_vertical_dark_loop_back', 0)

          } else {
            console.log('isinit setstatepeek play 4')
            this._playerCard1.animation.play('sq_vertical_dark_in', 1)
            this._playerCard2.animation.play('sq_vertical_dark_in', 1)

          }
        }
        if (utils.bam.isBankerFlipAllowed(this._chipLayer)) {
          this._bankerCard1TouchGroup.touchEnabled = true;
          this._bankerCard2TouchGroup.touchEnabled = true;
          this._openAllBankerGroup.visible = true;
          this._centerVCard.touchEnabled = true;
        } else {
          this._bankerCard1TouchGroup.touchEnabled = false;
          this._bankerCard2TouchGroup.touchEnabled = false;
          this._openAllBankerGroup.visible = false;

          if (isInit) {
            this._bankerCard1.animation.gotoAndStopByFrame('sq_vertical_dark_loop_back', 0)
            this._bankerCard2.animation.gotoAndStopByFrame('sq_vertical_dark_loop_back', 0)
          } else {
            this._bankerCard1.animation.play('sq_vertical_dark_in', 1)
            this._bankerCard2.animation.play('sq_vertical_dark_in', 1)

          }
        }

        if (utils.bam.isBankerFlipAllowed(this._chipLayer) && !utils.bam.isPlayerFlipAllowed(this._chipLayer)) {
          this.setCenterFlipCard('a1', 'vertical');
          this.changeCenterCardBackAnim('vertical');
          this._currentFocusCard = this._bankerCard1;
          this._centerVCard.visible = true;
          if (isInit) {
            this._bankerCard1.animation.gotoAndStopByFrame('sq_vertical_select_loop', 0);
          } else {
            this._bankerCard1.animation.play('sq_vertical_select_in', 1);
          }
        }
      }

      protected setStatePeekPlayer(isInit: boolean) {
        this.movePin();
        this.moveShoe();
        if (isInit) {
          console.log('setStatePeekPlayer isInit')
          this.betInitState(core.GameState.DEAL);
          this.setFirst4Cards();
        }
        this._smallCard1Exist = false;
        this.setPlayerB3Card();
        this.flipRemainingFirst4Card();
        this.showVerticalOutBack(this._smallCard1, 1);
        this._openAllBankerGroup.visible = false;
        this._centerVCard.visible = false;
        this._centerVCard.touchEnabled = false;
        this._centerVTweenCardBack.visible = false;
        this._centerVTweenCardFront.visible = false;
        if (utils.bam.isPlayerFlipAllowed(this._chipLayer)) {
          this._openAllPlayerGroup.visible = true;
          this._currentFocusCard = this._playerCard3
          this.setCenterFlipCard('b3', 'horizontal')
          this.changeCenterCardBackAnim('horizontal')
          this._playerCard3Group.touchEnabled = true;
          this._centerHCard.visible = true;
          this._centerHCard.touchEnabled = true;
          this._openAllPlayerGroup.visible = true;
          this.focusCard(this._playerCard3, 'b3', 'horizontal')()
        } else {
          this._openAllPlayerGroup.visible = false;
          this._centerHCard.visible = false;
          this._centerHCard.touchEnabled = false;
          this._playerCard3Group.touchEnabled = false;
          this._playerCard3.animation.gotoAndStopByFrame('sq_horizontal_dark_loop_back', 0)
        }
        this.moveAndShowB3(400);
      }

      protected setStatePeekBanker(isInit: boolean) {
        this.movePin();
        this.moveShoe();
        if (isInit) {
          console.log('setStatePeekBanker isInit')
          this.betInitState(core.GameState.DEAL);
          this.setFirst4Cards();
          this.setPlayerB3Card();
          if(!this._gameData.b3 && this._smallCard1Exist){
            this._smallCard1Exist = false
          }
        }
        if(this._smallCard1Exist){
          this._smallCard1Exist = false;
          this.showVerticalOutBack(this._smallCard1, 1);                    
        }else{
          this._smallCard2Exist = false;
          this.showVerticalOutBack(this._smallCard2, 1);          
        }
        
        this.setBankerA3Card();
        this.flipRemainingFirst4Card();
        this._openAllPlayerGroup.visible = false;
        this._centerVCard.visible = false;
        this._centerVCard.touchEnabled = false;
        this._centerVTweenCardBack.visible = false;
        this._centerVTweenCardFront.visible = false;
        const darkPlayer = utils.bam.isPlayerFlipAllowed(this._chipLayer) ? '' : 'dark_'
        this.flipCard(this._playerCard3, 'horizontal', darkPlayer)
        if (utils.bam.isBankerFlipAllowed(this._chipLayer)) {
          this._openAllBankerGroup.visible = true;
          this._currentFocusCard = this._bankerCard3
          this.setCenterFlipCard('a3', 'horizontal')
          this.changeCenterCardBackAnim('horizontal');
          this._bankerCard3Group.touchEnabled = true;
          this._centerHCard.visible = true;
          this._centerHCard.touchEnabled = true;
          this.focusCard(this._bankerCard3, 'a3', 'horizontal')()
        } else {
          this._openAllBankerGroup.visible = false;
          this._centerHCard.visible = false;
          this._centerHCard.touchEnabled = false;
          this._bankerCard3Group.touchEnabled = false;
          this._bankerCard3.animation.gotoAndStopByFrame('sq_horizontal_dark_loop_back', 0)
        }
        this.moveAndShowA3(400);
      }



      protected flipPlayerB3() {
        this.flipCard(this._playerCard3, 'horizontal')
      }


      protected setSkinName() {
        this.skinName = utils.getSkinByClassname('bamb.CardHolderSkin');
      }

      protected async setStateBet(isInit: boolean) {
        super.setStateBet(isInit);
        this.resetFlipped();
        if (isInit) {
          this._centerVCard.visible = false;
          this._centerHCard.visible = false;
        } else {
          this._centerVCard.visible = false;
          this._centerHCard.visible = false;
        }
        return new Promise(resolve=>resolve())
      }

      protected changeCenterCardBackAnim(orientation: string) {
        let centerTweenCard = (orientation === 'vertical') ? this._centerVTweenCardBack : this._centerHTweenCardBack;

        egret.Tween.get(centerTweenCard)
          .set({
              y : this._centerCardData[orientation].original.y,
              height : this._centerCardData[orientation].original.height,
              width : this._centerCardData[orientation].original.width,
              visible : true,
          })
          .to({
              y : this._centerCardData[orientation].big.y,
              height : this._centerCardData[orientation].big.height,
              width : this._centerCardData[orientation].big.width,
          }, 200)
          .wait(100)
          .to({
              y : this._centerCardData[orientation].big.y,
              height : this._centerCardData[orientation].big.height,
              width : this._centerCardData[orientation].big.width,
          }, 200)
          .set({ visible: false });
      }

      protected crossfadeCenterCardAnim(orientation: string) {
        let cardTweenFront = (orientation === 'vertical') ? this._centerVTweenCardFront: this._centerHTweenCardFront;
        let cardTweenBack = (orientation === 'vertical') ? this._centerVTweenCardBack: this._centerHTweenCardBack;
        
        egret.Tween.get(cardTweenFront)
        .set({visible: true,
              y : this._centerCardData[orientation].original.y,
              height : this._centerCardData[orientation].original.height,
              width : this._centerCardData[orientation].original.width})
        .wait(500)
          .to({
              y : this._centerCardData[orientation].big.y,
              height : this._centerCardData[orientation].big.height,
              width : this._centerCardData[orientation].big.width,
          }, 200)
          .wait(100)
          .to({
              y : this._centerCardData[orientation].original.y,
              height : this._centerCardData[orientation].original.height,
              width : this._centerCardData[orientation].original.width,
              alpha: 0,
          }, 200)
        .set({visible : false, alpha: 1})

        egret.Tween.get(cardTweenBack)
        .set({visible: false,
              y : this._centerCardData[orientation].original.y,
              height : this._centerCardData[orientation].original.height,
              width : this._centerCardData[orientation].original.width})
        .wait(500)
        .set({alpha:0, visible: true})
          .to({
              y : this._centerCardData[orientation].big.y,
              height : this._centerCardData[orientation].big.height,
              width : this._centerCardData[orientation].big.width,
              alpha: 2/3
          }, 200)
          .to({alpha:1}, 100)
          .to({
              y : this._centerCardData[orientation].original.y,
              height : this._centerCardData[orientation].original.height,
              width : this._centerCardData[orientation].original.width,
              alpha: 1,
          }, 200)
        .set({visible : false, alpha: 1})
      }

      protected closeCenterCardBack(orientation: string) {
        let cardTween = (orientation === 'vertical') ? this._centerVTweenCardBack: this._centerHTweenCardBack;

        egret.Tween.get(cardTween)
        .set({visible: true,
              y : this._centerCardData[orientation].original.y,
              height : this._centerCardData[orientation].original.height,
              width : this._centerCardData[orientation].original.width,})
        .to({alpha: 0},400)
        .set({visible : false, alpha: 1})
      }



      protected closeCenterCardFront(orientation: string) {
        let cardTween = (orientation === 'vertical') ? this._centerVTweenCardFront: this._centerHTweenCardFront;
        console.log('closeCenterCardFront xxx')
        egret.Tween.get(cardTween)
        .set({visible: true,
              y : this._centerCardData[orientation].original.y,
              height : this._centerCardData[orientation].original.height,
              width : this._centerCardData[orientation].original.width,})
        .wait(1500)
          .to({
              y : this._centerCardData[orientation].big.y,
              height : this._centerCardData[orientation].big.height,
              width : this._centerCardData[orientation].big.width,
          }, 200)
          .wait(100)
          .to({
              y : this._centerCardData[orientation].original.y,
              height : this._centerCardData[orientation].original.height,
              width : this._centerCardData[orientation].original.width,
              alpha: 0,
          }, 200)
        .set({visible : false, alpha: 1})
      }

      protected createFactory() {
        const skeletonData = RES.getRes(`blockchain_sqba_ske_json`);
        const textureData = RES.getRes(`blockchain_sqba_tex_json`);
        const texture = RES.getRes(`blockchain_sqba_tex_png`);
        this._factory = new dragonBones.EgretFactory();
        this._factory.parseDragonBonesData(skeletonData);
        this._factory.parseTextureAtlasData(textureData, texture);
      }

      protected pokerRoundLoop() {

      }

      protected showVerticalOutBack(display: dragonBones.EgretArmatureDisplay, playTimes: number) {
        display.animation.play('vertical_out_back', playTimes)
      }

      protected showVerticalLoopBack(display: dragonBones.EgretArmatureDisplay, time: number) {
        display.animation.gotoAndStopByTime('vertical_out_back', time)
      }

      protected showHorizontalLoopBack(display: dragonBones.EgretArmatureDisplay, time: number) {
        display.animation.gotoAndStopByTime('horizontal_out', time)
      }

      protected storeCenterCardOriginalHeight() {
        this._centerCardData = {
          vertical:{
            big:{
              height: this._centerVTweenCardBack.height,
              width:this._centerVTweenCardBack.width,
              y:this._centerVTweenCardBack.y
            },
            original:{
              height:this._centerVCardGroup.height,
              width:this._centerVCardGroup.width,
              y:this._centerVCardGroup.y
            }
          },
          horizontal:{
            big:{
              height: this._centerHTweenCardBack.height,
              width:this._centerHTweenCardBack.width,
              y:this._centerHTweenCardBack.y,
            },
            original:{
              height:this._centerHCardGroup.width, // because of rotation
              width:this._centerHCardGroup.height,
              y:this._centerHCardGroup.y
            }
          }
        }
      }

      protected checkCardAllOpened() {
        if (this._gameData.state === core.GameState.PEEK) {
          if (this._playerCard1.name === 'flipped' &&
            this._playerCard2.name === 'flipped') {
            this._openAllPlayerGroup.visible = false;
          }
          if (this._bankerCard1.name === 'flipped' &&
            this._bankerCard2.name === 'flipped') {
            this._openAllBankerGroup.visible = false;
          }
        }
        if (this._gameData.state === core.GameState.PEEK_PLAYER) {
          if (this._playerCard3.name === 'flipped') {
            this._openAllPlayerGroup.visible = false;
          }
        }
        if (this._gameData.state === core.GameState.PEEK_BANKER) {
          if (this._bankerCard3.name === 'flipped') {
            this._openAllBankerGroup.visible = false;
          }
        }

      }

      protected openAll(side: string) {
          let card1 = (side === 'player')? this._playerCard1: this._bankerCard1;
          let card2 = (side === 'player')? this._playerCard2: this._bankerCard2;
          let card3 = (side === 'player')? this._playerCard3: this._bankerCard3;
          let state = (side === 'player')? core.GameState.PEEK_PLAYER : core.GameState.PEEK_BANKER;
          let group = (side === 'player')? this._openAllPlayerGroup : this._openAllBankerGroup;

        return async ()=>{
          if (this._gameData.state === state) {
            this.flipCard(card3, 'horizontal')
            this.closeCenterCardBack('horizontal');
            this._centerHCard.visible = false;
            group.visible = false;
            return;
          }

          this.closeCenterCardBack('vertical');
          this._centerVCard.visible = false;

          group.visible = false;

          this.setSideCardsTouchEnabled(false)
          this.setCenterCardsTouchEnabled(false)

          await this.flipCard(card1, 'vertical')
          await this.flipCard(card2, 'vertical')
          
          const nextCard = this.nextCard();
          if (nextCard) {
            this.disableFlippedCardMouseEvent();
            nextCard.animation.play(`sq_vertical_select_in`)
            this.changeCenterCardBackAnim('vertical')
            this._currentFocusCard = nextCard
            this.setCenterFlipCard(this.cardToData(nextCard), 'vertical')
            this._centerVCard.visible = true;
            this._centerVCard.touchEnabled = true;
            
          } 
        }
      }

      protected resetFlipped() {
        this._playerCard1.name = ''
        this._playerCard2.name = ''
        this._playerCard3.name = ''
        this._bankerCard1.name = ''
        this._bankerCard2.name = ''
        this._bankerCard3.name = ''
        this.setSideCardsTouchEnabled(false)
        this.setCenterCardsTouchEnabled(false)
        this._openAllBankerGroup.visible = false;
        this._openAllPlayerGroup.visible = false;
        this._smallCard1Exist = true;
        this._smallCard2Exist = true;
      }

      protected setSideCardsTouchEnabled(enable: boolean) {
        this._playerCard1TouchGroup.touchEnabled = enable;
        this._playerCard2TouchGroup.touchEnabled = enable;
        this._playerCard3Group.touchEnabled = enable;
        this._bankerCard1TouchGroup.touchEnabled = enable;
        this._bankerCard2TouchGroup.touchEnabled = enable;
        this._bankerCard3Group.touchEnabled = enable;
      }

      protected setCenterCardsTouchEnabled(enable: boolean) {
        this._centerHCard.visible = enable;
        this._centerHCard.touchEnabled = enable;
        this._centerVCard.visible = enable;
        this._centerVCard.touchEnabled = enable;
      }

      protected centerCardFlipped(orientation: string) {
        return () => {
          if(orientation === 'vertical' && !this._centerVCard.visible){
            return;
          }
          if(orientation === 'horizontal' && !this._centerHCard.visible){
            return;
          }
          let centerCard = (orientation === 'vertical') ? this._centerVCard: this._centerHCard;
          this._currentFocusCard.animation.play(`sq_${orientation}_flip`, 1)
          this._currentFocusCard.name = 'flipped'
          this.updateAllSum();
          this.checkCardAllOpened();
          const nextCard = this.nextCard();
          if (nextCard) {
            nextCard.animation.play(`sq_${orientation}_select_in`)
            this.setCenterTweenFlipCardFront(this.cardToData(this._currentFocusCard), orientation);
            this.crossfadeCenterCardAnim(orientation)
            this._currentFocusCard = nextCard
            this.setCenterFlipCard(this.cardToData(this._currentFocusCard), orientation);
          }else{
            this.setCenterTweenFlipCardFront(this.cardToData(this._currentFocusCard), orientation);
            this.closeCenterCardFront(orientation);
            this._centerVCard.visible = false;
            this._centerHCard.visible = false;
          }
        }
      }

      protected nextCard() {
        let nextCard = null;
        let nextCards = new Array();
        let appeared = false;
        let startNum = 0;

        const pushNonFlipCard = (component: dragonBones.EgretArmatureDisplay) => {
          if (component.name !== 'flipped' ) {
            nextCards.push(component);
          }

          if (this._currentFocusCard === component){
            startNum = nextCards.length;
          }          
        }

        if (utils.bam.isPlayerFlipAllowed(this._chipLayer)) {
          pushNonFlipCard(this._playerCard1)
          pushNonFlipCard(this._playerCard2)
        }

        if (utils.bam.isBankerFlipAllowed(this._chipLayer)) {
          pushNonFlipCard(this._bankerCard1)
          pushNonFlipCard(this._bankerCard2)
        }

        if(nextCards[startNum]){
          return nextCards[startNum];
        }

        if(nextCards[0]){
          return nextCards[0];
        }        

        return nextCard;
      }

      protected focusCard(card: dragonBones.EgretArmatureDisplay, dataName: string, orientation: string) {
        return () => {
          console.log('focusCard()');
          if(card.name === 'flipped'){
            return;
          }
          
          if (this._currentFocusCard) {
            if (this._currentFocusCard.name === 'flipped') {
              this._currentFocusCard.animation.gotoAndStopByFrame(`sq_${orientation}_loop_front`, 0)
            } else {
              this._currentFocusCard.animation.play(`sq_${orientation}_select_out`, 1)
            }
          }
          this._currentFocusCard = card
          card.animation.play(`sq_${orientation}_select_in`, 1);
          this.changeCenterCardBackAnim(orientation)
          this.setCenterFlipCard(dataName, orientation)
          if(orientation === 'vertical'){
            this._centerVCard.visible = true;
          }else{
            this._centerHCard.visible = true;
          }
        }
      }

      protected setStateFinish(isInit: boolean) {
        super.setStateFinish(isInit);
        this._openAllBankerGroup.visible = false;
        this._openAllPlayerGroup.visible = false;
        this._centerHCard.visible = false;
        this._centerVCard.visible = false;
        this.flipAll();
      }

    }
  }
}
