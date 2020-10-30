namespace we {
  export namespace lo {
    export class LoAnalysisScrollListItem extends ui.ItemRenderer {
      public constructor() {
        super();
      }

      public itemDataChanged() {
        super.itemDataChanged();
        this.removeChildren();

        const list = new LoAnalysisList(this.itemData.renderType, this.itemData.rowCount);
        list.update(this.itemData);
        this.addChild(list);
      }
    }
  }
}
