namespace we {
  export namespace ro {
    export class SideListItemInitHelper implements ui.IListItemHelper {
      public generateTableLayer(node: eui.Component) {
        const tableLayer = new ro.LobbyTableLayer();
        tableLayer.skinName = `skin_desktop.ro.SideListTableLayerSkin`;
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(tableLayer, idx);
        return tableLayer;
      }

      public generateChipLayer(node: eui.Component) {
        const chipLayer = new ro.LobbyChipLayer();
        chipLayer.skinName = `skin_desktop.ro.SideListChipLayerSkin`;
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(chipLayer, idx);
        return chipLayer;
      }

      public generateRoadmap(node: eui.Component) {
        const bigRoad = new ro.ROLobbyBeadRoad();
        bigRoad.roadGridSize = 30;
        bigRoad.roadCol = 9;
        bigRoad.roadRow = 3;
        bigRoad.roadIndentX = 3.5;
        bigRoad.roadIndentY = 2;
        bigRoad.roadOffsetX = 8;
        bigRoad.roadOffsetY = 5;
        bigRoad.roadEmptyColor = 0xc1c1c1;
        bigRoad.roadEmptyAlpha = 0.2;
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(bigRoad, idx);
        return bigRoad;
      }
    }
  }
}
