namespace we {
  export namespace ui {
    export class SideListItem extends LiveListSimpleItem {
      protected _bigRoad: we.ba.BetInfoBigRoad;
      protected _betChipSetGridSelected: ui.BetChipSetGridSelected;
      protected _betChipSetGridEnabled: boolean = false;
      protected _quickbetEnable: boolean = false;
      protected _goodRoadLabel: ui.GoodRoadLabel;
      protected _alreadyBetSign: eui.Group;
      protected _tweenInterval1: number = 250;

      protected _originaly: number;
      protected _originalQuickBetButtonY: number;
      protected _targetQuickBetButtonY: number;
      protected _originalQuickBetPanelY: number;
      protected _targetQuickbetPanelY: number;
      protected _offsetY: number;
      protected _offsetLimit: number;
      protected _offsetMovement: number;

      protected _closeButton: ui.BaseImageButton;
      protected _prevButton: ui.BaseImageButton;

      public constructor(gameType: core.GameType, skinName: string = null) {
        super(gameType, skinName);
        this._betChipSet.setUpdateChipSetSelectedChipFunc(this._betChipSetGridSelected.setSelectedChip.bind(this._betChipSetGridSelected));
        const denominationList = env.betLimits[this.getSelectedBetLimitIndex()].chipList;
        this._betChipSet.init(null, denominationList);
      }

      protected generateTableLayer(namespace: string) {
        switch (namespace) {
          case 'ba':
          case 'dt':
            this._tableLayer = new we[namespace].TableLayer();
            break;
          case 'ro':
          case 'di':
            this._tableLayer = new we[namespace].LobbyTableLayer();
            break;
        }
        this._tableLayer.skinName = `skin_desktop.${namespace}.SideListTableLayerSkin`;
        const idx = this._tableLayerNode.parent.getChildIndex(this._tableLayerNode);
        this._tableLayerNode.parent.addChildAt(this._tableLayer, idx);
      }

      protected generateChipLayer(namespace: string) {
        switch (namespace) {
          case 'ba':
          case 'dt':
            this._chipLayer = new we[namespace].ChipLayer();
            break;
          case 'ro':
          case 'di':
            this._chipLayer = new we[namespace].LobbyChipLayer();
            break;
        }
        this._chipLayer.skinName = `skin_desktop.${namespace}.SideListChipLayerSkin`;
        const idx = this._chipLayerNode.parent.getChildIndex(this._chipLayerNode);
        this._chipLayerNode.parent.addChildAt(this._chipLayer, idx);
      }

      protected generateRoadmap(namespace: string) {}

      protected addEventListeners() {
        super.addEventListeners();
        this._betChipSetGridSelected.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBetChipSelected, this);
        this._closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickButton, this);
        this._prevButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickUndoButton, this);
        this._contentContainer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoScene, this);
      }

      protected removeEventListeners() {
        super.removeEventListeners();
        this._betChipSetGridSelected.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBetChipSelected, this);
        this._closeButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickButton, this);
        this._prevButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickUndoButton, this);
        this._contentContainer.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoScene, this);
      }

      public onClickButton(evt: egret.Event) {
        super.onClickButton(evt);
      }

      public onClickUndoButton(evt: egret.Event) {
        this._undoStack.popAndUndo();
      }

      protected onClickBetChipSelected() {
        this._betChipSetGridEnabled ? this.hideBetChipPanel() : this.showBetChipPanel();
      }

      protected showBetChipPanel() {
        egret.Tween.get(this._betChipSet).to({ y: 390, alpha: 1 }, 250);
        this._betChipSetGridEnabled = true;
      }

      protected hideBetChipPanel() {
        egret.Tween.get(this._betChipSet).to({ y: 0, alpha: 0 }, 250);
        this._betChipSetGridEnabled = false;
      }

      protected initCustomPos() {
        this._targetQuickBetButtonY = 199;
        this._originalQuickBetButtonY = 85;
        this._targetQuickbetPanelY = 170;
        this._originalQuickBetPanelY = 0;
        this._offsetLimit = 10000;
        this._offsetMovement = 0;
        this._hoverScale = 1.06;
      }

      protected initChildren() {
        super.initChildren();
        this._betChipSet.resetFormat(1);
        this._goodRoadLabel.visible = false;
      }

      public setData(tableInfo: data.TableInfo) {
        super.setData(tableInfo);

        if (tableInfo.roadmap) {
          if (this._bigRoad) {
            this._bigRoad.updateSideBarRoadData(tableInfo.roadmap);
          }
        }

        if (this.tableInfo.goodRoad) {
          this._goodRoadLabel.visible = true;
          const goodRoadData = this.tableInfo.goodRoad;
          const goodRoadName: string = goodRoadData.custom ? goodRoadData.name : i18n.t(`goodroad.${goodRoadData.roadmapid}`);
          // this._goodRoadLabel.text = goodRoadName;
          this._goodRoadLabel.renderText = () => (goodRoadData.custom ? goodRoadData.name : i18n.t(`goodroad.${goodRoadData.roadmapid}`));
        } else {
          this._goodRoadLabel.visible = false;
        }
      }

      protected hideQuickBetGroup() {
        super.hideQuickBetGroup();
        this.hideBetChipPanel();
      }

      protected setStateBet(isInit: boolean = false) {
        super.setStateBet(isInit);
        if (this._chipLayer.isAlreadyBet()) {
          this._alreadyBetSign.visible = true;
        } else {
          this._alreadyBetSign.visible = false;
        }
      }

      protected onTableBetInfoUpdate() {
        super.onTableBetInfoUpdate();
        if (this._chipLayer.isAlreadyBet()) {
          this._alreadyBetSign.visible = true;
        } else {
          this._alreadyBetSign.visible = false;
        }
      }

      protected onMatchGoodRoadUpdate() {
        if (this.tableInfo.goodRoad) {
          this._goodRoadLabel.visible = true;
          const goodRoadData = this.tableInfo.goodRoad;
          const goodRoadName: string = goodRoadData.custom ? goodRoadData.name : i18n.t(`goodroad.${goodRoadData.roadmapid}`);
          // this._goodRoadLabel.text = goodRoadName;
          this._goodRoadLabel.renderText = () => (goodRoadData.custom ? goodRoadData.name : i18n.t(`goodroad.${goodRoadData.roadmapid}`));
        } else {
          this._goodRoadLabel.visible = false;
        }
      }

      protected animateQuickBetButton(show: boolean) {
        egret.Tween.removeTweens(this._quickbetButton);
        if (show) {
          egret.Tween.get(this._quickbetButton)
            .set({ visible: true })
            .to({ y: this._originalQuickBetButtonY, alpha: 1 }, this._tweenInterval1);
        } else {
          egret.Tween.get(this._quickbetButton)
            .to({ y: this._targetQuickBetButtonY, alpha: 0 }, 250)
            .set({ visible: false });
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

      protected gotoScene(evt: egret.Event) {
        const target = this.getActionButton();
        if (evt.target === target || !this.holder.isFocus) {
          return;
        }
        dir.socket.enterTable(this.tableId);
        env.gotoScene(this.tableId);
      }
    }
  }
}
