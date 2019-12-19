namespace we {
  export namespace overlay {
    export class CustomRoad extends ui.Panel {
      private _txt_title: ui.RunTimeLabel;
      private scroller: ui.Scroller;
      private collection: eui.ArrayCollection;
      private _editRoadPanel: ba.GoodRoadEditItem;
      public _cover: eui.Rect;

      constructor() {
        super('overlay/CustomRoad');
      }

      protected mount() {
        this._txt_title.renderText = () => `${i18n.t('overlaypanel_customroad_title')}`;

        this.collection = new eui.ArrayCollection([]); // road ids

        this.scroller = new ui.Scroller();
        this.scroller.width = 1643;
        this.scroller.height = 766;
        this.scroller.x = 28;
        this.scroller.y = 130;
        this.content.addChildAt(this.scroller, 1);

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

        // listen to the Good Road Edit events
        dir.evtHandler.addEventListener(core.Event.GOOD_ROAD_ADD, this.onRoadAdd, this);
        dir.evtHandler.addEventListener(core.Event.GOOD_ROAD_EDIT, this.onRoadEdit, this);
        dir.evtHandler.addEventListener(core.Event.GOOD_ROAD_MODIFY, this.onRoadModify, this);
        dir.evtHandler.addEventListener(core.Event.GOOD_ROAD_REMOVE, this.onRoadRemove, this);

        // get the Good Road Data from server or env if it exist
        dir.evtHandler.addEventListener(core.Event.GOOD_ROAD_DATA_UPDATE, this.onRoadDataUpdated, this);
        if (!env.goodRoadData) {
          dir.socket.getGoodRoad();
        } else {
          this.renderFromGoodRoadData();
        }
        this._cover.visible = false;
      }

      protected destroy() {
        super.destroy();
        if (dir.evtHandler.hasEventListener(core.Event.GOOD_ROAD_ADD)) {
          dir.evtHandler.removeEventListener(core.Event.GOOD_ROAD_ADD, this.onRoadAdd, this);
        }

        if (dir.evtHandler.hasEventListener(core.Event.GOOD_ROAD_EDIT)) {
          dir.evtHandler.removeEventListener(core.Event.GOOD_ROAD_EDIT, this.onRoadEdit, this);
        }

        if (dir.evtHandler.hasEventListener(core.Event.GOOD_ROAD_MODIFY)) {
          dir.evtHandler.removeEventListener(core.Event.GOOD_ROAD_MODIFY, this.onRoadModify, this);
        }

        if (dir.evtHandler.hasEventListener(core.Event.GOOD_ROAD_REMOVE)) {
          dir.evtHandler.removeEventListener(core.Event.GOOD_ROAD_REMOVE, this.onRoadRemove, this);
        }

        if (dir.evtHandler.hasEventListener(core.Event.GOOD_ROAD_DATA_UPDATE)) {
          dir.evtHandler.removeEventListener(core.Event.GOOD_ROAD_DATA_UPDATE, this.onRoadDataUpdated, this);
        }
      }

      private onRoadDataUpdated(e: egret.Event) {
        this.renderFromGoodRoadData();
      }

      private onRoadAdd(e: egret.Event) {
        if (!this._editRoadPanel.isActivated) {
          this._editRoadPanel.show();
          this._editRoadPanel.setByObject({ type: 0 });
          this._editRoadPanel.x = e.data.item.x + this.scroller.x - 14;
          this._editRoadPanel.y = e.data.item.y + this.scroller.y - 24 - this.scroller.viewport.scrollV;
          this._cover.visible = true;
        }
      }
      private onRoadEdit(e: egret.Event) {
        if (!this._editRoadPanel.isActivated) {
          this._editRoadPanel.show();
          this._editRoadPanel.setByObject(e.data.itemData);
          this._editRoadPanel.x = e.data.item.x + this.scroller.x - 14;
          this._editRoadPanel.y = e.data.item.y + this.scroller.y - 24 - this.scroller.viewport.scrollV;
          this._cover.visible = true;
        }
      }
      private onRoadModify(e: egret.Event) {}
      private onRoadRemove(e: egret.Event) {}

      private renderFromGoodRoadData() {
        const roadData = env.goodRoadData;

        // clean existing roads
        this.collection.removeAll();

        // default roads
        roadData.default.forEach(element => {
          element.type = 1;
          this.collection.addItem(element);
        });

        // custom roads
        roadData.custom.forEach(element => {
          element.type = 2;
          this.collection.addItem(element);
        });

        // add road
        this.collection.addItem({
          type: 0,
        });
      }

      private compareItems(a: any, b: any): boolean {
        return a.name === b.name && a.id === b.id && a.pattern === b.pattern && a.enabled === b.enabled;
      }
    }
  }
}
