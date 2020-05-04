// TypeScript file
namespace we {
  export namespace di {
    export class MobileBottomRoadButtonPanel extends core.BaseGamePanel {
        private _buttonGroup : eui.Group;

        private _roadmapPanel;

        public roadmapSizeBtn;
        public roadmapOddevenBtn;
        public roadmapSumBtn;

        private _roadmapType : string = "bead";

        public set roadmapType(value : string){
            this._roadmapType = value;
        }

        public get roadmapType(){
            return this._roadmapType;
        }

        public constructor() {
            super();
        }

        public setRoadmapPanel(panel)
        {
            this._roadmapPanel = panel;
        }

        protected mount() {
            super.mount();

            // this.initRoadMap();
            this.addListeners();

            // this.updateText();
            // this.updateMode();
        }

        protected addListeners()
        {
            this.roadmapSizeBtn.addEventListener(eui.UIEvent.CHANGE, this._roadmapPanel.onRoadMapChanged, this);
            this.roadmapOddevenBtn.addEventListener(eui.UIEvent.CHANGE, this._roadmapPanel.onRoadMapChanged, this);
            this.roadmapSumBtn.addEventListener(eui.UIEvent.CHANGE, this._roadmapPanel.onRoadMapChanged, this);
        }

        protected removeListeners() 
        {
            this.roadmapSizeBtn.removeEventListener(eui.UIEvent.CHANGE, this._roadmapPanel.onRoadMapChanged, this);
            this.roadmapOddevenBtn.removeEventListener(eui.UIEvent.CHANGE, this._roadmapPanel.onRoadMapChanged, this);
            this.roadmapSumBtn.removeEventListener(eui.UIEvent.CHANGE, this._roadmapPanel.onRoadMapChanged, this);
        }

        public initState()
        {
            switch (env.orientation) 
            {
                case 'landscape':
                    break;
                case 'portrait':
                    this.currentState = this.roadmapType;
                    this.invalidateState();
                    break;
            }
        }



    }
  }
}