namespace we {
  export namespace data {
    export class PlayerSession {
      public playerid: string;
      public sessionid: string;
      public icons: any;
      public fallbacknicknames: any;
      public redirecturl: string;
      public profile: {
        // Store the information of the player
        playerid: string;
        operatorid: string;
        currency: number; // Curency Enum of the player
        nickname: string; // Player nickname
        profileimageurl: string; // URL of the profile image
        betlimits: BetLimit;
        chips: string[];
        mode: number;
        categoryorders: string;
        panelpositions: string;
        settings: any;
        currentSelectedBetLimitIndex: number;
        language: string;
        gamecategory: string[],
        gametype: number[],
        type: number    // account type
      };
      public blockchainlinks: {
        cosmoslink: string,
        thirdpartysha256: string
      };
    }
  }
}
