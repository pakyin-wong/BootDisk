namespace we {
  export namespace ui {
    export class NavMobileSideMenu extends NavSideMenu {
        protected txt_title:RunTimeLabel;

        protected btn_info: eui.Component;
        protected txt_info: RunTimeLabel;

        constructor() {
            super();
        this.poppableAddon = new PoppableAddonSilder(this);
        }

        protected initTxt() {
            super.initTxt();
            this.txt_title.renderText = () => `${i18n.t('nav.menu.title')}`;
            this.txt_info.renderText = () => `${i18n.t('nav.menu.info')}`;
        }

              protected addListeners() {
                  super.addListeners();
                  utils.addButtonListener(this.btn_info, this.onClickInfo, this);
              }

      protected removeListeners() {
          super.removeListeners();
                  this.btn_info.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickInfo, this);

      }

      protected onClickInfo() {
        dir.evtHandler.createOverlay({
          class: 'PlayerProfile',
        });
        logger.l(`NavSideMenu::onClickInfo`);
      }
    }
  }
}