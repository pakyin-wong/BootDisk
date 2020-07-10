namespace we {
  export namespace test {
    export class LoadingManagerTestPage extends core.BasePage {
      private progressbar: eui.ProgressBar;

      public onEnter() {
        this.addEventListener(eui.UIEvent.COMPLETE, this.mount, this);
      }

      public async onFadeEnter() {}

      public onExit() {
        this.removeChildren();
      }

      public async onFadeExit() {}

      protected mount() {
        this.removeEventListener(eui.UIEvent.COMPLETE, this.mount, this);

        const tasks = [
          () => this.singletask(1000),
          () => RES.loadGroup('audio', 0, new ui.ResProgressReporter(1)),
          () => this.singletask(2000),
          () => this.singletask(6000),
          () => this.singletask(1000),
        ];
        this.loadTasks(tasks);
        // loadingMgr
        //   .load(tasks, {
        //     isSequence: true,
        //     showProgress: true,
        //     progressMap: [1, 5, 2, 3, 1],
        //     loadingUI: ui.DefaultLoadingUI,
        //   })
        //   .then(value => {
        //     console.log('sync done');
        //   })
        //   .catch(err => {
        //     console.log(err);
        //   });
      }

      public async loadTasks(tasks) {
        try {
          await loadingMgr.load(tasks, {
            isSequence: false,
            showProgress: true,
            progressMap: [1, 5, 2, 3, 1],
            loadingUI: ui.DefaultLoadingUI,
          });
          console.log('sync done');
        } catch (err) {
          console.log(err);
        }
      }

      public async singletask(ms) {
        logger.l(utils.LogTarget.DEBUG, 'start task', Date.now());
        return utils.sleep(ms);
      }
      public async failTask(ms) {
        logger.l(utils.LogTarget.DEBUG, 'fail start task', Date.now());
        await utils.sleep(ms);
        return Promise.reject('fail');
      }

      protected socketConnect() {
        dir.evtHandler.addEventListener(core.MQTT.CONNECT_SUCCESS, this.socketConnectSuccess, this);
        dir.evtHandler.addEventListener(core.MQTT.CONNECT_FAIL, this.socketConnectFail, this);
        // dir.socket.connect();
      }

      protected socketConnectSuccess() {
        dir.evtHandler.removeEventListener(core.MQTT.CONNECT_SUCCESS, this.socketConnectSuccess, this);
        dir.evtHandler.removeEventListener(core.MQTT.CONNECT_FAIL, this.socketConnectFail, this);

        // step 4: auth and get user profiles

        // step 5: get and display tips, promote banner

        // step 6: load general resource (lobby, baccarat)

        // step 7: init complete, transfer to lobby scene
        // dir.sceneCtr.goto('LobbyScene');
      }

      protected socketConnectFail() {}
    }
  }
}