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
          return Math.round((value / total) * 100);
        });
        return result;
      }
      export namespace ba {
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

          const bankerPercentage = bankerCount / totalCount;
          const playerPercentage = playerCount / totalCount;
          const tiePercentage = tieCount / totalCount;
          const bankerPairPercentage = bankerPairCount / totalCount;
          const playerPairPercentage = playerPairCount / totalCount;
          const remainingPercentage = remainingCount / totalCount;

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
      export namespace ro {}
      export namespace di {}
    }
  }
}
