namespace we {
  export namespace bamb {
    export class LargeListItemInitHelper extends bam.LargeListItemInitHelper {

      public generateResultDisplay(node: eui.Component) {
        const cardHolder = new bamb.SideListBetItemCardHolder();
        // cardHolder.skinName = `skin_mobile_portrait.ba.BetItemCardHolderSkin`;
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(cardHolder, idx);
        return cardHolder;
      }
    }
  }
}
