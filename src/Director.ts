class Director {
    private static _director: Director
    private constructor() {

    }

    public static get Instance(): Director {
        if (!this._director)
            this._director = new Director()
        return this._director
    }
    socket: socket.MQTTSocketComm;
    evtHandler: handler.EventHandler;
    errHandler: handler.ErrorHandler;
    // env: 
    layerCtr: layer.LayerCtr;
    sceneCtr: scene.SceneCtr;
    // nav: 
}

let director: Director = Director.Instance;

