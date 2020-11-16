namespace we {
  export namespace ui {
    export class GameBar extends eui.Component implements eui.UIComponent {
      private videoButton: egret.DisplayObject;
      private soundBtn: egret.DisplayObject;
      private gameButton: egret.DisplayObject;

      private soundRoundRect: ui.RoundRectButton;
      private videoRoundRect: ui.RoundRectButton;

      private _targetScene: core.BaseGameScene;

      private GameType;

      protected _isLiveRecordEnable: boolean = true;

      public set targetScene(scene) {
        this._targetScene = scene;
        this.getGameType();
      }

      public constructor() {
        super();
        // this.skinName = utils.getSkinByClassname('GameBar');
      }

      protected childrenCreated(): void {
        super.childrenCreated();
        // this.mount();
        this.addEventListener(eui.UIEvent.ADDED_TO_STAGE, this.mount, this);
        this.addEventListener(eui.UIEvent.REMOVED_FROM_STAGE, this.destroy, this);
    
      }

      protected mount(): void {
        // mouse.setButtonMode(this.videoButton, true);
        if (this.videoButton && this.videoButton.touchEnabled) {
          utils.addButtonListener(this.videoButton, this.onClickVideo, this);
        }
        if (this.soundBtn) {
          utils.addButtonListener(this.soundBtn, this.onClickSound, this);
        }
        if (this.gameButton) {
          utils.addButtonListener(this.gameButton, this.onClickGame, this);
        }
        
      }

      protected getGameType(){
        this.GameType = this._targetScene.tableInfo.gametype
        this.updateSoundSetting(this.GameType);
      }

      protected updateSoundSetting(gametype){
        switch (gametype) {
          case core.GameType.BAC:
          case core.GameType.BAS:
          case core.GameType.BAI:
          case core.GameType.BAM:
          case core.GameType.DT:
          case core.GameType.DI:
          case core.GameType.DIL:
          case core.GameType.RO:
          case core.GameType.ROL:
          case core.GameType.LW:
          case core.GameType.LO:
          case core.GameType.RC:
          this._isLiveRecordEnable = true;
            break;
          case core.GameType.BAB:
          case core.GameType.BAMB:
          case core.GameType.DTB:
          this._isLiveRecordEnable = false;
            break;
        }
      }

      protected destroy() {
        if (this.videoButton) {
          utils.removeButtonListener(this.videoButton, this.onClickVideo, this);
        }
        if (this.soundBtn) {
          utils.removeButtonListener(this.soundBtn, this.onClickSound, this);
        }
        if (this.gameButton) {
          utils.removeButtonListener(this.gameButton, this.onClickGame, this);
        }
    
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
          args: [this._targetScene, this.videoRoundRect['videoAnimBtn']],
        });
        logger.l(utils.LogTarget.DEBUG, `onClickVideo`);
      }

      protected onClickSound() {
        dir.evtHandler.createOverlay({
          class: 'SoundSetting',
          args: [this.soundRoundRect['soundAnimBtn'],this._isLiveRecordEnable],
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
