namespace we {
  export namespace ui {
    export class Nav extends core.BaseEUI {
      private _lantern: NavLantern;
      private _time: eui.Label;
      private _user: eui.Label;
      private _profile_toggle: eui.Group;
      private _profile: overlay.PlayerProfile;
      // private _playerProfile: overlay.PlayerProfile;
      private _menu_toggle: eui.Image;
      private _menu: Panel;
      private _slider_toggle: ui.BaseImageButton;

      private _balance: ui.RunTimeLabel;
      private _balanceGame: ui.RunTimeLabel;

      private _balanceText: ui.RunTimeLabel;

      private _profilePrc: eui.Image;
      private _refreshButton: eui.Image;

      private isPlayerProfileOpened: boolean = false;
      // from Monitor.ts
      // private _liveSidePanel: ui.LiveSidePanel;
      // private _sideGameList: ui.MobileSideGameList;
      // private _common_listpanel: ui.BaseImageButton;
      // private _navMobileSilder: ui.NavMobileSilder;
      // private _mDropdown: ui.MobileDropdown;
      // private _overlay: ui.Overlay;

      // this is the background color which the alpha will change when scrolling
      private _background: eui.Rect;

      private _timeInterval: number;
        ///////////////////////
      // public get playerProfile() {
      //   return this._playerProfile;
      // }

      // public set playerProfile(val: any){
      //   this._playerProfile = val;
      // }
        ///////////////////////
      public constructor() {
        super('Nav');
      }

      protected mount() {
        this.initNav();
      }

      protected initNav() {
        /////////////////////
        // if (!env.isMobile) {
        //   // this._profile.Nav = this;
        // }
        /////////////////////
        if (this._profile) {
          this._profile.setToggler(this._profile_toggle);
          this._profile.dismissOnClickOutside = true;
        }
        if (this._menu) {
          this._menu.setToggler(this._menu_toggle);
          this._menu.dismissOnClickOutside = true;
        }
        this._balance.renderText = () => `${dir.meterCtr.getLocal('balance')}`;
        if (env.isMobile) {
          this._balanceGame.renderText = () => `${dir.meterCtr.getLocal('balance')}`;
          this._balanceText.renderText = () => `${i18n.t('nav.bet_balance')}`;
          dir.meterCtr.register('balance', this._balanceGame);
        }
        dir.meterCtr.register('balance', this._balance);
        if (!isNaN(env.balance)) {
          dir.meterCtr.rackTo('balance', env.balance, 0);
        }
        this._timeInterval = setInterval(this.onUpdateTimer.bind(this), 1000);

        this.getPlayerProfileSummary();
        this.updateIconImage();
        this.updateNickname();
        this.addListeners();
      }

      private addListeners() {
        if (env.isMobile) {
          utils.addButtonListener(this._slider_toggle, this.onClickSliderToggle, this);
          // dir.evtHandler.addEventListener(core.Event.BA_POPUP, this.gameListPopUp, this);
          // dir.evtHandler.addEventListener(core.Event.BA_POPDOWN, this.gameListPopDown, this);
          // this._lantern.alignToLeft();
        }
        if ( !env.isMobile ) {
          this._profile_toggle.addEventListener(egret.TouchEvent.TOUCH_TAP,this.updatePlayerProfileSummary,this);
        }
        dir.evtHandler.addEventListener(core.Event.ICON_UPDATE, this.updateIconImage, this);
        dir.evtHandler.addEventListener(core.Event.NICKNAME_UPDATE, this.updateNickname, this);
        this._refreshButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.updateBalance, this);
        dir.evtHandler.addEventListener(core.Event.ENTER_SCENE, this.onSceneChange, this);
        // listen to the event dispatched by some particular scroller and update the background alpha
        dir.evtHandler.addEventListener(core.Event.UPDATE_NAVBAR_OPACITY, this.onBackgroundOpacityUpdate, this);
      }

      private removeListeners() {
        if (!env.isMobile) {
          this._profile_toggle.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.updatePlayerProfileSummary,this);
        }
        dir.evtHandler.removeEventListener(core.Event.ICON_UPDATE, this.updateIconImage, this);
        dir.evtHandler.addEventListener(core.Event.NICKNAME_UPDATE, this.updateNickname, this);
        this._refreshButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.updateBalance, this);
        dir.evtHandler.removeEventListener(core.Event.ENTER_SCENE, this.onSceneChange, this);
        // listen to the event dispatched by some particular scroller and update the background alpha
        dir.evtHandler.removeEventListener(core.Event.UPDATE_NAVBAR_OPACITY, this.onBackgroundOpacityUpdate, this);
      }

      private updateBalance() {
        dir.socket.getBalance();
      }

      private updatePlayerProfileSummary(){
        this.getPlayerProfileSummary();
        this._profile.winAmount = env.maxWinAmount;
        this._profile.winStreak = env.maxWinCount;
        this._profile.updateProfileText();
      }

      private getPlayerProfileSummary(){
        dir.socket.getPlayerProfileSummary(this.updateMaxWinAmountAndCount);
      }

      private updateMaxWinAmountAndCount(data){
        if (data.error){
          return;
        }
        const { maxwin , winningstreak } = data;

        env.maxWinCount = winningstreak;
        env.maxWinAmount = maxwin;
        // this._profile.maxWinAmountText(env.maxWinAmount);
        // this._profile.maxWinCountText(env.maxWinCount);
      }

      private onSceneChange(e = null) {
        if (!env.isMobile) {
          switch (dir.sceneCtr.currScene.sceneHeaderPlacement) {
            case 'Lobby':
              this._lantern.alignToRight();
              this._time.textAlign = 'right';
              this.currentState = 'Lobby';
              break;

            case 'Game':
              this._lantern.alignToLeft();
              this._time.textAlign = 'left';
              this.currentState = 'Game';
              break;
          }
        } else {
          switch (dir.sceneCtr.currScene.sceneHeaderPlacement) {
            case 'Lobby':
              this._lantern.visible = true;

              this._profilePrc.visible = true;
              this.updateIconImage();
              this.currentState = 'Lobby';
              break;

            case 'Game':
              this._lantern.visible = false;

              this._profilePrc.visible = false;
              this.currentState = 'Game';
              break;
          }
        }
      }

      protected updateIconImage() {
        this._profilePrc.source = env.icons && env.icons[env.profileimage] ? env.icons[env.profileimage] : 'd_lobby_profile_pic_01_png';
      }

      protected updateNickname() {
        if (env.nicknameKey) {
          try {
            const langcode = env._nicknames[env.language] ? env.language : 'en';
            if (env._nicknames[langcode][env.nicknameKey]) {
              env.nickname = env._nicknames[langcode][env.nicknameKey]['value'];
            } else {
              env.nickname = env._nicknames['en'][env.nicknameKey]['value'];
            }
          } catch (err) {
            env.nickname = env.nicknameKey;
          }
        }
        this._user.text = env.nickname;
      }

      private onClickSliderToggle() {
        dir.evtHandler.dispatch(core.Event.TOGGLE_SILDER_MENU);
      }

      private onUpdateTimer() {
        this._time.text = utils.formatTime(env.currTime / Math.pow(10, 3));
      }

      protected onBackgroundOpacityUpdate(evt: egret.Event) {
        const value = evt.data;
        if (this._background) {
          this._background.alpha = value;
        }
      }

      protected destroy() {
        super.destroy();
      }

      protected clearOrientationDependentComponent() {
        super.clearOrientationDependentComponent();
        dir.meterCtr.drop('balance', this._balance);
        dir.meterCtr.drop('balance', this._balanceGame);
      }

      protected onOrientationChange() {
        // dir.layerCtr.overlay.removeChild(this._sideGameList);
        // dir.layerCtr.overlay.removeChild(this._navMobileSilder);
        // dir.layerCtr.overlay.removeChild(this._overlay);
        // dir.layerCtr.overlay.removeChild(this._mDropdown);
        super.onOrientationChange();
        this.onSceneChange();
        this.initNav();
        this.invalidateState();
      }
    }
  }
}
