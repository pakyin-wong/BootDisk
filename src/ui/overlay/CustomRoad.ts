namespace we {
  export namespace overlay {
    export class CustomRoad extends ui.Panel {
      private _txt_title: ui.RunTimeLabel;
      private scroller: ui.Scroller;
      private collection: eui.ArrayCollection;
      private _editRoadPanel: ba.GoodRoadEditItem;

      private _sampleData: any;
      private _sampleData2: any;

      constructor() {
        super('overlay/CustomRoad');
        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        this._sampleData = {
          default: [
            {
              id: 'r1',
              name: 'r1', // key for localization
              pattern: 'pbpbpbpbppbbp',
              enabled: true,
            },
            {
              id: 'r2',
              name: 'r2', // key for localization
              pattern: 'bbppbpbppbb',
              enabled: false,
            },
          ],
          custom: [
            {
              id: 'BMJCP2DH5S5VCC8S9RHG',
              name: '好路1234', // key for localization
              pattern: 'pbpbpbp',
              enabled: true,
            },
            {
              id: 'Bxxeeeeea',
              name: '好路xxyy', // key for localization
              pattern: 'bbbpbpbp',
              enabled: false,
            },
          ],
        };

        this._sampleData2 = {
          default: [
            {
              id: 'r1',
              name: 'r1', // key for localization
              pattern: 'pbpbpbpbppbbp',
              enabled: true,
            },
            {
              id: 'r2',
              name: 'r2', // key for localization
              pattern: 'bbppbpbppbb',
              enabled: true,
            },
          ],
          custom: [
            {
              id: 'BMJCP2DH5S5VCC8S9RHG',
              name: '好路1234', // key for localization
              pattern: 'pbpbpbp',
              enabled: true,
            },
            {
              id: 'Bxxeeeeea',
              name: '好路xxyy', // key for localization
              pattern: 'bbbpbpbp',
              enabled: true,
            },
          ],
        };
      }

      private changeLang() {}

      protected mount() {
        this._txt_title.renderText = () => `${i18n.t('overlaypanel_customroad_title')}`;

        this.collection = new eui.ArrayCollection([]); // road ids

        this.scroller = new ui.Scroller();
        this.scroller.width = 1643;
        this.scroller.height = 750;
        this.scroller.x = 28;
        this.scroller.y = 146;
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

        roomList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);

        this.scroller.viewport = roomList;

        // const road = new we.ba.GoodRoadmapEdit();
        // this.addChild(road);
        // road.updateRoadData('bbppb');

        // const road = new we.ba.GoodRoadEditItem();
        // this.addChild(road);
        this.initRoad();
        dir.socket.getGoodRoad(data => {
          console.log('roadData', data);
        }, this);

        dir.evtHandler.addEventListener(core.Event.GOOD_ROAD_ADD, this.onRoadAdd, this);
        dir.evtHandler.addEventListener(core.Event.GOOD_ROAD_EDIT, this.onRoadEdit, this);
        dir.evtHandler.addEventListener(core.Event.GOOD_ROAD_MODIFY, this.onRoadModify, this);
        dir.evtHandler.addEventListener(core.Event.GOOD_ROAD_REMOVE, this.onRoadRemove, this);
      }
      private onRoadAdd(e: egret.Event) {
        if (!this._editRoadPanel.isActivated) {
          this._editRoadPanel.show();
          this._editRoadPanel.setByObject({ type: 0 });
          this._editRoadPanel.x = e.data.item.x + this.scroller.x - 14;
          this._editRoadPanel.y = e.data.item.y + this.scroller.y - 24;
        }
      }
      private onRoadEdit(e: egret.Event) {
        if (!this._editRoadPanel.isActivated) {
          this._editRoadPanel.show();
          this._editRoadPanel.setByObject(e.data.itemData);
          this._editRoadPanel.x = e.data.item.x + this.scroller.x - 14;
          this._editRoadPanel.y = e.data.item.y + this.scroller.y - 24;
        }
      }
      private onRoadModify(e: egret.Event) {}
      private onRoadRemove(e: egret.Event) {}

      private initRoad() {
        const roadData = this._sampleData;

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

      private initRoad2() {
        const roadData = this._sampleData2;

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

      private onItemTap(e: eui.ItemTapEvent) {
        const item: we.ba.GoodRoadListHolder = e.itemRenderer as we.ba.GoodRoadListHolder;
        console.log(item);
      }
    }
  }
}
