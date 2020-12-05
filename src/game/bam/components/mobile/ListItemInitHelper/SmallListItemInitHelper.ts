namespace we {
  export namespace bam {
    export class SmallListItemInitHelper implements ui.IListItemHelper {
      public generateRoadmap(node: eui.Component) {
        // const bigRoad = new ba.BAMobileLobbyBigRoad();
        const bigRoad = dir.smallRoadPool.get(core.GameType.BAC);
        
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(bigRoad, idx);
        return bigRoad;
      }
    }
  }
}
