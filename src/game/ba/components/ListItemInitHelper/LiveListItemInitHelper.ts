namespace we {
  export namespace ba {
    export class LiveListItemInitHelper implements ui.IListItemHelper {
      public generateTableLayer(node: eui.Component) {
        const tableLayer = new ba.TableLayer();
        tableLayer.skinName = `skin_desktop.ba.LiveListItemTableLayerSkin`;
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(tableLayer, idx);
        return tableLayer;
      }

      public generateChipLayer(node: eui.Component) {
        const chipLayer = new ba.ChipLayer();
        chipLayer.skinName = `skin_desktop.ba.LiveListItemChipLayerSkin`;
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(chipLayer, idx);
        return chipLayer;
      }

      public generateRoadmap(node: eui.Component) {
        const bigRoad = new ba.BALobbyBigRoad();
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(bigRoad, idx);
        return bigRoad;
      }

      public generateAnalysis(node: eui.Component) {
        const analysis = new ba.Analysis();
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(analysis, idx);
        return analysis;
      }
    }
  }
}
