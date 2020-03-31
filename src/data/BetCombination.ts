namespace we {
  export namespace data {
    export class BetCombination {
      public title: string;
      public playerid: string;
      public optionsList: we.data.BetValueOption[];
      public id: string;
      public gametype: any;
      public toBetDetails(): data.BetDetail[] {
        const betDetails: data.BetDetail[] = new Array();
        if (this.optionsList) {
          this.optionsList.map(value => {
            betDetails.push({ field: value.betcode, amount: value.amount });
          });
        }
        return betDetails;
      }
    }
  }
}
