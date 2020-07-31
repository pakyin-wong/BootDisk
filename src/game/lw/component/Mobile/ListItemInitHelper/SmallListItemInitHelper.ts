namespace we {
  export namespace lw {
    export class SmallListItemInitHelper implements ui.IListItemHelper {
      public generateRoadmap(node: eui.Component) {
        const roadmap = new lw.LwLobbyBeadRoad();
        roadmap.roadRow = 3;
        roadmap.roadCol = 8;
        roadmap.roadCellWidth = 69;
        roadmap.roadCellHeight = 65;
        roadmap.roadImageWidth = 43;
        roadmap.roadImageHeight = 43;
        roadmap.roadScale = 1;
        roadmap.roadGridColor = 0xffffff;
        roadmap.roadGridAlpha = 1;
        roadmap.roadGridBorderColor = 0x000000;
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(roadmap, idx);
        return roadmap;
      }
    }
  }
}
