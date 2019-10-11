class Director {
    private static _director: Director;

    public static get Instance(): Director {
        return this._director = (this._director) ? this._director : new Director();
    }

    public socket: socket.MQTTSocketComm;
    public evtHandler: handler.EventHandler;
    public errHandler: handler.ErrorHandler;
    // env:
    public layerCtr: controller.LayerCtr;
    public sceneCtr: controller.SceneCtr;
    // nav:
}

let dir: Director = Director.Instance;
