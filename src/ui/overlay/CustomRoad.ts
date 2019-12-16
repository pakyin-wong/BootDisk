namespace we {
  export namespace overlay {
    export class CustomRoad extends ui.Panel {
      private _txt_title: ui.RunTimeLabel;
      private scroller: ui.Scroller;
      private collection: eui.ArrayCollection;

      constructor() {
        super('overlay/CustomRoad');
        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
      }

      private changeLang() {}

      protected mount() {
        this._txt_title.renderText = () => `${i18n.t('overlaypanel_customroad_title')}`;

        this.collection = new eui.ArrayCollection([1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3]); // road ids

        this.scroller = new ui.Scroller();
        this.scroller.width = 1643;
        this.scroller.height = 750;
        this.scroller.x = 28;
        this.scroller.y = 146;
        this.addChild(this.scroller);

        const roomList = new ui.List();
        const layout2 = new eui.AnimTileLayout();
        layout2.horizontalGap = 32;
        layout2.verticalGap = 36;
        layout2.paddingTop = 16;
        layout2.paddingBottom = 20;
        layout2.paddingLeft = 20;
        layout2.requestedColumnCount = 5;
        roomList.layout = layout2;
        roomList.dataProvider = this.collection;
        roomList.itemRenderer = we.ba.GoodRoadListHolder;
        roomList.useVirtualLayout = false;

        this.scroller.viewport = roomList;

        const road = new we.ba.GoodRoadmap();
        this.addChild(road);

        road.updateRoadData('bbppb');
      }
    }
  }
}
