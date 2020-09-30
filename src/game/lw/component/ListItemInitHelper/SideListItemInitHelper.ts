namespace we {
  export namespace lw {
    export class SideListItemInitHelper implements ui.IListItemHelper {
      public generateTableLayer(node: eui.Component) {
        const tableLayer = new lw.TableLayer();
        tableLayer.skinName = `skin_desktop.lw.SideListTableLayerSkin`;
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(tableLayer, idx);
        return tableLayer;
      }

      public generateChipLayer(node: eui.Component) {
        const chipLayer = new lw.ChipLayer();
        chipLayer.skinName = `skin_desktop.lw.SideListChipLayerSkin`;
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(chipLayer, idx);
        return chipLayer;
      }

      public generateRoadmap(node: eui.Component) {
        const road = new lw.LwLobbyBeadRoad();
        road.height = 127;
        road.roadRow = 3;
        road.roadCol = 8;
        road.roadCellWidth = 42;
        road.roadCellHeight = 42;
        road.roadImageWidth = 27;
        road.roadImageHeight = 27;
        road.roadScale = 1;
        road.roadGridColor = 0xffffff;
        road.roadGridAlpha = 1;
        road.roadGridBorderColor = 0xdfdfdf;
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(road, idx);
        road.drawGridBg(337, 127);
        return road;
      }

      public generateResultMessage(node: eui.Component) {
        const gameResultMessage = new lw.SideBetResultMessage();
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(gameResultMessage, idx);
        return gameResultMessage;
      }
    }
  }
}
