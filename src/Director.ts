class Director {
    private static _director: Director

    public static get Instance(): Director {
        return this._director = (this._director)? this._director : new Director()
    }

    socket: socket.MQTTSocketComm;
    evtHandler: handler.EventHandler;
    errHandler: handler.ErrorHandler;
    // env: 
    layerCtr: controller.LayerCtr;
    sceneCtr: controller.SceneCtr;
    // nav: 
}

let dir: Director = Director.Instance;
