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
        this.tutorial = new we.bam.SqueezeTutorial('SqueezeTutorialOverlay');
        this.tutorial.x = 0;
        this.tutorial.y = 0;
        this.addChild(this.tutorial);
        env.isFirstTimeBam = true;
      }

      protected destroy() {
        super.destroy();
      }
    }
  }
}
