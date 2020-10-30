namespace we {
  export namespace bab {
    export class ShufflePanel extends BasePanel {
      protected _firstGroup: eui.Group;
      protected _firstCard: dragonBones.EgretArmatureDisplay;
      protected _firstCardWidth = 204
      protected _firstCardHeight = 312
      protected _smallCardWidth = 169
      protected _smallCardHeight = 246

      protected _oneRowFirstCardY = 230 + this._firstCardHeight / 2;
      protected _oneRowFirstRowY = 687 + this._firstCardHeight / 2;

      protected _twoRowFirstCardY = 110 + this._firstCardHeight / 2;
      protected _twoRowFirstRowY = 567 + this._firstCardHeight / 2;
      protected _twoRowSecondRowY = 905 + this._firstCardHeight / 2;

      protected _firstRowGroup: eui.Group;
      protected _secondRowGroup: eui.Group;

      protected _allCardsGroup: eui.Group;

      protected _factory: dragonBones.EgretFactory;
      protected _cards: dragonBones.EgretArmatureDisplay[] = new Array();

      protected _skeletonName: string;

      public set skeletonName(value: string){
        this._skeletonName = value
      }

      protected mount() {
        super.mount();
        this.createFactory();
      }

      protected createFirstCard() {
        const firstCardFront = this.getFirstCardFront(this._gameData.firstcard);
        firstCardFront.anchorOffsetX = this._firstCardWidth / 2;
        firstCardFront.anchorOffsetY = this._firstCardHeight / 2;

        this._firstCard = this._factory.buildArmatureDisplay('poker');
        this._firstCard.armature.getSlot('card_number_vertical').display = this.createIndexLabel(1);
        this._firstCard.armature.getSlot('card_front_vertical').display = firstCardFront;
        this._firstCard.animation.gotoAndStopByTime('burn_card_center_in', 0)
        this._firstCard.visible = false;
        //this._firstCard.anchorOffsetX = this._firstCardWidth / 2;
        //this._firstCard.anchorOffsetY = this._firstCardHeight / 2;

        this._firstGroup = new eui.Group();
        this._firstGroup.horizontalCenter = 0;
        this._firstGroup.addChild(this._firstCard);
        this._allCardsGroup.addChild(this._firstGroup);

        const skipped = utils.stat.ba.translateCardToNumber(this._gameData.firstcard);
        this._firstGroup.y = (skipped > 7)? this._twoRowFirstCardY: this._oneRowFirstCardY;
        
      }

      protected createIndexLabel(num: number) {
        const label = new eui.Label();
        label.text = num.toString();

        const labelGroup = new eui.Group();
        labelGroup.addChild(label);

        label.anchorOffsetX = label.width / 2
        label.anchorOffsetY = label.height / 2

        return labelGroup;
      }

      protected getFirstCardFront(cardString: string) {
        const resName = cardString === 'back' ? 'back' : utils.formatCardForFlip(cardString);
        const image = new eui.Image();
        image.width = this._firstCardWidth;
        image.height = this._firstCardHeight;
        image.source = utils.getCardResName(resName);
        return image;
      }

      protected createBg() {
        const rect = new eui.Rect();
        rect.width = this.width;
        rect.height = this.height;
        rect.fillColor = 0x000000;
        rect.alpha = 0.8;
        this.content.addChildAt(rect, 0);
      }

      public async showAnim(gameData: any) {
        if (!this.initCards(gameData)) {
          return;
        }

        const firstGroupOriginalY = this._firstGroup.y
        this._firstGroup.y = 550

        await utils.sleep(1500)
        this._firstCard.visible = true;

        const p1 = utils.waitDragonBone(this._firstCard)
        this._firstCard.animation.play('burn_card_center_in', 1);
        await p1;

        await new Promise(resolve => egret.Tween.get(this._firstGroup).to({y: firstGroupOriginalY},1000).call(resolve))

        for (let i = 0; i < this._cards.length; i++){
          this._cards[i].visible = true;

          const block = utils.waitDragonBone(this._cards[i])
          this._cards[i].animation.play('burn_card_in');
          await block;
        }

        await utils.sleep(2500);

        const firstCardBlock = utils.waitDragonBone(this._firstCard)
        this._firstCard.animation.play('burn_card_center_out', 1);

        let blocks = new Array;
        for (let i = 0; i < this._cards.length; i++){
          blocks.push(utils.waitDragonBone(this._firstCard))
          this._cards[i].animation.play('burn_card_out');
        }

        await firstCardBlock
        for (let i = 0; i < this._cards.length; i++){
          await blocks[i]
        }

        this.hide();

        return new Promise(resolve=>resolve()) 
      }

      public showStatic(gameData: any) {
        if (!this.initCards(gameData)) {
          return;
        }

        this._firstCard.visible = true;
        this._firstCard.animation.gotoAndStopByTime('burn_card_center_loop', 0)
        this.showAllCards();

        setTimeout(() => {
          this.hide();
        }, 8000)
      }

      protected initCards(gameData: any) {
        this._gameData = gameData;
        console.log('ShufflePanel::initComponents()', gameData);
        this._allCardsGroup.removeChildren();

        if (!this._gameData || !this._gameData.firstcard) {
          return false;
        }

        this.createFirstCard();
        this.createGroups();

        return true;
      }

      protected createFactory() {
        const skeletonData = RES.getRes(`${this._skeletonName}_ske_json`);
        const textureData = RES.getRes(`${this._skeletonName}_tex_json`);
        const texture = RES.getRes(`${this._skeletonName}_tex_png`);
        this._factory = new dragonBones.EgretFactory();
        this._factory.parseDragonBonesData(skeletonData);
        this._factory.parseTextureAtlasData(textureData, texture);
      }

      protected createBurnCard(num: number) {
        const card = this._factory.buildArmatureDisplay('poker');
        card.scaleX = card.scaleY = 0.72;

        const label = new eui.Label();
        label.text = num.toString();

        const labelGroup = new eui.Group();
        labelGroup.addChild(label);

        card.armature.getSlot('card_number_vertical').display = labelGroup;
        card.armature.getSlot('card_number_horizontal').display = new eui.Group();

        const group = new eui.Group();
        card.anchorOffsetX = this._smallCardWidth / 2;
        card.anchorOffsetY = this._smallCardHeight / 2;

        group.addChild(card);

        return { group, card };
      }

      protected createGroups() {
        const skipped = utils.stat.ba.translateCardToNumber(this._gameData.firstcard);
        console.log('ShufflePanel::createGroups:skipped', skipped);

        this.createGroup('_firstRowGroup', (skipped > 7) ? this._twoRowFirstRowY : this._oneRowFirstRowY);
        this.createGroup('_secondRowGroup', this._twoRowSecondRowY);

        for (let i = 1; i < 8 && i <= skipped; i++) {
          const cardGroup = this.createBurnCard(i + 1);
          this._firstRowGroup.addChild(cardGroup.group);
          cardGroup.card.animation.gotoAndStop('burn_card_loop', 0);
          cardGroup.card.visible = false;
          this._cards.push(cardGroup.card);
        }

        for (let i = 8; i <= skipped; i++) {
          const cardGroup = this.createBurnCard(i + 1);
          this._secondRowGroup.addChild(cardGroup.group);
          cardGroup.card.animation.gotoAndStop('burn_card_loop', 0);
          cardGroup.card.visible = false;
          this._cards.push(cardGroup.card);
        }
      }

      protected showAllCards(){
        if(!this._cards){
          return;
        }
        this._cards.map(value=>{
          value.visible = true;
        })
      }

      protected createGroup(group, y) {
        this[group] = new eui.Group();
        this[group].horizontalCenter = 0;
        this[group].y = y;
        this[group].layout = this.getHLayout();
        this._allCardsGroup.addChild(this[group]);
      }

      protected getHLayout() {
        const layout = new eui.HorizontalLayout();
        layout.gap = 213;
        return layout;
      }

    }
  }
}
