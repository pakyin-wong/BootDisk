namespace we {
  export namespace core {
    export class AudioCtr {
      private _soundBGM: egret.Sound;
      private _channelBGM: egret.SoundChannel;
      private _channelFX: egret.SoundChannel;

      private _video: egret.FlvVideo;

      private _volumeBGM = 0.5;
      private _volumeFX = 0.5;
      private _volumeLive = 0.5;

      private _volumeBGMStored = 0.5;
      private _volumeFXStored = 0.5;
      private _volumeLiveStored = 0.5;

      public pause() {
        this._volumeBGMStored = this._volumeBGM;
        this._volumeFXStored = this._volumeFX;
        this._volumeLiveStored = this._volumeLive;
        this.volumeBGM = 0;
        this._volumeFX = 0;
        this._volumeLive = 0;
      }

      public resume() {
        this.volumeBGM = this._volumeBGMStored;
        this._volumeFX = this._volumeFXStored;
        this._volumeLive = this._volumeLiveStored;
      }

      constructor(stage: egret.Stage) {
        logger.l('AudioCtr is created');
      }

      public get volumeBGM() {
        return this._volumeBGM;
      }

      public set volumeBGM(vol: number) {
        logger.l(`Setting volumeBGM to ${vol}`);
        this._volumeBGM = vol;
        if (this._channelBGM) {
          this._channelBGM.volume = this._volumeBGM;
        }
      }

      public get volumeFX() {
        return this._volumeFX;
      }

      public set volumeFX(vol: number) {
        logger.l(`Setting volumeFX to ${vol}`);
        this._volumeFX = vol;
        if (this._channelFX) {
          this._channelFX.volume = this._volumeFX;
        }
      }

      public get volumeLive() {
        return this._volumeLive;
      }

      public set volumeLive(vol: number) {
        logger.l(`Setting volumeLive to ${vol}`);
        this._volumeLive = vol;
        if (this._video) {
          this._video.volume = vol;
        }
      }

      public get video() {
        return this._video;
      }

      public set video(value: egret.FlvVideo) {
        this._video = value;
      }

      public init() {
        this._soundBGM = RES.getRes('sn_bgm002_mp3');
        // this._channelBGM = this._soundBGM.play();
      }

      public async playSequence(resNameSeq: string[]) {
        let chain = Promise.resolve();
        resNameSeq.forEach(name => {
          const soundFx = RES.getRes(`sn_${name}_${env.voice}_mp3`);
          chain = chain.then(() => {
            if (!soundFx) {
              return;
            }
            this._channelFX = soundFx.play(0, 1);
            // set initial volume to current fx volume
            this._channelFX.volume = this._volumeFX;
            logger.l('playing', `sn_${name}_${env.voice}_mp3`);
            return new Promise<void>(resolve => {
              this._channelFX.addEventListener(
                egret.Event.SOUND_COMPLETE,
                () => {
                  logger.l('play end', `sn_${name}_${env.voice}_mp3`);
                  this._channelFX = null;
                  resolve();
                },
                this
              );
            });
          });
        });
        return chain;
      }
    }
  }
}
