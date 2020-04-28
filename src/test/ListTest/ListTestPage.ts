namespace we {
  export namespace test {
    export class ListTestPage extends core.BasePage {
      private scroller: eui.Scroller;
      private list: eui.List;

      public constructor(data: any = null) {
        super('ListTestPageSkin', data);
      }

      public onEnter() {
        this.addEventListener(eui.UIEvent.COMPLETE, this.mount, this);
      }

      public async onFadeEnter() {}

      public onExit() {
        this.removeChildren();
      }

      public async onFadeExit() {}

      protected mount() {
        this.removeEventListener(eui.UIEvent.COMPLETE, this.mount, this);

        // draw the icon faces
        const rect: eui.Rect = new eui.Rect(500, 200);

        this.list.addChild(rect);

        // var exml =
        //   `<e:Scroller xmlns:e="http://ns.egret.com/eui">
        //         <e:List id="list" width="200" height="400">
        //             <e:itemRendererSkinName>
        //                 <e:Skin states="up,down,disabled" height="50">
        //                     <e:Label text="{data.label}" textColor="0xFFFFFF" horizontalCenter="0" verticalCenter="0"/>
        //                 </e:Skin>
        //             </e:itemRendererSkinName>
        //         </e:List>
        //     </e:Scroller>`;

        // var clazz = EXML.parse(exml);
        // var scroller = new clazz();
        // this.addChild(scroller);
        const collection = new eui.ArrayCollection();
        for (let i = 0; i < 200; i++) {
          collection.addItem({ label: 'Text' + i });
        }
        this.list.dataProvider = collection;
        const layout = new eui.TileLayout();
        layout.requestedColumnCount = 2;
        layout.paddingTop = 200;
        layout.useVirtualLayout = true;
        this.list.layout = layout;

        // step 3: connect socket
        // this.socketConnect();
        // dir.sceneCtr.goto('LobbyScene');
      }

      protected socketConnect() {
        dir.evtHandler.addEventListener(core.MQTT.CONNECT_SUCCESS, this.socketConnectSuccess, this);
        dir.evtHandler.addEventListener(core.MQTT.CONNECT_FAIL, this.socketConnectFail, this);
        // dir.socket.connect();
      }

      protected socketConnectSuccess() {
        dir.evtHandler.removeEventListener(core.MQTT.CONNECT_SUCCESS, this.socketConnectSuccess, this);
        dir.evtHandler.removeEventListener(core.MQTT.CONNECT_FAIL, this.socketConnectFail, this);

        // step 4: auth and get user profiles

        // step 5: get and display tips, promote banner

        // step 6: load general resource (lobby, baccarat)

        // step 7: init complete, transfer to lobby scene
        // dir.sceneCtr.goto('LobbyScene');
      }

      protected socketConnectFail() {}
    }
  }
}
