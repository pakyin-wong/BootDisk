class BacarratItemRenderer extends eui.Component implements eui.IItemRenderer {
  public selected: boolean;
  public itemIndex: number;
  private _data: any;
  private listItem0: components.LobbyBacarratListItem;
  private listItem1: components.LobbyBacarratListItem;
  private listItem2: components.LobbyBacarratListItem;
  private listItem3: components.LobbyBacarratListItem;

  public constructor(test: any) {
    super();
    this.skinName = `
        <e:Skin width="2560" height="400" xmlns:e="http://ns.egret.com/eui" xmlns:components="components.*">
            <components:LobbyBacarratListItem id="listItem0" x="0" />
            <components:LobbyBacarratListItem id="listItem1" x="640" />
            <components:LobbyBacarratListItem id="listItem2" x="1280" />
            <components:LobbyBacarratListItem id="listItem3" x="1920" />
        </e:Skin>
    `;
  }

  public get data() {
    return this._data;
  }

  public set data(data: any) {
    this._data = data;
    for (let i = 0; i < data.length; i += 1) {
      this[`listItem${i}`].setData(data[i]);
    }
  }
}
