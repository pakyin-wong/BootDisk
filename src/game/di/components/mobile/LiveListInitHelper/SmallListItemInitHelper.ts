// TypeScript file
namespace we {
  export namespace di {
    export class SmallListItemInitHelper implements ui.IListItemHelper {
      public generateRoadmap(node: eui.Component) {
        const bigRoad = new di.DiLobbyBeadRoad();
        bigRoad.roadGridSize = 48;
        bigRoad.roadCol = 10;
        bigRoad.roadRow = 1;
        bigRoad.roadIndentX = 2;
        bigRoad.roadIndentY = 2;
        bigRoad.roadOffsetX = 8;
        bigRoad.roadOffsetY = 2;
        bigRoad.roadIconItemYOffset = 2;
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(bigRoad, idx);
        return bigRoad;
      }
    }
  }
}
