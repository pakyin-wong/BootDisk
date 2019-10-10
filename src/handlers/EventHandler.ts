module handler {
    export class EventHandler extends egret.EventDispatcher {

        constructor() {
            super();
            logger.l("EventHandler is created");
        }

        dispatch(type:string,data:any = null){
            this.dispatchEvent(new egret.Event(type,false,false,data));
        }
    }
}