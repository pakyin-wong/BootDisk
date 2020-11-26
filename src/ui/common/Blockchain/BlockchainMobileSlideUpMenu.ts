// TypeScript file
namespace we {
  export namespace ui {
    export class BlockchainMobileSlideUpMenu extends MobileSlideUpMenu {
      protected _currentScene : we.bab.MobileScene;

      protected initOrientationDependentComponent() {
        super.initOrientationDependentComponent();
        if (this._currentPage) {
          if(this._currentScene){
            this._currentPage.addEventListener('OPEN_CARDINFO_PANEL', this.getGameDataInfo, this);
          }          
          this._currentPage.addEventListener('OPEN_DECK_PANEL', this.showDeckPanel, this);
          this._currentPage.addEventListener('OPEN_HELP_PANEL', this.showHelpPanel, this);
        }
      }

      public setCurrentScene(scene : we.bab.MobileScene){
        this._currentScene = scene;
      }

      public setPage(opt: any) {
        super.setPage(opt);
        if(this._currentScene){
          this._currentPage.addEventListener('OPEN_CARDINFO_PANEL', this.getGameDataInfo, this);
        }
        this._currentPage.addEventListener('OPEN_DECK_PANEL', this.showDeckPanel, this);
        this._currentPage.addEventListener('OPEN_HELP_PANEL', this.showHelpPanel, this);
      }

      protected getGameDataInfo(evt: egret.Event){
        this._currentScene.showCardInfoPanel(evt);
      }

      public showCardInfoPanel(data:bab.GameData, idx: number) {
        let currentSkinName = "";
        if(env.orientation === "portrait"){
          currentSkinName = "skin_mobile_portrait.bc.CardInfoPanelSkin";
        }else{
          currentSkinName = "skin_mobile_landscape.bc.CardInfoPanelSkin";
        }
        this.setPage({
          class: blockchain.CardInfoPanel,
          title: 'baccarat.verification',
          skinName: currentSkinName,
          backClass: blockchain.DeckPanel,
          backTitle: 'baccarat.fullShoe',
        });
        (this._currentPage as blockchain.CardInfoPanel).setValue(data, idx);
        this.show();
      }
      public showDeckPanel(data:bab.GameData) {
        let currentSkinName = "";
        if(env.orientation === "portrait"){
          currentSkinName = "skin_mobile_portrait.bc.DeckPanelSkin";
        }else{
          currentSkinName = "skin_mobile_landscape.bc.DeckPanelSkin";
        }
        this.setPage({
          class: blockchain.DeckPanel,
          skinName: currentSkinName,
          title: 'baccarat.fullShoe',
        });
        (this._currentPage as blockchain.DeckPanel).setValue(data);
        this.show();
      }
      public showHelpPanel() {
        let currentSkinName = "";
        if(env.orientation === "portrait"){
          currentSkinName = "skin_mobile_portrait.bc.HelpPanelSkin";
        }else{
          currentSkinName = "skin_mobile_landscape.bc.HelpPanelSkin";
        }
        this.setPage({
          class: blockchain.HelpPanel,
          skinName: currentSkinName,
          title: 'baccarat.mechanismHelp',
        });
        this.show();
      }
    }
  }
}
