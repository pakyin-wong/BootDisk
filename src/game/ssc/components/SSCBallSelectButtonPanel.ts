// TypeScript file
namespace we {
  export namespace ssc {
    export class SSCBallSelectButtonPanel extends we.ui.Panel {
        
      protected _buttonGroup : eui.Group;

      protected _bigTagsGroup : eui.Group;
      protected _smallTagsGroup : eui.Group;

      protected bigTagsArray : any[];
      protected smallTagsArray : any[];

      protected currentBigTagIndex : number = 0;
      protected currentSmallTagIndex : number = 0;
      
      protected _buttons;

      constructor(skin: string = null) {
        super(skin);
      }

      protected childrenCreated(){
        super.childrenCreated();
      }

      protected mount(){

      }

      protected initComponents(){
        this.createBigTags();
        //this.createSmallTags();
        // this.initCurrentButtonPanel();


      }

      // Big Tags Related
      protected createBigTags(){
        this.bigTagsArray = [];
        this.currentBigTagIndex = 0;

        for(let i = 0;i < SelectionMapping.length;i++)
        {
          let bigTag : eui.Group = new eui.Group();
          bigTag.width = 117;
          bigTag.height = 60;
          bigTag.name = SelectionMapping[i].name;
          bigTag.touchEnabled = true;
          bigTag.touchChildren = false;

          let img : eui.Image = new eui.Image();
          img.width = 117;
          img.height = 60;
          img.source = ImageMapping.BIGTAG_NORMAL;
          bigTag.addChild(img);

          let lbl : ui.RunTimeLabel = new ui.RunTimeLabel();
          //lbl.text = i18n.t(SelectionMapping[i].name);
          lbl.text = SelectionMapping[i].name;
          lbl.size = 20;
          lbl.textAlign = 'center';
          lbl.verticalAlign = 'middle'
          lbl.width = 117;
          lbl.height = 60;
          bigTag.addChild(lbl);

          this.bigTagsArray.push(bigTag);
          this._bigTagsGroup.addChild(bigTag);
          this._bigTagsGroup.touchChildren = true;
          bigTag.x = i * bigTag.width;
          bigTag.y = 0;
          bigTag.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBigTagClicked,this);
        }

        this.setActiveBigTag();
        this.createSmallTags();
      }

      protected setActiveBigTag(){
        for(let i = 0;i < this.bigTagsArray.length;i++){
          let img = this.bigTagsArray[i].getChildAt(0) as eui.Image;
          img.source = ImageMapping.BIGTAG_NORMAL;
          if(i === this.currentBigTagIndex){
            img.source = ImageMapping.BIGTAG_ACTIVE;
          }
        }
      }

      protected onBigTagClicked(e : egret.TouchEvent){
        for(let i = 0;i < this.bigTagsArray.length;i++){
          if(e.target === this.bigTagsArray[i]){
            if(i === this.currentBigTagIndex){
              return;
            }
            this.currentBigTagIndex = i;
            break;
          }
        }
        this.setActiveBigTag();
        this.createSmallTags();
      }
      //End of Big Tags related
      
      //Small Tags related
      protected createSmallTags(){
        //this.clearSmallTags();
        this.smallTagsArray = [];
        const currentBigTag = SelectionMapping[this.currentBigTagIndex];
        let smallTagsHeight = 57;
        let lastRowItemIndex = -1;
        let offset = 0;
        for(let i = 0; i < currentBigTag.length; i++)
        {
          let smallTag = new eui.Group();
          smallTag.width = 120;
          smallTag.height = 57;
          smallTag.touchEnabled = true;
          smallTag.touchChildren = false;

          let lbl = new ui.RunTimeLabel();
          // lbl.text = i18n.t(currentBigTag[i].name);
          lbl.text = currentBigTag[i].name;
          lbl.alpha = 0.7;
          lbl.width = 80;
          lbl.height = 57;

          smallTag.addChild(lbl);
          this._smallTagsGroup.addChild(smallTag);
          this.smallTagsArray.push(smallTag);
          smallTag.x = 24 + offset + i * smallTag.width;
          smallTag.y = 0;
          smallTag.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onSmallTagClicked,this);
          
          if(currentBigTag.seperateLine){
            for(let k = 0;k < currentBigTag.seperateLine.length;k++){
              if(currentBigTag.seperateLine[k] === i){
                let shape = new egret.Shape();
                shape.graphics.beginFill(0xffffff, 1);
                shape.graphics.drawRect(24 + offset + 50 + i * smallTag.width, 0, 1, 20);
                shape.graphics.endFill();  
                this._smallTagsGroup.addChild(shape);       

                offset += 100;
              }
            }
          }
          // if(smallTag.x > this._smallTagsGroup.width)
          // {
          //   if(lastRowItemIndex < 0)
          //     lastRowItemIndex = i;
          //   this._smallTagsGroup.height = smallTagsHeight * 2;
          //   smallTag.x = 24 + (i - lastRowItemIndex) * smallTag.width;
          //   smallTag.y = smallTagsHeight;
          // }
        }
        this.setActiveSmallTag();
      }

      protected onSmallTagClicked(e : egret.TouchEvent){
        for(let i = 0;i < this.smallTagsArray.length;i++){
          if(e.target === this.smallTagsArray[i]){
            if(i === this.currentSmallTagIndex){
              return;
            }
            this.currentSmallTagIndex = i;
          }
        }
        this.setActiveSmallTag();
      }

      protected setActiveSmallTag(){
        for(let i = 0;i < this.smallTagsArray.length;i++){
          let lbl = this.smallTagsArray[i].getChildAt(0) as ui.RunTimeLabel;
          lbl.alpha = 0.7;
          lbl.textFlow = <Array<egret.ITextElement>>[{ 
            text:lbl.text, style:{"bold":false,"underline":false}
          }] ;
          if(i === this.currentSmallTagIndex){
            lbl.alpha = 1;
            lbl.textFlow = <Array<egret.ITextElement>>[{ 
              text:lbl.text, style:{"bold":true,"underline":true}
            }] ;          
          }
        }
      }
      
    }
  }
}