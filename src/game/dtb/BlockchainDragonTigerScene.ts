/* tslint:disable triple-equals */
/**
 * BlockchainDragonTigerScene
 *
 * BaccaratScene consist of serveral components: Betting table, Video, serveral roadmap, table list panel on right hand side, table info panel and some statistic graph
 */
namespace we {
  export namespace dtb {
    export class Scene extends dt.Scene {
      protected _alwaysShowResult = true;
      protected _helpButton: eui.Group;
      protected _deckButton: eui.Group;
      protected _shufflePanel: bab.ShufflePanel;
      protected _helpPanel: bab.HelpPanel;
      protected _deckPanel: bab.DeckPanel;
      protected _cardInfoPanel: bab.CardInfoPanel;
      protected _historyCardHolder: bab.HistoryCardHolder;

      public static resGroups = [core.res.BlockchainBaccarat];

      protected initChildren() {
        super.initChildren();
        this._helpPanel.setToggler(this._helpButton);
        this._deckPanel.setToggler(this._deckButton);
        this._deckPanel.setValue(<dtb.GameData> this._gameData);
        this._deckPanel.addEventListener('OPEN_CARDINFO_PANEL', this.showCardInfoPanel, this);
        this._cardInfoPanel.addEventListener('OPEN_DECK_PANEL', this.showDeckPanel, this);
        this._cardInfoPanel.addEventListener('OPEN_HELP_PANEL', this.showHelpPanel, this);
        (<any> this._resultDisplay).addEventListener('OPEN_CARDINFO_PANEL', this.showCardInfoPanel, this);
        (<any> this._resultDisplay).addEventListener('OPEN_SHUFFLE_PANEL', this.showShufflePanel, this);
      }

      protected setSkinName() {
        this.skinName = utils.getSkinByClassname('BlockchainDragonTigerScene');
      }

      protected setStateBet(isInit: boolean = false) {
        super.setStateBet(isInit);
        this._historyCardHolder.setCards(this._tableId);
        this._historyCardHolder.setNumber((<bab.GameData>this._gameData).currentcardindex);
        this._shufflePanel.hide();
        this._deckPanel.setValue(<bab.GameData> this._gameData);
        console.log('DTB scene bet state', this._gameData);
        if (isInit || this.previousState !== core.GameState.BET) {
          this._resultDisplay.updateResult(this._gameData, this._chipLayer, isInit);
        }
      }

      protected setStateDeal(isInit: boolean = false) {
        this._shufflePanel.hide();
        this._deckPanel.setValue(<bab.GameData> this._gameData);
        super.setStateDeal(isInit);
        console.log('Bab scene deal state', this._gameData);
      }

      protected setStateFinish(isInit: boolean) {
        this._shufflePanel.hide();
        this._deckPanel.setValue(<bab.GameData> this._gameData);
        super.setStateFinish(isInit);
        console.log('DTB scene finish state', this._gameData);
      }

      protected setStateShuffle(isInit: boolean) {
        super.setStateShuffle(isInit);
        this._resultDisplay.updateResult(this._gameData,this._chipLayer,isInit)
      }

      protected showCardInfoPanel(evt: egret.Event) {
        this._cardInfoPanel.setValue(this._gameData, evt.data);
        this._cardInfoPanel.show();
      }

      protected showDeckPanel(evt: egret.Event) {
        this._deckPanel.show();
      }

      protected showHelpPanel(evt: egret.Event) {
        this._helpPanel.show();
      }

      protected showShufflePanel(evt: egret.Event){
        if(evt.data === 'init'){
          this._shufflePanel.show();
          this._shufflePanel.showStatic(this._gameData);
        }else{
          this._shufflePanel.show();
          this._shufflePanel.showAnim(this._gameData);
        }
        
      }
    }
  }
}
