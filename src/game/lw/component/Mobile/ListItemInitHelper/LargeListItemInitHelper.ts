namespace we {
  export namespace lw {
    export class LargeListItemInitHelper implements ui.IListItemHelper {
      public generateTableLayer(node: eui.Component) {
        const tableLayer = new lw.TableLayer();
        tableLayer.skinName = `skin_mobile_portrait.lw.QuickBetTableLayerSkin`;
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(tableLayer, idx);
        return tableLayer;
      }

      public generateChipLayer(node: eui.Component) {
        const chipLayer = new lw.ChipLayer();
        chipLayer.skinName = `skin_mobile_portrait.lw.QuickBetChipLayerSkin`;
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(chipLayer, idx);
        return chipLayer;
      }

      public generateRoadmap(node: eui.Component) {
        const roadmap = new lw.LwLobbyBeadRoad();

        roadmap.roadRow = 3;
        roadmap.roadCol = 12;
        roadmap.roadCellWidth = 95;
        roadmap.roadCellHeight = 97;
        roadmap.roadImageWidth = 66;
        roadmap.roadImageHeight = 66;
        roadmap.roadScale = 1;
        roadmap.roadGridColor = 0xffffff;
        roadmap.roadGridAlpha = 1;
        roadmap.roadGridBorderColor = 0x000000;
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(roadmap, idx);
        return roadmap;
      }

      public generateResultMessage(node: eui.Component) {
        const gameResultMessage = new lw.GameResultMessage();
        gameResultMessage.type = 'side';
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(gameResultMessage, idx);
        return gameResultMessage;
      }
    }
  }
}
