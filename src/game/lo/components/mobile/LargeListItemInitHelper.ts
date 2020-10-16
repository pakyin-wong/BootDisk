namespace we {
  export namespace lo {
    export class LargeListItemInitHelper implements ui.IListItemHelper {
      public generateTableLayer(node: eui.Component) {
        const tableLayer = new ro.LobbyTableLayer();
        return tableLayer;
      }

      public generateChipLayer(node: eui.Component) {
        const chipLayer = new ro.LobbyChipLayer();
        return chipLayer;
      }

      public generateRoadmap(node: eui.Component) {
        const road = new lo.MobileSideRoadPanel();
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(road, idx);
        return road;
      }

      public generateResultMessage(node: eui.Component) {
        const gameResultMessage = new ro.SideBetResultMessage();
        gameResultMessage.skinName = `skin_mobile_portrait.ro.SideBetResultMessage`;
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(gameResultMessage, idx);
        gameResultMessage.percentWidth = 100;
        gameResultMessage.percentHeight = 100;
        return gameResultMessage;
      }
    }
  }
}
