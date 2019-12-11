namespace we {
  export namespace core {
    export class EventHandler extends egret.EventDispatcher {
      constructor() {
        super();
        logger.l('EventHandler is created');
      }

      public dispatch(type: string, data: any = null) {
        this.dispatchEvent(new egret.Event(type, false, false, data));
      }

      public createOverlay(opt: we.ui.IOverlayToggleOpt) {
        this.dispatchEvent(new egret.Event(core.Event.TOGGLE_OVERLAY_PANEL, false, false, opt));
      }
    }
  }
}
