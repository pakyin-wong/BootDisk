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

      public createDropDown(opt: ui.IDropdownOptM) {
        this.dispatch(core.Event.TOGGLE_MOBILE_DROPDOWN, opt);
      }

      public createOverlay(opt: ui.IOverlayOpt) {
        this.dispatchEvent(new egret.Event(core.Event.TOGGLE_OVERLAY_PANEL, false, false, opt));
      }

      public showMessage(opt: ui.IOverlayOpt) {
        this.dispatchEvent(new egret.Event(core.Event.TOGGLE_MESSAGE_PANEL, false, false, opt));
      }
    }
  }
}
