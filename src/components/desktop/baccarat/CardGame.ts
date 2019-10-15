namespace components {
  export class CardGame extends eui.Component {
    private card1Player: eui.Component;
    private card2Player: eui.Component;
    private card3Player: eui.Component;

    private card1Banker: eui.Component;
    private card2Banker: eui.Component;
    private card3Banker: eui.Component;

    constructor() {
      super();
    }
    protected childrenCreated() {
      super.childrenCreated();
    }
  }
}
