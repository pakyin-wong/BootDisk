namespace we {
  export namespace ui {
    export class MobileBottomCommonPanel extends core.BaseGamePanel {
      protected gameIdLabel: ui.RunTimeLabel;
      protected totalBetLabel: ui.RunTimeLabel;
      protected gameId: string;
      protected totalBet: number;

      protected _arrow: egret.DisplayObject;
      protected _arrowUp: egret.DisplayObject;
      public isPanelOpen: boolean = true;

      protected _gameInfoLabel: ui.RunTimeLabel;

      protected viewStack: eui.ViewStack;
      protected viewStackMask: eui.Rect;

      protected _verGroup: eui.Group;

      public constructor(skin?: string) {
        super();
      }

      protected init() {
        this.gameId = '';
        this.totalBet = 0;

        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        this.changeLang();

        this._arrow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPanelOpen, this);
        this._arrowUp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPanelOpen, this);

        this.viewStack.mask = this.viewStackMask;
        this.createVerLayout();

        this.viewStack.selectedIndex = 0;

        this.onPanelOpen();
      }

      public changeLang() {
        this.gameIdLabel.text = this.gameId + ' ' + i18n.t('baccarat.gameroundid');
        this.totalBetLabel.text = i18n.t('baccarat.totalbet') + ' ' + this.totalBet;

        this._gameInfoLabel.text = i18n.t('mobile_panel_game_Info');
      }

      protected onPanelOpen() {
        this._gameInfoLabel.visible = this.isPanelOpen;
        this._arrow.visible = !this.isPanelOpen;
        this._arrowUp.visible = this.isPanelOpen;

        if (this.isPanelOpen) {
          this.isPanelOpen = false;
          egret.Tween.get(this.viewStack).to({ height: 0 }, 250);
          egret.Tween.get(this.viewStackMask).to({ height: 0 }, 250);
        } else {
          this.isPanelOpen = true;
          egret.Tween.get(this.viewStack).to({ height: 532 }, 250);
          egret.Tween.get(this.viewStackMask).to({ height: 532 }, 250);
        }
      }

      protected onViewChange(e: eui.UIEvent) {
        const radio: eui.RadioButton = e.target;
        this.viewStack.selectedIndex = radio.value;
      }

      protected createVerLayout() {
        const vLayout: eui.VerticalLayout = new eui.VerticalLayout();
        vLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
        vLayout.gap = 0;
        this._verGroup.layout = vLayout;
      }

      public update() {
        if (this.tableInfo) {
          if (this.tableInfo.betInfo) {
            if (this.tableInfo.betInfo.gameroundid) {
              this.gameId = this.tableInfo.betInfo.gameroundid;
            }
            if (this.tableInfo.betInfo.total) {
              this.totalBet = this.tableInfo.betInfo.total;
            }
          }
          this.changeLang();
        }
      }

      public destroy() {
        super.destroy();

        if (dir.evtHandler.hasEventListener(core.Event.SWITCH_LANGUAGE)) {
          dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        }

        this._arrow.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPanelOpen, this);
        this._arrowUp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPanelOpen, this);
      }
    }
  }
}
