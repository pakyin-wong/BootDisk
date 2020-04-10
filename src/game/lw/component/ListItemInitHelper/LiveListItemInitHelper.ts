namespace we {
  export namespace lw {
    export class LiveListItemInitHelper implements ui.IListItemHelper {
      public generateTableLayer(node: eui.Component) {
        const tableLayer = new lw.TableLayer();
        tableLayer.skinName = `skin_desktop.lw.LiveListItemTableLayerSkin`;
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(tableLayer, idx);
        return tableLayer;
      }

      public generateChipLayer(node: eui.Component) {
        const chipLayer = new lw.ChipLayer();
        chipLayer.skinName = `skin_desktop.lw.LiveListItemChipLayerSkin`;
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(chipLayer, idx);
        return chipLayer;
      }

      public generateRoadmap(node: eui.Component) {
        const road = new lw.LwLobbyBeadRoad();
        road.roadRow = 3;
        road.roadCol = 13;
        road.roadCellWidth = 44;
        road.roadCellHeight = 46;
        road.roadImageWidth = 28;
        road.roadImageHeight = 37;
        road.roadScale = 1;
        road.roadGridColor = 0xffffff;
        road.roadGridAlpha = 1;
        road.roadGridBorderColor = 0xafafaf;
        road.roadScale = 578 / 572;
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(road, idx);
        return road;
      }

      public generateAnalysis(node: eui.Component) {
        const analysis = new lw.Analysis();
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(analysis, idx);
        return analysis;
      }
    }
  }
}
