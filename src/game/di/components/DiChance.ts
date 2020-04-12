namespace we {
  export namespace di {
    export class DiChance extends core.BaseEUI {
      protected dice1Label: eui.Label;
      protected dice2Label: eui.Label;
      protected dice3Label: eui.Label;
      protected dice4Label: eui.Label;
      protected dice5Label: eui.Label;
      protected dice6Label: eui.Label;

      protected line1: eui.Image;
      protected line2: eui.Image;
      protected line3: eui.Image;
      protected line4: eui.Image;
      protected line5: eui.Image;
      protected line6: eui.Image;

      // dice1 -6
      public setDiceValues(dices: number[]) {
        const maxDice: number = Math.max.apply(null, dices);
        for (let i = 0; i < dices.length; i++) {
          this['line' + (i + 1)].width = 10 + (120 * dices[i]) / maxDice;
          this['dice' + (i + 1) + 'Label'].text = dices[i];
        }
      }
    }
  }
}
