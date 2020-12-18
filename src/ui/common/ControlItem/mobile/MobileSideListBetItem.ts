namespace we {
  export namespace ui {
    export class MobileSideListBetItem extends MobileListBaseItem {
      protected _bettingGroup: eui.Group;
      protected _resultGroup: eui.Group;

      protected _tableLayerNode: eui.Component;
      protected _chipLayerNode: eui.Component;
      protected _resultMessageNode: eui.Component;
      protected _resultDisplayNode: eui.Component;

      protected _timer: ui.CountdownTimer;

      public constructor(skinName: string = null) {
        super(skinName);
      }

      protected initCustomPos() {
        this._buttonGroupShowY = 194;
        this._buttonGroupHideY = 230;
      }

      protected initComponents() {
        this.generateTableLayer();
        this.generateChipLayer();
        this.generateResultMessage();
        this.generateResultDisplay();
        super.initComponents();
      }

      protected destroy() {
        super.destroy();
      }

      protected generateTableLayer() {
        if (this.itemInitHelper) {
          this._tableLayer = this.itemInitHelper.generateTableLayer(this._tableLayerNode);
        }
      }

      protected generateChipLayer() {
        if (this.itemInitHelper) {
          this._chipLayer = this.itemInitHelper.generateChipLayer(this._chipLayerNode);
        }
      }

      protected generateResultMessage() {
        if (this.itemInitHelper && this.itemInitHelper.generateResultMessage) {
          this._resultMessage = this.itemInitHelper.generateResultMessage(this._resultMessageNode);
        }
      }

      protected generateResultDisplay() {
        if (this.itemInitHelper && this.itemInitHelper.generateResultDisplay) {
          this._cardHolder = this.itemInitHelper.generateResultDisplay(this._resultDisplayNode);
        }
      }

      // set the position of the children components
      protected arrangeComponents() {
        const properties = [
          'x',
          'y',
          'width',
          'height',
          'scaleX',
          'scaleY',
          'left',
          'right',
          'top',
          'bottom',
          'verticalCenter',
          'horizontalCenter',
          'anchorOffsetX',
          'anchorOffsetY',
          'percentWidth',
          'percentHeight',
        ];
        for (const att of properties) {
          if (this._tableLayer && !isNaN(this._tableLayerNode[att]) && att !== 'height' && att !== 'scaleX' && att !== 'scaleY') {
            this._tableLayer[att] = this._tableLayerNode[att];
          }
          if (this._chipLayer && !isNaN(this._chipLayerNode[att]) && att !== 'height' && att !== 'scaleX' && att !== 'scaleY') {
            this._chipLayer[att] = this._chipLayerNode[att];
          }
          if (this._resultMessage && !isNaN(this._resultMessageNode[att])) {
            this._resultMessage[att] = this._resultMessageNode[att];
          }
          if (this._cardHolder && !isNaN(this._resultDisplayNode[att]) && att !== 'height' && att !== 'scaleX' && att !== 'scaleY') {
            this._cardHolder[att] = this._resultDisplayNode[att];
          }
        }
      }

      protected initChildren() {
        super.initChildren();
        this._tableLayer.currentState = 'Normal';
        this._chipLayer.removeAllMouseListeners();
        this._chipLayer.setTouchEnabled(false);

        this._quickBetButton.label.renderText = () => {
          return i18n.t('mobile_quick_bet_button_add_label');
        };
      }

      protected setBetRelatedComponentsEnabled(enable: boolean) {
        super.setBetRelatedComponentsEnabled(enable);
        this._chipLayer.setTouchEnabled(false);
      }

      protected setResultRelatedComponentsEnabled(enable: boolean) {
        super.setResultRelatedComponentsEnabled(enable);
        if (this._resultGroup) {
          this._resultGroup.visible = enable;
        }
        if (this._tableInfo) {
          switch (this._tableInfo.gametype) {
            case we.core.GameType.BAC:
            case we.core.GameType.BAS:
            case we.core.GameType.BAI:
            case we.core.GameType.BAM:
            case we.core.GameType.DT:
              this._tableLayer.visible = !enable;
              if (this._bettingGroup) {
                this._bettingGroup.visible = !enable;
              }
              break;
            default:
              break;
          }
        }
      }

      protected setStateDeal(isInit: boolean = false) {
        super.setStateDeal(isInit);
        if (this._previousState !== we.core.GameState.DEAL) {
          env.tableInfos[this._tableId].prevbets = env.tableInfos[this._tableId].bets;
          env.tableInfos[this._tableId].prevbetsroundid = env.tableInfos[this._tableId].roundid;
        }
      }
    }
  }
}
