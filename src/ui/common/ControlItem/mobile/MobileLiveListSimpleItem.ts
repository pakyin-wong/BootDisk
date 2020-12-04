/* tslint:disable triple-equals */
namespace we {
  export namespace ui {
    export class MobileLiveListSimpleItem extends MobileListBaseItem {
      protected _bigRoad: we.ui.ILobbyRoad & eui.Component;
      protected _alreadyBetSign: eui.Group;
      protected _goodRoadLabel: ui.GoodRoadLabel;

      protected _bg: ui.RoundRectShape;

      protected _roadmapNode: eui.Component;

      protected _contentContainerStatic: eui.Group;

      public constructor(skinName: string = null) {
        super(skinName);
      }

      protected initComponents() {
        super.initComponents();
        this.generateRoadmap();
      }

      protected destroy() {
        super.destroy();
        this.releaseRoadmap();
      }

      protected releaseRoadmap() {
        if (this._bigRoad) {
          this._bigRoad.parent.removeChild(this._bigRoad);
          dir.smallRoadPool.release(this._bigRoad, this.tableInfo.gametype);
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
          if (this._roadmapNode && this._bigRoad) {
            this._bigRoad[att] = this._roadmapNode[att];
          }
        }
      }

      protected initChildren() {
        super.initChildren();
        if (this._goodRoadLabel) {
          this._goodRoadLabel.width = 0;
          this._goodRoadLabel.visible = false;
        }
        if (this._alreadyBetSign) {
          this._alreadyBetSign.visible = false;
        }
        if (this._contentContainerStatic) {
          this._contentContainerStatic.cacheAsBitmap = true;
        }
      }

      protected setStateBet(isInit: boolean = false) {
        super.setStateBet(isInit);
        if (this.tableInfo.totalBet > 0) {
          this._alreadyBetSign.visible = true;
        } else {
          this._alreadyBetSign.visible = false;
        }
      }

      protected setStateShuffle(isInit: boolean = false) {
        super.setStateShuffle(isInit);
        if (this._previousState !== we.core.GameState.SHUFFLE || isInit) {
          if (this._bigRoad) {
            this._bigRoad.clearRoadData && this._bigRoad.clearRoadData();
          }
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
              // this._alreadyBetSign.x = this._goodRoadLabel.visible ? this._goodRoadLabel.width + 10 : 0;
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
          // this._goodRoadLabel.width = 0;
        }

        if (this._bg) {
          switch (tableInfo.gametype) {
            case core.GameType.DIL:
              if (this._bg.fillColor !== '0x1b1f22') {
                this._bg.fillColor = '0x1b1f22';
                this._bg.refresh();
              }
              break;
            default:
              break;
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

      protected updateBetLimitText(items, idx) {
        if (this._toggler) {
          // this._toggler.renderText = () => ` ${i18n.t('baccarat.betLimitshort')} ${items.length > 0 ? items[idx] : ''}`;
          this._toggler.renderText = () => ` ${items.length > 0 ? items[idx] : ''}`;
        }
      }
    }
  }
}
