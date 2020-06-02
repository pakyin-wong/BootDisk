namespace we {
  export namespace ui {
    export class GameBar extends eui.Component implements eui.UIComponent {
      private videoButton: egret.DisplayObject;
      private soundBtn: egret.DisplayObject;
      private gameButton: egret.DisplayObject;

      private played: boolean;
      private playFunc: () => void;
      private stopFunc: () => void;

      public constructor() {
        super();
        // this.skinName = utils.getSkinByClassname('GameBar');
        this.played = false;
      }

      protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
      }

      protected childrenCreated(): void {
        mouse.setButtonMode(this.videoButton, true);
        this.played = true;
        super.childrenCreated();
        // this.videoButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickVideo, this);
        if (this.soundBtn) {
          this.soundBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickSound, this);
        }
        if (this.gameButton) {
          this.gameButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickGame, this);
        }
        this.videoButton.addEventListener(
          egret.TouchEvent.TOUCH_TAP,
          () => {
            if (this.played) {
              this.stopFunc();
            } else {
              this.playFunc();
            }
            this.played = !this.played;
            console.log('BAR  ' + this.played);
          },
          this
        );
      }

      public setPlayFunc(func: () => void) {
        this.playFunc = func;
      }

      public setStopFunc(func: () => void) {
        this.stopFunc = func;
      }

      protected removeEventListeners() {
        // this.videoButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickVideo, this);
        if (this.soundBtn) {
          this.soundBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickSound, this);
        }
        if (this.gameButton) {
          this.gameButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickGame, this);
        }
        this.videoButton.removeEventListener(
          egret.TouchEvent.TOUCH_TAP,
          () => {
            if (this.played) {
              this.stopFunc();
            } else {
              this.playFunc();
            }
            this.played = !this.played;
          },
          this
        );
      }

      protected destroy() {
        this.removeEventListeners();
      }

      protected onClickVideo() {
        dir.evtHandler.createOverlay({
          class: 'VideoSetting',
        });
        logger.l(`onClickVideo`);
      }

      protected onClickSound() {
        dir.evtHandler.createOverlay({
          class: 'SoundSetting',
        });
        logger.l(`onClickSound`);
      }

      protected onClickGame() {
        dir.evtHandler.createOverlay({
          class: 'GameSetting',
        });
        logger.l(`onClickGame`);
      }
    }
  }
}
