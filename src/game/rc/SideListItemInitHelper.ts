namespace we {
  export namespace rc {
    export class SideListItemInitHelper implements ui.IListItemHelper {
      public generateTableLayer(node: eui.Component) {
        const tableLayer = new lw.TableLayer();
        return tableLayer;
      }

      public generateChipLayer(node: eui.Component) {
        const chipLayer = new lw.ChipLayer();
        return chipLayer;
      }

      public generateRoadmap(node: eui.Component) {
        const road = new rc.RcSidePanel();
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(road, idx);
        // road.drawGridBg(337, 127);
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
