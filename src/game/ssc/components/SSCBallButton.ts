// TypeScript file
namespace we {
  export namespace ssc {
    export class SSCBallButton extends eui.Component {
        private _value : string = "";
        private _betValue : string = "";
        private _image : eui.Image;
        private _lblValue : ui.RunTimeLabel;

        private _rowIndex : number = -1;

        constructor(value : string, betValue : string, rowIndex? : number){
            super();
            this._value = value;
            this._betValue = betValue;
            if(rowIndex)
                this._rowIndex = rowIndex;
            //this.initComponents();
        }

        public initComponents(){

        }

        public get value(){
            return this._value;
        }

        public get betValue(){
            return this._betValue;
        }

        public setActive(){
            //image update
            
        }

        public onHover(){

        }

    }
  }
}