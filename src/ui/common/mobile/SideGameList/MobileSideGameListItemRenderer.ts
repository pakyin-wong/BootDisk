namespace we {
  export namespace ui {
    export class MobileSideGameListItemRenderer extends eui.ItemRenderer {
      public label: ui.RunTimeLabel;
      public highlight: eui.Image;
      public count: number = 0;

      public constructor() {
        super();
        this.skinName = utils.getSkinByClassname('MobileSideGameListItemRenderer');
      }

      public dataChanged() {
        super.dataChanged();

        this.count = this.data.count ? this.data.count : 0;

        this.label.renderText = function () {
          let _text = `${i18n.t(this.data.text)}`;
          this.count > 0 && (_text = _text + `(${this.count})`);
          return _text;
        }.bind(this);

        if (!this.label.bold) {
          this.label.bold = true;
          this.label.invalidateSize();
          this.highlight.width = this.label.minWidth = this.label.textWidth;
          this.label.bold = false;
        } else {
          this.highlight.width = this.label.minWidth = this.label.textWidth;
        }
      }
    }
  }
}
