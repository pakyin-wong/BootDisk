namespace we {
  export namespace ui {
    export class NavSideMenu extends Panel {
      protected btn_lightMode: eui.Component;
      protected btn_darkMode: eui.Component;
      protected btn_gameSet: eui.Component;
      protected btn_history: eui.Component;
      protected btn_member: eui.Component;
      protected btn_road: eui.Component;
      protected btn_system: eui.Component;
      protected btn_logout: eui.Component;

      protected txt_selectMode: RunTimeLabel;
      protected txt_lightMode: RunTimeLabel;
      protected txt_darkMode: RunTimeLabel;
      protected txt_gameSet: RunTimeLabel;
      protected txt_history: RunTimeLabel;
      protected txt_member: RunTimeLabel;
      protected txt_road: RunTimeLabel;
      protected txt_system: RunTimeLabel;
      protected txt_logout: RunTimeLabel;

      public constructor() {
        super('NavSideMenu');
      }

      protected mount() {
        super.mount();
        this.initTxt();
        this.addListeners();
        this.update();
      }

      protected destroy() {
        super.destroy();
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

      protected initTxt() {
        this.txt_selectMode.renderText = () => `${i18n.t('nav.menu.selectMode')}`;
        this.txt_lightMode && (this.txt_lightMode.renderText = () => `${i18n.t('nav.menu.whiteMode')}`);
        this.txt_darkMode && (this.txt_darkMode.renderText = () => `${i18n.t('nav.menu.darkMode')}`);
        this.txt_history.renderText = () => `${i18n.t('nav.menu.history')}`;
        this.txt_member.renderText = () => `${i18n.t('nav.menu.member')}`;
        this.txt_road.renderText = () => `${i18n.t('nav.menu.road')}`;
        this.txt_system.renderText = () => `${i18n.t('nav.menu.system')}`;
        this.txt_logout.renderText = () => `${i18n.t('nav.menu.logout')}`;
        this.txt_gameSet.renderText = () => `${i18n.t('nav.menu.gameSet')}`;
      }

      protected addListeners() {
        utils.addButtonListener(this.btn_lightMode, this.onClickLightMode, this);
        utils.addButtonListener(this.btn_darkMode, this.onClickDarkMode, this);
        utils.addButtonListener(this.btn_history, this.onClickHistory, this);
        utils.addButtonListener(this.btn_member, this.onClickMember, this);
        utils.addButtonListener(this.btn_road, this.onClickRoad, this);
        utils.addButtonListener(this.btn_system, this.onClickSystem, this);
        utils.addButtonListener(this.btn_logout, this.onClickLogout, this);
        utils.addButtonListener(this.btn_gameSet, this.onClickGameSet, this);
        dir.evtHandler.$addListener(core.Event.MODE_UPDATE, this.update, this);
      }

      protected removeListeners() {
        this.btn_lightMode.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickLightMode, this);
        this.btn_darkMode.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickDarkMode, this);
        this.btn_history.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHistory, this);
        this.btn_member.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickMember, this);
        this.btn_road.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickRoad, this);
        this.btn_system.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickSystem, this);
        this.btn_logout.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickLogout, this);
        this.btn_gameSet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickGameSet, this);
        dir.evtHandler.removeEventListener(core.Event.MODE_UPDATE, this.update, this);
      }

      protected onClickLightMode() {
        logger.l(`NavSideMenu::onClickLightMode`);
        env.mode = 0;
        dir.socket.updateSetting('mode', '0');
        dir.evtHandler.dispatch(core.Event.MODE_UPDATE, { mode: 0 });
      }

      protected onClickDarkMode() {
        logger.l(`NavSideMenu::onClickDarkMode`);
        env.mode = 1;
        dir.socket.updateSetting('mode', '1');
        dir.evtHandler.dispatch(core.Event.MODE_UPDATE, { mode: 1 });
      }

      protected onClickHistory() {
        dir.evtHandler.createOverlay({
          class: 'BetHistory',
        });
        logger.l(`NavSideMenu::onClickHistory`);
      }

      protected onClickMember() {
        dir.evtHandler.createOverlay({
          class: 'MemberReport',
        });
        logger.l(`NavSideMenu::onClickMember`);
      }

      protected onClickRoad() {
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

      private onClickGameSet() {
        dir.evtHandler.createOverlay({
          class: 'GameSetting',
        });
        logger.l(`NavSideMenu::onClickGameSet`);
      }

      protected onClickLogout() {
        dir.evtHandler.showMessage({
          class: 'MessageDialog',
          args: [
            i18n.t('nav.menu.logoutMsg'),
            {
              dismiss: { text: i18n.t('nav.menu.cancel') },
              action: { text: i18n.t('nav.menu.confirm') },
            },
          ],
        });
        logger.l(`NavSideMenu::onClickLogout`);
      }
    }
  }
}
