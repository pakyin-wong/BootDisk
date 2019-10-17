class TableInfo {
  public tableID: number;
  public name: string;
  public gameType: number;
  public dealerInfo: {
    name: string;
    id: number;
  };
  public videoUrls: [string];
  public tableState: number;
  public betDetails: BetDetail[];
  public gameData: any;
}
