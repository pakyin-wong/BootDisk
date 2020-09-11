namespace we {
  export namespace overlay {
    export namespace betHistory {
      export class LwResultItem extends core.BaseEUI {
        private _gameResult;

        private image: eui.Image;

        private highLightSource: string;
        private eastSource: string;
        private southSource: string;
        private westSource: string;
        private northSource: string;
        private redSource: string;
        private greenSource: string;
        private whiteSource: string;

        public constructor(gameresult: any) {
          super('LwResultItem');
          this._gameResult = gameresult;
          this.updateSource();
        }

        protected mount() {
          if (this._gameResult.v === '01') {
            this.image.source = this.eastSource;
          } else if (this._gameResult.v === '02') {
            this.image.source = this.southSource;
          } else if (this._gameResult.v === '03') {
            this.image.source = this.westSource;
          } else if (this._gameResult.v === '04') {
            this.image.source = this.northSource;
          } else if (this._gameResult.v === '05') {
            this.image.source = this.whiteSource;
          } else if (this._gameResult.v === '06') {
            this.image.source = this.redSource;
          } else if (this._gameResult.v === '07') {
            this.image.source = this.greenSource;
          }
        }

        protected updateSource() {
          if (env.isMobile) {
            this.highLightSource = 'm_lw_listpenal_history_record_hl_png';
            this.eastSource = 'm_lw_listpenal_history_record_east_png';
            this.southSource = 'm_lw_listpenal_history_record_south_png';
            this.westSource = 'm_lw_listpenal_history_record_west_png';
            this.northSource = 'm_lw_listpenal_history_record_north_png';
            this.redSource = 'm_lw_listpenal_history_record_red_png';
            this.greenSource = 'm_lw_listpenal_history_record_green_png';
            this.whiteSource = 'm_lw_listpenal_history_record_white_png';
          } else {
            this.highLightSource = 'd_lw_history_record_hl_png';
            this.eastSource = 'd_lw_history_record_east_png';
            this.southSource = 'd_lw_history_record_south_png';
            this.westSource = 'd_lw_history_record_west_png';
            this.northSource = 'd_lw_history_record_north_png';
            this.redSource = 'd_lw_history_record_red_png';
            this.greenSource = 'd_lw_history_record_green_png';
            this.whiteSource = 'd_lw_history_record_white_png';
          }
        }
      }
    }
  }
}
