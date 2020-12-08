namespace we {
  export namespace ui {
    export class GoodRoadLabel extends core.BaseEUI {
      public label: RunTimeLabel;

      constructor() {
        super();
        
      }

      public set renderText(r: () => string) {
        if (this.skinName == null) {
          this.skinName = utils.getSkinByClassname('GoodRoadLabelSkin');
        }
        this.label.renderText = r;
      }

      public get renderText() {
        return this.label?this.label.renderText:null;
      }

      public set text(value: string) {
        if (this.skinName == null) {
          this.skinName = utils.getSkinByClassname('GoodRoadLabelSkin');
        }
        this.label.text = value;
      }

      public get text(): string {
        return this.label?this.label.text:'';
      }
    }
  }
}
