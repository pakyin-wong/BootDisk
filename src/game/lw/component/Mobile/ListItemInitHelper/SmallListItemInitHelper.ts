namespace we {
  export namespace lw {
    export class SmallListItemInitHelper implements ui.IListItemHelper {
      public generateRoadmap(node: eui.Component) {
        const roadmap = new lw.LwLobbyBeadRoad();
        roadmap.roadRow = 3;
        roadmap.roadCol = 12;
        roadmap.roadCellWidth = 95;
        roadmap.roadCellHeight = 97;
        roadmap.roadImageWidth = 84;
        roadmap.roadImageHeight = 84;
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
