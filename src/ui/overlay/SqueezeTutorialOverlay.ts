namespace we {
  export namespace overlay {
    export class SqueezeTutorialOverlay extends bam.SqueezeTutorial {
      private tutorial;

      constructor() {
        super('SqueezeTutorialOverlay');
      }

      public mount() {
        super.mount();
        this.init();
      }

      public init() {
        super.init();
        // this.tutorial = new we.bam.SqueezeTutorial('SqueezeTutorialOverlay');
        // if (env.orientation === 'portrait') {
        //   this.tutorial.x = 0;
        //   this.tutorial.y = 0;
        // } else if (env.orientation === 'landscape') {
        //   this.tutorial.horizontalAlign = 0;
        //   this.tutorial.bottom = 44;
        //   this.tutorial.width = this.width * 0.8;
        //   this.tutorial.height = this.height * 0.8;
        // }
        // this.addChild(this.tutorial);
        env.isFirstTimeBam = true;
      }

      protected destroy() {
        super.destroy();
      }

      protected updateButton(i) {
        super.updateButton(this._pageIndex);
      }
    }
  }
}
