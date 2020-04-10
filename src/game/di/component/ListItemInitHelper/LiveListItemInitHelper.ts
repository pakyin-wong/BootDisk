namespace we {
  export namespace di {
    export class LiveListItemInitHelper implements ui.IListItemHelper {
      public generateTableLayer(node: eui.Component) {
        const tableLayer = new di.LobbyTableLayer();
        tableLayer.skinName = `skin_desktop.di.LiveListItemTableLayerSkin`;
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(tableLayer, idx);
        return tableLayer;
      }

      public generateChipLayer(node: eui.Component) {
        const chipLayer = new di.LobbyChipLayer();
        chipLayer.skinName = `skin_desktop.di.LiveListItemChipLayerSkin`;
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(chipLayer, idx);
        return chipLayer;
      }

      public generateRoadmap(node: eui.Component) {
        const bigRoad = new di.DiLobbyBeadRoad();
        bigRoad.roadGridSize = 40;
        bigRoad.roadCol = 12;
        bigRoad.roadRow = 3;
        bigRoad.roadIndentX = 4;
        bigRoad.roadIndentY = 2;
        bigRoad.roadOffsetX = 8;
        bigRoad.roadOffsetY = 2;
        bigRoad.roadIconItemYOffset = 2;
        bigRoad.roadIconItemColors = [0xe4493a, 0x6dd400, 0x2da1fe, 0x184077, 1]; // [r_color,g_color,b_color, hightlight_color, hightlight_alpha]
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(bigRoad, idx);
        return bigRoad;
      }

      public generateAnalysis(node: eui.Component) {
        const analysis = new di.Analysis();
        const idx = node.parent.getChildIndex(node);
        /*
        analysis.width = node.width;
        analysis.height = node.height;
        analysis.x = node.x;
        analysis.y = node.y;
        analysis.right = node.right;
        */
        node.parent.addChildAt(analysis, idx);
        return analysis;
      }
    }
  }
}
