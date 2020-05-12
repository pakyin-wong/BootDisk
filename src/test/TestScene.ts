namespace we {
  export namespace test {
    export class Scene extends core.BaseScene {
      private _page: eui.Group;
      private _pageIndex: number;
      private _items: string[] = ['BetChipStackTest', 'ListItemTest', 'ListTest', 'ScrollerTest', 'RoadmapTest', 'RoadmapControlTest'];

      constructor(data: any = null) {
        super(data);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.mount, this);
      }

      protected mount() {
        super.mount();

        this._page = new eui.Group();
        this.addChild(this._page);
        this._page.width = this.stage.stageWidth;
        this._page.height = this.stage.stageHeight;

        const leftBtn: eui.Label = new eui.Label();
        leftBtn.text = ' < ';
        leftBtn.size = 50;
        this.addChild(leftBtn);
        leftBtn.verticalCenter = 0;
        leftBtn.left = 20;

        const rightBtn: eui.Label = new eui.Label();
        rightBtn.text = ' > ';
        rightBtn.size = 50;
        this.addChild(rightBtn);
        rightBtn.verticalCenter = 0;
        rightBtn.right = 20;

        leftBtn.$addListener(egret.TouchEvent.TOUCH_TAP, this.onLeftPressed, this);
        rightBtn.$addListener(egret.TouchEvent.TOUCH_TAP, this.onRightPressed, this);

        this._pageIndex = 0;
        this.loadPage(this._pageIndex);
      }

      protected onLeftPressed() {
        this._pageIndex = (this._pageIndex - 1 + this._items.length) % this._items.length;
        this.loadPage(this._pageIndex);
      }

      protected onRightPressed() {
        this._pageIndex = (this._pageIndex + 1) % this._items.length;
        this.loadPage(this._pageIndex);
      }

      private loadPage(idx: number) {
        this._page.removeChildren();
        const name = this._items[idx];
        const page: core.BasePage = new we.test[`${name}Page`]();
        this._page.addChild(page);
        page.onEnter();
      }
    }
  }
}
