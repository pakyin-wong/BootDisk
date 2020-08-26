namespace we {
  export namespace ui {
    export class MobileBottomCommonPanel extends core.BaseGamePanel {
      // protected gameIdLabel: ui.RunTimeLabel;
      // protected totalBetLabel: ui.RunTimeLabel;
      // protected gameId: string;
      // protected totalBet: number;
      public isFirstTime: boolean = true;

      public _arrow: egret.DisplayObject;
      public _arrowUp: egret.DisplayObject;

      protected _gameInfoLabel: ui.RunTimeLabel;

      protected viewStack: eui.ViewStack;
      protected viewStackMask: eui.Rect;
      protected _middlePart: eui.Group;
      protected _middlePartHeight: number;

      protected _gameScene: core.MobileBaseGameScene;

      public isPanelOpen: boolean = false;

      // landscape bottom game result
      public _bottomResultDisplayContainer: eui.Group;
      public _bottomResultDisplay: ui.IResultDisplay;

      public constructor(skin?: string) {
        super();
      }

      public set gameScene(value: core.MobileBaseGameScene) {
        this._gameScene = value;
      }

      protected mount() {
        super.mount();
        this.addListeners();
        this.updateText();
        this.updateStat();
        this._middlePart.mask = this.viewStackMask;
        this.viewStack.selectedIndex = env.bottomPanelSelectedIdx;
        // if (env._currGameType === core.GameType.BAI || core.GameType.BAM || core.GameType.BAI || core.GameType.BAC || core.GameType.BAS || core.GameType.DT || core.GameType.LW) {
        // this.viewStack.selectedIndex = env.bottomPanelSelectedIdx || 0;
        // }
        this.getMiddlePartHeight();
        this.onPanelToggle(this.isFirstTime);
      }

      public destroy() {
        super.destroy();
        this._gameScene = null;

        this.removeListeners();
      }

      protected addListeners() {
        this._arrow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPanelToggle, this);
        this._arrowUp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPanelToggle, this);
        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.updateText, this);
      }

      protected removeListeners() {
        this._arrow.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPanelToggle, this);
        this._arrowUp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPanelToggle, this);
        dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this.updateText, this);
      }

      public updateText() {
        this._gameInfoLabel.text = i18n.t('mobile_panel_game_Info');
      }

      public manualClose() {
        if (env.isBottomPanelOpen) {
          this.currentState = 'off';
          egret.Tween.removeTweens(this._middlePart);
          env.isBottomPanelOpen = false;
          egret.Tween.get(this._middlePart).to({ height: 0 }, 250);
        }
      }

      protected onPanelToggle(firstTime?: boolean) {
        egret.Tween.removeTweens(this._middlePart);
        if (this._gameScene) {
          this._gameScene.betChipSetPanelVisible = false;
        }
        if (this.isFirstTime) {
          this.isFirstTime = false;
          this.currentState = env.isBottomPanelOpen ? 'on' : 'off';
          this._middlePart.height = env.isBottomPanelOpen ? this._middlePartHeight : 0;
          return;
        }
        this.currentState = env.isBottomPanelOpen ? 'off' : 'on';
        switch (env.isBottomPanelOpen) {
          case true:
            env.isBottomPanelOpen = false;
            this.isPanelOpen = env.isBottomPanelOpen; 
            egret.Tween.get(this._middlePart).to({ height: 0 }, 250);
			      this._gameScene.updateResultDisplayVisible(env.isBottomPanelOpen);
            break;
          case false:
            env.isBottomPanelOpen = true;
            this.isPanelOpen = env.isBottomPanelOpen; 
            egret.Tween.get(this._middlePart).to({ height: this._middlePartHeight }, 250);
			      this._gameScene.updateResultDisplayVisible(env.isBottomPanelOpen);
            break;
        }
        this.dispatchEvent(new egret.Event('TOGGLE'));
      }

      // protected onPanelToggle() {
      //   this.currentState = this.isPanelOpen ? 'off' : 'on';
      //   egret.Tween.removeTweens(this.viewStack);
      //   egret.Tween.removeTweens(this.viewStackMask);
      //   if (this.isPanelOpen) {
      //     this.isPanelOpen = false;
      //     egret.Tween.get(this.viewStack).to({ height: 0 }, 250);
      //     egret.Tween.get(this.viewStackMask).to({ height: 0 }, 250);
      //   } else {
      //     this.isPanelOpen = true;
      //     egret.Tween.get(this.viewStack).to({ height: 532 }, 250);
      //     egret.Tween.get(this.viewStackMask).to({ height: 532 }, 250);
      //   }
      //   this.dispatchEvent(new egret.Event('TOGGLE'));
      // }

      protected onViewChange(e: eui.UIEvent) {
        const radio: eui.RadioButton = e.target;
        this.viewStack.selectedIndex = radio.value;
        env.bottomPanelSelectedIdx = radio.value;
      }

      public update() {
        super.update();
        if (this.tableInfo) {
          // if (this.tableInfo.betInfo) {
          //   if (this.tableInfo.betInfo.gameroundid) {
          //     this.gameId = this.tableInfo.betInfo.gameroundid;
          //   }
          //   if (this.tableInfo.betInfo.total) {
          //     this.totalBet = this.tableInfo.betInfo.total;
          //   }
          // }
          this.updateText();
        }
      }

      protected getMiddlePartHeight() {
        this.currentState = 'on';
        this._middlePartHeight = this._middlePart.height;
      }
    }
  }
}
