namespace we {
  export namespace ro {
    export class MobileLiveListSimpleItemInitHelper implements ui.IListItemHelper {
      public generateRoadmap(node: eui.Component) {
        const roadmap = new ro.MobileLiveListRoadmap();
        const idx = node.parent.getChildIndex(node);
        node.parent.addChildAt(roadmap, idx);
        return roadmap;
      }
    }
  }
}