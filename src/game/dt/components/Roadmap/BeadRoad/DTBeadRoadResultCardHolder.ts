namespace we {
  export namespace dt {
    export class DTBeadRoadResultCardHolder extends ba.BaBeadRoadResultCardHolder {
      protected createChildren() {
        // super.createChildren();
        this.skinName = utils.getSkin('BaBeadRoadResultCardHolder');
        this.lblPlayerName.renderText = () => `${i18n.t('dragontiger.dragon')}`;
        this.lblBankerName.renderText = () => `${i18n.t('dragontiger.tiger')}`;
      }

      constructor() {
        super();
      }
    }
  }
}