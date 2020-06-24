/* tslint:disable max-classes-per-file */
// TypeScript file
namespace we {
  export namespace ui {
    export interface ILoadingUI {
      onProgress(progress, current, total);
    }

    export class ResProgressReporter implements RES.PromiseTaskReporter {
      protected index: number;

      constructor(index: number) {
        this.index = index;
      }

      public onProgress(current, total, resItem) {
        const subprogress = current / total;
        loadingMgr.onRESTaskUpdate(subprogress, this.index);
      }
    }

    export class LoadingManager extends eui.Label {
      public static _instance: LoadingManager;
      public static defaultLoadingUI = ui.DefaultLoadingUI;

      static get Instance() {
        if (!this._instance) {
          this._instance = new LoadingManager();
        }
        return this._instance;
      }
      /**
       * options
       * isSequence: boolean
       * showProgress: boolean
       * progressMap: number[]
       * loadingUI: eui.Component & IProgress
       */
      public static async load(tasks: Array<() => Promise<any>>, options: any) {
        // get manager instance
        if (!this._instance) {
          this._instance = new LoadingManager();
        }
        return this._instance.load(tasks, options);
      }

      protected progress: number; // form 0 to 1
      protected options: any;
      protected progressMap: number[];
      protected progressLength: number;
      protected _subprogresses: number[];
      protected _currentIdx: number;
      protected loadingInstance: ILoadingUI & eui.Component;
      protected isLoading: boolean = false;

      public async load(tasks: Array<() => Promise<any>>, options: any) {
        if (this.isLoading) {
          throw new Error('LoadingManager.load is not designed to call multiple time at once.');
          // logger.e(utils.LogTarget.PROD, 'Loading is already started');
          // return;
        }
        this.progress = 0;
        this._subprogresses = new Array(tasks.length).map(v => 0);
        this.progressLength = 0;
        this.options = options || {};
        const self = this;
        this.isLoading = true;

        // init progressMap and progressLength
        this.progressMap = Array.apply(null, { length: tasks.length }).map((value, idx) => {
          const progressMap: number[] = this.options.progressMap ? this.options.progressMap : [];
          if (progressMap && progressMap.length > idx) {
            self.progressLength += progressMap[idx];
            return progressMap[idx];
          }
          self.progressLength++;
          return 1;
        });

        // TODO: show loading UI
        const loadingUI = this.options.loadingUI ? this.options.loadingUI : LoadingManager.defaultLoadingUI ? LoadingManager.defaultLoadingUI : null;
        this.loadingInstance = loadingUI ? new loadingUI() : null;
        if (this.loadingInstance) {
          const stage = dir.layerCtr.overlay.stage;
          dir.layerCtr.overlay.addChild(this.loadingInstance);
          this.loadingInstance.width = stage.stageWidth;
          this.loadingInstance.height = stage.stageHeight;
        }

        try {
          this.onUpdate();
          if (!options.isSequence) {
            await this.progressPromise(
              tasks.map(t => t()),
              () => {
                this.onUpdate();
              }
            );
          } else {
            this._currentIdx = 0;
            for (const task of tasks) {
              await task();
              this._subprogresses[this._currentIdx] = this.progressMap[this._currentIdx];
              this.onUpdate();
              this._currentIdx++;
            }
          }
        } catch (err) {
          throw new Error(err);
        } finally {
          await utils.sleep(500);
          // TODO: hide loading UI
          if (this.loadingInstance) {
            dir.layerCtr.overlay.removeChild(this.loadingInstance);
          }
          this.isLoading = false;
        }
      }

      public onRESTaskUpdate(_subprogress, index) {
        this._subprogresses[index] = this.progressMap[index] * _subprogress;
        this.onUpdate();
      }

      protected onUpdate() {
        // update loading ui
        this.progress = this._subprogresses.reduce((total, val) => total + val, 0);
        logger.l(utils.LogTarget.DEBUG, `${this.progress / this.progressLength}, ${this.progress}/ ${this.progressLength}`);

        if (this.loadingInstance) {
          this.loadingInstance.onProgress((this.progress * 1.0) / this.progressLength, this.progress, this.progressLength);
        }
      }

      protected progressPromise(promises, tickCallback) {
        const len = this.progressLength;
        this.progress = 0;
        const self = this;
        function tick(promise, idx) {
          promise.then(function () {
            self._subprogresses[idx] = self.progressMap[idx];
            tickCallback();
          });
          return promise;
        }

        return Promise.all(promises.map((promise, index) => tick(promise, index)));
      }
    }
  }
}

let loadingMgr: we.ui.LoadingManager = we.ui.LoadingManager.Instance;
