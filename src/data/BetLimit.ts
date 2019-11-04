namespace we {
  export namespace data {
    export class BetLimit {
      public currency: core.Currency;
      public maxLimit: number;
      public minLimit: number;
      public chipsList: [{ chipid?: string; value: number }];
    }
  }
}
