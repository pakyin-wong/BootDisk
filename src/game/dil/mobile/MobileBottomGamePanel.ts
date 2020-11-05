// TypeScript file
namespace we {
  export namespace dil {
    export class MobileBottomGamePanel extends ui.MobileBottomCommonPanel {
      public _tableInfoPanel: di.TableInfoPanel;
      // public _betLimitDropDownBtn: ui.RunTimeLabel;

      // viewStack and radioBtn
      protected historyBtn: eui.RadioButton;
      protected poolBtn: eui.RadioButton;
      protected chartBtn: eui.RadioButton;
      protected tableInfoBtn: eui.RadioButton;

      protected _historyGroup: eui.Group;
      protected _poolGroup: eui.Group;
      protected _infoGroup: eui.Group;
      protected _chartGroup: eui.Group;

      public _poolPanel: Pool;
      public _historyPanel1: History;
      public _historyPanel2: History;
      public beadRoad: DilBeadRoad;

      protected test_button1: eui.Group;
      protected test_button2: eui.Group;
      protected _historyGroupHolder: ui.HorizontalHolder;

      public constructor(skin?: string) {
        super(skin || !env.isMobile ? skin : 'dil.MobileBottomGamePanel');
      }

      protected mount() {
        super.mount();
        // this._betLimitDropDownBtn = this._tableInfoPanel.pBetLimit;

        if (env.orientation === 'portrait') {
          this.beadRoad = new DilBeadRoad(4, 8, 104, 1, 44, 14, 0x262a2b, 1); // in game
          this.beadRoad.x = 50;
          this.beadRoad.y = 14;
          this.beadRoad.scaleX = 689 / 689;
          this.beadRoad.scaleY = 689 / 689;
        } else {
          this.beadRoad = new DilBeadRoad(3, 10, 72, 1, 26, 26, 0x262a2b, 1); // in game
          this.beadRoad.x = 20;
          this.beadRoad.y = 20;
          this.beadRoad.scaleX = 1;
          this.beadRoad.scaleY = 1;
        }

        this._historyGroup.addChild(this.beadRoad);

        this._historyPanel1.totalResult = 10;
        this._historyPanel2.totalResult= 50;
      }

      public destroy() {
        this.beadRoad.dispose();
        super.destroy();

        this.removeListeners();
      }

      protected addListeners() {
        super.addListeners();
        this.chartBtn.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        this.tableInfoBtn.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        if (this.historyBtn) {
          this.historyBtn.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        }
        if (this.poolBtn) {
          this.poolBtn.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        }
        if (this.test_button1 && this.test_button2) {
          this.test_button2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.NextHistory,this)
          this.test_button1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.PrevHistory,this)
        }
      }

      protected removeListeners() {
        super.removeListeners();
        this.chartBtn.removeEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        this.tableInfoBtn.removeEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        if (this.historyBtn) {
          this.historyBtn.removeEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        }
        if (this.poolBtn) {
          this.poolBtn.removeEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        }
        if (this.test_button1 && this.test_button2) {
          this.test_button2.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.NextHistory,this)
          this.test_button1.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.PrevHistory,this)
        }
      }

      public updateText() {
        if (this.historyBtn) {
          this.historyBtn.label = i18n.t('mobile_game_panel_history');
        }
        if (this.poolBtn) {
          this.poolBtn.label = i18n.t('dice.livePool');
        }

        this.chartBtn.label = i18n.t('mobile_game_panel_statistic_chart');
        this.tableInfoBtn.label = i18n.t('mobile_game_panel_table_info');
        this._gameInfoLabel.text = i18n.t('mobile_panel_game_Info');
      }

      public manualClose() {
        super.manualClose();
      }

      protected onViewChange(e: eui.UIEvent) {
        super.onViewChange(e);
        this.viewStack.selectedIndex = e.target.value;
      }

      protected onPanelToggle() {
        super.onPanelToggle();
        this.viewStack.selectedIndex = 0;
        this.dispatchEvent(new egret.Event('ON_BOTTOM_PANEL_TOGGLE'));
      }

      public openTableInfo() {
        super.openTableInfo();
        this.tableInfoBtn.selected = true;
        this.viewStack.selectedIndex = this.tableInfoBtn.value;
      }

      protected NextHistory(){
        console.log('NextHistory')
      }

      protected PrevHistory(){
        console.log('PrevHistory')
      }


    }
  }
}
