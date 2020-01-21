namespace we {
  export namespace ui {
    export class NavSideMenu extends Panel {
      private btn_lightMode: eui.Component;
      private btn_darkMode: eui.Component;
      private btn_history: eui.Component;
      private btn_member: eui.Component;
      private btn_road: eui.Component;
      private btn_system: eui.Component;
      private btn_logout: eui.Component;

      private txt_selectMode: RunTimeLabel;
      private txt_lightMode: RunTimeLabel;
      private txt_darkMode: RunTimeLabel;
      private txt_history: RunTimeLabel;
      private txt_member: RunTimeLabel;
      private txt_road: RunTimeLabel;
      private txt_system: RunTimeLabel;
      private txt_logout: RunTimeLabel;

      public constructor() {
        super('nav/NavSideMenu');
      }

      protected mount() {
        super.mount();
        this.initTxt();
        this.addListeners();
        this.update();
      }

      protected destroy() {
        this.removeListeners();
      }

      protected update() {
        switch (env.mode) {
          case 1:
            this.currentState = 'dark';
            break;
          case 0:
            this.currentState = 'light';
            break;
          default:
            // this.onClickLightMode();
            break;
        }
      }

      private initTxt() {
        this.txt_selectMode.renderText = () => `${i18n.t('nav.menu.selectMode')}`;
        this.txt_lightMode.renderText = () => `${i18n.t('nav.menu.whiteMode')}`;
        this.txt_darkMode.renderText = () => `${i18n.t('nav.menu.darkMode')}`;
        this.txt_history.renderText = () => `${i18n.t('nav.menu.history')}`;
        this.txt_member.renderText = () => `${i18n.t('nav.menu.member')}`;
        this.txt_road.renderText = () => `${i18n.t('nav.menu.road')}`;
        this.txt_system.renderText = () => `${i18n.t('nav.menu.system')}`;
        this.txt_logout.renderText = () => `${i18n.t('nav.menu.logout')}`;
      }

      private addListeners() {
        utils.addButtonListener(this.btn_lightMode, this.onClickLightMode, this);
        utils.addButtonListener(this.btn_darkMode, this.onClickDarkMode, this);
        utils.addButtonListener(this.btn_history, this.onClickHistory, this);
        utils.addButtonListener(this.btn_member, this.onClickMember, this);
        utils.addButtonListener(this.btn_road, this.onClickRoad, this);
        utils.addButtonListener(this.btn_system, this.onClickSystem, this);
        utils.addButtonListener(this.btn_logout, this.onClickLogout, this);
        dir.evtHandler.$addListener(core.Event.MODE_UPDATE, this.update, this);
      }

      private removeListeners() {
        this.btn_lightMode.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickLightMode, this);
        this.btn_darkMode.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickDarkMode, this);
        this.btn_history.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHistory, this);
        this.btn_member.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickMember, this);
        this.btn_road.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickRoad, this);
        this.btn_system.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickSystem, this);
        this.btn_logout.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickLogout, this);
        dir.evtHandler.removeEventListener(core.Event.MODE_UPDATE, this.update, this);
      }

      private onClickLightMode() {
        logger.l(`NavSideMenu::onClickLightMode`);
        env.mode = 0;
        dir.socket.updateSetting('mode', '0');
        dir.evtHandler.dispatch(core.Event.MODE_UPDATE, { mode: 0 });
      }

      private onClickDarkMode() {
        logger.l(`NavSideMenu::onClickDarkMode`);
        env.mode = 1;
        dir.socket.updateSetting('mode', '1');
        dir.evtHandler.dispatch(core.Event.MODE_UPDATE, { mode: 1 });
      }

      private onClickHistory() {
        dir.evtHandler.createOverlay({
          class: 'BetHistory',
        });
        logger.l(`NavSideMenu::onClickHistory`);
      }

      private onClickMember() {
        dir.evtHandler.createOverlay({
          class: 'MemberReport',
        });
        logger.l(`NavSideMenu::onClickMember`);
      }

      private onClickRoad() {
        dir.evtHandler.createOverlay({
          class: 'CustomRoad',
        });
        logger.l(`NavSideMenu::onClickRoad`);
      }

      private onClickSystem() {
        dir.evtHandler.createOverlay({
          class: 'SystemSetting',
        });
        logger.l(`NavSideMenu::onClickSystem`);
      }

      private onClickLogout() {
        logger.l(`NavSideMenu::onClickLogout`);
      }
    }
  }
}
