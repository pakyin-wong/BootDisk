/* tslint:disable triple-equals */
namespace we {
  export namespace core {
    // base control class that hold and manage the basic item in Ba Item
    export class DesktopBaseGameScene extends BaseGameScene {
      protected _leftGamePanel: BaseGamePanel;
      protected _rightGamePanel: BaseGamePanel;
      protected _tableInfoWindow: ui.TableInfoPanel;
      protected _originBetRelatedGroupY: number;

      protected _panelDismissToggleBtn: ui.BaseAnimationButton;

      constructor(data: any) {
        super(data);
      }

      protected initChildren() {
        super.initChildren();

        this._leftGamePanel.setTableInfo(this._tableInfo);
        this._rightGamePanel.setTableInfo(this._tableInfo);
        this._originBetRelatedGroupY = this._betRelatedGroup.y;

        if (this._tableInfoWindow) {
          this._tableInfoWindow.setToggler(this._lblRoomInfo);
          this._tableInfoWindow.setValue(this._tableInfo);
        }

        if (this._panelDismissToggleBtn) {
          this._panelDismissToggleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPanelToggle, this);
        }

        ui.EdgeDismissableAddon.isDismiss = false;
      }

      protected onPanelToggle(evt: egret.TouchEvent) {
        ui.EdgeDismissableAddon.toggle();
      }

      protected updateTableInfoRelatedComponents() {
        super.updateTableInfoRelatedComponents();
        if (this._tableInfoWindow) {
          this._tableInfoWindow.setValue(this._tableInfo);
        }
        this._leftGamePanel.update();
        this._rightGamePanel.update();
      }
      protected setBetRelatedComponentsEnabled(enable: boolean) {
        super.setBetRelatedComponentsEnabled(enable);
        if (this._betRelatedGroup) {
          egret.Tween.get(this._betRelatedGroup).to({ y: enable ? this._originBetRelatedGroupY : this._originBetRelatedGroupY + 120, alpha: enable ? 1 : 0 }, 400, egret.Ease.getElasticInOut(1, 400));
        }
      }

      protected onRoadDataUpdate(evt: egret.Event) {
        super.onRoadDataUpdate(evt);
        this._leftGamePanel.update();
        this._rightGamePanel.update();
      }
    }
  }
}
