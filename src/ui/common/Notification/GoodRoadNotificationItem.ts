namespace we {
  export namespace ui {
    export class GoodRoadNotificationItem extends NotificationItem {
      protected _content: GoodRoadNotificationContainer;
      protected _quickBetContent: GoodRoadQuickBetContainer;

      protected tableInfo: data.TableInfo;

      constructor() {
        super();
        this.skinName = utils.getSkinByClassname('GoodRoadNotificationSkin');
      }

      protected $setData(value: any) {
        super.$setData(value);
        const { tableid } = value;
        this.tableInfo = env.tableInfos[tableid];
        if (this._content) {
          this.removeChild(this._content);
        }
        this._content = new GoodRoadNotificationContainer();
        this._content.setData(this.tableInfo);
        this._content.addEventListener('DISMISS', this.removeSelf, this);
        this._content.addEventListener('QUICK_BET', this.onQuickBet, this);
        this.addChild(this._content);
      }

      protected removeSelf() {
        this.holder.removeItem();
      }
      protected onQuickBet() {
        if (this._content) {
          this.removeChild(this._content);
        }
        this._quickBetContent = new GoodRoadQuickBetContainer();
        this._quickBetContent.setData(this.tableInfo);
        this._quickBetContent.addEventListener('DISMISS', this.removeSelf, this);
        this.addChild(this._content);
      }
    }
  }
}
