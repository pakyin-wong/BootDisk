namespace we {
  export namespace ui {
    export class GoodRoadLabel extends core.BaseEUI {
      protected label: RunTimeLabel;

      constructor() {
        super();
        this.skinName = utils.getSkinByClassname('GoodRoadLabelSkin');
      }

      public set renderText(r: () => string) {
        this.label.renderText = r;
      }

      public get renderText() {
        return this.label.renderText;
      }

      public set text(value: string) {
        this.label.text = value;
      }

      public get text(): string {
        return this.label.text;
      }
    }
  }
}
