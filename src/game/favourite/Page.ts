namespace we {
  export namespace favourite {
    export class Page extends core.BasePage {
      private video: egret.FlvVideo;

      private _gameTableList: GameTableList;
      private _roomList: ui.TableList;

      private _emptyImage: eui.Image;
      private _noFavouriteTag: ui.RunTimeLabel;
      private _tagHint: ui.RunTimeLabel;

      public constructor(data: any = null) {
        super('FavouritePage', data);
        this._roomList = new ui.TableList();
      }

      protected clearOrientationDependentComponent() {
        super.clearOrientationDependentComponent();
      }

      protected initOrientationDependentComponent() {
        super.initOrientationDependentComponent();
        this._gameTableList = new GameTableList(this._roomList);
        this._gameTableList.percentWidth = 100;
        this._gameTableList.percentHeight = 100;
        this.addChild(this._gameTableList);
      }

      public i = 0;

      public onEnter() {
        super.onEnter();
        env.currentPage = 'favourite';
        // After pressing the Filter
        // dir.socket.getTableList();
        // // dir.socket.getTableList(enums.TableFilter.BACCARAT);
        // dir.socket.getTableHistory();

        if(env.isMobile){
          this._emptyImage.source = "m-lobby-favorite-empty-icon_png";
        }
        else{
          const _emptyImage = new eui.Image;
          _emptyImage.width = 192;
          _emptyImage.height = 192;
          _emptyImage.verticalCenter = 0;
          _emptyImage.horizontalCenter = 0;
          this.addChild(_emptyImage);
          this._emptyImage = _emptyImage;
          this._emptyImage.source = "d-lobby-favorite-empty-icon_png";

          const _noFavouriteTag = new ui.RunTimeLabel;
          _noFavouriteTag.size = 40;
          _noFavouriteTag.verticalCenter = 130;
          _noFavouriteTag.horizontalCenter = 0;
          this.addChild(_noFavouriteTag);
          this._noFavouriteTag = _noFavouriteTag;

          const _tagHint = new ui.RunTimeLabel;
          _tagHint.size = 28;
          _tagHint.verticalCenter = 180;
          _tagHint.horizontalCenter = 0;
          _tagHint.alpha = 0.5;
          this.addChild(_tagHint);
          this._tagHint = _tagHint;
        }

        this._noFavouriteTag.renderText = () => i18n.t('lobby_no_favourite_text');
        this._tagHint.renderText = () => i18n.t('lobby_tag_hint_text');

        if(env.favouriteTableList.length === 0){
          this._emptyImage.visible = true;
          this._noFavouriteTag.visible = true;
          this._tagHint.visible = true;
        }else{
          this._emptyImage.visible = false;
          this._noFavouriteTag.visible = false;
          this._tagHint.visible = false;
        }

        if (this._data && this._data.tab) {
          env.currentTab = this._data.tab;
          this._gameTableList.selectGameType(this._data.tab);
        } else {
          env.currentTab = 'all';
          this._gameTableList.selectGameType();
        }
      }

      public async onFadeEnter() {}

      public destroy() {
        super.destroy();
        this.removeChildren();
      }

      public async onFadeExit() {}
    }
  }
}
