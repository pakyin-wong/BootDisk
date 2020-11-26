namespace uilayout {
  const UIComponentClass = 'eui.UIComponent';

  export class CustomTileLayout extends eui.LayoutBase {
    public gayX: number = 6;
    public gapY: number = 6;
    public columnWidth: number = 500;
    public numOfColumn: number = 2;
    public paddingbottom: number = 0;

    public updateDisplayList(unscaledWidth: number, unscaledHeight: number): void {
      super.updateDisplayList(unscaledWidth, unscaledHeight);
      if (this.target == null) return;
      const count: number = this.target.numElements;
      let diffY: number = 0;
      const maxX: number = this.target.width;
      let maxY: number = 0;
      for (let i: number = 0; i < count; i++) {
        const layoutElement: eui.UIComponent = <eui.UIComponent>this.target.getElementAt(i);
        if (!egret.is(layoutElement, UIComponentClass) || !layoutElement.includeInLayout) {
          continue;
        }

        if (i % this.numOfColumn == 0) {
          maxY += diffY;
          diffY = 0;
        }

        const bounds = egret.$TempRectangle;
        layoutElement.getPreferredBounds(bounds);
        diffY = Math.max(diffY, bounds.height + this.gapY);

        const childX = (i % this.numOfColumn) * (this.columnWidth + this.gayX);
        const childY = maxY;
        layoutElement.setLayoutBoundsSize(this.columnWidth, bounds.height);
        layoutElement.setLayoutBoundsPosition(childX, childY);
      }
      this.target.setContentSize(maxX, maxY + diffY + this.paddingbottom);
    }
  }
}
