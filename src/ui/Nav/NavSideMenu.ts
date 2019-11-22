namespace we {
  export namespace ui {
    export class NavSideMenu extends Popper {
      private btn_whiteMode: eui.Component;
      private btn_darkMode: eui.Component;
      private btn_history: eui.Component;
      private btn_member: eui.Component;
      private btn_road: eui.Component;
      private btn_system: eui.Component;
      private btn_logout: eui.Component;

      private txt_selectMode: RunTimeLabel;
      private txt_whiteMode: RunTimeLabel;
      private txt_darkMode: RunTimeLabel;
      private txt_history: RunTimeLabel;
      private txt_member: RunTimeLabel;
      private txt_road: RunTimeLabel;
      private txt_system: RunTimeLabel;
      private txt_logout: RunTimeLabel;

      public constructor() {
        super('NavSideMenu');
      }

      protected mount() {
        this.initTxt();
        this.addListeners();
        super.mount();
      }

      private initTxt() {
        this.txt_selectMode.renderText = () => `${i18n.t('nav.menu.selectMode')}`;
        this.txt_whiteMode.renderText = () => `${i18n.t('nav.menu.whiteMode')}`;
        this.txt_darkMode.renderText = () => `${i18n.t('nav.menu.darkMode')}`;
        this.txt_history.renderText = () => `${i18n.t('nav.menu.history')}`;
        this.txt_member.renderText = () => `${i18n.t('nav.menu.member')}`;
        this.txt_road.renderText = () => `${i18n.t('nav.menu.road')}`;
        this.txt_system.renderText = () => `${i18n.t('nav.menu.system')}`;
        this.txt_logout.renderText = () => `${i18n.t('nav.menu.logout')}`;
      }

      private addListeners() {
        this._addButtonListener(this.btn_whiteMode, this.onClickWhiteMode);
        this._addButtonListener(this.btn_darkMode, this.onClickDarkMode);
        this._addButtonListener(this.btn_history, this.onClickHistory);
        this._addButtonListener(this.btn_member, this.onClickMember);
        this._addButtonListener(this.btn_road, this.onClickRoad);
        this._addButtonListener(this.btn_system, this.onClickSystem);
        this._addButtonListener(this.btn_logout, this.onClickLogout);
      }

      private removeListeners() {
        this.btn_whiteMode.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickWhiteMode, this);
        this.btn_darkMode.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickDarkMode, this);
        this.btn_history.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHistory, this);
        this.btn_member.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickMember, this);
        this.btn_road.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickRoad, this);
        this.btn_system.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickSystem, this);
        this.btn_logout.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickLogout, this);
      }

      private _addButtonListener(i: eui.Component, callback) {
        i.addEventListener(egret.TouchEvent.TOUCH_TAP, callback, this);
        mouse.setButtonMode(i, true);
      }

      private onClickWhiteMode() {
        logger.l(`NavSideMenu::onClickWhiteMode`);
      }

      private onClickDarkMode() {
        logger.l(`NavSideMenu::onClickDarkMode`);
      }

      private onClickHistory() {
        logger.l(`NavSideMenu::onClickHistory`);
      }

      private onClickMember() {
        logger.l(`NavSideMenu::onClickMember`);
      }

      private onClickRoad() {
        logger.l(`NavSideMenu::onClickRoad`);
      }

      private onClickSystem() {
        logger.l(`NavSideMenu::onClickSystem`);
      }

      private onClickLogout() {
        logger.l(`NavSideMenu::onClickLogout`);
      }
    }
  }
}
