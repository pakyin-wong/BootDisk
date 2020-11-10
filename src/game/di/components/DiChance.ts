namespace we {
  export namespace di {
    export class DiChance extends core.BaseEUI {
      protected _dice1Label: eui.Label;
      protected _dice2Label: eui.Label;
      protected _dice3Label: eui.Label;
      protected _dice4Label: eui.Label;
      protected _dice5Label: eui.Label;
      protected _dice6Label: eui.Label;

      protected _line1: ui.BettingGrid;
      protected _line2: ui.BettingGrid;
      protected _line3: ui.BettingGrid;
      protected _line4: ui.BettingGrid;
      protected _line5: ui.BettingGrid;
      protected _line6: ui.BettingGrid;

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
        const color: string[] = new Array(dices.length);
        // require simplification
        let total = 0;
        console.log('dices',dices)//
        //==========================
        // for (let i = 0; i < dices.length; i++) {
        //   let count = 0;
        //   for (let j = 0; j < dices.length; j++) {
        //     if (i === j) {
        //       continue;
        //     }
        //     if (count >= 3) {
        //       break;
        //     }
        //     if (dices[i] >= dices[j]) {
        //       count++;
        //     }
        //   }
        //   if (count >= 3) {
        //     color[i] = 'red';
        //     total++;
        //   } else {
        //     color[i] = 'blue';
        //   }
        //   console.log('color',color)
        //   if (total >= 3) {
        //     break;
        //   }
        // }
        //===========================
        let diceWithIndex = [];
        for (let i = 0 ; i < 6 ; i++) {
            diceWithIndex.push([dices[i],i]) 
          }
        let sortedDiceWithIndex = [];
        sortedDiceWithIndex = diceWithIndex.sort((a,b) => a[0] - b[0]) // [[dice,index],[dice,index],...]
        for (let i = 0 ; i < 3 ; i++) {
          color[sortedDiceWithIndex[i][1]] = 'blue'
        }
        for (let i = 3 ; i < 6 ; i++) {
          color[sortedDiceWithIndex[i][1]] = 'red'
        }
        console.log('color',color)

        for (let i = 0; i < dices.length; i++) {
          this['_dice' + (i + 1) + 'Label'].text = dices[i];
          if (color[i] === 'red') {
            if (!env.isMobile) {
              this['_line' + (i + 1)].gradientColors = '[0xeb632c,0xfdc071]';
            }
          }
          this['_line' + (i + 1)].width = 10 + (this._maxWidth * dices[i]) / maxDice;
        }
      }
    }
  }
}
