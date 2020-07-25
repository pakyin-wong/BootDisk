namespace we {
  export namespace lw {
    export class LiveListItemInitHelper implements ui.IListItemHelper {
      public generateTableLayer(node: eui.Component) {
        const tableLayer = new lw.TableLayer();
        if (node.name === 'AdvancedTableLayerNode') {
          tableLayer.skinName = `skin_desktop.lw.LiveListAdvancedItemTableLayerSkin`;
        } else {
          tableLayer.skinName = `skin_desktop.lw.LiveListItemTableLayerSkin`;
        }
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(tableLayer, idx);
        return tableLayer;
      }

      public generateChipLayer(node: eui.Component) {
        const chipLayer = new lw.ChipLayer();
        if (node.name === 'AdvancedChipLayerNode') {
          chipLayer.skinName = `skin_desktop.lw.LiveListAdvancedItemChipLayerSkin`;
        } else {
          chipLayer.skinName = `skin_desktop.lw.LiveListItemChipLayerSkin`;
        }
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(chipLayer, idx);
        return chipLayer;
      }

      public generateRoadmap(node: eui.Component) {
        // const road = new lw.LwLobbyBeadRoad();
        const road = dir.lobbyRoadPool.get(core.GameType.LW);
        road.roadRow = 3;
        road.roadCol = 13;
        road.roadCellWidth = 44;
        road.roadCellHeight = 46;
        road.roadImageWidth = 31;
        road.roadImageHeight = 31;
        road.roadScale = 1;
        road.roadGridColor = 0xffffff;
        road.roadGridAlpha = 1;
        road.roadGridBorderColor = 0xafafaf;
        road.roadScale = 578 / 572;
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(road, idx);
        road.drawGridBg(576, 139);
        return road;
      }

      public generateAnalysis(node: eui.Component) {
        // const analysis = new lw.Analysis();
        const analysis = dir.analysisPool.get(core.GameType.LW);
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(analysis, idx);
        return analysis;
      }

      public generateAdvancedRoad(node: eui.Component) {
        // const advancedRoad = new lw.AdvancedRoad();
        const advancedRoad = dir.advancedRoadPool.get(core.GameType.LW);
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(advancedRoad, idx);
        return advancedRoad;
      }
    }
  }
}
