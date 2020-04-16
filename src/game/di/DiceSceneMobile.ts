// TypeScript file

namespace we {
  export namespace di {
    export class MobileScene extends core.MobileBaseGameScene {
      protected beadRoad: DiBeadRoad;
      protected sumRoad: DiSumBigRoad;
      protected sizeRoad: DiSizeBigRoad;
      protected oddRoad: DiOddBigRoad;

      // protected _roadmapControl: DiRoadmapControl;
      protected _bottomGamePanel: MobileBottomGamePanel;

      constructor(data: any) {
        super(data);
      }

      protected mount() {
        super.mount();
      }

      protected setSkinName() {
        this.skinName = utils.getSkinByClassname('DiceMobileScene');
      }

      public backToLobby() {
        dir.sceneCtr.goto('lobby', { page: 'live', tab: 'di' });
      }

      protected initChildren() {
        super.initChildren();
        this.initRoadMap();
        // this._roadmapControl.setTableInfo(this._tableInfo);
        this._chipLayer.type = we.core.BettingTableType.NORMAL;
        this._tableLayer.type = we.core.BettingTableType.NORMAL;
      }

      protected initRoadMap() {
        // this._roadmapControl = new we.di.DiRoadmapControl(this._tableId);
        // this._roadmapControl.setRoads(
        //    this._leftGamePanel.beadRoad,
        //    this._leftGamePanel.sumBigRoad,
        //    this._leftGamePanel.sizeBigRoad,
        //    this._leftGamePanel.oddBigRoad,
        //    this._leftGamePanel,
        //    this._rightGamePanel,
        //    this._bigRoadResultPanel
        // );
      }
    }
  }
}
