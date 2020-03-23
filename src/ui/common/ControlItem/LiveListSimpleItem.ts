/* tslint:disable triple-equals */
namespace we {
  export namespace ui {
    export class LiveListSimpleItem extends ListBaseItem {
      protected _quickbetButton: eui.Component & IQuickBetAnimButton;
      protected _bigRoad: we.ui.ILobbyRoad;
      protected _alreadyBetSign: eui.Group;
      protected _gameType: core.GameType;
      protected _tableLayerNode: eui.Component;
      protected _chipLayerNode: eui.Component;
      protected _roadmapNode: eui.Component;

      public constructor(gameType: core.GameType, skinName: string = null) {
        super(skinName);
        this._gameType = gameType;
      }

      protected initComponents() {
        super.initComponents();
        let generalGameType;
        switch (this._gameType) {
          case we.core.GameType.BAC:
          case we.core.GameType.BAI:
          case we.core.GameType.BAS:
            generalGameType = 'ba';
            break;
          case we.core.GameType.RO:
            generalGameType = 'ro';
            break;
          case we.core.GameType.DI:
            generalGameType = 'ro';
            break;
          case we.core.GameType.LW:
            generalGameType = 'lw';
            break;
          case we.core.GameType.DT:
            generalGameType = 'dt';
            break;
          default:
            throw new Error('Invalid game type');
        }
        this.generateRoadmap(generalGameType);
        this.generateTableLayer(generalGameType);
        this.generateChipLayer(generalGameType);
      }

      protected generateTableLayer(namespace: string) {
        this._tableLayer = new we[namespace].TableLayer();
        this._tableLayer.skinName = `skin_desktop.${namespace}.LiveListItemTableLayerSkin`;
        const idx = this._tableLayerNode.parent.getChildIndex(this._tableLayerNode);
        this._tableLayerNode.parent.addChildAt(this._tableLayer, idx);
      }

      protected generateChipLayer(namespace: string) {
        this._chipLayer = new we[namespace].ChipLayer();
        this._chipLayer.skinName = `skin_desktop.${namespace}.LiveListItemChipLayerSkin`;
        const idx = this._chipLayerNode.parent.getChildIndex(this._chipLayerNode);
        this._chipLayerNode.parent.addChildAt(this._chipLayer, idx);
      }

      protected generateRoadmap(namespace: string) { }

      // set the position of the children components
      protected arrangeComponents() {
        const properties = ['x', 'y', 'width', 'height', 'scaleX', 'scaleY', 'left', 'right', 'top', 'bottom', 'verticalCenter', 'horizontalCenter', 'anchorOffsetX', 'anchorOffsetY'];
        for (const att of properties) {
          this._tableLayer[att] = this._tableLayerNode[att];
          this._chipLayer[att] = this._chipLayerNode[att];
        }
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

      protected addEventListeners() {
        super.addEventListeners();
        this._quickbetButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickButton, this);
      }

      protected removeEventListeners() {
        super.removeEventListeners();
        this._quickbetButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickButton, this);
      }

      public getActionButton(): eui.Component {
        return this._quickbetButton;
      }

      public setData(tableInfo: data.TableInfo) {
        super.setData(tableInfo);
        if (tableInfo.roadmap) {
          if (this._bigRoad) {
            this._bigRoad.updateLobbyRoadData(tableInfo.roadmap);
          }
        }
      }

      protected showQuickBetGroup() {
        this._quickbetButton.tween(!this.list.isLocked);
        super.showQuickBetGroup();
        egret.Tween.removeTweens(this._chipLayer);
        const p3 = new Promise(resolve =>
          egret.Tween.get(this._chipLayer)
            .set({ visible: true })
            .to({ y: this._targetQuickbetPanelY, alpha: 1 }, this._tweenInterval1)
            .call(resolve)
        );
      }

      protected hideQuickBetGroup() {
        this._quickbetButton.tween(!this.list.isLocked);
        super.hideQuickBetGroup();
        egret.Tween.removeTweens(this._chipLayer);
        egret.Tween.get(this._chipLayer)
          .to({ y: this._originalQuickBetPanelY, alpha: 0 }, this._tweenInterval1)
          .set({ visible: false });
      }

      protected setBetRelatedComponentsEnabled(enable) {
        super.setBetRelatedComponentsEnabled(enable);
        if (!this._mouseOutside && enable) {
          this._quickbetButton.tween(false, false);
        }
      }

      public onRollover(evt: egret.Event) {
        super.onRollover(evt);
        if (!this.list.isLocked) {
          if (this._quickbetEnable) {
            this._quickbetButton.tween(false);
          }
        }
      }

      protected animateQuickBetButton(show: boolean) {
        super.animateQuickBetButton(show);
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
          const tableInfo = <data.TableInfo>evt.data;
          if (tableInfo.tableid === this._tableId) {
            if (this._bigRoad) {
              this._bigRoad.updateLobbyRoadData(tableInfo.roadmap);
            }
          }
        }
      }

      protected initChildren() {
        super.initChildren();
      }
    }
  }
}
