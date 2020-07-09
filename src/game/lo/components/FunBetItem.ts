namespace we {
  export namespace lo {
    export class FunBetItem extends core.BaseEUI {

        public field: string = null;

        protected betInfo;
        protected highlight: ui.RoundRectShape;
        protected label: ui.RunTimeLabel;
        protected rate: eui.Label;
        protected betArea: ui.RoundRectButton;
        protected betAmt: eui.Label;

        constructor() {
            super();
        }

        protected mount() {
            super.mount();
            utils.addButtonListener(this.betArea, this.onBet, this);
            FunBet.evtHandler.addEventListener(FunBet.EVT_RESET, this.reset, this);
        }

        protected destroy() {
            super.destroy();
            utils.removeButtonListener(this.betArea,this.onBet, this);
            FunBet.evtHandler.removeEventListener(FunBet.EVT_RESET, this.reset, this);
        }

        public setupBetId (type, group) {
            this.betInfo = {
                id: FunBet.getBetId(type,group,this.field),
                type: type,
                group: group,
                field: this.field,
                rate: FunBet.getBetRate(type,group, this.field)
            }
            
            this.rate.text = this.betInfo.rate;
            if(this.label) {
                this.label.renderText = FunBet.getBetLabel(type,group, this.field);
            }
        }

        protected onBet() {
            let r = FunBet.add(this.betInfo);
            if(r) {
                this.amount = r;
            }
        }

        protected reset() {
            this.amount = 0;
        }

        protected set amount(n:number) {
            this.highlight && (this.highlight.visible = n > 0);
            
            if(n > 0) {
                this.betAmt.text = n.toString(10);
            }else {
                this.betAmt.text = "";
            }
        }
    }
  }
}