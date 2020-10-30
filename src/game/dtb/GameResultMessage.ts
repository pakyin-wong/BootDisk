namespace we {
  export namespace dtb {
    export class GameResultMessage extends bab.GameResultMessage {
      protected _skeletonName = 'blockchain_dt'

      protected getWinText(background: string) {
        let winText;
        switch (background) {
          case 'r':
            winText = i18n.t('winType.dt.TIGER')
            break;
          case 'b':
            winText = i18n.t('winType.dt.DRAGON')
            break;
          case 'g':
          default:
            winText = i18n.t('winType.dt.TIE');
            break;
        }
        return winText;
      }
    }
  }
}
