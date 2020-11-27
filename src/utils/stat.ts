namespace we {
  export namespace utils {
    export namespace stat {
      export function toPercentages(args: number[]) {
        let total = 0;
        let result = new Array();
        args.map(value => {
          total += value;
        });
        result = args.map(value => {
          return total === 0? 0 : Math.round((value / total) * 100);
        });
        return result;
      }
      export namespace ba {
        export function getTotalPoint(card1: string, card2: string, card3: string) {
          let total = 0;
          if (!card1) {
            return total;
          }
          total += translateCardToPoint(card1);
          if (!card2) {
            return total;
          }
          total += translateCardToPoint(card2);
          if (!card3) {
            return total;
          }
          total += translateCardToPoint(card3);
          return total;
        }
        export function translateCardToNumber(card: string) {
          switch (card.charAt(card.length - 1)) {
            case 'k':
              return 13;
            case 'q':
              return 12;
            case 'j':
              return 11;
            case '0':
              return 10;
            case 'a':
              return 1;
            default:
              return +card.charAt(card.length - 1);
          }
        }
        export function translateCardToPoint(card: string) {
          switch (card.charAt(card.length - 1)) {
            case '0':
            case 'k':
            case 'q':
            case 'j':
              return 10;
            case 'a':
              return 1;
            default:
              return +card.charAt(card.length - 1);
          }
        }
        export function getStatInfo(shoe: boolean, gamestatistic: any) {
          if (!gamestatistic) {
            return {
              bankerCount: 0,
              playerCount: 0,
              tieCount: 0,
              totalCount: 0,
              bankerPairCount: 0,
              playerPairCount: 0,
              remainingCount: 0,
              bankerPercentage: 0,
              playerPercentage: 0,
              tiePercentage: 0,
              bankerPairPercentage: 0,
              playerPairPercentage: 0,
              remainingPercentage: 0,
            };
          }
          const bankerName = 'bankerCount';
          const playerName = 'playerCount';
          const tieName = 'tieCount';
          const totalName = 'totalCount';
          const bankerPairName = 'bankerPairCount';
          const playerPairName = 'playerPairCount';
          if (shoe) {
            const bankerName = 'shoeBankerCount';
            const playerName = 'shoePlayerCount';
            const tieName = 'shoeTieCount';
            const totalName = 'shoetTotalCount';
            const bankerPairName = 'shoeBankerPairCount';
            const playerPairName = 'shoePlayerPairCount';
          }

          const bankerCount = gamestatistic[bankerName];
          const playerCount = gamestatistic[playerName];
          const tieCount = gamestatistic[tieName];
          const totalCount = gamestatistic[totalName];
          const bankerPairCount = gamestatistic[bankerPairName];
          const playerPairCount = gamestatistic[playerPairName];
          const remainingCount = totalCount - bankerPairCount - playerPairCount;

          const bankerPercentage = (totalCount===0)?0:bankerCount / totalCount;
          const playerPercentage = (totalCount===0)?0:playerCount / totalCount;
          const tiePercentage = (totalCount===0)?0:tieCount / totalCount;
          const bankerPairPercentage = (totalCount===0)?0:bankerPairCount / totalCount;
          const playerPairPercentage = (totalCount===0)?0:playerPairCount / totalCount;
          const remainingPercentage = (totalCount===0)?0:remainingCount / totalCount;

          return {
            bankerCount,
            playerCount,
            tieCount,
            totalCount,
            bankerPairCount,
            playerPairCount,
            remainingCount,
            bankerPercentage,
            playerPercentage,
            tiePercentage,
            bankerPairPercentage,
            playerPairPercentage,
            remainingPercentage,
          };
        }
      }
      export namespace dt {
        export function getStatInfo(shoe: boolean, gamestatistic: any) {
          if (!gamestatistic) {
            return {
              bankerCount: 0,
              playerCount: 0,
              tieCount: 0,
              totalCount: 0,
              remainingCount: 0,
              bankerPercentage: 0,
              playerPercentage: 0,
              tiePercentage: 0,
            };
          }
          let bankerName;
          let playerName;
          let tieName;
          let totalName;

          if (shoe) {
             bankerName = 'shoeBankerCount';
             playerName = 'shoePlayerCount';
             tieName = 'shoeTieCount';
             totalName = 'shoeTotalCount';
          } else {
             bankerName = 'bankerCount';
             playerName = 'playerCount';
             tieName = 'tieCount';
             totalName = 'totalCount';
          }
          console.log("STAT::gamestatistic",gamestatistic)
          const bankerCount = gamestatistic[bankerName];
          const playerCount = gamestatistic[playerName];
          const tieCount = gamestatistic[tieName];
          const totalCount = gamestatistic[totalName];

          const bankerPercentage = (totalCount===0)?0:bankerCount / totalCount;
          const playerPercentage = (totalCount===0)?0:playerCount / totalCount;
          const tiePercentage = (totalCount===0)?0:tieCount / totalCount;

          return {
            bankerCount,
            playerCount,
            tieCount,
            totalCount,
            bankerPercentage,
            playerPercentage,
            tiePercentage,
          };
        }
      }

      export namespace ro {}
      export namespace di {}
    }
  }
}
