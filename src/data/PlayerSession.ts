class PlayerSession {
  public playerid: string;
  public sessionid: string;
  public profile: {
    // Store the information of the player
    playerid: string;
    operatorid: string;
    currency: number; // Curency Enum of the player
    nickname: string; // Player nickname
    profileimage: string; // URL of the profile image
    betlimits: [
      // Store the array of bet limits
      {
        minlimit: number; // Min bet limit
        maxlimit: number; // Max bet limit
        currency: number; // Currency
      }
    ];
  };
}
