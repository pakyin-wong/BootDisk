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
          we.ro.getNeighbour(ro.directfield2num(fieldName), this._raceTrackControl.value).map(value => {
            this._raceTrackTableLayer.onRollover(ro.num2directfield(value));
            this._chipLayer.onGridRollover(ro.num2directfield(value));
          });
        };
      }

      protected onRollout(fieldName: string) {
        return (evt: egret.Event) => {
          we.ro.getNeighbour(ro.directfield2num(fieldName), this._raceTrackControl.value).map(value => {
            this._raceTrackTableLayer.onRollout(ro.num2directfield(value));
            this._chipLayer.onGridRollout(ro.num2directfield(value));
          });
        };
      }

      protected onTouchTap(fieldName: string) {
        return (evt: egret.Event) => {
          const hashkey = Date.now().toString();
          we.ro.getNeighbour(ro.directfield2num[fieldName], this._raceTrackControl.value).map(value => {
            this._chipLayer.onBetFieldUpdate(ro.num2directfield[value], hashkey);
          });
        };
      }

      protected onInnerFieldRollover(fieldName: string) {
        return (evt: egret.Event) => {
          this._raceTrackTableLayer.onRollover(fieldName);
          BETFIELD_MAPPING[fieldName].map(value => {
            this._chipLayer.onGridRollover(value);
          });
        };
      }

      protected onInnerFieldRollout(fieldName: string) {
        return (evt: egret.Event) => {
          this._raceTrackTableLayer.onRollout(fieldName);
          BETFIELD_MAPPING[fieldName].map(value => {
            this._chipLayer.onGridRollout(value);
          });
        };
      }

      protected onInnerFieldTouchTap(fieldName: string) {
        return (evt: egret.Event) => {
          const hashkey = Date.now().toString();
          BETFIELD_MAPPING[fieldName].map(value => {
            this._chipLayer.onBetFieldUpdate(value, hashkey);
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
