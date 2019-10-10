module scene {
    export class LoadingScene extends BaseScene {

        public onEnter() {
            this.mount();
        }

        public async onFadeEnter() {

        }

        public onExit() {
            this.removeChildren();
        }

        public async onFadeExit() {
            
        }
        
        protected mount() {
            // step 1: load Loading Screen Res

            // step 2: init ui

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