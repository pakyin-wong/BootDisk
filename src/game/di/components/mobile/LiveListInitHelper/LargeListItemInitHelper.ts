// TypeScript file
namespace we {
  export namespace di {
    export class LargeListItemInitHelper implements ui.IListItemHelper {
      public generateTableLayer(node: eui.Component) {
        const tableLayer = new di.LobbyTableLayer();
        tableLayer.skinName = `skin_mobile_portrait.di.LiveListItemBettingTableSkin`;
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(tableLayer, idx);
        return tableLayer;
      }

      public generateChipLayer(node: eui.Component) {
        const chipLayer = new di.LobbyChipLayer();
        chipLayer.skinName = `skin_mobile_portrait.di.LiveListItemChipLayerSkin`;
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(chipLayer, idx);
        return chipLayer;
      }

      public generateRoadmap(node: eui.Component) {
        const roadmap = new di.DiLobbyBeadRoad();
        // --Mobile_Portrait Setting
        roadmap.roadGridSize = 80;
        roadmap.roadCol = 13;
        roadmap.roadRow = 1;
        roadmap.roadIndentX = 1;
        roadmap.roadIndentY = 15;
        roadmap.roadOffsetX = 8;
        roadmap.roadOffsetY = 2;
        roadmap.roadIconItemYOffset = 2;
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
