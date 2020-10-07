// TypeScript file
namespace we {
  export namespace data {
    export class LobbyMaterial {
      logourl: string; // logo image url
      homeherobanners: Banner[];
      homelargebanners: Banner[];
      homebanners: Banner[];
      liveherobanners: Banner[];
      lotteryherobanners: Banner[];
      eGameherobanners: Banner[];
      favouriteherobanners: Banner[];
      messages: string[]; // localized string of system messages shown on the navbar
    }

    export class Banner {
      imageurl: string; // banner image url
      link?: string; // Optional, banner onclick action (external or ingame link)
      title?: string;
      description?: string;
    }
  }
}
