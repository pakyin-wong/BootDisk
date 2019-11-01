namespace egret.sys {
  export class ExtendedScreenAdapter extends DefaultScreenAdapter {
    public constructor() {
      super();
    }

    public calculateStageSize(scaleMode: string, screenWidth: number, screenHeight: number, contentWidth: number, contentHeight: number): StageDisplaySize {
      const displayWidth = screenWidth;
      const displayHeight = screenHeight;
      const stageWidth = contentWidth;
      const stageHeight = contentHeight;
      const scaleX = screenWidth / stageWidth || 0;
      const scaleY = screenHeight / stageHeight || 0;
      const size: StageDisplaySize = super.calculateStageSize(scaleMode, screenWidth, screenHeight, contentWidth, contentHeight);
      switch (scaleMode) {
        case 'fixedWidthFixedAspect':
          size.displayHeight = Math.round((displayWidth / 16) * 9);
          size.displayWidth = displayWidth;
          size.stageWidth = stageWidth;
          size.stageHeight = stageHeight;
          break;
      }
      return size;
    }
  }
}