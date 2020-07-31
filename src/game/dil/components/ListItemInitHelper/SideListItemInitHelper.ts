namespace we {
  export namespace dil {
    export class SideListItemInitHelper implements ui.IListItemHelper {
      public generateTableLayer(node: eui.Component) {
        const tableLayer = new dil.TableLayer();
        tableLayer.skinName = `skin_desktop.dil.SideListTableLayerSkin`;
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(tableLayer, idx);
        return tableLayer;
      }

      public generateChipLayer(node: eui.Component) {
        const chipLayer = new dil.ChipLayer();
        chipLayer.skinName = `skin_desktop.dil.SideListChipLayerSkin`;
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(chipLayer, idx);
        return chipLayer;
      }

      public generateRoadmap(node: eui.Component) {
        const bigRoad = new di.DiLobbyBeadRoad();
        bigRoad.roadGridSize = 30;
        bigRoad.roadCol = 8;
        bigRoad.roadRow = 1;
        bigRoad.roadIndentX = 6;
        bigRoad.roadIndentY = 5;
        bigRoad.roadOffsetX = 12;
        bigRoad.roadOffsetY = 5;
        bigRoad.roadIconItemYOffset = 4;
        bigRoad.roadIconItemColors = [0xee2e2e, 0x6dd400, 0x3e60f8, 0xededed, 1]; // [r_color,g_color,b_color, hightlight_color, hightlight_alpha]
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(bigRoad, idx);
        bigRoad.drawGridBg(337, 127);
        return bigRoad;
      }

      public generateResultMessage(node: eui.Component) {
        const gameResultMessage = new dil.SideBetResultMessage();
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(gameResultMessage, idx);
        return gameResultMessage;
      }
    }
  }
}
