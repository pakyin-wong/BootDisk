namespace we {
  export namespace di {
    export class SideListItemInitHelper implements ui.IListItemHelper {
      public generateTableLayer(node: eui.Component) {
        const tableLayer = new di.LobbyTableLayer();
        tableLayer.skinName = `skin_desktop.di.SideListTableLayerSkin`;
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(tableLayer, idx);
        return tableLayer;
      }

      public generateChipLayer(node: eui.Component) {
        const chipLayer = new di.LobbyChipLayer();
        chipLayer.skinName = `skin_desktop.di.SideListChipLayerSkin`;
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(chipLayer, idx);
        return chipLayer;
      }

      public generateRoadmap(node: eui.Component) {
        const bigRoad = new di.DiLobbyBeadRoad();
        bigRoad.roadGridSize = 30;
        bigRoad.roadCol = 8;
        bigRoad.roadRow = 1;
        bigRoad.roadIndentX = 6;
        bigRoad.roadIndentY = 5;
        bigRoad.roadOffsetX = 12;
        bigRoad.roadOffsetY = 5;
        bigRoad.roadIconItemYOffset = 4;
        bigRoad.roadIconItemColors = [0xe4493a, 0x6dd400, 0x2da1fe, 0xededed, 1]; // [r_color,g_color,b_color, hightlight_color, hightlight_alpha]
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(bigRoad, idx);
        return bigRoad;
      }
    }
  }
}
