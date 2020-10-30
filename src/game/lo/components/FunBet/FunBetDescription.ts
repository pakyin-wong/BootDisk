namespace we {
  export namespace lo {
    export class FunBetDescription extends ui.Panel {

        protected label: eui.Label;

    public constructor() {
        super();
            this.isPoppable = true;
            this.hideOnStart = true;
            this._dismissOnClickOutside = true;
    }        
        public setText(t) {
            this.label.text = t;
        }
    }
  }
}