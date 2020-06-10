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

      protected childrenCreated(): void {
        super.childrenCreated();
        this._initY = this.y;
        // this.alpha = 0;
        // this.visible = true;
        // this.close.addEventListener(
        //   egret.TouchEvent.TOUCH_TAP,
        //   () => {
        //     this.visible = !this.visible;
        //   },
        //   this
        // );
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onExit, this);
        mouse.setButtonMode(this.close, true);
      }

      protected pTieMax: eui.Label;
      protected pTieOdd: eui.Label;

      // <<<<<<< HEAD
      public changeLang() {
        super.changeLang();

        this.tigerLabel.text = i18n.t('dragontiger.tiger');
        this.dragonLabel.text = i18n.t('dragontiger.dragon');
        this.tieLabel.text = i18n.t('dragontiger.tie');
      }

      public getConfig() {
        const betlimits = env.betLimits[env.currentSelectedBetLimitIndex].limits.dt;
        if (!betlimits) {
          return [];
        }
        return [
          { data: betlimits.DRAGON, lblMax: this.pDragonMax, lblOdd: this.pDragonOdd },
          { data: betlimits.TIGER, lblMax: this.pTigerMax, lblOdd: this.pTigerOdd },
          { data: betlimits.TIE, lblMax: this.pTieMax, lblOdd: this.pTieOdd },
        ];
        // =======
        //       public setValue(tableInfo: data.TableInfo) {
        //         super.setValue(tableInfo);
        //         if (tableInfo.gamestatistic) {
        //           this.pTiger.text = tableInfo.gamestatistic.bankerCount.toString();
        //           this.pDragon.text = tableInfo.gamestatistic.playerCount.toString();
        //           this.pTie.text = tableInfo.gamestatistic.tieCount.toString();
        //         }
        //         if (this.pGameID) {
        //           this.pGameID.text = tableInfo.betInfo.gameroundid;
        //         }
        // >>>>>>> develop
      }
    }
  }
}
