/* tslint:disable triple-equals */
/**
 * BaccaratScene
 *
 * BaccaratScene consist of serveral components: Betting table, Video, serveral roadmap, table list panel on right hand side, table info panel and some statistic graph
 */
namespace we {
  export namespace bab {
    export class Scene extends ba.Scene {
      protected _alwaysShowResult = true;
      protected _helpButton: eui.Group;
      protected _deckButton: eui.Group;
      protected _shufflePanel: bab.ShufflePanel;
      protected _helpPanel: bab.HelpPanel;
      protected _deckPanel: bab.DeckPanel;
      protected _cardInfoPanel: bab.CardInfoPanel;

      public static resGroups = [core.res.BlockchainBaccarat];

      protected initChildren() {
        super.initChildren();
        this._helpPanel.setToggler(this._helpButton);
        this._deckPanel.setToggler(this._deckButton);
        this._deckPanel.setValue(<bab.GameData> this._gameData);
        this._deckPanel.addEventListener('OPEN_CARDINFO_PANEL', this.showCardInfoPanel, this);
        this._cardInfoPanel.addEventListener('OPEN_DECK_PANEL', this.showDeckPanel, this);
        (<any> this._resultDisplay).addEventListener('OPEN_CARDINFO_PANEL', this.showCardInfoPanel, this);
      }

      protected setSkinName() {
        this.skinName = utils.getSkinByClassname('BlockchainBaccaratScene');
      }

      protected setStateBet(isInit: boolean = false) {
        super.setStateBet(isInit);
        this._shufflePanel.hide();
        this._deckPanel.setValue(<bab.GameData> this._gameData);
        console.log('Bab scene bet state', this._gameData);
        if (this.previousState !== core.GameState.BET) {
          this._resultDisplay.updateResult(this._gameData, this._chipLayer, isInit);
        }
      }

      protected setStateDeal(isInit: boolean = false) {
        super.setStateDeal(isInit);
        this._shufflePanel.hide();
        this._deckPanel.setValue(<bab.GameData> this._gameData);
        console.log('Bab scene deal state', this._gameData);
        this._resultDisplay.updateResult(this._gameData, this._chipLayer, isInit);
      }

      protected setStateFinish(isInit: boolean) {
        super.setStateFinish(isInit);
        this._shufflePanel.hide();
        this._deckPanel.setValue(<bab.GameData> this._gameData);
        console.log('Bab scene finish state', this._gameData);
      }

      protected setStateShuffle(isInit: boolean) {
        super.setStateShuffle(isInit);
        this._deckPanel.setValue(<bab.GameData> this._gameData);
        if (this._gameData.previousstate === core.GameState.SHUFFLE) {
          return;
        }
        console.log('Bab scene shuffle state', this._gameData);

        if (isInit) {
          this._shufflePanel.show();
          this._shufflePanel.stat(this._gameData);
        } else {
          this._shufflePanel.show();
          this._shufflePanel.anim(this._gameData);
        }
      }

      protected showCardInfoPanel(evt: egret.Event) {
        this._cardInfoPanel.setValue(this._gameData, evt.data);
        this._cardInfoPanel.show();
      }

      protected showDeckPanel(evt: egret.Event) {
        this._deckPanel.show();
      }
      /*
      protected setStateDeal(isInit: boolean = false) {
        if (this._previousState === we.core.GameState.BET) {
          this.checkRoundCountWithoutBet();
        }
      }

      protected setStatePeek(isInit: boolean = false) {
        // console.log('PEEK ' + new Date(Date.now()).toString());
        this._resultDisplay.updateResult(this._gameData, this._chipLayer);
        if (this._previousState !== we.core.GameState.PEEK || isInit) {
          this.setBetRelatedComponentsEnabled(false);
          this.setResultRelatedComponentsEnabled(true);
        }
      }

      protected setStatePeekPlayer(isInit: boolean = false) {
        // console.log('PEEK_PLAYER ' + new Date(Date.now()).toString());
        this._resultDisplay.updateResult(this._gameData, this._chipLayer);

        if (this._previousState !== we.core.GameState.PEEK_PLAYER || isInit) {
          this.setBetRelatedComponentsEnabled(false);
          this.setResultRelatedComponentsEnabled(true);
        }
      }

      protected setStatePeekBanker(isInit: boolean = false) {
        // console.log('PEEK_BANKER ' + new Date(Date.now()).toString());
        this._resultDisplay.updateResult(this._gameData, this._chipLayer);
        if (this._previousState !== we.core.GameState.PEEK_BANKER || isInit) {
          this.setBetRelatedComponentsEnabled(false);
          this.setResultRelatedComponentsEnabled(true);
        }
      }

      protected setStateFinish(isInit: boolean = false) {
        // console.log('FINISH ' + new Date(Date.now()).toString());
        super.setStateFinish(isInit);
        this._resultDisplay.updateResult(this._gameData, this._chipLayer);
        this.setResultRelatedComponentsEnabled(true);
      }
      */
    }
  }
}
