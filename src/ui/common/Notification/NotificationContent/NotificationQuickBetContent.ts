/* tslint:disable triple-equals */
namespace we {
  export namespace ui {
    export class NotificationQuickBetContent extends ui.ControlItem {
      protected _bigRoad: we.ui.ILobbyRoad & eui.Component;
      protected _alreadyBetSign: eui.Group;
      protected _tableLayerNode: eui.Component;
      protected _chipLayerNode: eui.Component;
      protected _roadmapNode: eui.Component;
      protected _quickbetButtonNode: eui.Component;
      protected _betChipSetNode: eui.Component;

      protected _goodRoadLabel: ui.GoodRoadLabel;
      protected _betChipSetGridSelected: ui.BetChipSetGridSelected;
      protected _betChipSetGridEnabled: boolean = false;

      protected _closeButton: ui.BaseImageButton;
      protected _prevButton: ui.BaseImageButton;

      protected _betChipSetPanel: eui.Group;
      protected _betChipSetGroup: eui.Group;
      protected _betButtonGroup: eui.Group;
      protected _quickBetGroup: eui.Group;
      protected _tableLayerGroup: eui.Group;

      protected _betChipPanelTargetY: number;

      protected _arrangeProperties = [
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

      public constructor(skinName: string = 'QuickBetContainerSkin') {
        super(skinName);
        this._betChipSet.setUpdateChipSetSelectedChipFunc(this._betChipSetGridSelected.setSelectedChip.bind(this._betChipSetGridSelected));
        const denominationList = env.betLimits[this.getSelectedBetLimitIndex()].chips;
        this._betChipSet.init(null, denominationList);
      }

      protected setStateBet(isInit: boolean = false) {
        super.setStateBet(isInit);
        if (this._chipLayer.isAlreadyBet()) {
          this._alreadyBetSign.visible = true;
        } else {
          this._alreadyBetSign.visible = false;
        }
      }

      protected onTableBetInfoUpdate(evt: egret.Event) {
        super.onTableBetInfoUpdate(evt);
        if (evt && evt.data) {
          const tableBetInfo = <data.GameTableBetInfo> evt.data;
          if (tableBetInfo.tableid === this._tableId) {
            if (this._chipLayer.isAlreadyBet()) {
              this._alreadyBetSign.visible = true;
            } else {
              this._alreadyBetSign.visible = false;
            }
          }
        }
      }

      protected addEventListeners() {
        super.addEventListeners();
        this._betChipSetGridSelected.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBetChipSelected, this);
        this._closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.removeSelf, this);
        this._prevButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickUndoButton, this);
      }

      protected removeEventListeners() {
        super.removeEventListeners();
        this._betChipSetGridSelected.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBetChipSelected, this);
        this._closeButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.removeSelf, this);
        this._prevButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickUndoButton, this);
      }

      public getActionButton(): eui.Component {
        return null;
      }

      public setData(tableInfo: data.TableInfo) {
        super.setData(tableInfo);
        if (this.tableInfo.goodRoad) {
          this._goodRoadLabel.visible = true;
          const goodRoadData = this.tableInfo.goodRoad;
          const goodRoadName: string = goodRoadData.custom ? goodRoadData.name : i18n.t(`goodroad.${goodRoadData.roadmapid}`);
          // this._goodRoadLabel.text = goodRoadName;
          this._goodRoadLabel.renderText = () => (goodRoadData.custom ? goodRoadData.name : i18n.t(`goodroad.${goodRoadData.roadmapid}`));
        } else {
          this._goodRoadLabel.visible = false;
        }

        if (tableInfo.roadmap) {
          if (this._bigRoad) {
            this._bigRoad.updateSideBarRoadData(tableInfo.roadmap); // init  roadmap
          }
        }
      }

      protected onRoadDataUpdate(evt: egret.Event) {
        super.onRoadDataUpdate(evt);
        if (evt && evt.data) {
          const tableInfo = <data.TableInfo> evt.data;
          if (tableInfo.tableid === this._tableId) {
            if (this._bigRoad) {
              this._bigRoad.updateSideBarRoadData(tableInfo.roadmap);
            }
          }
        }
      }

      protected initChildren() {
        this.generateRoadmap();
        this.generateTableLayer();
        this.generateChipLayer();
        super.initChildren();
        this._goodRoadLabel.visible = false;
      }

      protected generateTableLayer() {
        if (this.itemInitHelper && this._tableLayerNode) {
          this._tableLayer = this.itemInitHelper.generateTableLayer(this._tableLayerNode);
          this._tableLayer.touchEnabled = false;
          this._tableLayer.touchChildren = false;
        }
      }

      protected generateChipLayer() {
        if (this.itemInitHelper && this._chipLayerNode) {
          this._chipLayer = this.itemInitHelper.generateChipLayer(this._chipLayerNode);
        }
      }

      protected generateRoadmap() {
        if (this.itemInitHelper && this._roadmapNode) {
          this._bigRoad = this.itemInitHelper.generateRoadmap(this._roadmapNode);
          if (this._bigRoad) {
            this._bigRoad.touchEnabled = false;
            this._bigRoad.touchChildren = false;
          }
        }
      }

      // set the position of the children components
      protected arrangeComponents() {
        for (const att of this._arrangeProperties) {
          if (this._tableLayer && att !== 'height') {
            this._tableLayer[att] = this._tableLayerNode[att];
          }
          if (this._chipLayer && att !== 'height') {
            this._chipLayer[att] = this._chipLayerNode[att];
          }
          if (this._roadmapNode && this._bigRoad && att !== 'height' && att !== 'scaleX' && att !== 'scaleY') {
            this._bigRoad[att] = this._roadmapNode[att];
          }
        }
        this._tableLayer.y = this._bigRoad.height + 37;
        this._chipLayer.y = this._bigRoad.height + 37;
        this._tableLayerGroup.y = this._bigRoad.height + 37;
        this._message.y = 47 + this._bigRoad.height * 0.5;
        this._betButtonGroup.y = this._tableLayer.height - 10;
        this._quickBetGroup.height = this._tableLayer.height + 100;
        this._quickBetGroup.y = this._bigRoad.height + 37;
        this._betChipPanelTargetY = this._bigRoad.height + 137 + this._tableLayer.height;
      }

      protected onBetDetailUpdateInBetState() {
        super.onBetDetailUpdateInBetState();
        if (this.hasBet()) {
          this.removeSelf();
        }
      }

      protected setStateDeal(isInit: boolean = false) {
        super.setStateDeal(isInit);
        this.removeSelf();
      }

      protected onMatchGoodRoadUpdate() {
        if (this.tableInfo.goodRoad) {
          this._goodRoadLabel.visible = true;
          const goodRoadData = this.tableInfo.goodRoad;
          const goodRoadName: string = goodRoadData.custom ? goodRoadData.name : i18n.t(`goodroad.${goodRoadData.roadmapid}`);
          // this._goodRoadLabel.text = goodRoadName;
          this._goodRoadLabel.renderText = () => (goodRoadData.custom ? goodRoadData.name : i18n.t(`goodroad.${goodRoadData.roadmapid}`));
        } else {
          this.removeSelf();
        }
      }

      protected removeSelf() {
        this.dispatchEvent(new egret.Event('DISMISS'));
      }

      public onClickUndoButton(evt: egret.Event) {
        this._undoStack.popAndUndo();
      }

      protected onClickBetChipSelected() {
        this._betChipSetGridEnabled ? this.hideBetChipPanel() : this.showBetChipPanel();
      }

      protected showBetChipPanel() {
        this._betChipSetGroup.y = this._betChipPanelTargetY - 100;
        this._betChipSetGroup.visible = true;
        egret.Tween.get(this._betChipSetGroup).to({ y: this._betChipPanelTargetY, alpha: 1 }, 300);
        this._betChipSetGridEnabled = true;
      }

      protected hideBetChipPanel() {
        egret.Tween.get(this._betChipSetGroup)
          .to({ y: this._betChipPanelTargetY - 100, alpha: 0 }, 300)
          .call(() => {
            this._betChipSetGroup.visible = false;
          });
        this._betChipSetGridEnabled = false;
      }
    }
  }
}
