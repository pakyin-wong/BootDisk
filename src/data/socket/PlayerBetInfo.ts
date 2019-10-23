class PlayerBetInfo {
  public playerid: string;
  public tableid: string;
  public currency: number;
  public bets: [
    {
      field: string; // field of the bet
      amount: number; // amount of bet
      winamount: number; // win amount if any,
      iswin: boolean; // indicated if win
    }
  ];
}
