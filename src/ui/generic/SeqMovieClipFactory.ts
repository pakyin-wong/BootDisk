namespace we {
  export namespace ui {
    export class SeqMovieClipFactory {
      constructor() {}

      /**
       * createMovieClip
       * @param anims [{name, frame, end},...]
       *
       */
      public createMovieClip(name: string, startIdx: number, endIdx: number, frameRate: number, anims: any = null, zeroPad: number = 0) {
        const data = this.generateMovieClipData(name, startIdx, endIdx, frameRate, anims, zeroPad);
        let mcDataFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, null);
        let mc: egret.MovieClip = new egret.MovieClip(mcDataFactory.generateMovieClipData('run'));
        return mc;
      }

      protected generateMovieClipData(name: string, startIdx: number, endIdx: number, frameRate: number, anims: any = null, zeroPad: number = 0) {
        const data = { mc: { run: { frameRate } }, res: { } };
        const run: any = data.mc.run;
        // add labels
        if (anims) {
          run.labels = anims;
        }
        // add frames
        const length = endIdx - startIdx + 1;
        const frames = Array.apply(null, { length }).map((data, idx) => {
          const frameNum = utils.zeroPad(startIdx + idx, zeroPad);
          const frameName = `${name}_${frameNum}_png`;
          return {
            res: frameName,
            x: 0,
            y: 0,
          };
        });
        run.frames = frames;
        return data;
      }
    }
  }
}
