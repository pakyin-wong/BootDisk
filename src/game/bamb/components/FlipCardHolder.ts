namespace we {
  export namespace bamb {
    export interface FlipCardHolder extends core.BaseEUI {
      setCenterCardsTouchEnabled(enable: boolean, orientation?: string);

      isCardShowing(orientation: string);

      setCenterCardVisible(enable: boolean, orientation?: string);

      setCenterFlipCard(data: string, orientation: string) ;

      setCenterTweenFlipCardFront(data: string, orientation: string);

      changeCenterCardBackAnim(orientation: string);

      crossfadeCenterCardAnim(orientation: string);

      closeCenterCardBack(orientation: string);

      closeCenterCardFront(orientation: string);
    }
  }
}