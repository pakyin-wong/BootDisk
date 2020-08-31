namespace we {
  export namespace ro {
    export class SmallListItemInitHelper implements ui.IListItemHelper {
      public generateRoadmap(node: eui.Component) {
        const roadmap = new ro.ROLobbyBeadRoad();
        roadmap.roadGridSize = 52;
        roadmap.roadCol = 9;
        roadmap.roadRow = 3;
        roadmap.roadIndentX = 8;
        roadmap.roadIndentY = 8;
        roadmap.roadOffsetX = 8;
        roadmap.roadOffsetY = 8;
        roadmap.roadEmptyColor = 0xc1c1c1;
        roadmap.roadEmptyAlpha = 0.2;
        roadmap.isSmall = true;
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(roadmap, idx);
        return roadmap;
      }
    }
  }
}
