// TypeScript file
namespace we {
    export namespace ssc {
        export class SSCTraditionalBettingTable extends we.ui.Panel {
      
            private _inputType : number;
            private _name : string;
            private _rowCount : number;
            private _rowName : string[];
            private _isOption : number;
            private _inputArray : string[];
            private _showValueArray : string[];
            private _betCode : string;
            private _checkBoxArray : string[];
            // inputType = 0,2,3
            private _buttonRowsArray : eui.Group[];

            private bigTagIndex : number = -1;
            private smallTagIndex : number = -1;

            private _betAction : string;

            constructor(currentBigTagIndex : number, currentSmallTagIndex : number){
                super();
                this.bigTagIndex = currentBigTagIndex;
                this.smallTagIndex = currentSmallTagIndex;
                this.init();
                //this.initComponents();
            }

            protected init(){
                const betTypeMapping = SelectionMapping[this.bigTagIndex][this.smallTagIndex];
                
                this._inputType = betTypeMapping.inputType;
                this._name = betTypeMapping.name;
                this._rowCount = parseInt(betTypeMapping.row);
                this._rowName = betTypeMapping.rowName;
                this._isOption = parseInt(betTypeMapping.option);
                this._inputArray =  betTypeMapping.input;
                this._showValueArray = betTypeMapping.showValue;
                this._betCode = betTypeMapping.betCode;
                this.width = 1509;
                this.height = 478;
            }
            
            protected clear(){
                this.removeChildren();
            }

            protected createComponents(){
                // check inputtype 
                // Five Star ball selection test
                const rowHeight = 80;
                const rowWidth = this.width;

                this._buttonRowsArray = [];
                let btnGrp;
                for(let i = 0;i < this._rowCount;i++){
                    btnGrp = new eui.Group();
                    btnGrp.width = rowWidth;
                    btnGrp.height = rowHeight;
                    btnGrp.x = 0;
                    btnGrp.y = i * rowHeight;

                    let lblTitle = new ui.RunTimeLabel();
                    lblTitle.x = 33;
                    lblTitle.width = 154;
                    lblTitle.height = 25;
                    lblTitle.verticalAlign ='middle';
                    lblTitle.textAlign ='left';
                    lblTitle.fontFamily = 'Barlow';
                    lblTitle.size = 18;
                    lblTitle.textColor = 0x00b8c3;
                    //lblTitle.text = i18n.t(this._rowName[i]);
                    lblTitle.text = this._rowName[i];
                    btnGrp.addChild(lblTitle);

                    let ballsGroup = new eui.Group();
                    ballsGroup.width = 768;
                    ballsGroup.height = rowHeight;
                    ballsGroup.x = 187;

                    for(let k = 0; k < this._inputArray.length;k++){
                        let ball = new SSCBallButton(this._showValueArray[k],this._inputArray[k],i);
                        ball.width = 50;
                        ball.height = 50;
                        ballsGroup.addChild(ball);
                    }

                    let layout = new eui.HorizontalLayout();
                    layout.paddingLeft = layout.paddingRight = 44;
                    layout.verticalAlign = 'middle';
                    layout.gap = 20;

                    ballsGroup.layout =  layout;
                    btnGrp.addChild(ballsGroup);
                }
            }

        }
    }
}