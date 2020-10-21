namespace we {
  export namespace bab {
    export class ShufflePanel extends BasePanel {
      protected _firstGroup: eui.Group;
      protected _firstCard: dragonBones.EgretArmatureDisplay;

      protected _oneRowFirstCardY = 230 + 300;
      protected _oneRowFirstRowY = 687 + 300;

      protected _twoRowFirstCardY = 110 + 300;
      protected _twoRowFirstRowY = 567 + 300;
      protected _twoRowSecondRowY = 905 + 300;

      protected _firstRowGroup: eui.Group;
      protected _secondRowGroup: eui.Group;

      protected _allCardsGroup: eui.Group;

      protected _factory: dragonBones.EgretFactory;
      protected _cards: dragonBones.EgretArmatureDisplay[] = new Array();

      protected mount() {
        super.mount();
        this.createFactory();
      }

      protected createFirstCard() {
        this._firstGroup = new eui.Group();
        this._firstGroup.width = 234;
        this._firstGroup.height = 342;

        this._firstCard = this._factory.buildArmatureDisplay('poker');

        this._firstCard.armature.getSlot('card_number_vertical').display = this.createIndexLabel(1);
        const firstCardFront = this.getFirstCardFront(this._gameData.firstcard);
        firstCardFront.anchorOffsetX = this._firstGroup.width / 2;
        firstCardFront.anchorOffsetY = this._firstGroup.height / 2;

        this._firstCard.armature.getSlot('card_front_vertical').display;

        this._firstGroup.horizontalCenter = 0;
        this._firstGroup.addChild(this._firstCard);
        this._allCardsGroup.addChild(this._firstGroup);

        const skipped = utils.stat.ba.translateCardToNumber(this._gameData.firstcard);
        if (skipped > 7) {
          this._firstGroup.y = this._twoRowFirstCardY;
        } else {
          this._firstGroup.y = this._oneRowFirstCardY;
        }

        this._firstCard.animation.gotoAndStop('burn_card_center_loop', 0);
      }

      protected createIndexLabel(num: number) {
        const label = new eui.Label();
        label.text = num.toString();

        const labelGroup = new eui.Group();
        labelGroup.addChild(label);

        return labelGroup;
      }

      protected getFirstCardFront(cardString: string) {
        const resName = cardString === 'back' ? 'back' : utils.formatCardForFlip(cardString);

        const image = new eui.Image();
        image.width = 204;
        image.height = 312;
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

      public showAnim(gameData: any) {
        this._gameData = gameData;
        console.log('ShufflePanel::anim()', gameData);
        this._allCardsGroup.removeChildren();

        if (!this._gameData || !this._gameData.firstcard) {
          return;
        }

        this.createFirstCard();
        this.createGroups();
      }

      public showStatic(gameData: any) {
        this._gameData = gameData;
        console.log('ShufflePanel::stat()', gameData);
        this._allCardsGroup.removeChildren();

        if (!this._gameData || !this._gameData.firstcard) {
          return;
        }

        this.createFirstCard();
        this.createGroups();
      }

      protected createFactory() {
        const skeletonData = RES.getRes(`blockchain_ske_json`);
        const textureData = RES.getRes(`blockchain_tex_json`);
        const texture = RES.getRes(`blockchain_tex_png`);
        this._factory = new dragonBones.EgretFactory();
        this._factory.parseDragonBonesData(skeletonData);
        this._factory.parseTextureAtlasData(textureData, texture);
      }

      protected createBurnCard(num: number) {
        const card = this._factory.buildArmatureDisplay('poker');
        card.scaleX = card.scaleY = 0.7;

        const label = new eui.Label();
        label.text = num.toString();

        const labelGroup = new eui.Group();
        labelGroup.addChild(label);

        card.armature.getSlot('card_number_vertical').display = labelGroup;
        card.armature.getSlot('card_number_horizontal').display = new eui.Group();

        const group = new eui.Group();
        group.height = 246;
        group.width = 169;

        card.anchorOffsetX = group.width / 2;
        card.anchorOffsetY = group.height / 2;

        group.addChild(card);

        return { group, card };
      }

      protected createGroups() {
        const skipped = utils.stat.ba.translateCardToNumber(this._gameData.firstcard);
        console.log('ShufflePanel::createGroups:skipped', skipped);

        if (skipped > 7) {
          this.createGroup('_firstRowGroup', this._twoRowFirstRowY);
          this.createGroup('_secondRowGroup', this._twoRowSecondRowY);

          for (let i = 1; i < 8; i++) {
            const cardGroup = this.createBurnCard(i + 1);
            this._firstRowGroup.addChild(cardGroup.group);
            cardGroup.card.animation.gotoAndStop('burn_card_loop', 0);
            this._cards.push(cardGroup.card);
          }

          for (let i = 8; i <= skipped; i++) {
            const cardGroup = this.createBurnCard(i + 1);
            this._secondRowGroup.addChild(cardGroup.group);
            cardGroup.card.animation.gotoAndStop('burn_card_loop', 0);
            this._cards.push(cardGroup.card);
          }
        } else {
          this.createGroup('_firstRowGroup', this._oneRowFirstRowY);
          for (let i = 1; i <= skipped; i++) {
            const cardGroup = this.createBurnCard(i + 1);
            this._firstRowGroup.addChild(cardGroup.group);
            cardGroup.card.animation.gotoAndStop('burn_card_loop', 0);
            this._cards.push(cardGroup.card);
          }
        }
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
        layout.gap = 45;
        return layout;
      }

    }
  }
}
