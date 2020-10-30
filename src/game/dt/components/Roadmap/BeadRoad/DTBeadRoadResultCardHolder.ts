namespace we {
  export namespace dt {
    export class DTBeadRoadResultCardHolder extends ba.BaBeadRoadResultCardHolder {
      protected createChildren() {
        // super.createChildren();
        this.skinName = utils.getSkinByClassname('BaBeadRoadResultCardHolderSkin');
        this.lblPlayerName.renderText = () => `${i18n.t('dragontiger.dragon')}`;
        this.lblBankerName.renderText = () => `${i18n.t('dragontiger.tiger')}`;
      }

      constructor() {
        super();
      }

      public updateResult(gameData: ba.GameData) {
        this.playerSum.text = gameData.playerpoint >= 0 ? gameData.playerpoint.toString() : '';
        this.bankerSum.text = gameData.bankerpoint >= 0 ? gameData.bankerpoint.toString() : '';

        this.card1Player.setCard(utils.formatCard(gameData.b1))
        this.card1Banker.setCard(utils.formatCard(gameData.a1))

        this.card2Banker.visible = false;
        this.card3Banker.visible = false;
        this.bankerSumGroup.x = 216;

        this.card2Player.visible = false;
        this.card3Player.visible = false;
        this.playerSumGroup.x = -48;

      }
    }
  }
}
