/* tslint:disable triple-equals */
namespace we {
  export namespace ui {
    export class LiveListSimpleItem extends ListBaseItem {
      protected _quickbetButton: eui.Component & IQuickBetAnimButton;
      protected _bigRoad: we.ui.ILobbyRoad & eui.Component;
      protected _alreadyBetSign: eui.Group;
      protected _tableLayerNode: eui.Component;
      protected _chipLayerNode: eui.Component;
      protected _roadmapNode: eui.Component;
      protected _quickbetButtonNode: eui.Component;
      protected _betChipSetNode: eui.Component;
      protected _button: ui.LobbyQuickBetAnimButton;

      protected _quickBetBtnGroup: eui.Group;

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

      public constructor(skinName: string = null) {
        super(skinName);
      }

      protected initCustomPos() {
        super.initCustomPos();
        this._targetQuickBetButtonY = 191;
        this._originalQuickBetButtonY = 141;
        this._targetQuickbetPanelY = 178;
        this._offsetLimit = 1000;
        this._offsetMovement = 900;
      }

      public destroy() {
        super.destroy();
        if (this._bigRoad && this.tableInfo) {
          // this._bigRoad.parent.removeChild(this._bigRoad);
          dir.lobbyRoadPool.release(this._bigRoad, this.tableInfo.gametype);
        }
      }

      protected initChildren() {
        this.generateRoadmap();
        super.initChildren();
        this._betMessageEnable = false;
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

      protected getBetChipSet(): BetChipSet & eui.Component {
        const betChipSet = new BetChipSetHorizontal();
        betChipSet.chipScale = 0.75;
        betChipSet.containerPadding = 8;
        return betChipSet;
      }

      protected runtimeGenerateBetChipSet() {
        const betChipSet = this.getBetChipSet();

        const idx = this._betChipSetNode.parent.getChildIndex(this._betChipSetNode);
        this._betChipSetNode.parent.addChildAt(betChipSet, idx);
        this._betChipSet = betChipSet;

        for (const att of this._arrangeProperties) {
          if (betChipSet) {
            betChipSet[att] = this._betChipSetNode[att];
          }
        }

        const denominationList = env.betLimits[this.getSelectedBetLimitIndex()].chips;
        if (this._betChipSet) {
          this._betChipSet.init(3, denominationList);
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
          if (this._roadmapNode && this._bigRoad) {
            this._bigRoad[att] = this._roadmapNode[att];
          }
        }
      }

      protected setStateBet(isInit: boolean = false) {
        super.setStateBet(isInit);
        if (!this._chipLayer) {
          return;
        }
        if (this._chipLayer.isAlreadyBet()) {
          this._alreadyBetSign.visible = true;
          this._button.label1text = i18n.t('mobile_quick_bet_button_add_label');
        } else {
          this._alreadyBetSign.visible = false;
          this._button.label1text = i18n.t('mobile_quick_bet_button_label');
        }
      }

      protected onTableBetInfoUpdate(evt: egret.Event) {
        super.onTableBetInfoUpdate(evt);
        if (!this._chipLayer) {
          return;
        }
        if (evt && evt.data) {
          const tableBetInfo = <data.GameTableBetInfo>evt.data;
          if (tableBetInfo.tableid === this._tableId) {
            if (this._chipLayer.isAlreadyBet()) {
              this._alreadyBetSign.visible = true;
              this._button.label1text = i18n.t('mobile_quick_bet_button_add_label');
            } else {
              this._alreadyBetSign.visible = false;
              this._button.label1text = i18n.t('mobile_quick_bet_button_label');
            }
          }
        }
      }

      protected addEventListeners() {
        super.addEventListeners();
        if (!this._quickbetButton) {
          return;
        }
        this._quickbetButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickButton, this);
      }

      protected removeEventListeners() {
        super.removeEventListeners();
        if (!this._quickbetButton) {
          return;
        }
        this._quickbetButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickButton, this);
      }

      public getActionButton(): eui.Component {
        return this._quickbetButton;
      }

      public getFavouriteButton(): eui.Component {
        return this._favouriteButton;
      }

      public setData(tableInfo: data.TableInfo) {
        super.setData(tableInfo);
        if (tableInfo.roadmap) {
          if (this._bigRoad) {
            this._bigRoad.updateLobbyRoadData(tableInfo.roadmap);
          }
        }
      }

      protected runtimeGenerateChipLayer() {
        const denominationList = env.betLimits[this.getSelectedBetLimitIndex()].chips;
        this.generateChipLayer();
        for (const att of this._arrangeProperties) {
          if (this._chipLayer && att !== 'height' && att !== 'scaleX') {
            this._chipLayer[att] = this._chipLayerNode[att];
          }
        }
        this._chipLayer.type = we.core.BettingTableType.NORMAL;
        this._chipLayer.denomList = denominationList;
        this._chipLayer.undoStack = this._undoStack;
        if (this._tableLayer) {
          this._chipLayer.tableLayer = this._tableLayer;
        }
        this._chipLayer.init();
        this._chipLayer.getSelectedBetLimitIndex = this.getSelectedBetLimitIndex;
        this._chipLayer.getSelectedChipIndex = () => this._betChipSet.selectedChipIndex;

        this._chipLayer.addEventListener(core.Event.INSUFFICIENT_BALANCE, this.insufficientBalance, this);
        this._chipLayer.addEventListener(core.Event.EXCEED_BET_LIMIT, this.exceedBetLimit, this);
      }

      protected runtimeGenerateTableLayer() {
        this.generateTableLayer();
        for (const att of this._arrangeProperties) {
          if (this._tableLayer && att !== 'height' && att !== 'scaleX') {
            this._tableLayer[att] = this._tableLayerNode[att];
          }
        }
        this._tableLayer.init();
      }

      protected showQuickBetGroup() {
        this._quickbetButton.tween(!this.list.isLocked);
        if (!this._betChipSet) {
          this.runtimeGenerateBetChipSet();
        }
        if (!this._tableLayer) {
          this.runtimeGenerateTableLayer();
        }
        if (!this._chipLayer) {
          this.runtimeGenerateChipLayer();
        }
        if (this._quickBetBtnGroup) { this._quickBetBtnGroup.y = this._tableLayer.height - 7; }

        // create a

        super.showQuickBetGroup();
        if (this._chipLayer) {
          this.tweenChipLayer(true);
        }
        // egret.Tween.removeTweens(this._chipLayer);
        // const p3 = new Promise(resolve =>
        //   egret.Tween.get(this._chipLayer)
        //     .set({ visible: true })
        //     .to({ y: this._targetQuickbetPanelY, alpha: 1 }, this._tweenInterval1)
        //     .call(resolve)
        // );
      }

      protected tweenChipLayer(isShow: boolean) {
        egret.Tween.removeTweens(this._chipLayer);
        const tween = egret.Tween.get(this._chipLayer)
          .set({ visible: true })
          .to({ y: isShow ? this._targetQuickbetPanelY : this._originalQuickBetPanelY, alpha: isShow ? 1 : 0 }, this._tweenInterval1);
        if (!isShow) {
          tween.set({ visible: false });
        }
      }

      protected hideQuickBetGroup() {
        if (this._quickbetButton) {
          this._quickbetButton.tween(!this.list.isLocked);
        }
        super.hideQuickBetGroup();
        if (this._chipLayer) {
          this.tweenChipLayer(false);
          // egret.Tween.removeTweens(this._chipLayer);
          // egret.Tween.get(this._chipLayer)
          //   .to({ y: this._originalQuickBetPanelY, alpha: 0 }, this._tweenInterval1)
          //   .set({ visible: false });
        }
      }

      protected setBetRelatedComponentsEnabled(enable) {
        super.setBetRelatedComponentsEnabled(enable);
        this.timer.visible = true;
        if (!this._mouseOutside && enable) {
          if (this._quickbetButton) {
            this._quickbetButton.tween(false, false);
          }
        }
      }

      public onRollover(evt: egret.Event) {
        if (this._quickbetEnable && !this._quickbetButton) {
          this.generateQuickBetButton();
        }

        super.onRollover(evt);
        if (this.list && !this.list.isLocked) {
          if (this._quickbetEnable && this._quickbetButton) {
            this._quickbetButton.tween(false);
          }
        }
      }

      protected generateQuickBetButton() {
        if (this._quickbetButtonNode) {
          this._button = new ui.LobbyQuickBetAnimButton();
          this._button.label1text = i18n.t('mobile_quick_bet_button_label');
          this._button.label2text = 'X';
          this._button.resName = 'd_lobby_quick_bet_notification_follow_normal_png';
          this._button.hoverResName = 'd_lobby_quick_bet_notification_follow_hover_png';

          const idx = this._quickbetButtonNode.parent.getChildIndex(this._quickbetButtonNode);
          this._quickbetButtonNode.parent.addChildAt(this._button, idx);
          this._quickbetButton = this._button;

          this._quickbetButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickButton, this);

          for (const att of this._arrangeProperties) {
            if (this._button) {
              this._button[att] = this._quickbetButtonNode[att];
            }
          }
        }
      }

      protected animateQuickBetButton(show: boolean) {
        super.animateQuickBetButton(show);
        if (!this._quickbetButton) {
          return;
        }
        egret.Tween.removeTweens(this._quickbetButton);
        if (this._favouriteButton) {
          egret.Tween.removeTweens(this._favouriteButton);
        }
        if (show) {
          egret.Tween.get(this._quickbetButton)
            .set({ visible: true })
            .to({ y: this._originalQuickBetButtonY, alpha: 1 }, this._tweenInterval1);
          if (this._favouriteButton) {
            egret.Tween.get(this._favouriteButton)
              .set({ visible: true })
              .to({ alpha: 1 }, this._tweenInterval1);
          }
        } else {
          egret.Tween.get(this._quickbetButton)
            .to({ y: this._targetQuickBetButtonY, alpha: 0 }, 250)
            .set({ visible: false });
          if (this._favouriteButton) {
            egret.Tween.get(this._favouriteButton)
              .to({ alpha: 0 }, 250)
              .set({ visible: false });
          }
        }
      }

      protected onRoadDataUpdate(evt: egret.Event) {
        super.onRoadDataUpdate(evt);
        if (evt && evt.data) {
          const tableInfo = <data.TableInfo>evt.data;
          if (tableInfo.tableid === this._tableId) {
            if (this._bigRoad) {
              this._bigRoad.updateLobbyRoadData(tableInfo.roadmap);
            }
          }
        }
      }
    }
  }
}
