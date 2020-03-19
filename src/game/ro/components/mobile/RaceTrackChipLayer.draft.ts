namespace we {
  export namespace ro {
    export class MobileRaceTrackChipLayer extends we.ui.ChipLayer {
      protected _section_35: eui.Image;
      protected _section_3: eui.Image;
      protected _section_26: eui.Image;
      protected _section_0: eui.Image;
      protected _section_32: eui.Image;
      protected _section_15: eui.Image;
      protected _section_19: eui.Image;
      protected _section_4: eui.Image;
      protected _section_21: eui.Image;
      protected _section_2: eui.Image;
      protected _section_25: eui.Image;
      protected _section_17: eui.Image;
      protected _section_34: eui.Image;
      protected _section_6: eui.Image;
      protected _section_27: eui.Image;
      protected _section_13: eui.Image;
      protected _section_36: eui.Image;
      protected _section_11: eui.Image;
      protected _section_30: eui.Image;
      protected _section_8: eui.Image;
      protected _section_23: eui.Image;
      protected _section_10: eui.Image;
      protected _section_5: eui.Image;
      protected _section_24: eui.Image;
      protected _section_16: eui.Image;
      protected _section_33: eui.Image;
      protected _section_1: eui.Image;
      protected _section_20: eui.Image;
      protected _section_14: eui.Image;
      protected _section_31: eui.Image;
      protected _section_9: eui.Image;
      protected _section_22: eui.Image;
      protected _section_18: eui.Image;
      protected _section_29: eui.Image;
      protected _section_7: eui.Image;
      protected _section_28: eui.Image;
      protected _section_12: eui.Image;
      protected _section_orphelins: eui.Image;
      protected _section_tiers: eui.Image;
      protected _section_voisins: eui.Image;
      protected _section_zero: eui.Image;

      protected _section_35_betChipStack: ui.BetChipStack;
      protected _section_3_betChipStack: ui.BetChipStack;
      protected _section_26_betChipStack: ui.BetChipStack;
      protected _section_0_betChipStack: ui.BetChipStack;
      protected _section_32_betChipStack: ui.BetChipStack;
      protected _section_15_betChipStack: ui.BetChipStack;
      protected _section_19_betChipStack: ui.BetChipStack;
      protected _section_4_betChipStack: ui.BetChipStack;
      protected _section_21_betChipStack: ui.BetChipStack;
      protected _section_2_betChipStack: ui.BetChipStack;
      protected _section_25_betChipStack: ui.BetChipStack;
      protected _section_17_betChipStack: ui.BetChipStack;
      protected _section_34_betChipStack: ui.BetChipStack;
      protected _section_6_betChipStack: ui.BetChipStack;
      protected _section_27_betChipStack: ui.BetChipStack;
      protected _section_13_betChipStack: ui.BetChipStack;
      protected _section_36_betChipStack: ui.BetChipStack;
      protected _section_11_betChipStack: ui.BetChipStack;
      protected _section_30_betChipStack: ui.BetChipStack;
      protected _section_8_betChipStack: ui.BetChipStack;
      protected _section_23_betChipStack: ui.BetChipStack;
      protected _section_10_betChipStack: ui.BetChipStack;
      protected _section_5_betChipStack: ui.BetChipStack;
      protected _section_24_betChipStack: ui.BetChipStack;
      protected _section_16_betChipStack: ui.BetChipStack;
      protected _section_33_betChipStack: ui.BetChipStack;
      protected _section_1_betChipStack: ui.BetChipStack;
      protected _section_20_betChipStack: ui.BetChipStack;
      protected _section_14_betChipStack: ui.BetChipStack;
      protected _section_31_betChipStack: ui.BetChipStack;
      protected _section_9_betChipStack: ui.BetChipStack;
      protected _section_22_betChipStack: ui.BetChipStack;
      protected _section_18_betChipStack: ui.BetChipStack;
      protected _section_29_betChipStack: ui.BetChipStack;
      protected _section_7_betChipStack: ui.BetChipStack;
      protected _section_28_betChipStack: ui.BetChipStack;
      protected _section_12_betChipStack: ui.BetChipStack;
      protected _section_orphelins_betChipStack: ui.BetChipStack;
      protected _section_tiers_betChipStack: ui.BetChipStack;
      protected _section_voisins_betChipStack: ui.BetChipStack;
      protected _section_zero_betChipStack: ui.BetChipStack;

      protected _raceTrackControl: RaceTrackControl;
      protected _raceTrackTableLayer: RaceTrackTableLayer;

      public constructor() {
        super('ro/RaceTrackChipLayer');
        this._betField = ro.BetField;
      }

      protected createMapping() {
        super.createMapping();
        this._mouseAreaMapping = {};
        this._mouseAreaMapping[we.ro.BetField.DIRECT_0] = this._section_0;
        this._mouseAreaMapping[we.ro.BetField.DIRECT_1] = this._section_1;
        this._mouseAreaMapping[we.ro.BetField.DIRECT_2] = this._section_2;
        this._mouseAreaMapping[we.ro.BetField.DIRECT_3] = this._section_3;
        this._mouseAreaMapping[we.ro.BetField.DIRECT_4] = this._section_4;
        this._mouseAreaMapping[we.ro.BetField.DIRECT_5] = this._section_5;
        this._mouseAreaMapping[we.ro.BetField.DIRECT_6] = this._section_6;
        this._mouseAreaMapping[we.ro.BetField.DIRECT_7] = this._section_7;
        this._mouseAreaMapping[we.ro.BetField.DIRECT_8] = this._section_8;
        this._mouseAreaMapping[we.ro.BetField.DIRECT_9] = this._section_9;
        this._mouseAreaMapping[we.ro.BetField.DIRECT_10] = this._section_10;
        this._mouseAreaMapping[we.ro.BetField.DIRECT_11] = this._section_11;
        this._mouseAreaMapping[we.ro.BetField.DIRECT_12] = this._section_12;
        this._mouseAreaMapping[we.ro.BetField.DIRECT_13] = this._section_13;
        this._mouseAreaMapping[we.ro.BetField.DIRECT_14] = this._section_14;
        this._mouseAreaMapping[we.ro.BetField.DIRECT_15] = this._section_15;
        this._mouseAreaMapping[we.ro.BetField.DIRECT_16] = this._section_16;
        this._mouseAreaMapping[we.ro.BetField.DIRECT_17] = this._section_17;
        this._mouseAreaMapping[we.ro.BetField.DIRECT_18] = this._section_18;
        this._mouseAreaMapping[we.ro.BetField.DIRECT_19] = this._section_19;
        this._mouseAreaMapping[we.ro.BetField.DIRECT_20] = this._section_20;
        this._mouseAreaMapping[we.ro.BetField.DIRECT_21] = this._section_21;
        this._mouseAreaMapping[we.ro.BetField.DIRECT_22] = this._section_22;
        this._mouseAreaMapping[we.ro.BetField.DIRECT_23] = this._section_23;
        this._mouseAreaMapping[we.ro.BetField.DIRECT_24] = this._section_24;
        this._mouseAreaMapping[we.ro.BetField.DIRECT_25] = this._section_25;
        this._mouseAreaMapping[we.ro.BetField.DIRECT_26] = this._section_26;
        this._mouseAreaMapping[we.ro.BetField.DIRECT_27] = this._section_27;
        this._mouseAreaMapping[we.ro.BetField.DIRECT_28] = this._section_28;
        this._mouseAreaMapping[we.ro.BetField.DIRECT_29] = this._section_29;
        this._mouseAreaMapping[we.ro.BetField.DIRECT_30] = this._section_30;
        this._mouseAreaMapping[we.ro.BetField.DIRECT_31] = this._section_31;
        this._mouseAreaMapping[we.ro.BetField.DIRECT_32] = this._section_32;
        this._mouseAreaMapping[we.ro.BetField.DIRECT_33] = this._section_33;
        this._mouseAreaMapping[we.ro.BetField.DIRECT_34] = this._section_34;
        this._mouseAreaMapping[we.ro.BetField.DIRECT_35] = this._section_35;
        this._mouseAreaMapping[we.ro.BetField.DIRECT_36] = this._section_36;

        this._mouseAreaMapping[ro.BetField.ORPHANS] = this._section_orphelins;
        this._mouseAreaMapping[ro.BetField.THE_THIRD] = this._section_tiers;
        this._mouseAreaMapping[ro.BetField.NEIGHBORS_OF_ZERO] = this._section_voisins;
        this._mouseAreaMapping[ro.BetField.ZERO_GAME] = this._section_zero;

        this._betChipStackMapping = {};
        this._betChipStackMapping[we.ro.BetField.DIRECT_0] = this._section_0_betChipStack;
        this._betChipStackMapping[we.ro.BetField.DIRECT_1] = this._section_1_betChipStack;
        this._betChipStackMapping[we.ro.BetField.DIRECT_2] = this._section_2_betChipStack;
        this._betChipStackMapping[we.ro.BetField.DIRECT_3] = this._section_3_betChipStack;
        this._betChipStackMapping[we.ro.BetField.DIRECT_4] = this._section_4_betChipStack;
        this._betChipStackMapping[we.ro.BetField.DIRECT_5] = this._section_5_betChipStack;
        this._betChipStackMapping[we.ro.BetField.DIRECT_6] = this._section_6_betChipStack;
        this._betChipStackMapping[we.ro.BetField.DIRECT_7] = this._section_7_betChipStack;
        this._betChipStackMapping[we.ro.BetField.DIRECT_8] = this._section_8_betChipStack;
        this._betChipStackMapping[we.ro.BetField.DIRECT_9] = this._section_9_betChipStack;
        this._betChipStackMapping[we.ro.BetField.DIRECT_10] = this._section_10_betChipStack;
        this._betChipStackMapping[we.ro.BetField.DIRECT_11] = this._section_11_betChipStack;
        this._betChipStackMapping[we.ro.BetField.DIRECT_12] = this._section_12_betChipStack;
        this._betChipStackMapping[we.ro.BetField.DIRECT_13] = this._section_13_betChipStack;
        this._betChipStackMapping[we.ro.BetField.DIRECT_14] = this._section_14_betChipStack;
        this._betChipStackMapping[we.ro.BetField.DIRECT_15] = this._section_15_betChipStack;
        this._betChipStackMapping[we.ro.BetField.DIRECT_16] = this._section_16_betChipStack;
        this._betChipStackMapping[we.ro.BetField.DIRECT_17] = this._section_17_betChipStack;
        this._betChipStackMapping[we.ro.BetField.DIRECT_18] = this._section_18_betChipStack;
        this._betChipStackMapping[we.ro.BetField.DIRECT_19] = this._section_19_betChipStack;
        this._betChipStackMapping[we.ro.BetField.DIRECT_20] = this._section_20_betChipStack;
        this._betChipStackMapping[we.ro.BetField.DIRECT_21] = this._section_21_betChipStack;
        this._betChipStackMapping[we.ro.BetField.DIRECT_22] = this._section_22_betChipStack;
        this._betChipStackMapping[we.ro.BetField.DIRECT_23] = this._section_23_betChipStack;
        this._betChipStackMapping[we.ro.BetField.DIRECT_24] = this._section_24_betChipStack;
        this._betChipStackMapping[we.ro.BetField.DIRECT_25] = this._section_25_betChipStack;
        this._betChipStackMapping[we.ro.BetField.DIRECT_26] = this._section_26_betChipStack;
        this._betChipStackMapping[we.ro.BetField.DIRECT_27] = this._section_27_betChipStack;
        this._betChipStackMapping[we.ro.BetField.DIRECT_28] = this._section_28_betChipStack;
        this._betChipStackMapping[we.ro.BetField.DIRECT_29] = this._section_29_betChipStack;
        this._betChipStackMapping[we.ro.BetField.DIRECT_30] = this._section_30_betChipStack;
        this._betChipStackMapping[we.ro.BetField.DIRECT_31] = this._section_31_betChipStack;
        this._betChipStackMapping[we.ro.BetField.DIRECT_32] = this._section_32_betChipStack;
        this._betChipStackMapping[we.ro.BetField.DIRECT_33] = this._section_33_betChipStack;
        this._betChipStackMapping[we.ro.BetField.DIRECT_34] = this._section_34_betChipStack;
        this._betChipStackMapping[we.ro.BetField.DIRECT_35] = this._section_35_betChipStack;
        this._betChipStackMapping[we.ro.BetField.DIRECT_36] = this._section_36_betChipStack;
        this._betChipStackMapping[ro.BetField.ORPHANS] = this._section_orphelins_betChipStack;
        this._betChipStackMapping[ro.BetField.THE_THIRD] = this._section_tiers_betChipStack;
        this._betChipStackMapping[ro.BetField.NEIGHBORS_OF_ZERO] = this._section_voisins_betChipStack;
        this._betChipStackMapping[ro.BetField.ZERO_GAME] = this._section_zero_betChipStack;
      }

      public removeAllMouseListeners() {
        // this.removeRolloverListeners();
        // this.removeRolloutListeners();
        this.removeTouchTapListeners();
      }

      public addAllMouseListeners() {
        // this.addRolloverListeners();
        // this.addRolloutListeners();
        this.addTouchTapListeners();
      }

      // public onGridRollover(fieldName: string) {
      //   switch (fieldName) {
      //     case ro.BetField.ORPHANS:
      //     case ro.BetField.THE_THIRD:
      //     case ro.BetField.NEIGHBORS_OF_ZERO:
      //     case ro.BetField.ZERO_GAME:
      //       this._raceTrackTableLayer.onRollover(fieldName);
      //       break;
      //     default:
      //       we.ro.getNeighbour(ro.directfield2num(fieldName), this._raceTrackControl.value).map(value => {
      //         this._raceTrackTableLayer.onRollover(ro.num2directfield(value));
      //       });
      //       break;
      //   }
      // }

      // public onGridRollout(fieldName: string) {
      //   switch (fieldName) {
      //     case ro.BetField.ORPHANS:
      //     case ro.BetField.THE_THIRD:
      //     case ro.BetField.NEIGHBORS_OF_ZERO:
      //     case ro.BetField.ZERO_GAME:
      //       this._raceTrackTableLayer.onRollout(fieldName);
      //       break;
      //     default:
      //       we.ro.getNeighbour(ro.directfield2num(fieldName), this._raceTrackControl.value).map(value => {
      //         this._raceTrackTableLayer.onRollout(ro.num2directfield(value));
      //       });
      //       break;
      //   }
      // }

      public onBetFieldUpdateEvent(evt: egret.Event) {
        const target = evt.target;
        const fieldName = utils.EnumHelpers.getKeyByValue(this._mouseAreaMapping, target);
        switch (fieldName) {
          case ro.BetField.ORPHANS:
          case ro.BetField.THE_THIRD:
          case ro.BetField.NEIGHBORS_OF_ZERO:
          case ro.BetField.ZERO_GAME:
            this.onBetFieldUpdate(fieldName);
            break;
          default:
            we.ro.getNeighbour(ro.directfield2num(fieldName), this._raceTrackControl.value).map(value => {
              this.onBetFieldUpdate(ro.num2directfield(value));
            });
            break;
        }
      }

      protected get mappedBetDetails() {
        const cfmBetDetails = this._cfmBetDetails;
        const mappedBetDetails = {};
        const mappedBetDetailArray = [];
        let betUnit;
        let match;
        for (const betDetail of cfmBetDetails) {
          const clone: data.BetDetail = new data.BetDetail();
          for (const key in betDetail) {
            clone[key] = betDetail[key];
          }
          mappedBetDetailArray.push(clone);
          mappedBetDetails[betDetail.field] = clone;
        }
        for (const betDetail of mappedBetDetailArray) {
          match = betDetail.field;
          switch (betDetail.field) {
            case ro.BetField.ZERO_GAME:
              betUnit = Math.round(betDetail.amount / 4);
              break;
            case ro.BetField.NEIGHBORS_OF_ZERO:
              betUnit = Math.round(betDetail.amount / 9);
              break;
            case ro.BetField.ORPHANS:
              betUnit = Math.round(betDetail.amount / 5);
              break;
            case ro.BetField.THE_THIRD:
              betUnit = Math.round(betDetail.amount / 6);
              break;
            default:
              match = null;
          }
          if (match) {
            BETFIELD_MAPPING[match].map(field => {
              mappedBetDetails[field].amount -= betUnit;
            });
          }
        }
        return mappedBetDetailArray;
      }

      public updateBetFields(betDetails: data.BetDetail[]) {
        this._cfmBetDetails = betDetails;

        const mappedBetDetails = this.mappedBetDetails;

        // update the already bet amount of each bet field with the mapped details
        this.mappedBetDetails.map((value, index) => {
          if (this._betChipStackMapping[value.field]) {
            this._betChipStackMapping[value.field].cfmBet = value.amount;
            this._betChipStackMapping[value.field].draw();
          }
        });
      }

      public onBetFieldUpdate(fieldName) {
        const grid = this.getUncfmBetByField(fieldName);
        const chipUnit = this.getOrderAmount();
        let betAmount = chipUnit;
        switch (fieldName) {
          case ro.BetField.ZERO_GAME:
            betAmount = 4 * chipUnit;
            break;
          case ro.BetField.NEIGHBORS_OF_ZERO:
            betAmount = 9 * chipUnit;
            break;
          case ro.BetField.ORPHANS:
            betAmount = 5 * chipUnit;
            break;
          case ro.BetField.THE_THIRD:
            betAmount = 6 * chipUnit;
            break;
        }

        const betDetail = { field: fieldName, amount: betAmount };
        // validate bet action
        if (this.validateBetAction(betDetail)) {
          // update the uncfmBetDetails
          const grid = this.getUncfmBetByField(fieldName);
          grid.amount += betDetail.amount;
          // update the corresponding table grid
          this.undoStack.push(new Date().getTime(), we.utils.clone({ field: fieldName, amount: betDetail.amount }), this.undoBetFieldUpdate.bind(this));

          // update display
          if (this._betChipStackMapping[fieldName]) {
            this._betChipStackMapping[fieldName].uncfmBet = grid ? grid.amount : 0;
            this._betChipStackMapping[fieldName].draw();
          }
        }
      }

      public set raceTrackControl(value: RaceTrackControl) {
        this._raceTrackControl = value;
      }

      public get raceTrackControl() {
        return this._raceTrackControl;
      }

      public set raceTrackTableLayer(value: RaceTrackTableLayer) {
        this._raceTrackTableLayer = value;
      }

      public get raceTrackTableLayer() {
        return this._raceTrackTableLayer;
      }
    }
  }
}
