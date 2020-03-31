namespace we {
  export namespace ro {
    export class MobileChipLayer extends we.ro.ChipLayer {
      protected _orphelins_group: eui.Group;
      protected _tiers_group: eui.Group;
      protected _voisins_group: eui.Group;
      protected _zero_group: eui.Group;

      protected _section_orphelins_betChipStack: ui.BetChipStack;
      protected _section_tiers_betChipStack: ui.BetChipStack;
      protected _section_voisins_betChipStack: ui.BetChipStack;
      protected _section_zero_betChipStack: ui.BetChipStack;

      protected _isRace: boolean = false;

      protected createMapping() {
        super.createMapping();
        this._mouseAreaMapping[ro.BetField.ORPHANS] = this._orphelins_group;
        this._mouseAreaMapping[ro.BetField.THE_THIRD] = this._tiers_group;
        this._mouseAreaMapping[ro.BetField.NEIGHBORS_OF_ZERO] = this._voisins_group;
        this._mouseAreaMapping[ro.BetField.ZERO_GAME] = this._zero_group;

        this._betChipStackMapping[ro.BetField.ORPHANS] = this._section_orphelins_betChipStack;
        this._betChipStackMapping[ro.BetField.THE_THIRD] = this._section_tiers_betChipStack;
        this._betChipStackMapping[ro.BetField.NEIGHBORS_OF_ZERO] = this._section_voisins_betChipStack;
        this._betChipStackMapping[ro.BetField.ZERO_GAME] = this._section_zero_betChipStack;
      }

      public changeState(s, betdetails) {
        this.currentState = s;
        this._isRace = s === 'race';

        this.validateNow();
        this.resetConfirmedBet();
        this.resetUnconfirmedBet();
        betdetails && this.updateBetFields(betdetails);
      }

      protected getMappedBetDetails() {
        const cfmBetDetails = this._cfmBetDetails;
        const mappedBetDetails = {};
        const mappedBetDetailArray = [];
        let betUnit;
        for (const betDetail of cfmBetDetails) {
          const clone: data.BetDetail = new data.BetDetail();
          for (const key in betDetail) {
            clone[key] = betDetail[key];
          }
          mappedBetDetailArray.push(clone);
          mappedBetDetails[betDetail.field] = clone;
        }
        for (const betDetail of mappedBetDetailArray) {
          switch (betDetail.field) {
            case ro.BetField.ZERO_GAME:
            case ro.BetField.NEIGHBORS_OF_ZERO:
            case ro.BetField.ORPHANS:
            case ro.BetField.THE_THIRD:
              betUnit = betDetail.amount;

              BETFIELD_MAPPING[betDetail.field].map(field => {
                mappedBetDetails[field].amount -= betUnit;
              });
              break;
          }
        }
        return mappedBetDetailArray;
      }

      public updateBetFields(betDetails: data.BetDetail[]) {
        logger.l(betDetails);

        if (!this._isRace) {
          super.updateBetFields(betDetails);
          return;
        }

        this._cfmBetDetails = betDetails;

        const mappedBetDetails = this.getMappedBetDetails();

        mappedBetDetails.map((value, index) => {
          if (this._betChipStackMapping[value.field]) {
            this._betChipStackMapping[value.field].cfmBet = value.amount * this.getRate(value.field);
            this._betChipStackMapping[value.field].draw();
          }
        });
      }

      protected getRate(fieldName): number {
        let rate = 1;
        switch (fieldName) {
          case ro.BetField.ZERO_GAME:
            rate = 4;
            break;
          case ro.BetField.NEIGHBORS_OF_ZERO:
            rate = 9;
            break;
          case ro.BetField.ORPHANS:
            rate = 5;
            break;
          case ro.BetField.THE_THIRD:
            rate = 6;
            break;
        }
        return rate;
      }
    }
  }
}
