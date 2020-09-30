// TypeScript file
namespace we {
  export namespace di {
    export class SmallListItemInitHelper implements ui.IListItemHelper {
      public generateRoadmap(node: eui.Component) {
        const bigRoad = new di.DiLobbyBeadRoad();
        // --Mobile_Portrait
        bigRoad.roadGridSize = 48;
        bigRoad.roadCol = 10;
        bigRoad.roadRow = 1;
        bigRoad.roadIndentX = 6;
        bigRoad.roadIndentY = 6;
        bigRoad.roadOffsetX = 6;
        bigRoad.roadOffsetY = 10;
        bigRoad.iconHeight = 179;
        bigRoad.textSize = 25;
        bigRoad.diceSize = 30;
        bigRoad.roadWidth = 544;
        bigRoad.roadIconItemYOffset = 6;
        // --Mobile_Portrait
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(bigRoad, idx);
        return bigRoad;
      }
    }
  }
}
