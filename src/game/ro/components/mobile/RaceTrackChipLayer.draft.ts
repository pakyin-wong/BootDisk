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

      protected _numberToSectionMapping: { [a: number]: string };
      protected _sectionToNumberMapping: { [s: string]: number };

      protected _raceTrackControl: RaceTrackControl;
      protected _raceTrackTableLayer: RaceTrackTableLayer;
      protected _chipLayer: we.ui.ChipLayer;

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

        this._sectionToNumberMapping = {};
        this._sectionToNumberMapping[we.ro.BetField.DIRECT_0] = 0;
        this._sectionToNumberMapping[we.ro.BetField.DIRECT_1] = 1;
        this._sectionToNumberMapping[we.ro.BetField.DIRECT_2] = 2;
        this._sectionToNumberMapping[we.ro.BetField.DIRECT_3] = 3;
        this._sectionToNumberMapping[we.ro.BetField.DIRECT_4] = 4;
        this._sectionToNumberMapping[we.ro.BetField.DIRECT_5] = 5;
        this._sectionToNumberMapping[we.ro.BetField.DIRECT_6] = 6;
        this._sectionToNumberMapping[we.ro.BetField.DIRECT_7] = 7;
        this._sectionToNumberMapping[we.ro.BetField.DIRECT_8] = 8;
        this._sectionToNumberMapping[we.ro.BetField.DIRECT_9] = 9;
        this._sectionToNumberMapping[we.ro.BetField.DIRECT_10] = 10;
        this._sectionToNumberMapping[we.ro.BetField.DIRECT_11] = 11;
        this._sectionToNumberMapping[we.ro.BetField.DIRECT_12] = 12;
        this._sectionToNumberMapping[we.ro.BetField.DIRECT_13] = 13;
        this._sectionToNumberMapping[we.ro.BetField.DIRECT_14] = 14;
        this._sectionToNumberMapping[we.ro.BetField.DIRECT_15] = 15;
        this._sectionToNumberMapping[we.ro.BetField.DIRECT_16] = 16;
        this._sectionToNumberMapping[we.ro.BetField.DIRECT_17] = 17;
        this._sectionToNumberMapping[we.ro.BetField.DIRECT_18] = 18;
        this._sectionToNumberMapping[we.ro.BetField.DIRECT_19] = 19;
        this._sectionToNumberMapping[we.ro.BetField.DIRECT_20] = 20;
        this._sectionToNumberMapping[we.ro.BetField.DIRECT_21] = 21;
        this._sectionToNumberMapping[we.ro.BetField.DIRECT_22] = 22;
        this._sectionToNumberMapping[we.ro.BetField.DIRECT_23] = 23;
        this._sectionToNumberMapping[we.ro.BetField.DIRECT_24] = 24;
        this._sectionToNumberMapping[we.ro.BetField.DIRECT_25] = 25;
        this._sectionToNumberMapping[we.ro.BetField.DIRECT_26] = 26;
        this._sectionToNumberMapping[we.ro.BetField.DIRECT_27] = 27;
        this._sectionToNumberMapping[we.ro.BetField.DIRECT_28] = 28;
        this._sectionToNumberMapping[we.ro.BetField.DIRECT_29] = 29;
        this._sectionToNumberMapping[we.ro.BetField.DIRECT_30] = 30;
        this._sectionToNumberMapping[we.ro.BetField.DIRECT_31] = 31;
        this._sectionToNumberMapping[we.ro.BetField.DIRECT_32] = 32;
        this._sectionToNumberMapping[we.ro.BetField.DIRECT_33] = 33;
        this._sectionToNumberMapping[we.ro.BetField.DIRECT_34] = 34;
        this._sectionToNumberMapping[we.ro.BetField.DIRECT_35] = 35;
        this._sectionToNumberMapping[we.ro.BetField.DIRECT_36] = 36;

        this._numberToSectionMapping = {};
        this._numberToSectionMapping[0] = we.ro.BetField.DIRECT_0;
        this._numberToSectionMapping[1] = we.ro.BetField.DIRECT_1;
        this._numberToSectionMapping[2] = we.ro.BetField.DIRECT_2;
        this._numberToSectionMapping[3] = we.ro.BetField.DIRECT_3;
        this._numberToSectionMapping[4] = we.ro.BetField.DIRECT_4;
        this._numberToSectionMapping[5] = we.ro.BetField.DIRECT_5;
        this._numberToSectionMapping[6] = we.ro.BetField.DIRECT_6;
        this._numberToSectionMapping[7] = we.ro.BetField.DIRECT_7;
        this._numberToSectionMapping[8] = we.ro.BetField.DIRECT_8;
        this._numberToSectionMapping[9] = we.ro.BetField.DIRECT_9;
        this._numberToSectionMapping[10] = we.ro.BetField.DIRECT_10;
        this._numberToSectionMapping[11] = we.ro.BetField.DIRECT_11;
        this._numberToSectionMapping[12] = we.ro.BetField.DIRECT_12;
        this._numberToSectionMapping[13] = we.ro.BetField.DIRECT_13;
        this._numberToSectionMapping[14] = we.ro.BetField.DIRECT_14;
        this._numberToSectionMapping[15] = we.ro.BetField.DIRECT_15;
        this._numberToSectionMapping[16] = we.ro.BetField.DIRECT_16;
        this._numberToSectionMapping[17] = we.ro.BetField.DIRECT_17;
        this._numberToSectionMapping[18] = we.ro.BetField.DIRECT_18;
        this._numberToSectionMapping[19] = we.ro.BetField.DIRECT_19;
        this._numberToSectionMapping[20] = we.ro.BetField.DIRECT_20;
        this._numberToSectionMapping[21] = we.ro.BetField.DIRECT_21;
        this._numberToSectionMapping[22] = we.ro.BetField.DIRECT_22;
        this._numberToSectionMapping[23] = we.ro.BetField.DIRECT_23;
        this._numberToSectionMapping[24] = we.ro.BetField.DIRECT_24;
        this._numberToSectionMapping[25] = we.ro.BetField.DIRECT_25;
        this._numberToSectionMapping[26] = we.ro.BetField.DIRECT_26;
        this._numberToSectionMapping[27] = we.ro.BetField.DIRECT_27;
        this._numberToSectionMapping[28] = we.ro.BetField.DIRECT_28;
        this._numberToSectionMapping[29] = we.ro.BetField.DIRECT_29;
        this._numberToSectionMapping[30] = we.ro.BetField.DIRECT_30;
        this._numberToSectionMapping[31] = we.ro.BetField.DIRECT_31;
        this._numberToSectionMapping[32] = we.ro.BetField.DIRECT_32;
        this._numberToSectionMapping[33] = we.ro.BetField.DIRECT_33;
        this._numberToSectionMapping[34] = we.ro.BetField.DIRECT_34;
        this._numberToSectionMapping[35] = we.ro.BetField.DIRECT_35;
        this._numberToSectionMapping[36] = we.ro.BetField.DIRECT_36;

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

      public updateBetFields(betDetails: data.BetDetail[]) {
        this._cfmBetDetails = betDetails;

        // update the already bet amount of each bet field
        this._cfmBetDetails.map((value, index) => {
          if (this._betChipStackMapping[value.field]) {
            this._betChipStackMapping[value.field].cfmBet = value.amount;
            this._betChipStackMapping[value.field].draw();
          }
        });
      }

      public onBetFieldUpdate(fieldName) {
        const grid = this.getUncfmBetByField(fieldName);
        const betDetail = { field: fieldName, amount: this.getOrderAmount() };
        // validate bet action
        if (this.validateBetAction(betDetail)) {
          // update the uncfmBetDetails
          for (const detail of this._uncfmBetDetails) {
            if (detail.field === betDetail.field) {
              detail.amount += betDetail.amount;
              break;
            }
          }
          // update the corresponding table grid
          this.undoStack.push(new Date().getTime(), we.utils.clone({ field: fieldName, amount: grid ? grid.amount : 0 }), this.undoBetFieldUpdate.bind(this));
        }
        if (this._betChipStackMapping[fieldName]) {
          this._betChipStackMapping[fieldName].uncfmBet = grid ? grid.amount : 0;
          this._betChipStackMapping[fieldName].draw();
        }
      }

      protected undoBetFieldUpdate(data: { fieldName: string; amount: number }) {
        if (this._betChipStackMapping[data.fieldName]) {
          this._betChipStackMapping[data.fieldName].uncfmBet -= data.amount;
          this._betChipStackMapping[data.fieldName].draw();
        }
        this._uncfmBetDetails.forEach(value => {
          if (value.field === data.fieldName) {
            value.amount -= data.amount;
          }
        });
      }

      public onDoublePressed() {
        this._undoStack.push(new Date().getTime(), we.utils.clone(this._uncfmBetDetails), this.undoDoubleBetFields.bind(this));
        this.doubleBetFields();
      }

      public undoDoubleBetFields(betDetails: data.BetDetail[]) {
        betDetails.map(value => {
          if (this._betChipStackMapping[value.field]) {
            this._betChipStackMapping[value.field].uncfmBet = value.amount;
            this._betChipStackMapping[value.field].draw();
          }
        });
        this._uncfmBetDetails = betDetails;
      }

      public doubleBetFields() {
        const validDoubleBet = this._cfmBetDetails.reduce((acc, cur) => {
          if (cur.amount === 0) {
            return acc && true;
          }
          const betDetail = { field: cur.field, amount: cur.amount };
          return this.validateBetAction(betDetail) ? acc && true : false;
        }, true);
        if (!validDoubleBet) {
          return;
        }
        this._cfmBetDetails.map(value => {
          const addedAmount = value.amount;
          if (addedAmount > 0) {
            if (this._betChipStackMapping[value.field]) {
              this._betChipStackMapping[value.field].uncfmBet += addedAmount;
              this._betChipStackMapping[value.field].draw();
            }
            for (const detail of this._uncfmBetDetails) {
              if (detail.field === value.field) {
                detail.amount += addedAmount;
                break;
              }
            }
          }
        });
      }

      public onRepeatPressed() {
        this._undoStack.push(new Date(), we.utils.clone(this._uncfmBetDetails), this.undoRepeatBetFields.bind(this));
        this.repeatBetFields();
      }

      protected undoRepeatBetFields(betDetails: data.BetDetail[]) {
        betDetails.map(value => {
          this.getUncfmBetByField(value.field).amount = value.amount;
        });
        this._uncfmBetDetails = betDetails;
      }

      public repeatBetFields() {
        if (!env.tableInfos[this._tableId].prevbets || !env.tableInfos[this._tableId].prevroundid) {
          return;
        }
        if (env.tableInfos[this._tableId].prevroundid !== env.tableInfos[this._tableId].prevbetsroundid) {
          return;
        }
        const validRepeatBet = this._cfmBetDetails.reduce((acc, cur) => {
          if (cur.amount === 0) {
            return acc && true;
          }
          const betDetail = { field: cur.field, amount: cur.amount };
          return this.validateBetAction(betDetail) ? acc && true : false;
        }, true);
        if (!validRepeatBet) {
          return;
        }
        env.tableInfos[this._tableId].prevbets.map(value => {
          this._betChipStackMapping[value.field].uncfmBet = value.amount;
          this._betChipStackMapping[value.field].draw();
          for (const detail of this._uncfmBetDetails) {
            if (detail.field === value.field) {
              detail.amount += value.amount;
              break;
            }
          }
        });
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

      public set chipLayer(value: we.ui.ChipLayer) {
        this._chipLayer = value;
      }

      public get chipLayer() {
        return this._chipLayer;
      }
    }
  }
}
