namespace we {
  export namespace bamb {
    export class SideListItemInitHelper extends bam.SideListItemInitHelper {
      public generateResultDisplay(node: eui.Component) {
        const cardHolder = new bamb.SideListBetItemCardHolder();
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(cardHolder, idx);
        return cardHolder;
      }
    }
  }
}
