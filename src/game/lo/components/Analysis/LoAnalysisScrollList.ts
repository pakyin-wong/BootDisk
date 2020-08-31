namespace we {
  export namespace lo {
    export class LoAnalysisScrollList extends core.BaseEUI implements eui.UIComponent {
      protected scroller: eui.Scroller;
      protected container: eui.Group;
      protected renderType: number; // 0 for show, 1 for no show, 2 for hot, 3 for cold
      protected rowCount: number;
      protected lists: LoAnalysisList[];
      protected paddingLeft: number;
      protected vWidth: number; // viewport width
      protected vHeight: number; // viewport height

      public constructor(renderType: number, rowCount: number, vWidth: number, vHeight: number, paddingLeft: number, skin: string = null, orientationDependent: boolean = true) {
        super(skin, orientationDependent);
        this.renderType = renderType;
        this.rowCount = rowCount;
        this.paddingLeft = paddingLeft;
        this.vHeight = vHeight;
        this.vWidth = vWidth;
      }

      protected childrenCreated(): void {
        super.childrenCreated();
        this.initContent();
      }

      protected initContent() {
        this.lists = [];
        this.container = new eui.Group();

        const layout = new eui.HorizontalLayout();
        layout.paddingLeft = this.paddingLeft;
        layout.gap = 16;
        this.container.layout = layout;

        this.scroller = new eui.Scroller();
        this.scroller.width = this.vWidth;
        this.scroller.height = this.vHeight;
        this.scroller.viewport = this.container;
        this.addChild(this.scroller);

        this.updateList([]);
      }

      public resetPosition() {
        this.scroller.viewport.scrollH = 0;
      }

      public updateList(data: any) {
        this.clearList();

        data.forEach(element => {
          const list = new LoAnalysisList(this.renderType, this.rowCount);
          list.update(element);
          this.container.addChild(list);
        });

        this.scroller.viewport.scrollH = 0;
      }

      public clearList() {
        while (this.container.numChildren > 0) {
          this.container.removeChildAt(0);
        }
      }

      protected destroy() {
        this.scroller.stopAnimation();
      }
    }
  }
}
