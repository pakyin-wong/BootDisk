namespace we {
  export namespace utils {
    export class ImageSourceCaptuer {
      private captureTimeout: number;
      private static captuer: ImageSourceCaptuer;

      public static get Instance(): ImageSourceCaptuer {
        return this.captuer ? this.captuer : new ImageSourceCaptuer();
      }

      private theStage: egret.Stage;
      private ImagesSources: string[] = [];
      public printImageSources() {
        const tempImageSources: string[] = [];
        for (const i in this.ImagesSources) {
          tempImageSources.push(i);
        }

        tempImageSources.sort();
        for (let i = 0; i < tempImageSources.length; i++) {
          console.log('--Image--' + (i + 1) + ': ' + tempImageSources[i]);
        }
      }

      public setStage(stage: egret.Stage) {
        this.theStage = stage;
      }

      public startCaptureLoop() {
        clearTimeout(this.captureTimeout);
        this.captureImageSources(this.theStage);
        this.captureTimeout = setTimeout(this.startCaptureLoop.bind(this), 100);
      }

      public captureStageImageSources() {
        if (!this.theStage) {
          console.log('ImageSourceCapturer: please setStage first');
        } else {
          let tempImageSources: string[] = [];
          for (const i in this.ImagesSources) {
            tempImageSources.push(i);
          }
          const startTime = egret.getTimer();
          const oldCount = tempImageSources.length;
          this.captureImageSources(this.theStage);
          tempImageSources = [];
          for (const i in this.ImagesSources) {
            tempImageSources.push(i);
          }
          console.log('ImageSourceCapturer: Finish Capture. ' + (tempImageSources.length - oldCount) + ' new Files Added in ' + (egret.getTimer() - startTime) + ' ms');
        }
      }

      private captureImageSources(source: egret.DisplayObject) {
        const p = source;
        if (p instanceof egret.DisplayObjectContainer) {
          for (let i = 0; i < p.numChildren; i++) {
            this.captureImageSources(p.getChildAt(i));
          }
        }
        if (p instanceof eui.Image) {
          if (p.source) {
            const s = p.source as string;
            if (!this.ImagesSources[s]) {
              this.ImagesSources[s] = s;
            }
          }
        }
      }
    }
  }
}
let imageSourceCaptuer: we.utils.ImageSourceCaptuer = we.utils.ImageSourceCaptuer.Instance;
