// TypeScript file
namespace we {
  export namespace ssc {
    export abstract class ABettingPanel extends core.BaseEUI implements IBettingPanel {
      protected betFields: string[];
      protected unitBet: number;  // bet ammount per note
  
      protected betFieldMapping() {
        this.betFields = this.betFields.map(betField=>`${betField}@${200}`)
      }
    }
  }
}