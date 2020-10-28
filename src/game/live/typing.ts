// This file contains we.live related typing definitions.
namespace we {
  export namespace live {
    export interface ILiveResources {
      heroBanners: core.IRemoteResourceItem[];
    }

    export interface IContentInitializer extends core.IContentInitializer {
      onDisplayMode(evt: egret.Event);
    }

    export class ALobbyGridLayoutSwitch extends we.core.BaseEUI {
      protected setGridType(type: number) {
        env.lobbyGridType = type;
        dir.evtHandler.dispatch(core.Event.LIVE_DISPLAY_MODE, type);
      }
    }
  }
}
