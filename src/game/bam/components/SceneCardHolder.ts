namespace we {
  export namespace bam {
    export class SceneCardHolder extends CardHolder {
      protected _bankerBg: ui.BettingGrid;
      protected _playerBg: ui.BettingGrid;

      protected _bankerWin: ui.BettingGrid;
      protected _playerWin: ui.BettingGrid;

      protected _playerCard1Group: eui.Group;
      protected _playerCard2Group: eui.Group;
      protected _playerCard3Group: eui.Group;
      protected _bankerCard1Group: eui.Group;
      protected _bankerCard2Group: eui.Group;
      protected _bankerCard3Group: eui.Group;

      // protected _playerCard1QuickOpen: eui.Rect;
      // protected _playerCard2QuickOpen: eui.Rect;
      // protected _playerCard3QuickOpen: eui.Rect;
      // protected _bankerCard1QuickOpen: eui.Rect;
      // protected _bankerCard2QuickOpen: eui.Rect;
      // protected _bankerCard3QuickOpen: eui.Rect;

      protected _cardPositionPeekX: number[] = [287, 492, 122, 327];
      protected _cardPositionPeekPlayerX: number[] = [385, 590];
      protected _cardPositionPeekBankerX: number[] = [24, 229];

      protected mount() {
        super.mount();

        // this._playerCard1QuickOpen.addEventListener(egret.TouchEvent.TOUCH_TAP, () => this._playerCard1.showFinal(), this);
        // this._playerCard2QuickOpen.addEventListener(egret.TouchEvent.TOUCH_TAP, () => this._playerCard2.showFinal(), this);
        // this._playerCard3QuickOpen.addEventListener(egret.TouchEvent.TOUCH_TAP, () => this._playerCard3.showFinal(), this);
        // this._bankerCard1QuickOpen.addEventListener(egret.TouchEvent.TOUCH_TAP, () => this._bankerCard1.showFinal(), this);
        // this._bankerCard2QuickOpen.addEventListener(egret.TouchEvent.TOUCH_TAP, () => this._bankerCard2.showFinal(), this);
        // this._bankerCard3QuickOpen.addEventListener(egret.TouchEvent.TOUCH_TAP, () => this._bankerCard3.showFinal(), this);
      }

      protected setBgVisible(player: boolean, banker: boolean) {
        this._playerBg.visible = player;
        this._playerWin.visible = !player;
        this._bankerBg.visible = banker;
        this._bankerWin.visible = !banker;
      }

      protected setPeekState() {
        this.setBgVisible(true, true);
        this._playerCard1Group.x = this._cardPositionPeekX[0];
        this._playerCard2Group.x = this._cardPositionPeekX[1];
        this._bankerCard1Group.x = this._cardPositionPeekX[2];
        this._bankerCard2Group.x = this._cardPositionPeekX[3];

        super.setPeekState();
      }

      protected setPeekPlayerState() {
        this.setBgVisible(true, true);
        this._playerCard1Group.x = this._cardPositionPeekPlayerX[0];
        this._playerCard2Group.x = this._cardPositionPeekPlayerX[1];

        super.setPeekPlayerState();
      }

      protected setPeekBankerState() {
        this.setBgVisible(true, true);
        this._bankerCard1Group.x = this._cardPositionPeekBankerX[0];
        this._bankerCard2Group.x = this._cardPositionPeekBankerX[1];

        super.setPeekBankerState();
      }

      protected showWinningField() {
        const showBanker = this.gameData.wintype === we.ba.WinType.BANKER || this.gameData.wintype === we.ba.WinType.TIE;
        const showPlayer = this.gameData.wintype === we.ba.WinType.PLAYER || this.gameData.wintype === we.ba.WinType.TIE;
        this.setBgVisible(!showPlayer, !showBanker);
        if (showBanker) {
          egret.Tween.get(this._bankerWin).to({ alpha: 1 }, 300).to({ alpha: 0.3 }, 300).to({ alpha: 1 }, 300).to({ alpha: 0.3 }, 300).to({ alpha: 1 }, 300);
        }
        if (showPlayer) {
          egret.Tween.get(this._playerWin).to({ alpha: 1 }, 300).to({ alpha: 0.3 }, 300).to({ alpha: 1 }, 300).to({ alpha: 0.3 }, 300).to({ alpha: 1 }, 300);
        }
      }
    }
  }
}
