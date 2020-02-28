/* tslint:disable triple-equals */
namespace we {
  export namespace core {
    // base control class that hold and manage the basic item in Ba Item
    export class MobileBaseGameScene extends BaseGameScene {
      protected _bottomGamePanel: BaseGamePanel;
      protected _tableInfoPanel: ui.TableInfoPanel;
      protected _lblBetLimit: ui.RunTimeLabel;

      constructor(data: any) {
        super(data);
      }

      protected initChildren() {
        super.initChildren();
        this._bottomGamePanel.setTableInfo(this._tableInfo);

        if (this._tableInfoPanel) {
          this._tableInfoPanel.setToggler(this._lblRoomInfo);
          this._tableInfoPanel.setValue(this._tableInfo);
        }

        if (this._lblBetLimit) {
          this.initBetLimitSelector();
        }
      }

      protected initBetLimitSelector() {
        const betLimitList = env.betLimits;
        const betLimitItems = betLimitList.map(data => {
          return `${utils.numberToFaceValue(data.minlimit)} - ${utils.numberToFaceValue(data.maxlimit)}`;
        });
        const dropdownSource = betLimitList.map((data, index) => {
          return ui.NewDropdownItem(index, () => `${utils.numberToFaceValue(data.minlimit)} - ${utils.numberToFaceValue(data.maxlimit)}`);
        });

        const selectedIndex = env.currentSelectedBetLimitIndex;

        utils.DropdownCreator.new({
          toggler: this._lblBetLimit,
          review: this._lblBetLimit,
          arrCol: new eui.ArrayCollection(dropdownSource),
          title: () => `${i18n.t('baccarat.betLimitshort')} ${betLimitItems.length > 0 ? betLimitItems[selectedIndex] : ''}`,
          selected: 0,
        });

        this.updateBetLimit(selectedIndex);

        this._lblBetLimit.addEventListener('DROPDOWN_ITEM_CHANGE', this.onBetLimitSelected, this);
      }

      protected onBetLimitSelected(evt: egret.Event) {
        const selected = evt.data;
        env.currentSelectedBetLimitIndex = selected;
        dir.evtHandler.dispatch(core.Event.BET_LIMIT_CHANGE);
        this.updateBetLimit(selected);
      }
      protected onBetLimitChanged(evt: egret.Event) {
        const selectedIndex = env.currentSelectedBetLimitIndex;
        this.updateBetLimit(selectedIndex);
      }

      protected updateBetLimit(selectedIndex) {
        const betLimitList = env.betLimits;
        const betLimitItems = betLimitList.map(data => {
          return `${utils.numberToFaceValue(data.minlimit)} - ${utils.numberToFaceValue(data.maxlimit)}`;
        });
        if (this._lblBetLimit) {
          this._lblBetLimit.renderText = () => `${i18n.t('baccarat.betLimitshort')} ${betLimitItems.length > 0 ? betLimitItems[selectedIndex] : ''}`;
        }
      }

      protected updateTableInfoRelatedComponents() {
        super.updateTableInfoRelatedComponents();
        this._bottomGamePanel.update();

        if (this._tableInfoPanel) {
          this._tableInfoPanel.setValue(this._tableInfo);
        }
      }

      protected onRoadDataUpdate(evt: egret.Event) {
        super.onRoadDataUpdate(evt);
        this._bottomGamePanel.update();
      }
    }
  }
}
