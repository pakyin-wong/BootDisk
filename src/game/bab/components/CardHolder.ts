namespace we {
  export namespace bab {
    export class CardHolder extends core.BaseEUI implements ui.IResultDisplay {
      private gameData: we.ba.GameData;

      protected card1Player: ui.Card;
      protected card2Player: ui.Card;
      protected card3Player: ui.Card;

      protected card1Banker: ui.Card;
      protected card2Banker: ui.Card;
      protected card3Banker: ui.Card;

      protected playerSum: eui.Label;
      protected bankerSum: eui.Label;

      constructor() {
        super();
      }

      protected createChildren() {
        super.createChildren();
        this.skinName = utils.getSkinByClassname('bab.CardHolderSkin');
      }

      protected mount(){
        this.reset();

        const bg = new egret.Bitmap();
        bg.texture = RES.getRes('blockchain_bg_jpg');
        this.addChild(bg);


        const mcFactory = new ui.SeqMovieClipFactory();
        for (var i=0;i<4;i++) {
          const mc: egret.MovieClip = mcFactory.createMovieClip('d_bcba_animation_particle', 0, 150, 30, [{ name: 'play', frame: 1, end: 151 }], 5);
          this.addChild(mc);
          const j = i%2;
          mc.x = 1300 * Math.floor(i/2);
          mc.y = 760 * j;
          mc.gotoAndPlay('play', -1);
        }

        const dimMask = new egret.Bitmap();
        dimMask.texture = RES.getRes('blockchain_bg_mask_png');
        dimMask.width = 2600;
        this.addChild(dimMask);

        const skeletonData = RES.getRes(`blockchain_ske_json`);
        const textureData = RES.getRes(`blockchain_tex_json`);
        const texture = RES.getRes(`blockchain_tex_png`);
        const factory = new dragonBones.EgretFactory();
        factory.parseDragonBonesData(skeletonData);
        factory.parseTextureAtlasData(textureData, texture);
        // const chip = factory.buildArmatureDisplay('poker');
        const chip = factory.buildArmatureDisplay('blockchain');

        chip.x = 1300;
        chip.y = 670;
        this.addChild(chip);

        this.animChip(chip)
      }

      public updateResult(gameData: data.GameData) {
        // TODO: update card using the gameData

        this.gameData = <ba.GameData> gameData;
        const cardArr = [this.gameData.a1, this.gameData.a2, this.gameData.a3, this.gameData.b1, this.gameData.b2, this.gameData.b3];
        const cardHolderArr = [this.card1Banker, this.card2Banker, this.card3Banker, this.card1Player, this.card2Player, this.card3Player];

        this.playerSum.text = this.gameData.playerpoint >= 0 ? this.gameData.playerpoint.toString() : '';
        this.bankerSum.text = this.gameData.bankerpoint >= 0 ? this.gameData.bankerpoint.toString() : '';

        cardArr.forEach(function (value, index) {
          if (value) {
            cardHolderArr[index].setCard(utils.formatCard(value));
          } else {
            if ((index + 1) % 3 !== 0) {
              cardHolderArr[index].setCard('back');
            }
          }
        });

        switch (this.gameData.state) {
          case core.GameState.PEEK:
            cardHolderArr[0].setCard('back');
            cardHolderArr[1].setCard('back');
            cardHolderArr[3].setCard('back');
            cardHolderArr[4].setCard('back');

            break;
          case core.GameState.PEEK_PLAYER:
            cardHolderArr[5].setCard('back');
            break;
          case core.GameState.PEEK_BANKER:
            cardHolderArr[2].setCard('back');
            break;
        }
      }

      protected async animChip(chip: dragonBones.EgretArmatureDisplay) {
        const p1 = we.utils.waitDragonBone(chip);
        chip.animation.play('shoe_in', 1);
        await p1;
        const p2 = we.utils.waitDragonBone(chip);
        chip.animation.play('round_in', 1);
        await p2;
        await utils.sleep(2000);
        const p3 = we.utils.waitDragonBone(chip);
        chip.animation.play('shoe_out', 1);
        await p3;
        this.animChip(chip);
      }

      public reset() {
        this.card1Player.setCard('back');
        this.card2Player.setCard('back');

        this.card1Banker.setCard('back');
        this.card2Banker.setCard('back');

        this.card3Banker.clear();
        this.card3Player.clear();
      }
    }
  }
}
