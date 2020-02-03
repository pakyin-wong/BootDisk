namespace we {
  export namespace ba {
    export class GameData extends data.GameData {
      public a1: string;
      public a2: string;
      public a3: string;
      public b1: string;
      public b2: string;
      public b3: string;
      public bankerpoint: number = 0;
      public playerpoint: number = 0;
    }
  }
}
/*

class GameStatus {
  public tableid: string = '';
  public starttime: string = ''; // Start time of the game in unix timestamp
  public gameroundid: string = ''; // ID of each round
  public countdown: string = ''; // Countdown value
  public shoeid: string = ''; // ID of current shoe
  public b1: string = ''; // Player's card result in slot 1
  public b2: string = ''; // Player's card result in slot 2
  public b3: string = ''; // Player's card result in slot 3
  public a1: string = ''; // Player's card result in slot 1
  public a2: string = ''; // Player's card result in slot 1
  public a3: string = ''; // Player's card result in slot 1
  public wintype: enums.socket.BAWinType; // Type of win. BANKER | PLAYER | TIE
  public state: enums.socket.BAGameStateType; // State of the game. NONE | BET | DEAL | FINISH
}

*/
