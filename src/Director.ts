class Director {

    socket: socket.MQTTSocketComm;
    evtHandler: handler.EventHandler;
    errHandler: handler.ErrorHandler;
    // env: 
    layerCtr: layer.LayerCtr;
    sceneCtr: scene.SceneCtr;
    // nav: 
}

if (!window.director) {
    window.director = new Director();
}

declare let director: Director;

declare interface Window {

    director: Director
}
