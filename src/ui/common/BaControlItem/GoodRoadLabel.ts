namespace we {
  export namespace ui {
    export class GoodRoadLabel extends core.BaseEUI {
      protected label: eui.Label;

      constructor() {
        super();
        this.skinName = utils.getSkinByClassname('GoodRoadLabelSkin');
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
