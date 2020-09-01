namespace we {
  export namespace di {
    export class DiChance extends core.BaseEUI {
      protected _dice1Label: eui.Label;
      protected _dice2Label: eui.Label;
      protected _dice3Label: eui.Label;
      protected _dice4Label: eui.Label;
      protected _dice5Label: eui.Label;
      protected _dice6Label: eui.Label;

      protected _line1: eui.Image;
      protected _line2: eui.Image;
      protected _line3: eui.Image;
      protected _line4: eui.Image;
      protected _line5: eui.Image;
      protected _line6: eui.Image;

      protected _maxWidth: number = 120;

      public set maxWidth(value: number) {
        this._maxWidth = value;
      }

      public setMaxWidth(value: number) {
        this._maxWidth = value;
      }

      // dice1 -6
      public setDiceValues(dices: number[]) {
        const maxDice: number = Math.max.apply(null, dices);
        for (let i = 0; i < dices.length; i++) {
          this['_line' + (i + 1)].width = 10 + (this._maxWidth * dices[i]) / maxDice;
          this['_dice' + (i + 1) + 'Label'].text = dices[i];
        }
      }
    }
  }
}
