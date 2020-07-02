namespace we {
  export namespace overlay {
    export class SqueezeTutorialOverlay extends ui.Panel {
      private tutorial;

      constructor() {
        super();
      }

      public mount() {
        super.mount();
        this.init();
      }

      public init() {
        this.tutorial = new we.bam.SqueezeTutorial('SqueezeTutorial');
        this.tutorial.x = 0;
        this.tutorial.y = 0;
        this.close = this.tutorial._close;
        // this.tutorial.isDraggable = true;
        this.addChild(this.tutorial);
        env.isFirstTimeBam = true;
      }

      protected destroy() {
        super.destroy();
      }
    }
  }
}
