namespace we {
  export namespace dt {
    export class GameData extends data.GameData {
      public d: string;
      public t: string;
      public dragonpoint: number = 0;
      public tigerpoint: number = 0;
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
