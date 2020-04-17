namespace we {
  export namespace dt {
    export class DTBeadRoadIcon extends ba.BABeadRoadIcon {
      public constructor(size: number = 30) {
        super(size);
      }

      public getStringArray() {
        return [i18n.t('dragontiger.tigerShort'), i18n.t('dragontiger.dragonShort'), i18n.t('dragontiger.tieShort')];
      }

      public changeLang() {
        // const arr = [i18n.t('dragontiger.tigerShort'), i18n.t('dragontiger.dragonShort'), i18n.t('dragontiger.tieShort')];
        // for (let d = 0; d < 2; d++) {
        //   for (let i = 0; i < 3; i++) {
        //     this.iconTextArr[i + d * 6].text = arr[i];
        //   }
        // }
      }
    }
  }
}
