namespace we {
  export namespace overlay {
    export namespace betHistory {
        export class BetHistoryDetailIR extends eui.ItemRenderer {

            protected _title:eui.Label;
            protected _value:eui.Label;

            public constructor() {
                super();
                this.skinName = utils.getSkinByClassname('BetHistoryDetailIR');
            }

            protected dataChanged(): void {
                this._title.text = this.data.title;
                this._value.text = this.data.value;
            }
        }
    }
  }
}