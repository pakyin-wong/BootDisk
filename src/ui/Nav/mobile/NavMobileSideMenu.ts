namespace we {
  export namespace ui {
    export class NavMobileSideMenu extends NavSideMenu {
      protected txt_title: RunTimeLabel;

      protected btn_info: eui.Component;
      protected txt_info: RunTimeLabel;

      protected btn_leftHandMode: eui.Component;
      protected txt_leftHandMode: RunTimeLabel;
      protected switch_leftHandMode: BaseButton;

      constructor() {
        super();
        this.poppableAddon = new PoppableAddonSilder(this);
      }

      protected mount() {
        super.mount();
        this.switch_leftHandMode.active = env.leftHandMode;
      }

      protected initTxt() {
        super.initTxt();
        this.txt_title.renderText = () => `${i18n.t('nav.menu.title')}`;
        this.txt_info.renderText = () => `${i18n.t('nav.menu.info')}`;
        this.txt_leftHandMode.renderText = () => `${i18n.t('nav.menu.leftHandMode')}`;
      }

      protected addListeners() {
        super.addListeners();
        utils.addButtonListener(this.btn_info, this.onClickInfo, this);
        utils.addButtonListener(this.btn_leftHandMode, this.onSwitchLeftHandMode, this);
      }

      protected removeListeners() {
        super.removeListeners();
        this.btn_info.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickInfo, this);
        this.btn_leftHandMode.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSwitchLeftHandMode, this);
      }

      protected onClickInfo() {
        dir.evtHandler.createOverlay({
          class: 'PlayerProfile',
        });
        logger.l(`NavSideMenu::onClickInfo`);
      }

      protected onClickHistory() {
        dir.evtHandler.createOverlay({
          class: 'BetHistoryMobile',
        });
        logger.l(`NavSideMenu::onClickHistory`);
      }

      protected onSwitchLeftHandMode(e) {
        env.leftHandMode = this.switch_leftHandMode.active = !env.leftHandMode;
        dir.evtHandler.dispatch(core.Event.SWITCH_LEFT_HAND_MODE, env.leftHandMode);
      }
    }
  }
}
