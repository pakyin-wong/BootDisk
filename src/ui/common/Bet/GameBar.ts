namespace we {
  export namespace ui {
    export class GameBar extends eui.Component implements eui.UIComponent {
      private videoButton: egret.DisplayObject;
      private soundBtn: egret.DisplayObject;
      private gameButton: egret.DisplayObject;

      private _targetScene: core.BaseGameScene;

      public set targetScene(scene) {
        this._targetScene = scene;
      }

      public constructor() {
        super();
        // this.skinName = utils.getSkinByClassname('GameBar');
      }

      protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
      }

      protected childrenCreated(): void {
        // mouse.setButtonMode(this.videoButton, true);
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
      }

      protected removeEventListeners() {
        if (this.videoButton) {
          this.videoButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickVideo, this);
        }
        if (this.soundBtn) {
          this.soundBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickSound, this);
        }
        if (this.gameButton) {
          this.gameButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickGame, this);
        }
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
          args: [this._targetScene],
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
