namespace we {
  export namespace di {
    export class LiveListItemInitHelper implements ui.IListItemHelper {
      public generateTableLayer(node: eui.Component) {
        const tableLayer = new di.LobbyTableLayer();
        if (node.name === 'AdvancedTableLayerNode') {
          tableLayer.skinName = `skin_desktop.di.LiveListAdvancedItemTableLayerSkin`;
          tableLayer.scaleX = 345 / 350;
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
          chipLayer.scaleX = 345 / 350;
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
        bigRoad.roadCol = 14;
        bigRoad.roadRow = 1;
        bigRoad.roadIndentX = 3;
        bigRoad.roadIndentY = 3;
        bigRoad.roadOffsetX = 6;
        bigRoad.roadOffsetY = 2;
        bigRoad.roadIconItemYOffset = 4;
        bigRoad.iconHeight = 132;
        bigRoad.roadIconItemColors = [0xee2e2e, 0x6dd400, 0x3e60f8, 0xededed, 1]; // [r_color,g_color,b_color, hightlight_color, hightlight_alpha]
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(bigRoad, idx);
        bigRoad.drawGridBg(576, 138);
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

      public getPlaceholder() {
        return 'd_lobby_placeholder_sicbo_jpg';
      }

      public getAdvancedPlaceholder() {
        return 'd_lobby_pro_placeholder_sicbo_jpg';
      }
    }
  }
}
