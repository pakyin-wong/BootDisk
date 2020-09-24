namespace we {
  export namespace ui {
    export class SettingAnimationButton extends BaseAnimationButton implements IButton {
      // disable_off
      // disable_on
      // idle_off
      // idle_on
      // refresh
      // switch_to_off
      // switch_to_on

      protected mount() {
        super.mount();
        if (this._dbDisplay === 'd_common_gamesetting_sound') {
          this.checkSoundEnable();
        } else if (this._dbDisplay === 'd_common_gamesetting_video') {
          this.checkVideoEnable();
        }
        this.isSetting = true;
        this.addEventListeners();
      }

      public destroy() {
        super.destroy();
        this.removeEventListeners();
      }

      protected addEventListeners() {
        this.addEventListener('SETTING_UPDATE', this.onUpdate, this);
        this.addEventListener('SWITCH_TO_ON', this.turnOn, this);
        this.addEventListener('SWITCH_TO_OFF', this.turnOff, this);
      }

      protected removeEventListeners() {
        this.removeEventListener('SETTING_UPDATE', this.onUpdate, this);
        this.removeEventListener('SWITCH_TO_ON', this.turnOn, this);
        this.removeEventListener('SWITCH_TO_OFF', this.turnOff, this);
      }

      protected checkSoundEnable() {
        if (this._enabled) {
          if (dir.audioCtr.volumeLive === 0 && dir.audioCtr.volumeBGM === 0 && dir.audioCtr.volumeFX === 0) {
            this.playPromise('idle_off', 1);
          } else {
            this.playPromise('idle_on', 1);
          }
        } else {
          if (dir.audioCtr.volumeLive === 0 && dir.audioCtr.volumeBGM === 0 && dir.audioCtr.volumeFX === 0) {
            this.playPromise('disable_off', 1);
          } else {
            this.playPromise('disable_on', 1);
          }
        }
      }

      protected checkVideoEnable() {
        if (this._enabled) {
          if (!env.videoOpen) {
            this.playPromise('idle_off', 1);
          } else {
            this.playPromise('idle_on', 1);
          }
        } else {
          if (!env.videoOpen) {
            this.playPromise('disable_off', 1);
          } else {
            this.playPromise('disable_on', 1);
          }
        }
      }

      protected onUpdate() {
        this.playPromise('refresh', 1);
      }

      protected turnOff() {
        this.playPromise('switch_to_off', 1);
      }

      protected turnOn() {
        this.playPromise('switch_to_on', 1);
      }
    }
  }
}
