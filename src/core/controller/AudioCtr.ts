namespace we {
  export namespace core {
    export class AudioCtr {
      private _soundBGM: egret.Sound;
      private _channelBGM: egret.SoundChannel;
      // private _channelFX: egret.SoundChannel;
      private _activeChannel: egret.SoundChannel[];

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
        logger.l(utils.LogTarget.DEBUG, 'AudioCtr is created');
      }

      public get volumeBGM() {
        return this._volumeBGM;
      }

      public set volumeBGM(vol: number) {
        logger.l(utils.LogTarget.DEBUG, `Setting volumeBGM to ${vol}`);
        this._volumeBGM = vol;
        if (this._channelBGM) {
          this._channelBGM.volume = this._volumeBGM;
        }
      }

      public get volumeFX() {
        return this._volumeFX;
      }

      public set volumeFX(vol: number) {
        logger.l(utils.LogTarget.DEBUG, `Setting volumeFX to ${vol}`);
        this._volumeFX = vol;
        for (const sfx of this._activeChannel) {
          sfx.volume = vol;
        }
      }

      public get volumeLive() {
        return this._volumeLive;
      }

      public set volumeLive(vol: number) {
        logger.l(utils.LogTarget.DEBUG, `Setting volumeLive to ${vol}`);
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
        // this._soundBGM = RES.getRes('sn_bgm002_mp3');
        // this._channelBGM = this._soundBGM.play();
      }
      
      public playBGM(resName: string = null) {
        if (resName) {
          this._soundBGM = RES.getRes(resName);
        }
        if (this._soundBGM) {
          if (this._channelBGM) {
            this._channelBGM.stop();
          }
          this._channelBGM = this._soundBGM.play();        
        }
      }

      public stopBGM() {
        if (this._channelBGM) {
          this._channelBGM.stop();
        }
      }

      public play(resName: string) {
        const soundFx = RES.getRes(resName);
        if (!soundFx) {
          return;
        }
        const sfx = soundFx.play(0, 1);
        // set initial volume to current fx volume
        sfx.volume = this._volumeFX;
        this._activeChannel.push(sfx);
        logger.l(utils.LogTarget.DEBUG, 'playing', resName);
        sfx.addEventListener(
          egret.Event.SOUND_COMPLETE,
          () => {
            logger.l(utils.LogTarget.DEBUG, 'play end', resName);
            const idx = this._activeChannel.indexOf(sfx);
            if (idx >= 0) {
              this._activeChannel.splice(idx,1);
            }
          },
          this
        );
      }

      public async playSequence(resNameSeq: string[]) {
        let chain = Promise.resolve();
        resNameSeq.forEach(name => {
          const soundFx = RES.getRes(`sn_${name}_${env.voice}_mp3`);
          chain = chain.then(() => {
            if (!soundFx) {
              return;
            }

            const sfx = soundFx.play(0, 1);
            // set initial volume to current fx volume
            sfx.volume = this._volumeFX;
            this._activeChannel.push(sfx);
            logger.l(utils.LogTarget.DEBUG, 'playing', `sn_${name}_${env.voice}_mp3`);
            return new Promise<void>(resolve => {
              sfx.addEventListener(
                egret.Event.SOUND_COMPLETE,
                () => {
                  logger.l(utils.LogTarget.DEBUG, 'play end', `sn_${name}_${env.voice}_mp3`);
                  const idx = this._activeChannel.indexOf(sfx);
                  if (idx >= 0) {
                    this._activeChannel.splice(idx,1);
                  }
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
