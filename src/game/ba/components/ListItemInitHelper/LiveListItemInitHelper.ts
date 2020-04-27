namespace we {
  export namespace ba {
    export class LiveListItemInitHelper implements ui.IListItemHelper {
      public generateTableLayer(node: eui.Component) {
        // return null;
        const tableLayer = new ba.TableLayer();
        if (node.name === 'AdvancedTableLayerNode') {
          tableLayer.skinName = `skin_desktop.ba.LiveListItemAdvancedTableLayerSkin`;
        } else {
          tableLayer.skinName = `skin_desktop.ba.LiveListItemTableLayerSkin`;
        }
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(tableLayer, idx);
        return tableLayer;
      }

      public generateChipLayer(node: eui.Component) {
        // return null;
        const chipLayer = new ba.ChipLayer();
        if (node.name === 'AdvancedChipLayerNode') {
          chipLayer.skinName = `skin_desktop.ba.LiveListItemAdvancedChipLayerSkin`;
        } else {
          chipLayer.skinName = `skin_desktop.ba.LiveListItemChipLayerSkin`;
        }
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(chipLayer, idx);
        return chipLayer;
      }

      public generateRoadmap(node: eui.Component) {
        // const bigRoad = new ba.BALobbyBigRoad();
        const bigRoad = dir.lobbyRoadPool.get(core.GameType.BAC);
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(bigRoad, idx);
        return bigRoad;
      }

      public generateAnalysis(node: eui.Component) {
        // return null;
        // const analysis = new ba.Analysis();
        const analysis = dir.analysisPool.get(core.GameType.BAC);
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(analysis, idx);
        return analysis;
      }

      public generateAdvancedRoad(node: eui.Component) {
        // return null;
        // const advancedRoad = new ba.AdvancedRoad();
        const advancedRoad = dir.advancedRoadPool.get(core.GameType.BAC);
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(advancedRoad, idx);
        return advancedRoad;
      }
    }
  }
}
