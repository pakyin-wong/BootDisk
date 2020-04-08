namespace we {
  export namespace ro {
    export class LargeListItemInitHelper implements ui.IListItemHelper {
      public generateTableLayer(node: eui.Component) {
        const tableLayer = new ro.LobbyTableLayer();
        tableLayer.skinName = `skin_mobile_portrait.ro.LiveListItemBettingTableSkin`;
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(tableLayer, idx);
        return tableLayer;
      }

      public generateChipLayer(node: eui.Component) {
        const chipLayer = new ro.LobbyChipLayer();
        chipLayer.skinName = `skin_mobile_portrait.ro.LiveListItemChipLayerSkin`;
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(chipLayer, idx);
        return chipLayer;
      }

      public generateRoadmap(node: eui.Component) {
        const roadmap = new ro.MobileLiveListRoadmap();
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(roadmap, idx);
        return roadmap;
      }

      public generateResultMessage(node: eui.Component) {
        const gameResultMessage = new ro.GameResultMessage();
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(gameResultMessage, idx);
        return gameResultMessage;
      }
    }
  }
}
