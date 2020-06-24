namespace we {
  export namespace dt {
    export class GameResultMessage extends ba.GameResultMessage implements ui.IGameResultMessage {
      protected _display: dragonBones.EgretArmatureDisplay = null;
      protected _dbClass = 'dragon_tiger';
    }
  }
}
