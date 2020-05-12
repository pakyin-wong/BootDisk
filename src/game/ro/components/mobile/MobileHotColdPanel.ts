namespace we {
  export namespace ro {
    export class MobileHotColdPanel extends core.BaseGamePanel implements IHotColdPanel {
      public hotNumLimit: number = 3;
      public coldNumLimit: number = 3;
      public numSize: number = 64;

      protected _hotnum: eui.Group;
      protected _coldnum: eui.Group;

      protected init() {
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
      }

      public setHotCold(hotNumbers: number[], coldNumbers: number[]) {
        for (let i = 0; i < this.hotNumLimit; i++) {
          const h: ROBeadRoadIcon = this._hotnum.getChildAt(i) as ROBeadRoadIcon;
          h && h.setByObject({ v: hotNumbers[i] });
        }

        for (let i = 0; i < this.coldNumLimit; i++) {
          const c: ROBeadRoadIcon = this._coldnum.getChildAt(i) as ROBeadRoadIcon;
          c && c.setByObject({ v: coldNumbers[i] });
        }
      }
    }
  }
}
