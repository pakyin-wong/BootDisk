namespace we {
  export namespace ro {
    export class RaceTrackChipLayer extends core.BaseEUI {
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

      protected _numberToSectionMapping: { [a: number]: string };
      protected _sectionToNumberMapping: { [s: string]: number };
      protected _sectionMapping: { [s: string]: eui.Image };
      protected _innerSectionMapping: { [s: string]: any };

      protected _raceTrackControl: RaceTrackControl;
      protected _raceTrackTableLayer: RaceTrackTableLayer;
      protected _chipLayer: we.ui.ChipLayer;

      public constructor() {
        super('ro/RaceTrackChipLayer');
      }

      protected mount() {
        this._sectionMapping = {};
        this._sectionMapping[we.ro.BetField.DIRECT_0] = this._section_0;
        this._sectionMapping[we.ro.BetField.DIRECT_1] = this._section_1;
        this._sectionMapping[we.ro.BetField.DIRECT_2] = this._section_2;
        this._sectionMapping[we.ro.BetField.DIRECT_3] = this._section_3;
        this._sectionMapping[we.ro.BetField.DIRECT_4] = this._section_4;
        this._sectionMapping[we.ro.BetField.DIRECT_5] = this._section_5;
        this._sectionMapping[we.ro.BetField.DIRECT_6] = this._section_6;
        this._sectionMapping[we.ro.BetField.DIRECT_7] = this._section_7;
        this._sectionMapping[we.ro.BetField.DIRECT_8] = this._section_8;
        this._sectionMapping[we.ro.BetField.DIRECT_9] = this._section_9;
        this._sectionMapping[we.ro.BetField.DIRECT_10] = this._section_10;
        this._sectionMapping[we.ro.BetField.DIRECT_11] = this._section_11;
        this._sectionMapping[we.ro.BetField.DIRECT_12] = this._section_12;
        this._sectionMapping[we.ro.BetField.DIRECT_13] = this._section_13;
        this._sectionMapping[we.ro.BetField.DIRECT_14] = this._section_14;
        this._sectionMapping[we.ro.BetField.DIRECT_15] = this._section_15;
        this._sectionMapping[we.ro.BetField.DIRECT_16] = this._section_16;
        this._sectionMapping[we.ro.BetField.DIRECT_17] = this._section_17;
        this._sectionMapping[we.ro.BetField.DIRECT_18] = this._section_18;
        this._sectionMapping[we.ro.BetField.DIRECT_19] = this._section_19;
        this._sectionMapping[we.ro.BetField.DIRECT_20] = this._section_20;
        this._sectionMapping[we.ro.BetField.DIRECT_21] = this._section_21;
        this._sectionMapping[we.ro.BetField.DIRECT_22] = this._section_22;
        this._sectionMapping[we.ro.BetField.DIRECT_23] = this._section_23;
        this._sectionMapping[we.ro.BetField.DIRECT_24] = this._section_24;
        this._sectionMapping[we.ro.BetField.DIRECT_25] = this._section_25;
        this._sectionMapping[we.ro.BetField.DIRECT_26] = this._section_26;
        this._sectionMapping[we.ro.BetField.DIRECT_27] = this._section_27;
        this._sectionMapping[we.ro.BetField.DIRECT_28] = this._section_28;
        this._sectionMapping[we.ro.BetField.DIRECT_29] = this._section_29;
        this._sectionMapping[we.ro.BetField.DIRECT_30] = this._section_30;
        this._sectionMapping[we.ro.BetField.DIRECT_31] = this._section_31;
        this._sectionMapping[we.ro.BetField.DIRECT_32] = this._section_32;
        this._sectionMapping[we.ro.BetField.DIRECT_33] = this._section_33;
        this._sectionMapping[we.ro.BetField.DIRECT_34] = this._section_34;
        this._sectionMapping[we.ro.BetField.DIRECT_35] = this._section_35;
        this._sectionMapping[we.ro.BetField.DIRECT_36] = this._section_36;

        this._innerSectionMapping = {};
        this._innerSectionMapping[ro.BetField.ORPHANS] = this._section_orphelins;
        this._innerSectionMapping[ro.BetField.THE_THIRD] = this._section_tiers;
        this._innerSectionMapping[ro.BetField.NEIGHBORS_OF_ZERO] = this._section_voisins;
        this._innerSectionMapping[ro.BetField.ZERO_GAME] = this._section_zero;

        Object.keys(this._sectionMapping).map(value => {
          mouse.setButtonMode(this._sectionMapping[value], true);
        });

        Object.keys(this._innerSectionMapping).map(value => {
          mouse.setButtonMode(this._innerSectionMapping[value], true);
        });

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

        Object.keys(this._sectionMapping).map(value => {
          this._sectionMapping[value].addEventListener(mouse.MouseEvent.ROLL_OVER, this.onRollover(value), this);
          this._sectionMapping[value].addEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollout(value), this);
          this._sectionMapping[value].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap(value), this);
        });

        Object.keys(this._innerSectionMapping).map(value => {
          this._innerSectionMapping[value].addEventListener(mouse.MouseEvent.ROLL_OVER, this.onInnerFieldRollover(value), this);
          this._innerSectionMapping[value].addEventListener(mouse.MouseEvent.ROLL_OUT, this.onInnerFieldRollout(value), this);
          this._innerSectionMapping[value].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onInnerFieldTouchTap(value), this);
        });
      }

      protected onRollover(fieldName: string) {
        return (evt: egret.Event) => {
          we.ro.getNeighbour(this._sectionToNumberMapping[fieldName], this._raceTrackControl.value).map(value => {
            this._raceTrackTableLayer.onRollover(this._numberToSectionMapping[value]);
            this._chipLayer.onGridRollover(this._numberToSectionMapping[value]);
          });
        };
      }

      protected onRollout(fieldName: string) {
        return (evt: egret.Event) => {
          we.ro.getNeighbour(this._sectionToNumberMapping[fieldName], this._raceTrackControl.value).map(value => {
            this._raceTrackTableLayer.onRollout(this._numberToSectionMapping[value]);
            this._chipLayer.onGridRollout(this._numberToSectionMapping[value]);
          });
        };
      }

      protected onTouchTap(fieldName: string) {
        return (evt: egret.Event) => {
          we.ro.getNeighbour(this._sectionToNumberMapping[fieldName], this._raceTrackControl.value).map(value => {
            this._chipLayer.onBetFieldUpdate(this._numberToSectionMapping[value]);
          });
        };
      }

      protected onInnerFieldRollover(fieldName: string) {
        return (evt: egret.Event) => {
          this._raceTrackTableLayer.onRollover(fieldName);
          RACETRACK_INNERFIELD_MAPPING[fieldName].map(value => {
            this._chipLayer.onGridRollover(value);
          });
        };
      }

      protected onInnerFieldRollout(fieldName: string) {
        return (evt: egret.Event) => {
          this._raceTrackTableLayer.onRollout(fieldName);
          RACETRACK_INNERFIELD_MAPPING[fieldName].map(value => {
            this._chipLayer.onGridRollout(value);
          });
        };
      }

      protected onInnerFieldTouchTap(fieldName: string) {
        return (evt: egret.Event) => {
          RACETRACK_INNERFIELD_MAPPING[fieldName].map(value => {
            this._chipLayer.onBetFieldUpdate(value);
          });
        };
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
