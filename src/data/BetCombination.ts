namespace we {
  export namespace data {
    export class BetCombination {
      public title: string;
      public playerid: string;
      public option: we.data.BetValueOption[];
      public id: string;
      public gameType: number;
      public toBetDetails() {
        const betDetails: data.BetDetail[] = new Array();
        if (this.option) {
          this.option.map(value => {
            betDetails.push({ field: value.field, amount: value.amount });
          });
        }
        return betDetails;
      }
    }
  }
}
