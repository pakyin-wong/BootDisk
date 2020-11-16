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
      protected _lastRoundButton: eui.Group;
      protected _shufflePanel: blockchain.ShufflePanel;
      protected _helpPanel: blockchain.HelpPanel;
      protected _deckPanel: blockchain.DeckPanel;
      protected _cardInfoPanel: blockchain.CardInfoPanel;
      protected _historyCardHolder: we.ui.HistoryCardHolder;
      protected _resultDisplay: ui.IResultDisplay & we.blockchain.CardHolder;

      public static resGroups = [core.res.Blockchain, core.res.BlockchainBaccarat];

      protected setSkinName() {
        this.skinName = utils.getSkinByClassname('BlockchainBaccaratScene');
        this._skinKey = 'BlockchainBaccaratScene';
      }

      protected mount() {
        super.mount();
        this._helpPanel.setToggler(this._helpButton);
        this._deckPanel.setToggler(this._deckButton);
        this._historyCardHolder.setToggler(this._lastRoundButton);
        this._historyCardHolder.hide();
        this._deckPanel.setValue(<bab.GameData>this._gameData);
        this._deckPanel.addEventListener('OPEN_CARDINFO_PANEL', this.showCardInfoPanel, this);
        this._cardInfoPanel.addEventListener('OPEN_DECK_PANEL', this.showDeckPanel, this);
        this._cardInfoPanel.addEventListener('OPEN_HELP_PANEL', this.showHelpPanel, this);
        (<any>this._resultDisplay).addEventListener('OPEN_CARDINFO_PANEL', this.showCardInfoPanel, this);
        (<any>this._resultDisplay).addEventListener('OPEN_SHUFFLE_PANEL', this.showShufflePanel, this);
        this.getShoeInfo();
        this._bottomGamePanel.addEventListener('TOGGLE', this.toggleBottomGamePanel, this)
        this.toggleBottomGamePanel();
      }

      protected toggleBottomGamePanel() {
        if (env.isBottomPanelOpen) {
          this._resultDisplay.expandBottom();
          if (env.orientation === 'portrait') {
            switch (this._gameData.state) {
              case core.GameState.DEAL:
              case core.GameState.FINISH:
                this._deckButton.y = 832;
                this._helpButton.y = 832;
                this._lastRoundButton.y = 832;
                break;
              case core.GameState.BET:
              case core.GameState.IDLE:
              case core.GameState.SHUFFLE:
              default:
                this._deckButton.y = 684;
                this._helpButton.y = 684;
                this._lastRoundButton.y = 684;
                break;
            }
          }
        } else {
          this._resultDisplay.collapseBottom();
          if (env.orientation === 'portrait') {
            switch (this._gameData.state) {
              case core.GameState.DEAL:
              case core.GameState.FINISH:
                this._deckButton.y = 1340;
                this._helpButton.y = 1340;
                this._lastRoundButton.y = 1340;
                break;
              case core.GameState.BET:
              case core.GameState.IDLE:
              case core.GameState.SHUFFLE:
              default:
                this._deckButton.y = 1192;
                this._helpButton.y = 1192;
                this._lastRoundButton.y = 1192;
                break;
            }
          }
        }
      }

      public updateGame(isInit: boolean = false) {
        super.updateGame(isInit);
        if (isInit) {
          switch (this._gameData.state) {
            case core.GameState.BET:
            case core.GameState.DEAL:
            case core.GameState.FINISH:
            case core.GameState.SHUFFLE:
              break;
            default:
              console.log('default state', this._gameData.state);
              this._resultDisplay.setDefaultStates()
              break;
          }
        }
      }

      protected setStateBet(isInit: boolean = false) {
        super.setStateBet(isInit);
        this._historyCardHolder.setCards(this._tableId);
        this._historyCardHolder.setNumber(this._gameData.currentcardindex);
        this._shufflePanel.hide();
        this._deckPanel.setValue(this._gameData);
        console.log('Blockchain scene bet state', this._gameData);
        if (isInit || this.previousState !== core.GameState.BET) {
          this._resultDisplay.updateResult(this._gameData, this._chipLayer, isInit);
        }
        (<we.bab.MobileCardHolder>this._resultDisplay).hideSumGroup();
        this.toggleBottomGamePanel();
      }

      protected setStateDeal(isInit: boolean = false) {
        this._shufflePanel.hide();
        this._deckPanel.setValue(<bab.GameData>this._gameData);
        super.setStateDeal(isInit);
        (<we.bab.MobileCardHolder>this._resultDisplay).showSumGroup()
        console.log('Blockchain scene deal state', this._gameData);
        this.toggleBottomGamePanel();
      }

      protected setStateFinish(isInit: boolean) {
        this._shufflePanel.hide();
        this._deckPanel.setValue(<bab.GameData>this._gameData);
        super.setStateFinish(isInit);
        (<we.bab.MobileCardHolder>this._resultDisplay).showSumGroup()
        console.log('Blockchain scene finish state', this._gameData);
        this.toggleBottomGamePanel();
      }

      protected setStateShuffle(isInit: boolean) {
        this.getShoeInfo();
        super.setStateShuffle(isInit);
        this._resultDisplay.updateResult(this._gameData, this._chipLayer, isInit)
          (<we.bab.MobileCardHolder>this._resultDisplay).hideSumGroup();
        this.toggleBottomGamePanel();
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

      protected showShufflePanel(evt: egret.Event) {
        if (evt.data === 'init') {
          this._shufflePanel.show();
          this._shufflePanel.showStatic(this._gameData);
        } else {
          this._shufflePanel.show();
          this._shufflePanel.showAnim(this._gameData);
        }
      }

      protected async getShoeInfo() {
        let obj;
        let text;
        try {
          text = await utils.getText(`${env.blockchain.cosmolink}${this._gameData.cosmosshoeid}`);
          obj = JSON.parse(text);
          if (obj.result.cards) {
            this._gameData.hashedcardsList = obj.result.cards
            console.log('get cosmo succeeded')
          }
          return new Promise(resolve => resolve())
        } catch (error) {
          console.log('GetShoeFromCosmo error. ' + error + '. Fallback to use backend\'s data.');
          return new Promise(resolve => resolve())
        }
      }
    }
  }
}
