// This file contains global typing definitions.
namespace we {
  export namespace core {
    export interface IRemoteResourceItem {
      imageUrl: string;
      image: egret.Texture;
      link: string;
      loaded: boolean;
    }
  }
}
