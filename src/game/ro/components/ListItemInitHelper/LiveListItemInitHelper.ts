namespace we {
  export namespace ro {
    export class LiveListItemInitHelper implements ui.IListItemHelper {
      public generateTableLayer(node: eui.Component) {
        const tableLayer = new ro.LobbyTableLayer();
        if (node.name === 'AdvancedTableLayerNode') {
          tableLayer.skinName = `skin_desktop.ro.LiveListAdvancedItemTableLayerSkin`;
          tableLayer.scaleX = 345 / 350;
        } else {
          tableLayer.skinName = `skin_desktop.ro.LiveListItemTableLayerSkin`;
        }
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(tableLayer, idx);
        return tableLayer;
      }

      public generateChipLayer(node: eui.Component) {
        const chipLayer = new ro.LobbyChipLayer();
        if (node.name === 'AdvancedChipLayerNode') {
          chipLayer.skinName = `skin_desktop.ro.LiveListAdvancedItemChipLayerSkin`;
          chipLayer.scaleX = 345 / 350;
        } else {
          chipLayer.skinName = `skin_desktop.ro.LiveListItemChipLayerSkin`;
        }
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(chipLayer, idx);
        return chipLayer;
      }

      public generateRoadmap(node: eui.Component) {
        // const bigRoad = new ro.ROLobbyBeadRoad();
        const bigRoad = dir.lobbyRoadPool.get(core.GameType.RO);
        bigRoad.roadGridSize = 40;
        bigRoad.roadCol = 12;
        bigRoad.roadRow = 3;
        bigRoad.roadIndentX = 4;
        bigRoad.roadIndentY = 2.5;
        bigRoad.roadOffsetX = 8;
        bigRoad.roadOffsetY = 5;
        bigRoad.roadEmptyColor = 0xc1c1c1;
        bigRoad.roadEmptyAlpha = 0.2;
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(bigRoad, idx);
        bigRoad.drawGridBg(576, 139);
        return bigRoad;
      }

      public generateAnalysis(node: eui.Component) {
        // const analysis = new ro.Analysis();
        const analysis = dir.analysisPool.get(core.GameType.RO);
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(analysis, idx);
        return analysis;
      }

      public generateAdvancedRoad(node: eui.Component) {
        // const advancedRoad = new ro.AdvancedRoad();
        const advancedRoad = dir.advancedRoadPool.get(core.GameType.RO);
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(advancedRoad, idx);
        return advancedRoad;
      }
    }
  }
}
