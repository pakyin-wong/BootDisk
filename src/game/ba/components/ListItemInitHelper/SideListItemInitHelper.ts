namespace we {
  export namespace ba {
    export class SideListItemInitHelper implements ui.IListItemHelper {
      public generateTableLayer(node: eui.Component) {
        const tableLayer = new ba.TableLayer();
        tableLayer.skinName = `skin_desktop.ba.SideListTableLayerSkin`;
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(tableLayer, idx);
        return tableLayer;
      }

      public generateChipLayer(node: eui.Component) {
        const chipLayer = new ba.ChipLayer();
        chipLayer.skinName = `skin_desktop.ba.SideListChipLayerSkin`;
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(chipLayer, idx);
        return chipLayer;
      }

      public generateRoadmap(node: eui.Component) {
        const bigRoad = new ba.BetInfoBigRoad();
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(bigRoad, idx);
        return bigRoad;
      }

      public generateResultMessage(node: eui.Component) {
        const gameResultMessage = new ui.SidePanelGameResultMessage();
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(gameResultMessage, idx);
        return gameResultMessage;
      }

      public generateResultDisplay(node: eui.Component) {
        const cardHolder = new ba.SideListBetItemCardHolder();
        cardHolder.skinName = `skin_desktop.ba.BetItemCardHolderSkin`;
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(cardHolder, idx);
        return cardHolder;
      }
    }
  }
}
