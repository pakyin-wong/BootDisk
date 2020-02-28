/* tslint:disable triple-equals */
namespace we {
  export namespace core {
    // base control class that hold and manage the basic item in Ba Item
    export class DesktopBaseGameScene extends BaseGameScene {
      protected _leftGamePanel: BaseGamePanel;
      protected _rightGamePanel: BaseGamePanel;

      protected _tableInfoWindow: ui.TableInfoPanel;

      constructor(data: any) {
        super(data);
      }

      protected initChildren() {
        super.initChildren();
        this._leftGamePanel.setTableInfo(this._tableInfo);
        this._rightGamePanel.setTableInfo(this._tableInfo);

        /*if (this._tableInfoWindow) {
          this._tableInfoWindow.setToggler(this._lblRoomInfo);
          this._tableInfoWindow.setValue(this._tableInfo);
        }*/
      }

      protected updateTableInfoRelatedComponents() {
        super.updateTableInfoRelatedComponents();
        /*if (this._tableInfoWindow) {
          this._tableInfoWindow.setValue(this._tableInfo);
        }*/
        this._leftGamePanel.update();
        this._rightGamePanel.update();
      }

      protected onRoadDataUpdate(evt: egret.Event) {
        super.onRoadDataUpdate(evt);
        this._leftGamePanel.update();
        this._rightGamePanel.update();
      }
    }
  }
}
