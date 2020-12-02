namespace we {
  export namespace rol {
    export class SideListItemInitHelper implements ui.IListItemHelper {
      public generateTableLayer(node: eui.Component) {
        const tableLayer = new ro.LobbyTableLayer();
        tableLayer.skinName = `skin_desktop.ro.SideListTableLayerSkin`;
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(tableLayer, idx);
        return tableLayer;
      }

      public generateChipLayer(node: eui.Component) {
        const chipLayer = new ro.LobbyChipLayer();
        chipLayer.skinName = `skin_desktop.ro.SideListChipLayerSkin`;
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(chipLayer, idx);
        return chipLayer;
      }

      public generateRoadmap(node: eui.Component) {
        const bigRoad = dir.sideRoadPool.get(core.GameType.RO);
        // const bigRoad = new ro.ROLobbyBeadRoad();
        bigRoad.height = 95;
        bigRoad.roadGridSize = 30;
        bigRoad.roadCol = 9;
        bigRoad.roadRow = 3;
        bigRoad.roadIndentX = 3;
        bigRoad.roadIndentY = 2;
        bigRoad.roadOffsetX = 7.5;
        bigRoad.roadOffsetY = 2.5;
        bigRoad.roadEmptyColor = 0xc1c1c1;
        bigRoad.roadEmptyAlpha = 0.2;
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(bigRoad, idx);
        bigRoad.drawGridBg(335, 98);
        return bigRoad;
      }

      public generateResultMessage(node: eui.Component) {
        const gameResultMessage = new ro.SideBetResultMessage();
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(gameResultMessage, idx);
        return gameResultMessage;
      }
    }
  }
}
