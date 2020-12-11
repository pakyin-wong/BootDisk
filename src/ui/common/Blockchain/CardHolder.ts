namespace we {
  export namespace blockchain {
    export abstract class CardHolder extends core.BaseEUI implements ui.IResultDisplay {
      protected _gameData: we.data.GameData & we.data.BlockchainGameData;

      protected _factory: dragonBones.EgretFactory;
      protected _ringAnim: dragonBones.EgretArmatureDisplay;

      protected _animRingGroup: eui.Group;
      protected _particleGroup: eui.Group;

      protected _smallRedCard: dragonBones.EgretArmatureDisplay;
      protected _smallRedCardGroup: eui.Group;
      protected _smallRedCardDesc: ui.RunTimeLabel;

      protected _infoArray: number[];
      protected abstract _totalCardPerRound: number;

      protected _pinStartAngle: number;
      protected _pinInterval: number;

      protected _verticalFlip: string;

      protected _roundLoopA: string;
      protected _roundLoopB: string;

      protected _cardUsedMessage: CardUsedMessage;
      protected _clonedPin: egret.Bitmap;

      protected mount() {
        this.reset();
        this.initVariables();
        this.createFactory();
      }

      protected initAnimRelatedComps(){
        if (!env.isMobile) {
          this.createParticles();
        } 
        this.createRingAnim();
        if (!env.isMobile) {
          this.clonePin();
        } 
        this.createCards();
        this.addEventListeners();
      }

      // could be treated as second part of mount
      public passBackgrounds(backgrounds : any){
        this.initAnimRelatedComps();
      }

      public abstract setDefaultStates();

      protected initVariables() {
        this._roundLoopA = 'round_loop_a';
        this._roundLoopB = 'round_loop_b';
        this._pinStartAngle = -131;
        this._pinInterval = 82;
      }

      protected destroyAnim(display: dragonBones.EgretArmatureDisplay) {
        if (!display) {
          return;
        }
        if (display.animation) {
          display.animation.stop();
        }
        display.armature.dispose();
        display.dispose();
        if (display.parent) {
          display.parent.removeChild(display);
        }
      }

      protected destroy() {
        this.destroyAnim(this._ringAnim);
        this.destroyAnim(this._smallRedCard);
        super.destroy();
        this._factory.clear(true);
      }

      protected openCardInfo(infoIndex) {
        return (evt: egret.Event) => {
          console.log('dispatch OPEN_CARDINFO_PANEL', this._infoArray[infoIndex]);
          if (this._infoArray[0] !== -1) {
            this.dispatchEvent(new egret.Event('OPEN_CARDINFO_PANEL', false, false, this._infoArray[infoIndex]));
          }
        };
      }

      public createParticles() {
        const mcFactory = new ui.SeqMovieClipFactory();
        for (let i = 0; i < 4; i++) {
          const mc: egret.MovieClip = mcFactory.createMovieClip('d_bcba_animation_particle', 0, 150, 30, [{ name: 'play', frame: 1, end: 151 }], 5);
          const j = i % 2;
          mc.x = 1300 * Math.floor(i / 2);
          mc.y = 760 * j;
          mc.gotoAndPlay('play', -1);
          this._particleGroup.addChild(mc);
        }
      }

      protected abstract addEventListeners();

      protected abstract createFactory();

      protected createRingAnim() {
        this._ringAnim = this._factory.buildArmatureDisplay('blockchain');
        this._ringAnim.armature.cacheFrameRate = 24;
        utils.dblistenToSoundEffect(this._ringAnim);
        this._cardUsedMessage = new CardUsedMessage();
        this._cardUsedMessage.width = 0;
        this._cardUsedMessage.y = -320;
        this._ringAnim.addChild(this._cardUsedMessage);
        this._animRingGroup.addChild(this._ringAnim);
      }

      protected clonePin() {
        const redPin = this._ringAnim.armature.getSlot('red_card');
        const redPinMesh: egret.Mesh = redPin.display;
        const redPinClone: egret.Bitmap = new egret.Bitmap();
        // redPinClone.width = redPinMesh.width;
        // redPinClone.height = redPinMesh.height;
        redPinClone.rotation = 90 + (Math.atan2(redPin.globalTransformMatrix.b, redPin.globalTransformMatrix.a) * 180) / Math.PI;
        redPinClone.texture = redPinMesh.texture;
        redPinClone.x = redPin.globalTransformMatrix.tx;
        redPinClone.y = redPin.globalTransformMatrix.ty;
        redPinClone.anchorOffsetX = 14;
        redPinClone.anchorOffsetY = 111 + redPinClone.texture.textureHeight * redPinClone.scaleY;
        redPinClone.alpha = 0;
        // redPinClone.pixelHitTest = true;
        redPinClone.touchEnabled = true;
        this._ringAnim.addChild(redPinClone);

        this._clonedPin = redPinClone;
        this._clonedPin.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onPinRollOver, this);
        this._clonedPin.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onPinRollOut, this);
      }

      protected onPinRollOver() {
        this._cardUsedMessage.show();
      }
      protected onPinRollOut() {
        this._cardUsedMessage.hide();
      }

      protected abstract createCards();

      protected createCardAnim() {
        const cardAnim = this._factory.buildArmatureDisplay('poker');
        cardAnim.armature.cacheFrameRate = 24;
        utils.dblistenToSoundEffect(cardAnim);
        return cardAnim;
      }

      public updateResult(gameData: data.GameData, chipLayer: ui.ChipLayer, isInit: boolean) {
        console.log(' cardholder::updateResult ', gameData, isInit);

        this._gameData = <bab.GameData> gameData;
        this.updateCardInfoButtons();
        this._cardUsedMessage.value = this._gameData.currentcardindex;
        if (isInit) {
          this.movePin();
          this.moveShoe();
        }
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
          case core.GameState.IDLE:
            this.setStateIdle(isInit);
            break;
          default:
            console.log('default updateResult ', gameData);
            break;
        }
      }

      protected setStateIdle(isInit: boolean) {
        if (isInit || this._gameData.previousstate === core.GameState.SHUFFLE) {
          this.setDefaultStates();
        }else{
          console.log('clearCards() in idle');
          this.clearCards();          
        }
      }

      protected async setStateBet(isInit: boolean) {
        console.log('setStateBet() isInit', isInit, this._gameData);
        this.updateAllSum();
        if (isInit) {
          this.movePin();
          this.moveShoe();
          console.log('betInitState()');

          this._ringAnim.animation.fadeIn(this._roundLoopB, 0, 0, 0, 'ROUND_ANIMATION_GROUP');
          if (this._gameData.redcardindex <= this._gameData.currentcardindex + this._totalCardPerRound) {
            this.getRedCardAnim().animation.gotoAndStopByTime('red_poker_loop', 0);
          }
          await this.betInitState(core.GameState.BET);
        } else {
          // console.log('clearCards()');
          // await this.clearCards();
          console.log('distributeCards()');
          await this.distributeCards();
        }

        return new Promise(resolve => resolve());
      }

      protected abstract updateAllSum();

      protected async hideCard(cardAnim, orientation, front = '') {
        await utils.playAnimation(cardAnim, `${orientation}_out${front}`, 1);
        // const p1 = we.utils.waitDragonBone(cardAnim);
        // cardAnim.animation.play(`${orientation}_out${front}`);
        // await p1;

        cardAnim.animation.gotoAndStopByTime(`${orientation}_idle`, 0);

        return new Promise(resolve => resolve());
      }

      protected abstract async clearCards();

      protected setLabel(slot: dragonBones.Slot, num: number, size = 36) {
        const cardLabel = new ui.LabelImage();
        cardLabel.size = size;
        cardLabel.textColor = 0xd2fdff;
        cardLabel.fontFamily = 'BarlowBold';
        cardLabel.bold = true;
        cardLabel.hasShadow = true;
        cardLabel.text = num.toString();

        // create a new ImageDisplayData with a EgretTextureData holding the new texture
        // const displayData: dragonBones.ImageDisplayData = new dragonBones.ImageDisplayData();
        const textureData = new dragonBones['EgretTextureData']();
        textureData.renderTexture = cardLabel.texture;
        textureData.region.x = 0;
        textureData.region.y = 0;
        textureData.region.width = textureData.renderTexture.textureWidth;
        textureData.region.height = textureData.renderTexture.textureHeight;
        textureData.parent = new dragonBones.EgretTextureAtlasData();
        textureData.parent.scale = 1;
        // displayData.texture = textureData;
        // displayData.pivot.x = 0.5;
        // displayData.pivot.y = 0.5;

        // // type 0 is ImageDisplayData
        // displayData.type = 0;

        // slot.replaceDisplayData(displayData, 0);
        slot.replaceTextureData(textureData, 0);

        // // set the displayIndex to non zero since new value == current index will not trigger redraw
        // slot.displayIndex = -1;
        // slot.displayIndex = 0;
      }

      protected abstract async betInitState(gameState: core.GameState): Promise<{}>;

      protected abstract async dealInitState();

      protected abstract async flipCards();

      protected setCardFrontFace(cardAnim: dragonBones.EgretArmatureDisplay, currentCard, orientation, rotation) {
        const cardSlot = cardAnim.armature.getSlot(`card_front_${orientation}`);
        const displayFrame = cardSlot.getDisplayFrameAt(0);
        const meshDistData = displayFrame.rawDisplayData as dragonBones.MeshDisplayData;
        const bitmap = new egret.Bitmap();
        bitmap.texture = RES.getRes(utils.getCardResName(utils.formatCardForFlip(this._gameData[currentCard])));
        bitmap.rotation = rotation;

        const textureData = new dragonBones['EgretTextureData']();
        textureData.renderTexture = bitmap.texture;
        meshDistData.texture = textureData;

        cardSlot.armature.replacedTexture == null;
        cardSlot.replaceDisplayData(meshDistData);
        cardSlot.displayIndex = -1;
        cardSlot.displayIndex = 0;
      }

      protected abstract setStateDeal(isInit: boolean);

      protected async collapsePin() {
        if (this._clonedPin) this._clonedPin.touchEnabled = false;
        const bone = this._ringAnim.armature.getBone('red_card');
        const destRad = this.getPinRad(0);
        await new Promise(resolve =>
          egret.Tween.get(bone.origin)
            .to({ rotation: destRad }, 1000, function (t) {
              bone.invalidUpdate();
              // this._clonedPin.rotation = 90 + Math.atan2(bone.globalTransformMatrix.b, bone.globalTransformMatrix.a)*180/Math.PI;
              return t;
            })
            .call(resolve)
        );
        // bone.invalidUpdate();
        // this._clonedPin.rotation = 90 + Math.atan2(bone.globalTransformMatrix.b, bone.globalTransformMatrix.a)*180/Math.PI;
      }

      protected async collapseShoe() {
        const bone = this._ringAnim.armature.getBone('shoe_bar');
        const destRad = this.getShoeRad(0);
        await new Promise(resolve =>
          egret.Tween.get(bone.origin)
            .to({ rotation: destRad }, 1000, function (t) {
              bone.invalidUpdate();
              return t;
            })
            .call(resolve)
        );
        bone.invalidUpdate();
      }

      protected movePin() {
        if (this._ringAnim.armature) {
          const bone = this._ringAnim.armature.getBone('red_card');
          const destRad = this.getPinRad();
          bone.origin.rotation = destRad;
          bone.invalidUpdate();
          if (this._clonedPin) this._clonedPin.rotation = 90 + (Math.atan2(bone.globalTransformMatrix.b, bone.globalTransformMatrix.a) * 180) / Math.PI;
        }
      }

      protected moveShoe() {
        if (this._ringAnim.armature) {
          const bone = this._ringAnim.armature.getBone('shoe_bar');
          const destRad = this.getShoeRad();
          bone.origin.rotation = destRad;
          bone.invalidUpdate();
        }
      }

      protected abstract async distributeCards();

      protected abstract updateCardInfoButtons();

      protected getPinRad(num = this._gameData.redcardindex) {
        const totalCount = this._gameData.maskedcardssnList.length;
        const proportion = (num - this._gameData.currentcardindex) / totalCount;
        const angleOffset = this._pinInterval * proportion; // -40 to 41 / 131 to 49
        const destAngle = this._pinStartAngle + angleOffset;
        const destRad = (destAngle * Math.PI) / 180;
        return destRad;
      }

      protected getShoeRad(num = this._gameData.currentcardindex) {
        const totalCount = this._gameData.maskedcardssnList.length;
        const proportion = (totalCount - num) / totalCount;
        const angleOffset = this._pinInterval * proportion; // -72 to 9
        const destAngle = this._pinStartAngle + angleOffset;
        const destRad = (destAngle * Math.PI) / 180;
        return destRad;
      }

      // protected getPinRad(num = this._gameData.currentcardindex) {
      //   const proportion = num / this._gameData.maskedcardssnList.length;
      //   const angleOffset = this._pinInterval * proportion; // -40 to 41 / 131 to 49
      //   const destAngle = this._pinStartAngle + angleOffset;
      //   const destRad = (destAngle * Math.PI) / 180;
      //   return destRad;
      // }

      // protected getShoeRad(num = this._gameData.redcardindex) {
      //   const proportion = num / this._gameData.maskedcardssnList.length;
      //   const angleOffset = this._pinInterval * proportion; // -72 to 9
      //   const destAngle = this._pinStartAngle + angleOffset;
      //   const destRad = (destAngle * Math.PI) / 180;
      //   return destRad;
      // }

      protected async animatePin() {
        const bone = this._ringAnim.armature.getBone('red_card');
        const destRad = this.getPinRad();
        await new Promise(resolve =>
          egret.Tween.get(bone.origin)
            .to({ rotation: destRad }, 1000, function (t) {
              bone.invalidUpdate();
              // this._clonedPin.rotation = 90 + Math.atan2(bone.globalTransformMatrix.b, bone.globalTransformMatrix.a)*180/Math.PI;
              return t;
            })
            .call(resolve)
        );
        bone.invalidUpdate();
        if (this._clonedPin) {
          this._clonedPin.touchEnabled = true;
          this._clonedPin.rotation = 90 + (Math.atan2(bone.globalTransformMatrix.b, bone.globalTransformMatrix.a) * 180) / Math.PI;
        }

        return new Promise(resolve => resolve());
      }

      protected async animateShoe() {
        const bone = this._ringAnim.armature.getBone('shoe_bar');
        const destRad = this.getShoeRad();
        await new Promise(resolve =>
          egret.Tween.get(bone.origin)
            .to({ rotation: destRad }, 1000, function (t) {
              bone.invalidUpdate();
              return t;
            })
            .call(resolve)
        );

        return new Promise(resolve => resolve());
      }

      protected abstract setStateFinish(isInit);

      protected abstract setStateShuffle(isInit);

      protected getRedCardAnim() {
        if (!this._smallRedCard) {
          this._smallRedCard = this._factory.buildArmatureDisplay('red_card');
          this._smallRedCard.armature.cacheFrameRate = 24;
          utils.dblistenToSoundEffect(this._smallRedCard);
          this._smallRedCardGroup.addChild(this._smallRedCard);
          this._smallRedCard.addEventListener(mouse.MouseEvent.ROLL_OVER, () => (this._smallRedCardDesc.visible = true), this);
          this._smallRedCard.addEventListener(mouse.MouseEvent.ROLL_OUT, () => (this._smallRedCardDesc.visible = false), this);
        }
        return this._smallRedCard;
      }

      public reset() {}

      public collapseBottom() {}

      public expandBottom() {}
    }
  }
}
