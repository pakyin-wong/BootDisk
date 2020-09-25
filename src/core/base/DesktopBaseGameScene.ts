/* tslint:disable triple-equals */
namespace we {
  export namespace core {
    // base control class that hold and manage the basic item in Ba Item
    export class DesktopBaseGameScene extends BaseGameScene {
      protected _leftGamePanel: BaseGamePanel;
      protected _rightGamePanel: BaseGamePanel;
      protected _tableInfoWindow: ui.TableInfoPanel;
      protected _originBetRelatedGroupY: number;

      protected _panelDismissToggleBtn: ui.AnimatedToggleButton;

      constructor(data: any) {
        super(data);
      }

      protected initChildren() {
        super.initChildren();

        this._message.label.size = 28;
        this._message.bg.width = 303;
        this._message.bg.height = 63;

        this._leftGamePanel.setTableInfo(this._tableInfo);
        this._rightGamePanel.setTableInfo(this._tableInfo);
        this._originBetRelatedGroupY = this._betRelatedGroup.y;

        if (this._tableInfoWindow) {
          this._tableInfoWindow.setToggler(this._lblRoomInfo);
          this._tableInfoWindow.setValue(this._tableInfo);
          if (!env.isFirstTimeInfoPanel) {
            this._tableInfoWindow.x = 6;
            this._tableInfoWindow.y = 93;
            env.isFirstTimeInfoPanel = true;
          }
        }

        if (this._panelDismissToggleBtn) {
          this._panelDismissToggleBtn.active = env.isAutoDismiss;
          this._panelDismissToggleBtn.addEventListener('CLICKED', this.onPanelToggle, this);
          this._panelDismissToggleBtn['tooltipText'] = env.isAutoDismiss ? 'live.tooltip.autoFullscreenToggleOff' : 'live.tooltip.autoFullscreenToggleOn';
        }
      }

      protected onPanelToggle(evt: egret.TouchEvent) {
        console.log(this._panelDismissToggleBtn.active);
        env.isAutoDismiss = this._panelDismissToggleBtn.active;
        this._panelDismissToggleBtn['tooltipText'] = env.isAutoDismiss ? 'live.tooltip.autoFullscreenToggleOff' : 'live.tooltip.autoFullscreenToggleOn';
        // env.isAutoDismiss = !env.isAutoDismiss;
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
          const target = this._betRelatedGroup.$children[0];
          if (target instanceof eui.Group) {
            egret.Tween.removeTweens(target);
            egret.Tween.get(target).to({ y: enable ? 0 : 100, alpha: enable ? 1 : 0 }, 400, egret.Ease.getElasticInOut(1, 400));
          }
        }
        if ((env.isAutoDismiss || enable) && ui.EdgeDismissableAddon.isDismiss === enable) {
          // console.log(ui.EdgeDismissableAddon.isDismiss);
          ui.EdgeDismissableAddon.toggle();
        }
      }

      protected onRoadDataUpdate(evt: egret.Event) {
        super.onRoadDataUpdate(evt);
        if (evt && evt.data) {
          const stat = <data.TableInfo> evt.data;
          if (stat.tableid === this._tableId) {
            this._leftGamePanel.updateStat();
            this._rightGamePanel.updateStat();
          }
        }
      }

      protected onTableBetInfoUpdate(evt: egret.Event) {
        super.onTableBetInfoUpdate(evt);
        if (evt && evt.data) {
          const betInfo = <data.GameTableBetInfo> evt.data;
          if (betInfo.tableid === this._tableId) {
            this._leftGamePanel.updateTableBetInfo();
            this._rightGamePanel.updateTableBetInfo();
          }
        }
      }

      public updateGame(isInit: boolean = false) {
        if (isInit && env.isAutoDismiss) {
          switch (this._gameData.state) {
            case core.GameState.BET:
              ui.EdgeDismissableAddon.isDismiss = false;
              break;
            default:
              ui.EdgeDismissableAddon.isDismiss = true;
              break;
          }
        }
        super.updateGame(isInit);
      }
    }
  }
}
