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

      protected _infoArray: number[];

      protected mount() {
        this.reset();
        this.createFactory();
        this.createParticles();
        this.createRingAnim();
        this.createCards();
        this.addEventListeners();

        /// update the card by replacing the MeshDisplayData of the slot
        // update poker card front by update the texture instead of changing the display
        /*
        const card = this._ringAnim.armature.getSlot('card_back_vertical');
        const cardStr = utils.getCardResName('back');
        const texture = RES.getRes(cardStr);
        const meshDistData = card.displayData as dragonBones.MeshDisplayData;
        const textureData = new dragonBones.EgretTextureData();
        textureData.renderTexture = texture;
        meshDistData.texture = textureData;
        card.armature.replacedTexture == null;
        card.replaceDisplayData(meshDistData);
        card.displayIndex = -1;
        card.displayIndex = 0;
        */
      }

      protected openCardInfo(infoIndex){
        return (evt : egret.Event) => {
              console.log('dispatch OPEN_CARDINFO_PANEL', this._infoArray[infoIndex]);
              if (this._infoArray[0] !== -1) {
                this.dispatchEvent(new egret.Event('OPEN_CARDINFO_PANEL', false, false, this._infoArray[infoIndex]));
              }
        }
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

      protected abstract  addEventListeners();

      protected abstract createFactory();

      protected createRingAnim() {
        this._ringAnim = this._factory.buildArmatureDisplay('blockchain');
        this._animRingGroup.addChild(this._ringAnim);
      }

      protected abstract createCards();

      protected createCardAnim() {
        const cardAnim = this._factory.buildArmatureDisplay('poker');
        return cardAnim;
      }

      public updateResult(gameData: data.GameData, chipLayer: ui.ChipLayer, isInit: boolean) {
        console.log(' cardholder::updateResult ', gameData, isInit);

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
        this.updateAllSum();

        if (isInit) {
          this.movePin();
          this.moveShoe();
          console.log('betInitState()');
          this._ringAnim.animation.fadeIn('round_loop_a', 0, 0, 0, 'ROUND_ANIMATION_GROUP');
          if (this._gameData.redcardindex <= this._gameData.currentcardindex + 6) {
            this.getRedCardAnim().animation.gotoAndStopByTime('red_poker_loop', 0)
          }
          await this.betInitState();
        } else {
          console.log('clearCards()');
          await this.clearCards();
          console.log('distributeCards()');
          await this.distributeCards();
        }
      }

      protected abstract updateAllSum();

      protected async hideCard(cardAnim, orientation, front = '') {
        const p1 = we.utils.waitDragonBone(cardAnim);
        cardAnim.animation.play(`${orientation}_out${front}`);
        await p1;

        cardAnim.animation.gotoAndStopByTime(`${orientation}_idle`, 0);

        return new Promise(resolve => resolve())
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
        const displayData: dragonBones.ImageDisplayData = new dragonBones.ImageDisplayData();
        let textureData: dragonBones.EgretTextureData = new dragonBones.EgretTextureData();
        textureData.renderTexture = cardLabel.texture;
        textureData.region.x = 0;
        textureData.region.y = 0;
        textureData.region.width = textureData.renderTexture.textureWidth;
        textureData.region.height = textureData.renderTexture.textureHeight;
        textureData.parent = new dragonBones.EgretTextureAtlasData();
        textureData.parent.scale = 1;
        displayData.texture = textureData;
        displayData.pivot.x = 0.5;
        displayData.pivot.y = 0.5;

        // type 0 is ImageDisplayData
        displayData.type = 0;

        slot.replaceDisplayData(displayData, 0);

        // set the displayIndex to non zero since new value == current index will not trigger redraw
        slot.displayIndex = -1;
        slot.displayIndex = 0;
      }


      protected abstract async betInitState()

      protected abstract async dealInitState();

      protected abstract async flipCards();

      protected setCardFrontFace(cardAnim: dragonBones.EgretArmatureDisplay, currentCard, orientation, rotation) {
        const cardSlot = cardAnim.armature.getSlot(`card_front_${orientation}`);
        const meshDistData = cardSlot.displayData as dragonBones.MeshDisplayData;
        const bitmap = new egret.Bitmap();
        bitmap.texture = RES.getRes(utils.getCardResName(utils.formatCardForFlip(this._gameData[currentCard])));
        bitmap.rotation = rotation;
          
        const textureData = new dragonBones.EgretTextureData();
        textureData.renderTexture = bitmap.texture;
        meshDistData.texture = textureData;
/*
        } else {
          bitmap.anchorOffsetX = bitmap.height / 2
          bitmap.anchorOffsetY = bitmap.width / 2

          const group = new eui.Group();
          group.addChild(bitmap);
          group.width = bitmap.height
          group.height = bitmap.width


          const renderTexture = new egret.RenderTexture();
          renderTexture.drawToTexture(group)

          

        
          const textureData = new dragonBones.EgretTextureData();
          textureData.renderTexture = renderTexture;
          textureData.region.x = 0;
          textureData.region.y = 0;
          textureData.region.width = textureData.renderTexture.textureWidth;
          textureData.region.height = textureData.renderTexture.textureHeight;

          meshDistData.texture = textureData;
          //meshDistData.pivot.x = 0.5;
          //meshDistData.pivot.y = 0.5;

          //.texture = textureData;

        }
        */
        cardSlot.armature.replacedTexture == null;
        cardSlot.replaceDisplayData(meshDistData);
        cardSlot.displayIndex = -1;
        cardSlot.displayIndex = 0;
      }

      protected abstract setStateDeal(isInit: boolean);

      protected async collapsePin() {
        const bone = this._ringAnim.armature.getBone('red_card');
        const destRad = this.getPinRad(0)
        await new Promise(resolve => egret.Tween.get(bone.origin).to({ rotation: destRad }, 1000, function (t) {
          bone.invalidUpdate();
          return t;
        }).call(resolve))
        bone.invalidUpdate();
      }

      protected async collapseShoe() {
        const bone = this._ringAnim.armature.getBone('shoe_bar');
        const destRad = this.getShoeRad(0)
        await new Promise(resolve => egret.Tween.get(bone.origin).to({ rotation: destRad }, 1000, function (t) {
          bone.invalidUpdate();
          return t;
        }).call(resolve))
        bone.invalidUpdate();
      }

      protected movePin() {
        const bone = this._ringAnim.armature.getBone('red_card');
        const destRad = this.getPinRad()
        bone.origin.rotation = destRad;
        bone.invalidUpdate();
      }

      protected moveShoe() {
        const bone = this._ringAnim.armature.getBone('shoe_bar');
        const destRad = this.getShoeRad()
        bone.origin.rotation = destRad;
        bone.invalidUpdate();
      }

      protected abstract async distributeCards();

      protected abstract updateCardInfoButtons();

      protected getPinRad(num = this._gameData.currentcardindex) {
        const proportion = num / this._gameData.maskedcardssnList.length;
        const angleOffset = 82 * proportion; // -40 to 41 / 131 to 49
        const destAngle = -131 + angleOffset;
        const destRad = (destAngle * Math.PI) / 180;
        return destRad
      }

      protected getShoeRad(num = this._gameData.redcardindex) {
        const proportion = num / this._gameData.maskedcardssnList.length;
        const angleOffset = 82 * proportion; // -72 to 9
        const destAngle = -131 + angleOffset;
        const destRad = (destAngle * Math.PI) / 180;
        return destRad
      }

      protected async animatePin() {
        const bone = this._ringAnim.armature.getBone('red_card');
        const destRad = this.getPinRad();
        await new Promise(resolve => egret.Tween.get(bone.origin).to({ rotation: destRad }, 1000, function (t) {
          bone.invalidUpdate();
          return t;
        }).call(resolve))

        return new Promise(resolve => resolve());
      }

      protected async animateShoe() {
        const bone = this._ringAnim.armature.getBone('shoe_bar');
        const destRad = this.getShoeRad();
        await new Promise(resolve => egret.Tween.get(bone.origin).to({ rotation: destRad }, 1000, function (t) {
          bone.invalidUpdate();
          return t;
        }).call(resolve))

        return new Promise(resolve => resolve());
      }

      protected abstract setStateFinish(isInit)

      protected abstract setStateShuffle(isInit);

      protected getRedCardAnim() {
        if (!this._smallRedCard) {
          this._smallRedCard = this._factory.buildArmatureDisplay('red_card');
          this._smallRedCardGroup.addChild(this._smallRedCard)
        }
        return this._smallRedCard
      }

      public reset() { }
    }
  }
}