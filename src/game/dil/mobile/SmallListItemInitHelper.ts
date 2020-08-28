// TypeScript file
namespace we {
  export namespace dil {
    export class SmallListItemInitHelper implements ui.IListItemHelper {
      public generateRoadmap(node: eui.Component) {
        const bigRoad = new dil.DilLobbyBeadRoad();
        // --Mobile_Portrait
        bigRoad.roadGridSize = 64;
        bigRoad.roadCol = 6;
        bigRoad.roadRow = 2;
        bigRoad.roadIndentX = 22;
        bigRoad.roadIndentY = 30;
        bigRoad.roadOffsetX = 24;
        bigRoad.roadOffsetY = 24;
        // --Mobile_Portrait
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(bigRoad, idx);
        return bigRoad;
      }
    }
  }
}
