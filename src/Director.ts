declare let director: Director;

declare interface Director {

    // socket: 
    evtHandler: handler.EventHandler;
    errHandler: handler.ErrorHandler;
    // env:
    sceneCtr: Scene.SceneController;
    // nav:
}