namespace we {
  export namespace data {
    export class BetLimit {
      public currency: core.Currency;
      public maxlimit: number;
      public minlimit: number;
      // public chipsList: [{ chipid?: string; value: number }];
      public chipList: number[];
    }
  }
}
