// TypeScript file
namespace we {
  export namespace ssc {
    export class SSCBall extends eui.Component {
        private _value : string = "";
        private _betTypeValue : string = "";

        public get value(){
            return this._value;
        }

        public set value(v){
            this._value = v.toString();
        }

        public get betTypeValue(){
            return this._value;
        }

        public set betTypeValue(v){
            this._value = v.toString();
        }
    }
  }
}