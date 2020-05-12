namespace we {
  export namespace di {
    export class LiveListItemInitHelper implements ui.IListItemHelper {
      public generateTableLayer(node: eui.Component) {
        const tableLayer = new di.LobbyTableLayer();
        if (node.name === 'AdvancedTableLayerNode') {
          tableLayer.skinName = `skin_desktop.di.LiveListAdvancedItemTableLayerSkin`;
        } else {
          tableLayer.skinName = `skin_desktop.di.LiveListItemTableLayerSkin`;
        }
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(tableLayer, idx);
        return tableLayer;
      }

      public generateChipLayer(node: eui.Component) {
        const chipLayer = new di.LobbyChipLayer();
        if (node.name === 'AdvancedChipLayerNode') {
          chipLayer.skinName = `skin_desktop.di.LiveListAdvancedItemChipLayerSkin`;
        } else {
          chipLayer.skinName = `skin_desktop.di.LiveListItemChipLayerSkin`;
        }
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(chipLayer, idx);
        return chipLayer;
      }

      public generateRoadmap(node: eui.Component) {
        // const bigRoad = new di.DiLobbyBeadRoad();
        const bigRoad = dir.lobbyRoadPool.get(core.GameType.DI);
        bigRoad.roadGridSize = 40;
        bigRoad.roadCol = 12;
        bigRoad.roadRow = 1;
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
        // const analysis = new di.Analysis();
        const analysis = dir.analysisPool.get(core.GameType.DI);
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(analysis, idx);
        return analysis;
      }

      public generateAdvancedRoad(node: eui.Component) {
        // const advancedRoad = new di.AdvancedRoad();
        const advancedRoad = dir.advancedRoadPool.get(core.GameType.DI);
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(advancedRoad, idx);
        return advancedRoad;
      }
    }
  }
}
