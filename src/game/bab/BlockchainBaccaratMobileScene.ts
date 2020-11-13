/* tslint:disable triple-equals */
/**
 * BaccaratScene
 *
 * BaccaratScene consist of serveral components: Betting table, Video, serveral roadmap, table list panel on right hand side, table info panel and some statistic graph
 */
namespace we {
  export namespace bab {
    export class MobileScene extends ba.MobileScene {
      protected _gameData: data.GameData & data.BlockchainGameData
      protected _alwaysShowResult = true;
      protected _helpButton: eui.Group;
      protected _deckButton: eui.Group;
      protected _shufflePanel: bab.ShufflePanel;
      protected _helpPanel: bab.HelpPanel;
      protected _deckPanel: bab.DeckPanel;
      protected _cardInfoPanel: bab.CardInfoPanel;
      protected _historyCardHolder: we.ui.HistoryCardHolder;
      protected _resultDisplay : ui.IResultDisplay & we.blockchain.CardHolder;

      public static resGroups = [core.res.Blockchain, core.res.BlockchainBaccarat];

      protected setSkinName() {
        this.skinName = utils.getSkinByClassname('BlockchainBaccaratScene');
        this._skinKey = 'BlockchainBaccaratScene';        
      }

      protected mount(){
        super.mount();
        
      }
    }
  }
}
