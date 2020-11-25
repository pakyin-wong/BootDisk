namespace we {
  export namespace bamb {
    export class CardHolder extends bab.CardHolder {
      protected _centerVCard: ba.FlipCard;
      protected _centerHCard: ba.FlipCard;
      protected _chipLayer: ui.ChipLayer
      protected _openAllPlayerGroup: eui.Group;
      protected _openAllBankerGroup: eui.Group;

      protected _currentFocusCard: dragonBones.EgretArmatureDisplay;

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

      protected setStateDeal(isInit: boolean) {
        if(isInit){
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


      protected setBankerA3Card() {
        this.setCardFrontFace(this._bankerCard3, 'a3', 'horizontal', 0);
        this.setLabel(this._bankerCard3.armature.getSlot(`card_number_horizontal`), this.getCardIndex('a3', core.GameState.DEAL));
      }

      protected setCenterFlipCard(data: string, orientation: string) {
        const card = (orientation === 'vertical') ? this._centerVCard : this._centerHCard
        card.setCardImage(
          'd_sq_ba_card_back_png',
          `d_sq_bac_large_poker_${utils.formatCardForFlip(this._gameData[data])}_png`,
          `d_sq_bac_large_poker_${utils.formatCardForFlip(this._gameData[data])}_png`
        )
      }

      protected flipRemainingFirst4Card() {
        const darkPlayer = this.isPlayerFlipAllowed() ? '' : 'dark_'
        this.flipCard(this._playerCard1, 'vertical', darkPlayer)
        this.flipCard(this._playerCard2, 'vertical', darkPlayer)

        const darkBanker = this.isPlayerFlipAllowed() ? '' : 'dark_'
        this.flipCard(this._bankerCard1, 'vertical', darkBanker)
        this.flipCard(this._bankerCard2, 'vertical', darkBanker)
      }

      protected flipAll() {
        const darkPlayer = this.isPlayerFlipAllowed() ? '' : 'dark_'
        this.flipCard(this._playerCard1, 'vertical', darkPlayer)
        this.flipCard(this._playerCard2, 'vertical', darkPlayer)
        this.flipCard(this._playerCard3, 'horizontal', darkPlayer)

        const darkBanker = this.isPlayerFlipAllowed() ? '' : 'dark_'
        this.flipCard(this._bankerCard1, 'vertical', darkBanker)
        this.flipCard(this._bankerCard2, 'vertical', darkBanker)
        this.flipCard(this._bankerCard3, 'horizontal', darkBanker)

      }

      protected flipCard(card: dragonBones.EgretArmatureDisplay, orientation: string, dark = '') {
        if (card.name !== 'flipped') {
          card.name = 'flipped';
          card.animation.play(`sq_${orientation}_${dark}flip`, 1)
        }
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
        this.setFirst4Cards();
        if (this.isPlayerFlipAllowed()) {
          this._playerCard1Group.touchEnabled = true;
          this._playerCard2Group.touchEnabled = true;
          this._openAllPlayerGroup.visible = true;
          this._currentFocusCard = this._playerCard1;
          if (isInit) {
            this._playerCard1.animation.gotoAndStopByFrame('sq_vertical_select_loop', 0);
          } else {
            this._playerCard1.animation.play('sq_vertical_select_in', 1);
          }
          this.setCenterFlipCard('b1', 'vertical')
          this._centerVCard.visible = true;
          this._centerVCard.touchEnabled = true;
        } else {
          this._playerCard1Group.touchEnabled = false;
          this._playerCard2Group.touchEnabled = false;
          this._openAllPlayerGroup.visible = false;

          if (isInit) {
            this._playerCard1.animation.gotoAndStopByFrame('sq_vertical_dark_loop_back', 0)
            this._playerCard2.animation.gotoAndStopByFrame('sq_vertical_dark_loop_back', 0)
          } else {
            this._playerCard1.animation.play('sq_vertical_dark_in', 1)
            this._playerCard2.animation.play('sq_vertical_dark_in', 1)
          }
        }
        if (this.isBankerFlipAllowed()) {
          this._bankerCard1Group.touchEnabled = true;
          this._bankerCard2Group.touchEnabled = true;
          this._openAllBankerGroup.visible = true;
          this._centerVCard.visible = true;
          this._centerVCard.touchEnabled = true;
        } else {
          this._bankerCard1Group.touchEnabled = false;
          this._bankerCard2Group.touchEnabled = false;
          this._openAllBankerGroup.visible = false;

          if (isInit) {
            this._bankerCard1.animation.gotoAndStopByFrame('sq_vertical_dark_loop_back', 0)
            this._bankerCard2.animation.gotoAndStopByFrame('sq_vertical_dark_loop_back', 0)
          } else {
            this._bankerCard1.animation.play('sq_vertical_dark_in', 1)
            this._bankerCard2.animation.play('sq_vertical_dark_in', 1)

          }
        }

        if (this.isBankerFlipAllowed() && !this.isPlayerFlipAllowed()) {
          this.setCenterFlipCard('a1', 'vertical');
          this._currentFocusCard = this._bankerCard1;
          if (isInit) {
            this._bankerCard1.animation.gotoAndStopByFrame('sq_vertical_select_loop', 0);
          } else {
            this._bankerCard1.animation.play('sq_vertical_select_in', 1);
          }
        }
      }

      protected setStatePeekBanker(isInit: boolean) {
        this._smallCard2Exist = false;
        this.setBankerA3Card();
        this.flipRemainingFirst4Card();
        this._openAllPlayerGroup.visible = false;
        this._centerVCard.visible = false;
        this._centerVCard.touchEnabled = false;
        const darkPlayer = this.isPlayerFlipAllowed() ? '' : 'dark_'
        this.flipCard(this._playerCard3, 'horizontal', darkPlayer)
        if (this.isBankerFlipAllowed()) {
          this._openAllBankerGroup.visible = true;
          this._currentFocusCard = this._bankerCard3
          this.setCenterFlipCard('a3', 'horizontal')
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

      protected setStatePeekPlayer(isInit: boolean) {
        this._smallCard1Exist = false;
        this.setPlayerB3Card();
        this.flipRemainingFirst4Card();
        this._openAllBankerGroup.visible = false;
        this._centerVCard.visible = false;
        this._centerVCard.touchEnabled = false;
        if (this.isPlayerFlipAllowed()) {
          this._openAllPlayerGroup.visible = true;
          this._currentFocusCard = this._playerCard3
          this.setCenterFlipCard('b3', 'horizontal')
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
        //display.animation.gotoAndStopByTime('vertical_loop_back', time)
      }

      protected showHorizontalLoopBack(display: dragonBones.EgretArmatureDisplay, time: number) {
        display.animation.gotoAndStopByTime('horizontal_out_back', time)
        //display.animation.gotoAndStopByTime('horizontal_loop_back', time)
      }

      protected mount() {
        super.mount();
        this._centerVCard.addEventListener(we.core.Event.CARD_FLIPPED, this.centerCardFlipped('vertical'), this);
        this._centerHCard.addEventListener(we.core.Event.CARD_FLIPPED, this.centerCardFlipped('horizontal'), this);
        this._playerCard1Group.addEventListener(egret.TouchEvent.TOUCH_TAP, this.focusCard(this._playerCard1, 'b1', 'vertical'), this)
        this._playerCard2Group.addEventListener(egret.TouchEvent.TOUCH_TAP, this.focusCard(this._playerCard2, 'b2', 'vertical'), this)
        this._playerCard3Group.addEventListener(egret.TouchEvent.TOUCH_TAP, this.focusCard(this._playerCard3, 'b3', 'horizontal'), this)
        this._bankerCard1Group.addEventListener(egret.TouchEvent.TOUCH_TAP, this.focusCard(this._bankerCard1, 'a1', 'vertical'), this)
        this._bankerCard2Group.addEventListener(egret.TouchEvent.TOUCH_TAP, this.focusCard(this._bankerCard2, 'a2', 'vertical'), this)
        this._bankerCard3Group.addEventListener(egret.TouchEvent.TOUCH_TAP, this.focusCard(this._bankerCard3, 'a3', 'horizontal'), this)
        this._openAllBankerGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openAllBanker, this);
        this._openAllPlayerGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openAllPlayer, this);
      }

      protected openAllBanker() {
        if (this._gameData.state === core.GameState.PEEK) {
          this.flipCard(this._bankerCard1, 'vertical')
          this.flipCard(this._bankerCard2, 'vertical')
        }
        if (this._gameData.state === core.GameState.PEEK_BANKER) {
          this.flipCard(this._bankerCard3, 'horizontal')
        }
        const nextCard = this.nextCard();
        if (nextCard) {
          nextCard.animation.play(`sq_vertical_select_in`)
          this.setCenterFlipCard(this.cardToData(this._currentFocusCard), 'vertical')
        }else{
          this._centerHCard.visible = false;
          this._centerVCard.visible = false;
        }
      }

      protected openAllPlayer() {
        if (this._gameData.state === core.GameState.PEEK) {
          this.flipCard(this._playerCard1, 'vertical')
          this.flipCard(this._playerCard2, 'vertical')
        }
        if (this._gameData.state === core.GameState.PEEK_PLAYER) {
          this.flipCard(this._playerCard3, 'horizontal')
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
        this._playerCard1Group.touchEnabled = enable;
        this._playerCard2Group.touchEnabled = enable;
        this._playerCard3Group.touchEnabled = enable;
        this._bankerCard1Group.touchEnabled = enable;
        this._bankerCard2Group.touchEnabled = enable;
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
          this._currentFocusCard.animation.play(`sq_${orientation}_flip`, 1)
          this._currentFocusCard.name = 'flipped'
          const nextCard = this.nextCard();
          if (nextCard) {
            nextCard.animation.play(`sq_${orientation}_select_in`)
            setTimeout(() => {
              this._currentFocusCard = nextCard
              this.setCenterFlipCard(this.cardToData(this._currentFocusCard), orientation)
            }, 800)
          }
        }
      }

      protected nextCard() {
        let nextCard = null;
        const isNameExist = (component: dragonBones.EgretArmatureDisplay, prevCard: dragonBones.EgretArmatureDisplay) => {
          if (component.name === 'flipped') {
            return prevCard;
          }
          return component;
        }

        if (this.isBankerFlipAllowed()) {
          nextCard = isNameExist(this._bankerCard2, nextCard)
          nextCard = isNameExist(this._bankerCard1, nextCard)
        }

        if (this.isPlayerFlipAllowed()) {
          nextCard = isNameExist(this._playerCard2, nextCard)
          nextCard = isNameExist(this._playerCard1, nextCard)
        }

        return nextCard;
      }

      protected focusCard(card: dragonBones.EgretArmatureDisplay, dataName: string, orientation: string) {
        return () => {
          if (!this._currentFocusCard) {
            return;
          }
          if (this._currentFocusCard.name === 'flipped') {
            this._currentFocusCard.animation.gotoAndStopByFrame(`sq_${orientation}_loop_front`, 0)
          } else {
            this._currentFocusCard.animation.gotoAndStopByFrame(`sq_${orientation}_select_in`, 0)
          }
          this._currentFocusCard = card
          card.animation.play(`sq_${orientation}_select_in`, 1);
          this.setCenterFlipCard(dataName, orientation)
        }
      }

      protected setStateFinish(isInit: boolean) {
        super.setStateFinish(isInit);
        this._openAllBankerGroup.visible = false;
        this._openAllPlayerGroup.visible = false;
        this.flipAll();
      }

      protected isPlayerFlipAllowed() {
        let allowed = false;
        if (this._chipLayer && this._chipLayer.getConfirmedBetDetails()) {
          this._chipLayer.getConfirmedBetDetails().map(value => {
            if (value.field === we.ba.BetField.PLAYER) {
              if (value.amount > 0) {
                allowed = true;
              }
            }
          });
        }
        return allowed;
      }

      protected isBankerFlipAllowed() {
        let allowed = false;
        if (this._chipLayer && this._chipLayer.getConfirmedBetDetails()) {
          this._chipLayer.getConfirmedBetDetails().map(value => {
            if (value.field === we.ba.BetField.BANKER || value.field === we.ba.BetField.SUPER_SIX_BANKER) {
              if (value.amount > 0) {
                allowed = true;
              }
            }
          });
        }
        return allowed;
      }
    }
  }
}
