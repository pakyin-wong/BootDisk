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
      protected _forceNoDismiss: boolean = false;

      protected _titleHeader: eui.Group;

      protected _bet: eui.Group;

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

        this.setBackground();
      }

      protected setBackground() {
        switch (this._tableInfo.gametype) {
          case core.GameType.BAC:
          case core.GameType.BAS:
          case core.GameType.BAI:
            this._bgImg.source = 'd_placeholder_ba_jpg';
            break;
          case core.GameType.BAM:
            this._bgImg.source = 'd_placeholder_sq_ba_jpg';
            break;
          case core.GameType.DT:
            this._bgImg.source = 'd_placeholder_dt_jpg';
            break;
          case core.GameType.DI:
            this._bgImg.source = 'd_placeholder_sicbo_jpg';
            break;
          case core.GameType.DIL:
            this._bgImg.source = 'd_placeholder_gof_sicbo_jpg';
            break;
          case core.GameType.RO:
            this._bgImg.source = 'd_placeholder_ro_jpg';
            break;
          case core.GameType.ROL:
            this._bgImg.source = 'd_placeholder_gof_ro_jpg';
            break;
          case core.GameType.LW:
            this._bgImg.source = 'd_placeholder_lw_jpg';
            break;
        }
      }

      protected initOrientationDependentComponent() {
        this._header && dir.layerCtr.nav && dir.layerCtr.nav.addChild(this._header);
        console.log(this._titleHeader);
        const titleGroup1: eui.Group = dir.layerCtr.nav.$children[0] as eui.Group;
        const titleGroup: eui.Group = titleGroup1['_titleGroup'];
        console.log(titleGroup);
        this._titleHeader && titleGroup && titleGroup.addChild(this._titleHeader);
        // this._header && this.sceneHeader.addChild(this._header);
      }

      protected clearOrientationDependentComponent() {
        super.clearOrientationDependentComponent();
        if (this._titleHeader && this._titleHeader.parent !== null) {
          this._titleHeader.parent.removeChild(this._titleHeader);
        }
      }
      protected destroy() {
        if (this._titleHeader && this._titleHeader.parent !== null) {
          this._titleHeader.parent.removeChild(this._titleHeader);
        }
        if (this._header && this._header.parent !== null) {
          this._header.parent.removeChild(this._header);
        }
        super.destroy();
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
        if (this._bet) {
          egret.Tween.removeTweens(this._bet);
          egret.Tween.get(this._bet).to({ y: enable ? 0 : 100, alpha: enable ? 1 : 0 }, 400, egret.Ease.getElasticInOut(1, 400));
        }
        if ((env.isAutoDismiss || enable) && ui.EdgeDismissableAddon.isDismiss === enable && !this._forceNoDismiss) {
          // console.log(ui.EdgeDismissableAddon.isDismiss);
          ui.EdgeDismissableAddon.toggle();
          // if (this._betRelatedGroup) {
          //   const target = this._betRelatedGroup.$children[0];
          //   if (target instanceof eui.Group) {
          //     egret.Tween.removeTweens(target);
          //     egret.Tween.get(target).to({ y: enable ? 0 : 100, alpha: enable ? 1 : 0 }, 400, egret.Ease.getElasticInOut(1, 400));
          //   }
          // }
        }
      }

      protected onRoadDataUpdate(evt: egret.Event) {
        super.onRoadDataUpdate(evt);
        if (evt && evt.data) {
          const stat = <data.TableInfo>evt.data;
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
