/* tslint:disable triple-equals */
namespace we {
  export namespace core {
    // base control class that hold and manage the basic item in Ba Item
    export class MobileBaseGameScene extends BaseGameScene {
      protected _bottomGamePanel: BaseGamePanel;

      constructor(data: any) {
        super(data);
      }

      protected initChildren() {
        super.initChildren();
        this._bottomGamePanel.setTableInfo(this._tableInfo);
      }

      protected updateTableInfoRelatedComponents() {
        super.updateTableInfoRelatedComponents();
        this._bottomGamePanel.update();
      }

      protected onRoadDataUpdate(evt: egret.Event) {
        super.onRoadDataUpdate(evt);
        this._bottomGamePanel.update();
      }
    }
  }
}
