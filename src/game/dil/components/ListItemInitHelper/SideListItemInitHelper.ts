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
        const beadRoad = new DilLobbyBeadRoad(36, 8, 2, 8, 15, 5, 15);
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(beadRoad, idx);
        return beadRoad;
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
