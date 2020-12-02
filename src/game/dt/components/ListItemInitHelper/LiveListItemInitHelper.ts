namespace we {
  export namespace dt {
    export class LiveListItemInitHelper implements ui.IListItemHelper {
      public generateTableLayer(node: eui.Component) {
        const tableLayer = new dt.TableLayer();
        if (node.name === 'AdvancedTableLayerNode') {
          tableLayer.skinName = `skin_desktop.dt.LiveListAdvancedItemTableLayerSkin`;
        } else {
          tableLayer.skinName = `skin_desktop.dt.LiveListItemTableLayerSkin`;
        }
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(tableLayer, idx);
        return tableLayer;
      }

      public generateChipLayer(node: eui.Component) {
        const chipLayer = new dt.ChipLayer();
        if (node.name === 'AdvancedChipLayerNode') {
          chipLayer.skinName = `skin_desktop.dt.LiveListAdvancedItemChipLayerSkin`;
        } else {
          chipLayer.skinName = `skin_desktop.dt.LiveListItemChipLayerSkin`;
        }
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(chipLayer, idx);
        return chipLayer;
      }

      public generateRoadmap(node: eui.Component) {
        // const bigRoad = new ba.BALobbyBigRoad();
        const bigRoad = dir.lobbyRoadPool.get(core.GameType.DT);
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(bigRoad, idx);
        return bigRoad;
      }

      public generateAnalysis(node: eui.Component) {
        // const analysis = new dt.Analysis();
        const analysis = dir.analysisPool.get(core.GameType.DT);
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(analysis, idx);
        return analysis;
      }

      public generateAdvancedRoad(node: eui.Component) {
        // const advancedRoad = new dt.AdvancedRoad();
        const advancedRoad = dir.advancedRoadPool.get(core.GameType.DT);
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(advancedRoad, idx);
        return advancedRoad;
      }

      public getPlaceholder(gametype: number = core.GameType.DT) {
        switch (gametype) {
          case core.GameType.DTB:
            return 'd_lobby_placeholder_bc_sdba_jpg';
          case core.GameType.DT:
          default:
            return 'd_lobby_placeholder_dt_jpg';
        }
      }

      public getAdvancedPlaceholder(gametype: number = core.GameType.DT) {
        switch (gametype) {
          case core.GameType.DTB:
            return 'd_lobby_pro_placeholder_bc_sdba_jpg';
          case core.GameType.DT:
          default:
            return 'd_lobby_pro_placeholder_dt_jpg';
        }
      }
    }
  }
}
