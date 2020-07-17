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
        // mouse.setButtonMode(this.videoButton, true);
        this.played = true;
        super.childrenCreated();
        if (this.videoButton) {
          this.videoButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickVideo, this);
        }
        if (this.soundBtn) {
          this.soundBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickSound, this);
        }
        if (this.gameButton) {
          this.gameButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickGame, this);
        }
        // this.videoButton.addEventListener(
        //   egret.TouchEvent.TOUCH_TAP,
        //   () => {
        //     if (this.played) {
        //       this.stopFunc();
        //     } else {
        //       this.playFunc();
        //     }
        //     this.played = !this.played;
        //     console.log('BAR  ' + this.played);
        //   },
        //   this
        // );
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
          dismissOnClickOutside: true,
          noDimmer: true,
          showOptions: {
            originW: this.videoButton.width,
            originH: this.videoButton.height,
            originX: this.videoButton.localToGlobal(0, 0).x,
            originY: this.videoButton.localToGlobal(0, 0).y,
          },
        });
        logger.l(utils.LogTarget.DEBUG, `onClickVideo`);
      }

      protected onClickSound() {
        dir.evtHandler.createOverlay({
          class: 'SoundSetting',
          dismissOnClickOutside: true,
          noDimmer: true,
          showOptions: {
            originW: this.soundBtn.width,
            originH: this.soundBtn.height,
            originX: this.soundBtn.localToGlobal(0, 0).x,
            originY: this.soundBtn.localToGlobal(0, 0).y,
          },
        });
        logger.l(utils.LogTarget.DEBUG, `onClickSound`);
      }

      protected onClickGame() {
        dir.evtHandler.createOverlay({
          class: 'GameSetting',
          dismissOnClickOutside: true,
          noDimmer: true,
          showOptions: {
            originW: this.gameButton.width,
            originH: this.gameButton.height,
            originX: this.gameButton.localToGlobal(0, 0).x,
            originY: this.gameButton.localToGlobal(0, 0).y,
          },
        });
        logger.l(utils.LogTarget.DEBUG, `onClickGame`);
      }
    }
  }
}
