namespace we {
  export namespace ui {
    export class MobileBottomCommonPanel extends core.BaseGamePanel {
      // protected gameIdLabel: ui.RunTimeLabel;
      // protected totalBetLabel: ui.RunTimeLabel;
      // protected gameId: string;
      // protected totalBet: number;
      public isPanelOpen: boolean = true;
      // <<<<<<< HEAD
      //       private isFirstTime: boolean = true;
      //       // public isPanelOpen: boolean = false;
      // =======
      public _arrow: egret.DisplayObject;
      public _arrowUp: egret.DisplayObject;

      // protected _arrow: egret.DisplayObject;
      // protected _arrowUp: egret.DisplayObject;

      protected _gameInfoLabel: ui.RunTimeLabel;

      protected viewStack: eui.ViewStack;
      protected viewStackMask: eui.Rect;

      // <<<<<<< HEAD
      //       protected _middlePart: eui.Group;

      // =======

      public constructor(skin?: string) {
        super();
      }

      protected mount() {
        super.mount();

        this.addListeners();

        this.updateText();
        // <<<<<<< HEAD
        //         this._middlePart.mask = this.viewStackMask;
        //         this.viewStack.selectedIndex = 0;

        //         this.onPanelToggle(this.isFirstTime);
        // =======
        this.viewStack.mask = this.viewStackMask;
        this.viewStack.selectedIndex = 0;
        this.onPanelToggle();
      }

      public destroy() {
        super.destroy();

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
        // <<<<<<< HEAD
        //         // if (this.isPanelOpen) {
        //         //   this.currentState = 'off';
        //         //   egret.Tween.removeTweens(this._middlePart);
        //         //   // egret.Tween.removeTweens(this.viewStack);
        //         //   // egret.Tween.removeTweens(this.viewStackMask);
        //         //   this.isPanelOpen = false;
        //         //   egret.Tween.get(this._middlePart).to({ height: 0 }, 250);
        //         //   // egret.Tween.get(this.viewStack).to({ height: 0 }, 250);
        //         //   // egret.Tween.get(this.viewStackMask).to({ height: 0 }, 250);
        //         // }
        //       }

        //       protected onPanelToggle(firstTime?: boolean) {
        //         this.currentState = this.isPanelOpen ? 'off' : 'on';

        //         egret.Tween.removeTweens(this._middlePart);
        //         // egret.Tween.removeTweens(this.viewStack);
        //         // egret.Tween.removeTweens(this.viewStackMask);

        //         if (this.isPanelOpen) {
        //           this.isPanelOpen = false;
        //           if (this.isFirstTime === true) {
        //             this.isFirstTime = false;
        //             egret.Tween.get(this._middlePart).to({ height: 0 }, 1);
        //           } else {
        //             egret.Tween.get(this._middlePart).to({ height: 0 }, 250);
        //           }
        //           // egret.Tween.get(this.viewStack).to({ height: 0 }, 250);
        //           // egret.Tween.get(this.viewStackMask).to({ height: 0 }, 250);
        //         } else {
        //           this.isPanelOpen = true;
        //           egret.Tween.get(this._middlePart).to({ height: this._middlePart.measuredHeight }, 250);
        //           // egret.Tween.get(this.viewStack).to({ height: this.measuredHeight }, 250);
        //           // egret.Tween.get(this.viewStackMask).to({ height: this.measuredHeight }, 250);
        // =======
        if (this.isPanelOpen) {
          this.currentState = 'off';
          egret.Tween.removeTweens(this.viewStack);
          egret.Tween.removeTweens(this.viewStackMask);
          this.isPanelOpen = false;
          egret.Tween.get(this.viewStack).to({ height: 0 }, 250);
          egret.Tween.get(this.viewStackMask).to({ height: 0 }, 250);
        }
      }

      protected onPanelToggle() {
        this.currentState = this.isPanelOpen ? 'off' : 'on';

        egret.Tween.removeTweens(this.viewStack);
        egret.Tween.removeTweens(this.viewStackMask);

        if (this.isPanelOpen) {
          this.isPanelOpen = false;
          egret.Tween.get(this.viewStack).to({ height: 0 }, 250);
          egret.Tween.get(this.viewStackMask).to({ height: 0 }, 250);
        } else {
          this.isPanelOpen = true;
          egret.Tween.get(this.viewStack).to({ height: 532 }, 250);
          egret.Tween.get(this.viewStackMask).to({ height: 532 }, 250);
        }

        this.dispatchEvent(new egret.Event('TOGGLE'));
      }

      protected onViewChange(e: eui.UIEvent) {
        const radio: eui.RadioButton = e.target;
        this.viewStack.selectedIndex = radio.value;
      }

      public update() {
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
    }
  }
}
