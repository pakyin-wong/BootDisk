namespace we {
  export namespace rol {
    export class ChipLayer extends we.ro.ChipLayer {
      public clearLuckyNumber() {
        if (this._mouseAreaMapping) {
          Object.keys(this._mouseAreaMapping).map(key => {
            if (this._mouseAreaMapping[key]) {
              this._mouseAreaMapping[key].removeChildren();
            }
          });
        }
      }

      public showLuckyNumber() {
        if (this._tableId && env.tableInfos[this._tableId] && env.tableInfos[this._tableId].data && env.tableInfos[this._tableId].data.luckynumber) {
          Object.keys(env.tableInfos[this._tableId].data.luckynumber).map((key, index) => {
            if (this._mouseAreaMapping[ro.BetField['DIRECT_' + key]]) {
              this._mouseAreaMapping[ro.BetField['DIRECT_' + key]].removeChildren();

              const img = new eui.Image();

              img.verticalCenter = 0;
              img.horizontalCenter = 0;

              if (+key === 0) {
                img.source = 'd_gow_rou_betborad_hl_big_png';
                img.width = this._mouseAreaMapping[ro.BetField['DIRECT_' + key]].width;
                img.height = this._mouseAreaMapping[ro.BetField['DIRECT_' + key]].height;
              } else {
                img.source = 'd_gow_rou_betborad_hl_png';
                img.width = this._mouseAreaMapping[ro.BetField['DIRECT_' + key]].width * 0.97;
                img.height = this._mouseAreaMapping[ro.BetField['DIRECT_' + key]].height * 0.97;
              }

              const label = new eui.Label();
              label.verticalCenter = -23;
              label.horizontalCenter = 0;
              label.size = 25;
              label.textColor = 0x83f3af;
              label.text = env.tableInfos[this._tableId].data.luckynumber[key] + 'x';

              this._mouseAreaMapping[ro.BetField['DIRECT_' + key]].addChild(img);
              this._mouseAreaMapping[ro.BetField['DIRECT_' + key]].addChild(label);
            }
          });
        }
      }
    }
  }
}
