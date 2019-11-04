class BetLimit {
  public currency: enums.socket.Currency;
  public maxLimit: number;
  public minLimit: number;
  public chipsList: [{ chipid?: string; value: number }];
}
