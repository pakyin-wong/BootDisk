namespace we {
  export namespace ba {
    export class BaBeadRoadResultCardHolder extends CardHolder {
      protected playerSumGroup: eui.Group;
      protected bankerSumGroup: eui.Group;
      protected lblPlayerName: ui.RunTimeLabel;
      protected lblBankerName: ui.RunTimeLabel;

      protected createChildren() {
        super.createChildren();
        this.skinName = utils.getSkin('BaBeadRoadResultCardHolder');

        this.lblPlayerName.renderText = () => `${i18n.t('baccarat.player')}`;
        this.lblBankerName.renderText = () => `${i18n.t('baccarat.banker')}`;
      }

      constructor() {
        super();
      }
      public updateResult(gameData: GameData) {
        super.updateResult(gameData);

        const cardArr = [gameData.a1, gameData.a2, gameData.a3, gameData.b1, gameData.b2, gameData.b3];
        const cardHolderArr = [this.card1Banker, this.card2Banker, this.card3Banker, this.card1Player, this.card2Player, this.card3Player];

        if (!gameData.a3) {
          this.card3Banker.visible = false;
          this.bankerSumGroup.x = 196;
        } else {
          this.card3Banker.visible = true;
          this.bankerSumGroup.x = 168;
        }

        if (!gameData.b3) {
          this.card3Player.visible = false;
          this.playerSumGroup.x = -28;
        } else {
          this.card3Player.visible = true;
          this.playerSumGroup.x = 0;
        }
      }
    }
  }
}
