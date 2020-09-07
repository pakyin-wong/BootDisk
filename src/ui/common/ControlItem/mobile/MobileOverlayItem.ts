/* tslint:disable triple-equals */
namespace we {
  export namespace ui {
    export class MobileOverlayItem extends ControlItem {
      protected _contentContainer: eui.Group;
      protected _betChipSetPanel: eui.Group;

      // protected _roadmapControl: ba.BARoadmapControl;
      // protected _roadsContainer: eui.Group;
      // protected _bigRoadMap: ba.BABigRoad;
      // protected _bigEyeRoad: ba.BABigEyeRoad;
      // protected _smallRoad: ba.BASmallRoad;
      // protected _cockroachRoad: ba.BACockroachRoad;

      protected _roadmap: ILobbyRoad;
      protected _bigRoad: we.ui.ILobbyRoad;

      protected _closeButton: ui.BaseImageButton;
      protected _prevButton: ui.BaseImageButton;
      protected _betChipSetGridSelected: ui.BetChipSetGridSelected;
      protected _betChipSetGridEnabled: boolean = false;

      protected _alreadyBetSign: eui.Group;
      protected _goodRoadLabel: ui.GoodRoadLabel;

      protected _toggler: ui.RunTimeLabel;

      protected _tableLayerNode: eui.Component;
      protected _chipLayerNode: eui.Component;
      protected _roadmapNode: eui.Component;
      // skinName = LiveOverlayItemSkin in quickbet
      public constructor(skinName: string = null) {
        super(skinName);
        // this._skinKey = skinName;
        this._betChipSetPanel.visible = false;

        this._betChipSet.alpha = 1;
      }

      public get closeButton() {
        return this._closeButton;
      }

      protected initComponents() {
        this.generateRoadmap();
        this.generateTableLayer();
        this.generateChipLayer();
        super.initComponents();
      }

      // protected initOrientationDependentComponent() {
      //   super.initOrientationDependentComponent();
      //   // this.generateRoadmap();
      //   // this.generateTableLayer();
      //   // this.generateChipLayer();
      // }

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

      protected generateRoadmap() {
        if (this.itemInitHelper) {
          this._bigRoad = this.itemInitHelper.generateRoadmap(this._roadmapNode);
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
          if (this._tableLayer) {
            this._tableLayer[att] = this._tableLayerNode[att];
          }
          if (this._chipLayer) {
            this._chipLayer[att] = this._chipLayerNode[att];
          }
          if (this._roadmapNode && this._bigRoad) {
            this._bigRoad[att] = this._roadmapNode[att];
          }
        }
      }

      protected initChildren() {
        super.initChildren();
        this._goodRoadLabel.width = 0;
        this._goodRoadLabel.visible = false;
        this._alreadyBetSign.visible = false;

        this._chipLayer.setTouchEnabled(false);

        this._betChipSet.setUpdateChipSetSelectedChipFunc(this._betChipSetGridSelected.setSelectedChip.bind(this._betChipSetGridSelected));
        const denominationList = env.betLimits[this.getSelectedBetLimitIndex()].chips;
        this._betChipSet.init(null, denominationList);

        // draw border corner radius
        const shape = new egret.Shape();
        shape.graphics.beginFill(0xffffff, 1);
        shape.graphics.drawRoundRect(0, 0, this._contentContainer.width, this._contentContainer.height, 48, 48);
        shape.graphics.endFill();
        this._contentContainer.addChild(shape);
        this._contentContainer.mask = shape;

        if (this._toggler) {
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
          toggler: this._toggler,
          review: this._toggler,
          arrCol: new eui.ArrayCollection(dropdownSource),
          title: () => `${i18n.t('baccarat.betLimitshort')} ${betLimitItems.length > 0 ? betLimitItems[selectedIndex] : ''}`,
          selected: 0,
        });

        this.updateBetLimit(selectedIndex);

        this._toggler.addEventListener('DROPDOWN_ITEM_CHANGE', this.onBetLimitSelected, this);
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
        if (this._toggler) {
          this._toggler.renderText = () => `${i18n.t('baccarat.betLimitshort')} ${betLimitItems.length > 0 ? betLimitItems[selectedIndex] : ''}`;
        }
      }

      public onClickUndoButton(evt: egret.Event) {
        this._undoStack.popAndUndo();
      }

      public onClickButton() {
        (this.parent.parent as overlay.MobileQuickBet).dispatchEvent(new egret.Event('close'));
      }

      protected onClickBetChipSelected() {
        this._betChipSetGridEnabled ? this.hideBetChipPanel() : this.showBetChipPanel();
      }

      protected showBetChipPanel() {
        this._betChipSetPanel.anchorOffsetY = 30;
        this._betChipSetPanel.visible = true;
        egret.Tween.get(this._betChipSetPanel).to({ alpha: 1, anchorOffsetY: 0 }, 250);
        this._betChipSetGridEnabled = true;
      }

      protected hideBetChipPanel() {
        egret.Tween.get(this._betChipSetPanel)
          .to({ alpha: 0, anchorOffsetY: 30 }, 250)
          .call(() => {
            this._betChipSetPanel.visible = false;
          });
        this._betChipSetGridEnabled = false;
      }

      protected addEventListeners() {
        super.addEventListeners();
        this._prevButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickUndoButton, this);
        this._closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickButton, this);
        this._betChipSetGridSelected.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBetChipSelected, this);
      }

      protected removeEventListeners() {
        super.removeEventListeners();
        this._prevButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickUndoButton, this);
        this._closeButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickButton, this);
        this._betChipSetGridSelected.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBetChipSelected, this);
      }

      protected setStateBet(isInit: boolean = false) {
        super.setStateBet(isInit);
        if (this.tableInfo.totalBet > 0) {
          this._alreadyBetSign.visible = true;
        } else {
          this._alreadyBetSign.visible = false;
        }
      }

      protected onTableBetInfoUpdate(evt: egret.Event) {
        super.onTableBetInfoUpdate(evt);
        if (evt && evt.data) {
          const tableBetInfo = <data.GameTableBetInfo>evt.data;
          if (tableBetInfo.tableid === this._tableId) {
            if (this.tableInfo.totalBet > 0) {
              this._alreadyBetSign.visible = true;
              // this._alreadyBetSign.x = this._goodRoadLabel.visible ? this._goodRoadLabel.width + 10 : 0;
              // console.log('this._alreadyBetSign.x', this._alreadyBetSign.x);
            } else {
              this._alreadyBetSign.visible = false;
            }
          }
        }
      }

      public setData(tableInfo: data.TableInfo) {
        super.setData(tableInfo);
        if (tableInfo.roadmap) {
          if (this._bigRoad) {
            if (this._bigRoad.setTableInfo) {
              this._bigRoad.setTableInfo(tableInfo);
            }
            this._bigRoad.updateLobbyRoadData(tableInfo.roadmap);
          }
        }
        if (this.tableInfo.goodRoad) {
          this._goodRoadLabel.visible = true;
          this._goodRoadLabel.width = NaN;
          const goodRoadData = this.tableInfo.goodRoad;
          const goodRoadName: string = goodRoadData.custom ? goodRoadData.name : i18n.t(`goodroad.${goodRoadData.roadmapid}`);
          // this._goodRoadLabel.text = goodRoadName;
          this._goodRoadLabel.renderText = () => (goodRoadData.custom ? goodRoadData.name : i18n.t(`goodroad.${goodRoadData.roadmapid}`));
        } else {
          // this._goodRoadLabel.visible = false;
        }
      }

      protected onMatchGoodRoadUpdate() {
        if (this.tableInfo.goodRoad) {
          this._goodRoadLabel.visible = true;
          this._goodRoadLabel.width = NaN;
          const goodRoadData = this.tableInfo.goodRoad;
          const goodRoadName: string = goodRoadData.custom ? goodRoadData.name : i18n.t(`goodroad.${goodRoadData.roadmapid}`);
          // this._goodRoadLabel.text = goodRoadName;
          this._goodRoadLabel.renderText = () => (goodRoadData.custom ? goodRoadData.name : i18n.t(`goodroad.${goodRoadData.roadmapid}`));
        } else {
          this._goodRoadLabel.visible = false;
          this._goodRoadLabel.width = 0;
        }
      }
    }
  }
}
