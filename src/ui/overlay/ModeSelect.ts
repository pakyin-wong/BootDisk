namespace we {
  export namespace overlay {
    export class ModeSelect extends ui.Panel {
      private btn_lightMode: eui.Component;
      private btn_darkMode: eui.Component;

      private txt_selectMode: ui.RunTimeLabel;
      private txt_lightMode: ui.RunTimeLabel;
      private txt_darkMode: ui.RunTimeLabel;

      public constructor() {
        super('ModeSelect');
      }

      protected initOrientationDependentComponent() {
        super.initOrientationDependentComponent();
        this.initTxt();
        this.addListeners();
        this.update();
      }

      protected clearOrientationDependentComponent() {
        super.clearOrientationDependentComponent();
        this.removeListeners();
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
            this.onClickLightMode();
            break;
        }
        this.invalidateState();
      }

      private initTxt() {
        this.txt_selectMode.renderText = () => `${i18n.t('nav.menu.selectMode')}`;
        this.txt_lightMode.renderText = () => `${i18n.t('nav.menu.whiteMode')}`;
        this.txt_darkMode.renderText = () => `${i18n.t('nav.menu.darkMode')}`;
        (<ui.BaseImageButton | ui.RoundRectButton> this.close).label.renderText = () => `${i18n.t('nav.menu.confirm')}`;
        (<ui.BaseImageButton | ui.RoundRectButton> this.close).label.size = env.isMobile ? 60 : 24;
        (<ui.BaseImageButton | ui.RoundRectButton> this.close).label.fontFamily = 'Arial';
      }

      private addListeners() {
        utils.addButtonListener(this.btn_lightMode, this.onClickLightMode, this);
        utils.addButtonListener(this.btn_darkMode, this.onClickDarkMode, this);
        dir.evtHandler.$addListener(core.Event.MODE_UPDATE, this.update, this);
      }

      private removeListeners() {
        this.btn_lightMode.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickLightMode, this);
        this.btn_darkMode.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickDarkMode, this);
        dir.evtHandler.removeEventListener(core.Event.MODE_UPDATE, this.update, this);
      }

      private onClickLightMode() {
        logger.l(utils.LogTarget.DEBUG, `NavSideMenu::onClickLightMode`);
        env.mode = 0;
        dir.socket.updateSetting('mode', '0');
        dir.evtHandler.dispatch(core.Event.MODE_UPDATE, { mode: 0 });
      }

      private onClickDarkMode() {
        logger.l(utils.LogTarget.DEBUG, `NavSideMenu::onClickDarkMode`);
        env.mode = 1;
        dir.socket.updateSetting('mode', '1');
        dir.evtHandler.dispatch(core.Event.MODE_UPDATE, { mode: 1 });
      }
    }
  }
}
