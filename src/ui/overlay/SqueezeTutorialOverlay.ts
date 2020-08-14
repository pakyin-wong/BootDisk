namespace we {
  export namespace overlay {
    export class SqueezeTutorialOverlay extends bam.SqueezeTutorial {
      private tutorial;
      private _closeButton;

      constructor() {
        super('SqueezeTutorialOverlay');
      }

      public mount() {
        super.mount();
        this.init();
      }

      public init() {
        super.init();
        this.tutorial = new we.bam.SqueezeTutorial('SqueezeTutorialOverlay');
        this.tutorial.x = 0;
        this.tutorial.y = 0;
        this.addChild(this.tutorial);
        env.isFirstTimeBam = true;
      }

      protected destroy() {
        super.destroy();
      }

      protected updateButton(i) {
        super.updateButton(this._pageIndex);

        // if last page
        if (this._pageIndex === 3) {
          this._closeButton.renderText = () => i18n.t('mobile_notification_close_button_label');
        }
      }
    }
  }
}
