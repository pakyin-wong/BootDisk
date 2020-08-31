namespace we {
  export namespace ui {
    export class SideListItem extends LiveListSimpleItem {
      protected _bigRoad: we.ui.ILobbyRoad & eui.Component;
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

      protected _headerBg: egret.Shape;

      public constructor(skinName: string = null) {
        super(skinName);
        this._betChipSet.setUpdateChipSetSelectedChipFunc(this._betChipSetGridSelected.setSelectedChip.bind(this._betChipSetGridSelected));
        const denominationList = env.betLimits[this.getSelectedBetLimitIndex()].chips;
        this._betChipSet.init(null, denominationList);
      }

      protected checkSkin() {}

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
        this._targetQuickbetPanelY = 160;
        this._originalQuickBetPanelY = 0;
        this._offsetLimit = 10000;
        this._offsetMovement = 0;
        this._hoverScale = 1.06;
      }

      protected initChildren() {
        super.initChildren();
        this._betChipSet.resetFormat(1);
        this._goodRoadLabel.visible = false;

        // header
        this._headerBg = new egret.Shape();
        this.addChildAt(this._headerBg, 0);

        this.drawHeaderBg(337, 46);
        this.drawBorder(337, 174);
      }

      public drawHeaderBg(width: number, height: number) {
        this._headerBg.graphics.beginFill(0x23282e, 1);
        RoundRect.drawRoundRect(this._headerBg.graphics, 0, 0, width, height, { tl: 8, tr: 8, bl: 0, br: 0 });
        this._headerBg.graphics.endFill();
      }

      public drawBorder(width: number, height: number) {
        const cornerRadius = { tl: 8, tr: 8, bl: 8, br: 8 };
        const strokeIn = 2;
        const stroke = 2;

        this._headerBg.graphics.lineStyle(stroke, 0x000000);
        RoundRect.drawRoundRect(this._headerBg.graphics, 0, 0, width, height, cornerRadius);
        /*
        const strokeSum = strokeIn + stroke;
        const cRadius = {
          tl: cornerRadius.tl > 0 ? cornerRadius.tl - strokeSum * 0.5 : 0,
          tr: cornerRadius.tr > 0 ? cornerRadius.tr - strokeSum * 0.5 : 0,
          bl: cornerRadius.bl > 0 ? cornerRadius.bl - strokeSum * 0.5 : 0,
          br: cornerRadius.br > 0 ? cornerRadius.br - strokeSum * 0.5 : 0,
        };
        RoundRect.drawRoundRect(this._gr, strokeSum * 0.5, strokeSum * 0.5, width - strokeSum, height - strokeSum, cRadius);
        */

        const cRadius = {
          tl: cornerRadius.tl > 0 ? cornerRadius.tl - strokeIn * 0.5 : 0,
          tr: cornerRadius.tr > 0 ? cornerRadius.tr - strokeIn * 0.5 : 0,
          bl: cornerRadius.bl > 0 ? cornerRadius.bl - strokeIn * 0.5 : 0,
          br: cornerRadius.br > 0 ? cornerRadius.br - strokeIn * 0.5 : 0,
        };

        this._headerBg.graphics.lineStyle(strokeIn, 0x3a3f48);
        RoundRect.drawRoundRect(this._headerBg.graphics, strokeIn * 0.5, strokeIn * 0.5, width - strokeIn, height - strokeIn, cRadius);
      }

      public setData(tableInfo: data.TableInfo) {
        super.setData(tableInfo);

        if (tableInfo.roadmap) {
          if (this._bigRoad) {
            this._bigRoad.updateSideBarRoadData(tableInfo.roadmap); // init  roadmap
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

      protected showQuickBetGroup() {
        this._betChipSetGridSelected.touchEnabled = true;
        super.showQuickBetGroup();
      }

      protected hideQuickBetGroup() {
        this._betChipSetGridSelected.touchEnabled = false;
        super.hideQuickBetGroup();
        this.hideBetChipPanel();
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
        super.animateQuickBetButton(show);
        if (!this._quickbetButton) {
          return;
        }
        egret.Tween.removeTweens(this._quickbetButton);
        if (show) {
          egret.Tween.get(this._quickbetButton)
            .set({ visible: true })
            .to({ y: 120, alpha: 1 }, this._tweenInterval1);
        } else {
          egret.Tween.get(this._quickbetButton)
            .to({ y: this._targetQuickBetButtonY, alpha: 0 }, 250)
            .set({ visible: false });
        }
        //   egret.Tween.removeTweens(this._quickbetButton);
        //   if (show) {
        //     egret.Tween.get(this._quickbetButton)
        //       .set({ visible: true })
        //       .to({ y: this._originalQuickBetButtonY, alpha: 1 }, this._tweenInterval1);
        //   } else {
        //     egret.Tween.get(this._quickbetButton)
        //       .to({ y: this._targetQuickBetButtonY, alpha: 0 }, 250)
        //       .set({ visible: false });
        //   }
      }

      protected onRoadDataUpdate(evt: egret.Event) {
        // when rm need update
        super.onRoadDataUpdate(evt);
        if (evt && evt.data) {
          const tableInfo = <data.TableInfo>evt.data;
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
