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
      // protected _helpPanel: blockchain.HelpPanel;
      // protected _deckPanel: blockchain.DeckPanel;
      // protected _cardInfoPanel: blockchain.CardInfoPanel;
      protected _historyCardHolder: we.ui.HistoryCardHolder;
      protected _resultDisplay: ui.IResultDisplay & we.blockchain.CardHolder;

      protected _portraitButtonExpandedBetY: number;
      protected _portraitButtonExpandedDealY: number;
      protected _portraitButtonCollapsedBetY: number;
      protected _portraitButtonCollapsedDealY: number;

      protected _slideUpMenu: ui.BlockchainMobileSlideUpMenu;

      protected _mobileBlockchainBar : blockchain.MobileBlockchainBar;
      protected _playerTotalAmount : number = 0;
      protected _bankerTotalAmount : number = 0;
      protected _mobileBlockchainBarType : string  = 'ba';

      public static resGroups = [core.res.Blockchain, core.res.BlockchainBaccarat];
      protected _navLayer : eui.Group;

      protected setSkinName() {
        this.skinName = utils.getSkinByClassname('BlockchainBaccaratScene');
        this._skinKey = 'BlockchainBaccaratScene';
      }

      protected mount() {
        super.mount();
      }

      protected instantiateVideo() {}

      protected initOrientationDependentComponent() {
        super.initOrientationDependentComponent();
        this.initVariables();
        // this._helpPanel.setToggler(this._helpButton);
        // this._deckPanel.setToggler(this._deckButton);
        this._historyCardHolder.setToggler(this._lastRoundButton);
        // this._deckPanel.setValue(<bab.GameData>this._gameData);
        // this._deckPanel.addEventListener('OPEN_CARDINFO_PANEL', this.showCardInfoPanel, this);
        // this._cardInfoPanel.addEventListener('OPEN_DECK_PANEL', this.showDeckPanel, this);
        // this._cardInfoPanel.addEventListener('OPEN_HELP_PANEL', this.showHelpPanel, this);
        this._helpButton.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{this.showHelpPanel()}, this);
        this._deckButton.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{this.showDeckPanel()}, this);
        // (<any>this._resultDisplay).addEventListener('OPEN_CARDINFO_PANEL', this.showCardInfoPanel, this);
        (<any>this._resultDisplay).addEventListener('OPEN_SHUFFLE_PANEL', this.showShufflePanel, this);
        this.getShoeInfo();
        this._bottomGamePanel.addEventListener('TOGGLE', this.toggleBottomGamePanel, this);
        
        if(this._navLayer){
          this._navLayer.addChild(dir.monitor.nav);
          dir.monitor.nav.onMoveLayer();
        }
        this._navLayer && this._header && dir.layerCtr.nav && this._navLayer.addChild(this._header);

      }

      protected initVariables(){
        this._portraitButtonExpandedDealY = 832;
        this._portraitButtonExpandedBetY = 684;
        this._portraitButtonCollapsedDealY = 1340;        
        this._portraitButtonCollapsedBetY = 1192;
      }

      protected toggleBottomGamePanel() {
        if (env.isBottomPanelOpen) {
          this._resultDisplay.expandBottom();
          if (env.orientation === 'portrait') {
             switch (this._gameData.state) {
               case core.GameState.DEAL:
               case core.GameState.FINISH:
                 this._deckButton.y = this._helpButton.y = this._lastRoundButton.y = this._portraitButtonExpandedDealY;
          　      break;
               case core.GameState.BET:
               case core.GameState.IDLE:
               case core.GameState.SHUFFLE:
               default:
                 this._deckButton.y = this._helpButton.y =  this._lastRoundButton.y = this._portraitButtonExpandedBetY;
                 break;
             }
           }
        } else {
          this._resultDisplay.collapseBottom();
           if (env.orientation === 'portrait') {
             switch (this._gameData.state) {
               case core.GameState.DEAL:
               case core.GameState.FINISH:
                 this._deckButton.y = this._helpButton.y = this._lastRoundButton.y =  this._portraitButtonCollapsedDealY;
                 break;
               case core.GameState.BET:
               case core.GameState.IDLE:
               case core.GameState.SHUFFLE:
               default:
                 this._deckButton.y = this._helpButton.y = this._lastRoundButton.y = this._portraitButtonCollapsedBetY;
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
        // this._deckPanel.setValue(this._gameData);
        console.log('Blockchain scene bet state', this._gameData);
        if (isInit || this.previousState !== core.GameState.BET) {
          this._resultDisplay.updateResult(this._gameData, this._chipLayer, isInit);
        }
        this.hideSumGroup();
        this.toggleBottomGamePanel();

        if(this._mobileBlockchainBar){
          if (env.orientation === 'landscape') {
            egret.Tween.removeTweens(this._mobileBlockchainBar);
            egret.Tween.get(this._mobileBlockchainBar).to({ scaleX: 1, scaleY: 1 }, 250);
            //egret.Tween.get(this._chipLayer).to({ scaleX: 0.72, scaleY: 0.75 }, 250);
          }
          if(!isInit){
            this._mobileBlockchainBar.resetAnimation();
          }
        }
      }

      protected setStateDeal(isInit: boolean = false) {
        this._shufflePanel.hide();
        // this._deckPanel.setValue(<bab.GameData>this._gameData);
        super.setStateDeal(isInit);
        this.showSumGroup();
        console.log('Blockchain scene deal state', this._gameData);
        this.toggleBottomGamePanel();

        if(this._mobileBlockchainBar){
          if (env.orientation === 'landscape') {
            egret.Tween.get(this._mobileBlockchainBar).to({ scaleX: 0.72, scaleY: 0.75 }, 250);
            //egret.Tween.get(this._chipLayer).to({ scaleX: 0.72, scaleY: 0.75 }, 250);
          }
        }
      }

      protected setStateFinish(isInit: boolean) {
        this._shufflePanel.hide();
        // this._deckPanel.setValue(<bab.GameData>this._gameData);
        super.setStateFinish(isInit);
        this.showSumGroup();
        console.log('Blockchain scene finish state', this._gameData);
        this.toggleBottomGamePanel();
      }

      protected setStateShuffle(isInit: boolean) {
        this.getShoeInfo();
        super.setStateShuffle(isInit);
        this._resultDisplay.updateResult(this._gameData, this._chipLayer, isInit)
        this.hideSumGroup();
        this.toggleBottomGamePanel();
      }

      protected setStateIdle(isInit: boolean) {
        super.setStateIdle(isInit);
        if(this._mobileBlockchainBar){
          if (env.orientation === 'landscape') {
            egret.Tween.get(this._mobileBlockchainBar).to({ scaleX: 0.72, scaleY: 0.75 }, 250);
            //egret.Tween.get(this._chipLayer).to({ scaleX: 0.72, scaleY: 0.75 }, 250);
          }
        }
      }

      protected createSwipeUpPanel() {
        if (!this._slideUpMenu) {
          const menu = new ui.BlockchainMobileSlideUpMenu();
          menu.bottom = 0;
          menu.right = 0;
          menu.left = 0;
          this.addChild(menu);
          this._slideUpMenu = menu;
          this._slideUpMenu.setCurrentScene(this);
        }
      }

      protected removeSwipeUpPanel() {
        if (this._slideUpMenu) {
          this.removeChild(this._slideUpMenu);
          this._slideUpMenu = null;
        }
      }

      protected showHelpPanel() {
        this.createSwipeUpPanel();
        this._slideUpMenu.showHelpPanel();
        this._slideUpMenu.addEventListener('CLOSE', this.removeSwipeUpPanel, this);
      }

      protected showDeckPanel() {
        this.createSwipeUpPanel();
        this._slideUpMenu.showDeckPanel(<bab.GameData>this._gameData);
        this._slideUpMenu.addEventListener('CLOSE', this.removeSwipeUpPanel, this);
      }

      public showCardInfoPanel(evt: egret.Event) {
        this._slideUpMenu.showCardInfoPanel(<bab.GameData>this._gameData, evt.data);
        // this._cardInfoPanel.setValue(this._gameData, evt.data);
        // this._cardInfoPanel.show();
      }
      // protected showDeckPanel(evt: egret.Event) {
      //   this._deckPanel.show();
      // }

      // protected showHelpPanel(evt: egret.Event) {
      //   this._helpPanel.show();
      // }

      protected showShufflePanel(evt: egret.Event) {
        if (evt.data === 'init') {
          this._shufflePanel.show();
          this._shufflePanel.showStatic(this._gameData);
        } else {
          this._shufflePanel.show();
          this._shufflePanel.showAnim(this._gameData);
        }
      }
      protected showSumGroup(){
        (<we.bab.MobileCardHolder>this._resultDisplay).showSumGroup()
      }

      protected hideSumGroup(){
          (<we.bab.MobileCardHolder>this._resultDisplay).hideSumGroup();

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

      protected initChildren() {
        super.initChildren();
        if(this._slideUpMenu){
          this._slideUpMenu.setCurrentScene(this);
        }

        this.createMobileBlockChainBar();
      }

      protected onTableBetInfoUpdate(evt: egret.Event) {
        super.onTableBetInfoUpdate(evt);
        if (evt && evt.data) {
        const betInfo = <data.GameTableBetInfo> evt.data;
          if (betInfo.tableid === this._tableId) {
            this.updateMobileBlockchainBar(evt);
          }
        }
      }

      protected createMobileBlockChainBar(){
        this._mobileBlockchainBar = new blockchain.MobileBlockchainBar(this._playerTotalAmount,this._bankerTotalAmount,'ba');
        this._mobileBlockchainBar.x = 0;
        this._mobileBlockchainBar.y = 180;

        this._verticalTop.addChildAt(this._mobileBlockchainBar,0);
      }

      protected updateMobileBlockchainBar(evt: egret.Event){
        if(this._mobileBlockchainBar){
          const bankerTotalAmount = evt.data.amount[ba.BetField.BANKER] ? evt.data.amount[ba.BetField.BANKER] : 0;
          const playerTotalAmount = evt.data.amount[ba.BetField.PLAYER]? evt.data.amount[ba.BetField.PLAYER] : 0;

          this._playerTotalAmount = playerTotalAmount;
          this._bankerTotalAmount = bankerTotalAmount;

          this._mobileBlockchainBar.playAnim(bankerTotalAmount, playerTotalAmount);
        }
      }

      public onExit(){
        super.onExit();
        dir.layerCtr.nav.addChildAt(dir.monitor.nav,0);
        dir.monitor.nav.onMoveLayer();
      }
    }
  }
}
