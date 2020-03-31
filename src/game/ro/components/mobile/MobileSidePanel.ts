namespace we {
  export namespace ro {
    export class MobileSidePanel extends core.BaseGamePanel implements IHotColdPanel {
      public hotNumLimit: number = 3;
      public coldNumLimit: number = 3;
      public numSize: number = 64;

      protected _hotnum: eui.Group;
      protected _coldnum: eui.Group;

      protected _btn_race: egret.DisplayObject;

      protected mount() {
        super.mount();

        for (let i = 0; i < this.hotNumLimit; i++) {
          const icon = new ROBeadRoadIcon(this.numSize, 0x262a2b, 1);
          const checker = this._hotnum.getChildAt(i);
          icon.$x = checker.x;
          icon.$y = checker.y;
          this._hotnum.removeChildAt(i);
          this._hotnum.addChildAt(icon, i);
        }

        for (let i = 0; i < this.coldNumLimit; i++) {
          const icon = new ROBeadRoadIcon(this.numSize, 0x262a2b, 1);
          const checker = this._coldnum.getChildAt(i);
          icon.$x = checker.x;
          icon.$y = checker.y;
          this._coldnum.removeChildAt(i);
          this._coldnum.addChildAt(icon, i);
        }

        this.addListeners();
      }

      protected addListeners() {
        utils.addButtonListener(this._btn_race, this.onClickRace, this);
      }

      protected removeListeners() {
        utils.removeButtonListener(this._btn_race, this.onClickRace, this);
      }

      protected onClickRace() {
        this.dispatchEvent(new egret.Event('RACE_BTN_CLICKED'));
      }

      public setHotCold(hotNumbers: number[], coldNumbers: number[]) {
        for (let i = 0; i < this.hotNumLimit; i++) {
          const h: ROBeadRoadIcon = this._hotnum.getChildAt(i) as ROBeadRoadIcon;
          h.setByObject({ v: hotNumbers[i] });
        }

        for (let i = 0; i < this.coldNumLimit; i++) {
          const c: ROBeadRoadIcon = this._coldnum.getChildAt(i) as ROBeadRoadIcon;
          c.setByObject({ v: coldNumbers[i] });
        }
      }
    }
  }
}
