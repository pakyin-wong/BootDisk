namespace we {
  export namespace ui {
    export class MobileBetLimitSelector extends RunTimeLabel {

      protected initRenderText() {
        super.initRenderText();

        const betLimitItems = env.betLimits.Live.map(data => {
          return `${utils.numberToFaceValue(data.minlimit)} - ${utils.numberToFaceValue(data.maxlimit)}`;
        });

        const dropdownSource = env.betLimits.Live.map((data, index) => {
          return ui.NewDropdownItem(index, () => `${utils.numberToFaceValue(data.minlimit)} - ${utils.numberToFaceValue(data.maxlimit)}`);
        });

        utils.DropdownCreator.new({
          toggler: this,
          review: this,
          arrCol: new eui.ArrayCollection(dropdownSource),
          title: () => `${i18n.t('baccarat.betLimitshort')} ${betLimitItems.length > 0 ? betLimitItems[env.currentSelectedBetLimitIndex] : ''}`,
          selected: env.currentSelectedBetLimitIndex,
        });
        this.addEventListener('DROPDOWN_ITEM_CHANGE', this.onBetLimitSelected, this);
      }

      protected destroy() {
        super.destroy();
        this.removeEventListener('DROPDOWN_ITEM_CHANGE', this.onBetLimitSelected, this);
      }

      protected onBetLimitSelected(evt: egret.Event) {
        const selected = evt.data;
        env.currentSelectedBetLimitIndex = selected;
        dir.evtHandler.dispatch(core.Event.BET_LIMIT_CHANGE);
        dir.socket.updateSetting('currentSelectedBetLimitIndex', selected.toString());
      }
    }
  }
}