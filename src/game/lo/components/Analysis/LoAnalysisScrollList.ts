namespace we {
  export namespace lo {
    export class LoAnalysisScrollList extends core.BaseEUI implements eui.UIComponent {
      protected scroller: eui.Scroller;
      protected renderType: number; // 0 for show, 1 for no show, 2 for hot, 3 for cold
      protected rowCount: number;
      protected paddingLeft: number;
      protected vWidth: number; // viewport width
      protected vHeight: number; // viewport height

      protected scrollList: eui.ListBase;
      public collection: eui.ArrayCollection;

      public constructor(renderType: number, rowCount: number, vWidth: number, vHeight: number, paddingLeft: number, skin: string = null, orientationDependent: boolean = true) {
        super(skin, orientationDependent);
        this.renderType = renderType;
        this.rowCount = rowCount;
        this.paddingLeft = paddingLeft;
        this.vHeight = vHeight;
        this.vWidth = vWidth;
        this.collection = new eui.ArrayCollection([]);
      }

      protected childrenCreated(): void {
        super.childrenCreated();
        this.initContent();
      }

      protected initContent() {
        this.scrollList = new eui.ListBase();
        this.scrollList.itemRenderer = LoAnalysisScrollListItem;
        this.scrollList.dataProvider = this.collection;

        const layout = new eui.HorizontalLayout();
        layout.paddingLeft = this.paddingLeft;
        layout.gap = 16;
        this.scrollList.layout = layout;

        this.scroller = new eui.Scroller();
        this.scroller.width = this.vWidth;
        this.scroller.height = this.vHeight;
        this.scroller.viewport = this.scrollList;
        this.addChild(this.scroller);

        this.updateList([]);
      }

      public resetPosition() {
        this.scroller.viewport.scrollH = 0;
      }

      public updateList(data: any) {

        data.forEach(element => {
          element.renderType = this.renderType;
          element.rowCount = this.rowCount;
          element.paddingLeft = this.paddingLeft;
          element.vHeight = this.vHeight;
          element.vWidth = this.vWidth;
        });

        const rslt = [];

        data.forEach(element => {
          rslt.push({ item: element });
        });

        this.collection.replaceAll(rslt);
        this.scroller.viewport.scrollH = 0;
      }

      protected destroy() {
        this.scroller.stopAnimation();
      }
    }
  }
}
