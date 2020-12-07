namespace we {
  export namespace bamb {
    export abstract class FlipCardHolder extends core.BaseEUI {
      protected mount(){
          super.mount();
          this.setSkinName();
      }

      protected abstract setSkinName();
        
      public abstract setCenterCardsTouchEnabled(enable: boolean, orientation?: string);

      public abstract isCardShowing(orientation: string);

      public abstract setCenterCardVisible(enable: boolean, orientation?: string);

      public abstract setCenterFlipCard(data: string, orientation: string) ;

      public abstract setCenterTweenFlipCardFront(data: string, orientation: string);

      public abstract changeCenterCardBackAnim(orientation: string);

      public abstract crossfadeCenterCardAnim(orientation: string);

      public abstract closeCenterCardBack(orientation: string);

      public abstract closeCenterCardFront(orientation: string);
    }
  }
}