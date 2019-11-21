/** Over-Scene Global Controller */
namespace we {
  export namespace core {
    export class Monitor {
      public testCollapser1: ui.Collapser;
      public testCollapser2: ui.Collapser;
      public testCollapser3: ui.Collapser;
      public testCollapser4: ui.Collapser;
      public testDropDown: ui.Popper;
      public testDropDownToggle: eui.Button;

      public start(stage: egret.Stage) {
        const _nav = new ui.Nav();
        dir.layerCtr.nav.addChild(_nav);

        this.testCollapser1 = new ui.Collapser();
        this.testCollapser1.$x = 2360;
        this.testCollapser1.$y = 920;
        this.testCollapser1.width = 200;
        this.testCollapser1.height = 400;
        dir.layerCtr.top.addChild(this.testCollapser1);

        this.testCollapser2 = new ui.Collapser();
        this.testCollapser2.$x = 0;
        this.testCollapser2.$y = 920;
        this.testCollapser2.width = 200;
        this.testCollapser2.height = 400;
        this.testCollapser2.direction = 'bottomup';
        this.testCollapser2.snap = 'left';
        dir.layerCtr.top.addChild(this.testCollapser2);

        this.testCollapser3 = new ui.Collapser();
        this.testCollapser3.$x = 210;
        this.testCollapser3.$y = 920;
        this.testCollapser3.width = 200;
        this.testCollapser3.height = 400;
        this.testCollapser3.snap = 'left';
        this.testCollapser3.setToScrollMode();
        dir.layerCtr.top.addChild(this.testCollapser3);

        this.testCollapser4 = new ui.Collapser();
        this.testCollapser4.$x = 10;
        this.testCollapser4.$y = 100;
        this.testCollapser4.width = 200;
        this.testCollapser4.height = 200;
        this.testCollapser4.snap = 'left';
        this.testCollapser4.setToScrollMode();
        this.testCollapser4.setItem([new eui.Button(), new eui.Button(), new eui.Button(), new eui.Button(), new eui.Button()]);

        this.testDropDownToggle = new eui.Button();
        this.testDropDownToggle.label = 'Drop down demo';
        this.testDropDownToggle.$x = 10;
        this.testDropDownToggle.$y = 10;

        this.testDropDown = new ui.Popper();
        this.testDropDown.content = this.testCollapser4;
        this.testDropDown.setToggler(this.testDropDownToggle);
        dir.layerCtr.top.addChild(this.testDropDownToggle);
        dir.layerCtr.top.addChild(this.testDropDown);

        setInterval(this.testCollapserbehavior.bind(this), 1000);

        const _betsummary = new we.ui.BetSummary();
        dir.layerCtr.nav.addChild(_betsummary);
      }

      public testCollapserbehavior() {
        this.testCollapser1.addItem(new eui.Button());
        this.testCollapser2.addItem(new eui.Button());
        this.testCollapser3.addItem(new eui.Button());
      }
    }
  }
}
