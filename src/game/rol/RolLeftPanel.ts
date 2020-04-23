namespace we {
  export namespace rol {
    export class RolLeftPanel extends ro.RoLeftPanel {
      protected pageRadioBtn4: eui.RadioButton;

      public constructor(skin?: string) {
        super(skin ? skin : env.isMobile ? '' : 'RolLeftPanel');
      }

      protected setRadioButtons() {
        this._radioButtons = [this.pageRadioBtn1, this.pageRadioBtn2, this.pageRadioBtn3, this.pageRadioBtn4];
      }

      public changeLang() {
        super.changeLang();
        this.pageRadioBtn4['labelDisplayDown']['text'] = this.pageRadioBtn4['labelDisplayUp']['text'] = i18n.t('roulette.luckyNumber');
      }

      protected init() {
        super.init();
        this.pageRadioBtn4.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
      }

      public updateLuckyNumbers() {
        const layout = new eui.HorizontalLayout();
        layout.verticalAlign = egret.VerticalAlign.MIDDLE;
        layout.horizontalAlign = egret.HorizontalAlign.CENTER;

        const page4Group = this.pageStack.getChildAt(3) as eui.Group;
        page4Group.removeChildren();
        page4Group.layout = layout;

        if (this.tableInfo.data.luckynumber) {
          Object.keys(this.tableInfo.data.luckynumber).map((key, index) => {
            const imgCoin = new LuckyCoin();
            imgCoin.odd = this.tableInfo.data.luckynumber[key];
            imgCoin.value = +key;
            page4Group.addChild(imgCoin);
            if (this._chipLayer) {
              const betDetails = this._chipLayer.getConfirmedBetDetails();
              if (betDetails) {
                betDetails.map((detail, index) => {
                  if (detail && detail.field) {
                    const f = this.fieldToValue(detail.field);
                    if (key === f) {
                      imgCoin.amount = detail.amount / 100;
                    }
                  }
                });
              }
            }
          });
        }
      }

      public clearLuckyNumbers() {
        const page4Group = this.pageStack.getChildAt(3) as eui.Group;
        page4Group.removeChildren();
      }

      protected fieldToValue(fieldName: string) {
        if (!fieldName) {
          return null;
        }
        if (fieldName.indexOf('DIRECT_') === -1) {
          return null;
        }
        const result = fieldName.split('DIRECT_');
        if (result && result[1]) {
          return result[1];
        }
        return null;
      }
    }
  }
}
