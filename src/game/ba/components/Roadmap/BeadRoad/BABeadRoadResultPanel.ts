namespace we {
  export namespace ba {
    export class BaBeadRoadResultPanel extends ui.Panel {
      protected _playerPanel: eui.Image;
      protected _bankerPanel: eui.Image;

      protected createChildren() {
        super.createChildren();
        this.skinName = utils.getSkin('BABeadRoadResultPanel');
      }

      constructor() {
        super();
      }
    }
  }
}
