namespace we {
  export namespace ba {
    export class GameBar extends eui.Component implements eui.UIComponent {
      private videoButton: eui.Button;
      private played: boolean;
      private playFunc: () => void;
      private stopFunc: () => void;

      public constructor() {
        super();
        this.skinName = utils.getSkin('GameBar');
        this.played = false;
      }

      protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
      }

      protected childrenCreated(): void {
        super.childrenCreated();
        this.videoButton.addEventListener(
          egret.TouchEvent.TOUCH_TAP,
          () => {
            if (this.played) {
              this.stopFunc();
            } else {
              this.playFunc();
            }
            this.played = !this.played;
          },
          this
        );
      }

      public setPlayFunc(func: () => void) {
        this.playFunc = func;
      }

      public setStopFunc(func: () => void) {
        this.stopFunc = func;
      }
    }
  }
}
