// TypeScript file
namespace we {
  export namespace di {
    export class LargeListItemInitHelper implements ui.IListItemHelper {
      public generateTableLayer(node: eui.Component) {
        const tableLayer = new di.LobbyTableLayer();
        tableLayer.skinName = `skin_mobile_portrait.di.QuickBetTableLayerSkin`;
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(tableLayer, idx);
        return tableLayer;
      }

      public generateChipLayer(node: eui.Component) {
        const chipLayer = new di.LobbyChipLayer();
        chipLayer.skinName = `skin_mobile_portrait.di.QuickBetChipLayerSkin`;
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(chipLayer, idx);
        return chipLayer;
      }
      // let options = {
      //   paddingX: 15,
      //   paddingY: 15,
      //   gapX: 14,
      //   gapY: 8,
      //   iconItemColors: [0xe4493a, 0x6dd400, 0x2da1fe, 0x184077, 1],
      //   iconHeight: 269,
      //   iconItemYOffset: 14,
      //   textPadding: 3,
      //   textSize: 37,
      //   diceSize: 46,
      //   highlightRadius: 8,
      //   showGrid: true,
      // };
      // this.beadRoad = new DiBeadRoad(1138, 1, 13, 120, 1, options); // in game
      // this.beadRoad.x = 29;
      // this.beadRoad.y = 16;
      // this.beadRoad.scaleX = 689 / 689;
      // this.beadRoad.scaleY = 689 / 689;
      // this.beadRoad.expandRoad(false);
      // this.beadRoadConfig.parent.addChild(this.beadRoad);

      public generateRoadmap(node: eui.Component) {
        const roadmap = new di.DiLobbyBeadRoad();
        // --Mobile_Portrait Setting
        roadmap.roadGridSize = 80;
        roadmap.roadCol = 13;
        roadmap.roadRow = 1;
        roadmap.roadIndentX = 15;
        roadmap.roadIndentY = 15;
        roadmap.roadOffsetX = 14;
        roadmap.roadOffsetY = 8;
        roadmap.iconHeight = 264;
        roadmap.textSize = 37;
        roadmap.diceSize = 46;
        roadmap.roadWidth = 1138;
        roadmap.roadIconItemYOffset = 8;
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
