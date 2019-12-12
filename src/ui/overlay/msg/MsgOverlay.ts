namespace we {
  export namespace ui {
    export class MsgOverlay extends Overlay {
      protected addListeners() {
        dir.evtHandler.$addListener(core.Event.TOGGLE_MESSAGE_PANEL, this.onToggle, this);
      }
    }
  }
}
