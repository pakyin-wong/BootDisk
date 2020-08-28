// TypeScript file
namespace we {
  export namespace dil {
    export class LargeListItemInitHelper implements ui.IListItemHelper {
      public generateTableLayer(node: eui.Component) {
        const tableLayer = new dil.MobileTableLayer();
        tableLayer.skinName = `skin_mobile_portrait.dil.QuickBetTableLayerSkin`;
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(tableLayer, idx);
        return tableLayer;
      }

      public generateChipLayer(node: eui.Component) {
        const chipLayer = new dil.MobileChipLayer();
        chipLayer.skinName = `skin_mobile_portrait.dil.QuickBetChipLayerSkin`;
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(chipLayer, idx);
        return chipLayer;
      }

      public generateRoadmap(node: eui.Component) {
        const roadmap = new dil.DilLobbyBeadRoad();
        // --Mobile_Portrait Setting
        roadmap.roadGridSize = 104;
        roadmap.roadCol = 8;
        roadmap.roadRow = 2;
        roadmap.roadIndentX = 38;
        roadmap.roadIndentY = 24;
        roadmap.roadOffsetX = 32;
        roadmap.roadOffsetY = 32;
        (roadmap.roadEmptyColor = 0x262a2b), (roadmap.roadEmptyAlpha = 1), (roadmap.roadScale = 1);

        // --Mobile_Portrait Setting
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(roadmap, idx);
        return roadmap;
      }

      public generateResultMessage(node: eui.Component) {
        const gameResultMessage = new di.MobileSideBetResultMessage();
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(gameResultMessage, idx);
        return gameResultMessage;
      }

      //   public generateResultDisplay(node: eui.Component) {
      //      const cardHolder = new dt.SideListBetItemCardHolder();
      //      cardHolder.skinName = `skin_mobile_portrait.dt.BetItemCardHolderSkin`;
      //      const idx = node.parent.getChildIndex(node);
      //      node.parent.addChildAt(cardHolder, idx);
      //      return cardHolder;
      //   }
    }
  }
}
