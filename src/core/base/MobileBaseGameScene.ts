/* tslint:disable triple-equals */
namespace we {
  export namespace core {
    // base control class that hold and manage the basic item in Ba Item
    export class MobileBaseGameScene extends BaseGameScene {
      protected _bottomGamePanel: BaseGamePanel;
      protected _tableInfoPanel: ui.TableInfoPanel;

      constructor(data: any) {
        super(data);
      }

      protected initChildren() {
        super.initChildren();
        this._bottomGamePanel.setTableInfo(this._tableInfo);

        if (this._tableInfoPanel) {
          this._tableInfoPanel.setToggler(this._lblRoomInfo);
          this._tableInfoPanel.setValue(this._tableInfo);
        }
      }

      protected updateTableInfoRelatedComponents() {
        super.updateTableInfoRelatedComponents();
        this._bottomGamePanel.update();

        if (this._tableInfoPanel) {
          this._tableInfoPanel.setValue(this._tableInfo);
        }
      }

      protected onRoadDataUpdate(evt: egret.Event) {
        super.onRoadDataUpdate(evt);
        this._bottomGamePanel.update();
      }
    }
  }
}
