namespace we {
  export namespace ba {
    export class GoodRoadListHolder extends ui.ItemRenderer {
      public selected: boolean;
      public itemIndex: number;

      private _item: we.ba.GoodRoadListItem;
      protected destinationX: number = Infinity;
      protected destinationY: number = Infinity;
      protected isDirty = true;

      private roadId: string;
      private roadName: string;
      private roadPattern: string;
      private roadEnabled: boolean;
      private roadType: number;

      public constructor() {
        super();
        this.touchEnabled = true;
        this.mount();
      }
      public get item() {
        return this._item;
      }
      public get _roadId() {
        return this.roadId;
      }
      private async mount() {
        // this.width = 293;
        // this.height = 225;
        this._item = new we.ba.GoodRoadListItem();
        this._item.addEventListener('onAddTap', this.onItemAdd, this);
        this._item.addEventListener('onEditTap', this.onItemEdit, this);
        this._item.addEventListener('onBinTap', this.onItemBin, this);
        this._item.addEventListener('onEnableChanged', this.onItemEnableChanged, this);

        this.addChild(this._item);
      }

      protected destroy() {
        super.destroy();
        if (this._item) {
          if (this._item.hasEventListener('onAddTap')) {
            this._item.removeEventListener('onAddTap', this.onItemAdd, this);
          }

          if (this._item.hasEventListener('onEditTap')) {
            this._item.removeEventListener('onEditTap', this.onItemEdit, this);
          }

          if (this._item.hasEventListener('onBinTap')) {
            this._item.removeEventListener('onBinTap', this.onItemBin, this);
          }

          if (this._item.hasEventListener('onEnableChanged')) {
            this._item.removeEventListener('onEnableChanged', this.onItemEnableChanged, this);
          }
        }
      }

      private onItemAdd(e: egret.Event) {
        if (this.roadType === 0) {
          // add
          dir.evtHandler.dispatch(core.Event.GOOD_ROAD_ADD, { itemData: this.itemData, itemIndex: this.itemIndex, item: this });
        }
      }
      private onItemEdit(e: egret.Event) {
        if (this.roadType === 2) {
          // custom
          dir.evtHandler.dispatch(core.Event.GOOD_ROAD_EDIT, { itemData: this.itemData, itemIndex: this.itemIndex, item: this });
        }
      }
      private onItemBin(e: egret.Event) {
        if (this.roadType === 2) {
          // custom
          dir.evtHandler.dispatch(core.Event.GOOD_ROAD_REMOVE, { id: this.roadId });
        }
      }
      public onItemEnableChanged(e: egret.Event) {
        if (this.roadType === 1) {
          // default
          dir.evtHandler.dispatch(core.Event.GOOD_ROAD_MODIFY, { id: this.roadId, enabled: e.data, roadType: 1 });
        } else if (this.roadType === 2) {
          // custom
          dir.evtHandler.dispatch(core.Event.GOOD_ROAD_MODIFY, { id: this.roadId, name: this.roadName, pattern: this.roadPattern, enabled: e.data, roadType: 2 });
        }
      }

      protected commitProperties() {
        super.commitProperties();
        this._item.currentState = this.getCurrentState();
      }

      public itemDataChanged() {
        super.itemDataChanged();
        /*sample this.itemData
        {
          type:0,
          id: 'Bxxeeeeea',
          name: '??xxyy', // key for localization
          pattern: 'bbbpbpbp',
          enabled: true,
        }
        */
        this.roadType = this.itemData.type;
        this.roadId = this.itemData.id;
        this.roadName = this.itemData.name;
        this.roadPattern = this.itemData.pattern;
        this.roadEnabled = this.itemData.enabled;

        this._item.setRoadType(this.roadType);
        this._item.setRoadName(this.roadName);
        if (this.roadType > 0) {
          this._item.setRoadData(this.roadPattern);
          this._item.setRoadEnabled(this.roadEnabled);
        }
      }
    }
  }
}
