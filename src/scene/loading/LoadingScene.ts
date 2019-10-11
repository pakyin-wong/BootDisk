module scene {
    export class LoadingScene extends BaseScene {

        private progressbar: eui.ProgressBar;

        public onEnter() {
            this.addEventListener(eui.UIEvent.COMPLETE, this.mount, this);
            this.skinName = utils.getSkin("LoadingScene");
        }

        public async onFadeEnter() {

        }

        public onExit() {
            this.removeChildren();
        }

        public async onFadeExit() {
            
        }
        
        protected mount() {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.mount, this);
            
            // step 1: load Loading Screen Resource
            this.progressbar.minimum = 0;
            this.progressbar.maximum = 100;
            this.progressbar.value = 35;

            // step 3: connect socket
            this.socketConnect();
        }

        protected socketConnect() {
            dir.evtHandler.addEventListener(enums.mqtt.event.CONNECT_SUCCESS, this.socketConnectSuccess, this);
            dir.evtHandler.addEventListener(enums.mqtt.event.CONNECT_FAIL, this.socketConnectFail, this);
            dir.socket.connect();
        }

        protected socketConnectSuccess() {
            dir.evtHandler.removeEventListener(enums.mqtt.event.CONNECT_SUCCESS, this.socketConnectSuccess, this);
            dir.evtHandler.removeEventListener(enums.mqtt.event.CONNECT_FAIL, this.socketConnectFail, this);

            // step 4: auth and get user profiles

            // step 5: get and display tips, promote banner

            // step 6: load general resource (lobby, baccarat)

            // step 7: init complete, transfer to lobby scene
            dir.sceneCtr.goto("LobbySCene");
        }

        protected socketConnectFail() {

        }
    }
}