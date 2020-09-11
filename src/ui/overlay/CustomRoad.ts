namespace we {
  export namespace overlay {
    export class CustomRoad extends ui.Panel {
      protected _txt_title: ui.RunTimeLabel;
      protected scroller: ui.Scroller;
      protected roomList: ui.List;
      protected collection: eui.ArrayCollection;
      protected _editRoadPanel: ba.GoodRoadEditItem;
      protected _cover: eui.Rect;
      protected _defaultButton: ui.RoundRectButton;
      protected _selectAllButton: ui.ToggleButton;

      constructor() {
        super('CustomRoad');
      }

      protected mount() {
        this.initCustomRoad();
      }

      protected initCustomRoad() {
        this._txt_title.renderText = () => `${i18n.t('overlaypanel_customroad_title')}`;

        this.collection = new eui.ArrayCollection([]); // road ids
        this.roomList.dataProvider = this.collection;
        this.roomList.itemRenderer = we.ba.GoodRoadListHolder;
        this.roomList.useVirtualLayout = false;

        // listen to the Good Road Edit events
        dir.evtHandler.addEventListener(core.Event.GOOD_ROAD_ADD, this.onRoadAdd, this);
        dir.evtHandler.addEventListener(core.Event.GOOD_ROAD_EDIT, this.onRoadEdit, this);
        dir.evtHandler.addEventListener(core.Event.GOOD_ROAD_MODIFY, this.onRoadModify, this);
        dir.evtHandler.addEventListener(core.Event.GOOD_ROAD_REMOVE, this.onRoadRemove, this);

        this._editRoadPanel.addEventListener('close', this.onEditPanelClosed, this);
        this._selectAllButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.selectAll,this);
        // get the Good Road Data from server or env if it exist
        dir.evtHandler.addEventListener(core.Event.GOOD_ROAD_DATA_UPDATE, this.onRoadDataUpdated, this);
        if (!env.goodRoadData) {
          dir.socket.getGoodRoad();
        } else {
          this.renderFromGoodRoadData();
        }
        this._cover.visible = false;

        this._defaultButton.label.renderText = () => `${i18n.t('overlaypanel_customroad_default')}`;
        this._defaultButton.label.size = env.isMobile ? 50 : 24;
        this._defaultButton.label.alpha = 0.7;

        this._defaultButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDefaultClicked, this);
      }

      protected onDefaultClicked(e: egret.TouchEvent) {
        dir.socket.resetGoodRoadmap();
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
        
        if (this._selectAllButton.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
          this._selectAllButton.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.selectAll,this);
        }
        this._editRoadPanel.removeEventListener('close', this.onEditPanelClosed, this);
      }

      protected onRoadDataUpdated(e: egret.Event) {
        this._cover.visible = false;
        this.renderFromGoodRoadData();
      }
      protected selectAll(){
        console.log('selectAll')
      }

      protected onRoadAdd(e: egret.Event) {
        if (!this._editRoadPanel.isActivated) {
          this._editRoadPanel.show();
          this._editRoadPanel.setByObject({ type: 0 });
          this._editRoadPanel.x = e.data.item.x + this.scroller.x - 14;
          this._editRoadPanel.y = e.data.item.y + this.scroller.y - 24 - this.scroller.viewport.scrollV;
          this._cover.visible = true;
        }
      }
      protected onRoadEdit(e: egret.Event) {
        if (!this._editRoadPanel.isActivated) {
          this._editRoadPanel.show();
          this._editRoadPanel.setByObject(e.data.itemData);
          this._editRoadPanel.x = e.data.item.x + this.scroller.x - 14;
          this._editRoadPanel.y = e.data.item.y + this.scroller.y - 24 - this.scroller.viewport.scrollV;
          this._cover.visible = true;
        }
      }
      protected onRoadModify(e: egret.Event) {
        if (e.data.roadType === 1) {
          // default
          const roadsEnabled = [];
          const defaults: data.GoodRoadMapItemData[] = env.goodRoadData.default.slice();
          defaults.forEach(element => {
            if (element.id === e.data.id) {
              element.enabled = e.data.enabled;
            }
            if (element.enabled) {
              roadsEnabled.push(element.id);
            }
          });

          dir.socket.updateDefaultGoodRoad(roadsEnabled);
        } else if (e.data.roadType === 2) {
          // custom
          dir.socket.updateCustomGoodRoad(e.data.id, e.data);
        }
      }
      protected onRoadRemove(e: egret.Event) {
        // remove custom road
        dir.socket.removeGoodRoadmap(e.data.id);
      }

      protected renderFromGoodRoadData() {
        const roadData: data.GoodRoadMapData = env.goodRoadData;

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

        this.insertNewRoadColumn();
      }

      protected insertNewRoadColumn() {
        const roadData: data.GoodRoadMapData = env.goodRoadData;

        if (roadData.custom.length < 10) {
          // add road
          this.collection.addItem({
            type: 0,
          });
        }
      }

      protected onEditPanelClosed() {
        this._cover.visible = false;
      }

      protected compareItems(a: any, b: any): boolean {
        return a.name === b.name && a.id === b.id && a.pattern === b.pattern && a.enabled === b.enabled;
      }
    }
  }
}
