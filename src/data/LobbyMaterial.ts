// TypeScript file
namespace we {
  export namespace data {
    export class LobbyMaterial {
      public logourl: string; // logo image url
      public homeherobanners: Banner[];
      public homelargebanners: Banner[];
      public homebanners: Banner[];
      public liveherobanners: Banner[];
      public lotteryherobanners: Banner[];
      public eGameherobanners: Banner[];
      public favouriteherobanners: Banner[];
      public messages: string[]; // localized string of system messages shown on the navbar
    }

    export class Banner {
      public imageurl: string; // banner image url
      public link?: string; // Optional, banner onclick action (external or ingame link)
      public title?: string;
      public description?: string;
    }
  }
}
