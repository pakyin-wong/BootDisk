namespace we {
  export namespace dt {
    export class LargeListItemInitHelper implements ui.IListItemHelper {
      public generateTableLayer(node: eui.Component) {
        const tableLayer = new dt.TableLayer();
        tableLayer.skinName = `skin_mobile_portrait.dt.LiveListItemBettingTableSkin`;
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(tableLayer, idx);
        return tableLayer;
      }

      public generateChipLayer(node: eui.Component) {
        const chipLayer = new dt.ChipLayer();
        chipLayer.skinName = `skin_mobile_portrait.dt.LiveListItemChipLayerSkin`;
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(chipLayer, idx);
        return chipLayer;
      }

      public generateRoadmap(node: eui.Component) {
        const roadmap = new ba.MobileLiveListRoadmap();
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(roadmap, idx);
        return roadmap;
      }

      public generateResultMessage(node: eui.Component) {
        const gameResultMessage = new ui.SidePanelGameResultMessage();
        gameResultMessage.skinName = `skin_mobile_portrait.GameResultWinSkin`;
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(gameResultMessage, idx);
        return gameResultMessage;
      }

      public generateResultDisplay(node: eui.Component) {
        const cardHolder = new dt.SideListBetItemCardHolder();
        cardHolder.skinName = `skin_mobile_portrait.dt.BetItemCardHolderSkin`;
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(cardHolder, idx);
        return cardHolder;
      }

    }
  }
}