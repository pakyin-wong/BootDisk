namespace we {
  export namespace dt {
    export class TableInfoPanel extends ui.TableInfoPanel {
      protected dragonLabel: eui.Label;
      protected tigerLabel: eui.Label;
      protected tieLabel: eui.Label;

      protected pDragonMax: eui.Label;
      protected pDragonOdd: eui.Label;

      protected pTigerMax: eui.Label;
      protected pTigerOdd: eui.Label;

      protected pTieMax: eui.Label;
      protected pTieOdd: eui.Label;

      public changeLang() {
        super.changeLang();

        this.tigerLabel.text = i18n.t('dragontiger.tiger');
        this.dragonLabel.text = i18n.t('dragontiger.dragon');
        this.tieLabel.text = i18n.t('dragontiger.tie');
      }

      public getConfig() {
        const betlimits = env.betLimits[env.currentSelectedBetLimitIndex].limits.dt;
        return [
          { data: betlimits.DRAGON, lblMax: this.pDragonMax, lblOdd: this.pDragonOdd },
          { data: betlimits.TIGER, lblMax: this.pTigerMax, lblOdd: this.pTigerOdd },
          { data: betlimits.TIE, lblMax: this.pTieMax, lblOdd: this.pTieOdd },
        ];
      }
    }
  }
}
