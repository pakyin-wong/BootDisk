// TypeScript file
namespace we {
  export namespace ui {
    export class LoadingManager extends eui.Label {
      static _instance: LoadingManager;

      static defaultLoadingUI: eui.Component;
      
      protected progress: number; // form 0 to 1
      /**
       * options
       * isSequence: boolean
       * showProgress: boolean
       * progressMap: number[]
       * loadingUI: eui.Component & IProgress
       */
      static async load(tasks: Promise<null>[], options: any) {
        // get manager instance
        if (!this._instance) {
          this._instance = new LoadingManager()
        }
        return this._instance.load(tasks, options);
      }

      protected async load(tasks: Promise<null>[], options: any) {
        if (!options.isSequence) {
          return this.progressPromise(tasks, (progress, len)=>{this.onUpdate(progress,len)});
        } else {

        }
      }

      protected onUpdate(progress, len) {
        // update loading ui
      }

      protected progressPromise(promises, tickCallback) {
        var len = promises.length;
        var progress = 0;
        
        function tick(promise) {
          promise.then(function () {
            progress++;
            tickCallback(progress, len);
          });
          return promise;
        }
        
        return Promise.all(promises.map(tick));
      }

      
    }
  }
}