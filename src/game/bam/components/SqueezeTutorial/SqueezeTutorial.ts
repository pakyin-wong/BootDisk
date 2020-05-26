// TypeScript file
namespace we {
  export namespace bam {
    export class SqueezeTutorial extends core.BaseEUI {

        private _nextButton;
        private _prevButton;
        private _close;
        private _holder : we.ui.HorizontalHolder;

        private _allOpenOne;
        private _allOpenTwo;
        private _allOpenThree;

        private _captionOne;
        private _captionTwo;
        private _captionThree;
        private _captionFour;
        private _captionArr;

        private _pageText;
        
        constructor(skin)
        {
            super(skin);
            // this._skinKey = 'SqueezeTutorial';
            // this.skinName = utils.getSkinByClassname('SqueezeTutorial');
            // this.init();
        }

        protected initComponents() {
            super.initComponents();
            this.init();
        }

        private init()
        {
            this.addListeners();
            this._captionArr = [];
            this._captionArr.push(this._captionOne);
            this._captionArr.push(this._captionTwo);
            this._captionArr.push(this._captionThree);
            if(this._captionFour)
                this._captionArr.push(this._captionFour);

            for(let i = 0;i < this._captionArr.length;i++)
                this._captionArr[i].visible = false;

            this._captionArr[0].visible = true;

            if(env.isMobile === false)
            {
                if(this._nextButton)
                    this._nextButton.currentState = "on";
                if(this._prevButton)
                    this._prevButton.currentState = "off";            
            }
            //add childs then init holder(if DragonBone)
        }

        private addListeners()
        {
            this._nextButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.doNext,this);            
            if(this._prevButton)
                this._prevButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.doPrev,this);    
            this._close.addEventListener(egret.TouchEvent.TOUCH_TAP,this.doDestroy,this);            

        }

        private removeListners()
        {
            this._nextButton.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.doNext,this);            
            if(this._prevButton)
                this._prevButton.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.doPrev,this);  
            this._close.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.doDestroy,this);            
        }

        private doNext(e)
        {   
            this._holder.doNext(true);
            if(this._holder.currentPageIdx + 1 < this._captionArr.length)
            {
                this.updateText(this._holder.currentPageIdx + 1);
            }
        }

        private doPrev(e)
        {
            if(this._holder.currentPageIdx <= 0) return;
            this._holder.doPrevious(true);
            if(this._holder.currentPageIdx > 0)
                this.updateText(this._holder.currentPageIdx - 1);
        }

        private doDestroy(e)
        {
            this.removeListners();
            this.parent.removeChild(this);
        }

        private updateButton(index)
        {            
            if(env.isMobile) return;

            if(index < 2)
                this._nextButton.currentState = "on";
            else
                this._nextButton.currentState = "off";

            if(index > 0)
                this._prevButton.currentState = "on";
            else
                this._prevButton.currentState = "off";
        }

        private updateText(index:number)
        {
            for(let i = 0;i < this._captionArr.length;i++)
                this._captionArr[i].visible = false;

            if(index >=0 && index < this._captionArr.length)
            {
                this._captionArr[index].visible = true;
            }

            if(this._pageText)
                this._pageText.text = index.toString() +"/3";
                
            this.updateButton(index);
        }
    }
  }
}