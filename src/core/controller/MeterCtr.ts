namespace we {
  export namespace core {
    export class MeterCtr {
      private _local = {};
      private _tween = {};
      private _list = {};

      constructor() {}

      public rackTo(meter: string, to: number, duration: number) {
        if (duration < 1) {
          this.setTo(meter, to);
          return;
        }

        this.clean(meter);

        this._tween[meter] = {
          m: meter,
          v: this._local[meter],
          t: to,
        };

        const self = this;
        const onTweenUpdate = function () {
          self.update(this.m, this.v);
        };
        egret.Tween.get(this._tween[meter], { onChange: onTweenUpdate, onChangeObj: this._tween[meter] }).to({ v: to }, duration);
      }

      public setTo(meter: string, to: number) {
        this.clean(meter);
        this.update(meter, to);
      }

      public isRacking(meter: string) {
        return this._tween[meter] ? this._tween[meter] : false;
      }

      public getLocal(meter: string) {
        return this.format(this._local[meter]);
      }

      private update(meter: string, to: number) {
        this._local[meter] = to;
        dir.evtHandler.dispatch(core.Event.METER_UPDATE, { meter, to: this.format(to) });

        if (!this._list[meter]) {
          return;
        }
        for (const i of this._list[meter]) {
          i.render && i.render();
        }
      }

      private format(v: number) {
        // To-do meter formatter ....

        // return `${utils.EnumHelpers.getKeyByValue(core.Currency, env.currency)} ${v}`;
        try {
          return utils.formatNumber(v, true);
        } catch (e) {
          return '- - - -';
        }
      }

      private clean(meter: string) {
        if (this.isRacking(meter)) {
          egret.Tween.removeTweens(this._tween[meter]);
          delete this._tween[meter];
        }
      }

      public get meterList() {
        return this._list;
      }

      public register(meter: string, item: ui.IRunTimeComponent) {
        return !this._list[meter] ? (this._list[meter] = [item]) : this._list[meter].indexOf(item) < 0 ? this._list[meter].push(item) : null;
      }

      public drop(meter: string, item: ui.IRunTimeComponent) {
        this._list[meter] && this._list[meter].indexOf(item) >= 0 && this._list[meter].splice(this._list[meter].indexOf(item), 1);
      }
    }
  }
}
