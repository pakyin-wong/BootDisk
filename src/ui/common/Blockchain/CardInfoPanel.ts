namespace we {
  export namespace blockchain {
    export class CardInfoPanel extends BasePanel {
      protected _gameData: bab.GameData;
      protected _cardIndexGroup: eui.Group;
      protected _cardIndex: number;
      protected _cardIndexLabel: eui.Label;
      protected _cardImage: blockchain.DeckCard;
      protected _encryptedAreaImage: eui.Image;
      protected _ssnAreaImage: eui.Image;
      protected _decryptedAreaImage: eui.Image;
      protected _ssnLabel: eui.Label;
      protected _encryptedKeyLabel: eui.Label;
      protected _decryptedKeyLabel: ui.RunTimeLabel;
      protected _prevButton: ui.BaseImageButton;
      protected _nextButton: ui.BaseImageButton;
      protected _thirdPartyButton: ui.BaseImageButton;
      protected _copyEncryptedKey: eui.Group;
      protected _copyDecryptedKey: eui.Group;
      protected _copySsn: eui.Group;
      protected _backButton: eui.Group;
      protected _helpButton: eui.Group;
      protected _sha256SuccessfulGroup: eui.Group;
      protected _sha256FailGroup: eui.Group;

      protected _cardHelp: ui.BaseImageButton;
      protected _indexHelpGroup: eui.Group;
      protected _helpArrow: eui.Image;
      protected _helpLabel: ui.RunTimeLabel;

      protected _encryptedAreaGroup: eui.Group;
      protected _encryptedLabelGroup: eui.Group;
      protected _encryptedLabel: ui.RunTimeLabel;

      protected _encryptedHelp: ui.BaseImageButton;
      protected _encryptedKeyHelpGroup: eui.Group;
      protected _encryptedKeyHelpArrow: eui.Image;
      protected _encryptedKeyHelpLabel: ui.RunTimeLabel;

      protected _ssnDeGroup: eui.Group;
      protected _ssnGroup: eui.Group;
      protected _ssnRuntimeLabel: ui.RunTimeLabel;

      protected _ssnHelp: ui.BaseImageButton;
      protected _ssnHelpGroup: eui.Group;
      protected _ssnHelpArrow: eui.Image;
      protected _ssnHelpLabel: ui.RunTimeLabel;

      protected _decryptedRuntimeLabel: ui.RunTimeLabel;

      protected _decryptedHelp: ui.BaseImageButton;
      protected _decryptedKeyHelpGroup: eui.Group;
      protected _decryptedKeyArrow: eui.Image;
      protected _decryptedKeyHelpLabel: ui.RunTimeLabel;

      protected _message: ui.InGameMessage;

      public constructor() {
        super();
        this.skinName = 'skin_desktop.bab.CardInfoPanelSkin';
      }

      protected mount() {
        super.mount();
        this._encryptedAreaImage.scale9Grid = new egret.Rectangle(31, 31, 57, 2);
        this._decryptedAreaImage.scale9Grid = new egret.Rectangle(31, 31, 57, 2);
        this._ssnAreaImage.scale9Grid = new egret.Rectangle(28, 28, 87, 32);
        this._prevButton.addEventListener(
          egret.TouchEvent.TOUCH_TAP,
          () => {
            this.setValue(this._gameData, this._cardIndex - 1);
          },
          this
        );
        this._nextButton.addEventListener(
          egret.TouchEvent.TOUCH_TAP,
          () => {
            this.setValue(this._gameData, this._cardIndex + 1);
          },
          this
        );
        this._copyEncryptedKey.addEventListener(
          egret.TouchEvent.TOUCH_TAP,
          () => {
            utils.copyToClipboard(this._gameData.hashedcardsList[this._cardIndex - 1]);
            if (this._message) {
              this._message.showMessage(ui.InGameMessage.INFO,i18n.t('message.keycopied'));
            }
          },
          this
        );
        this._copyDecryptedKey.addEventListener(
          egret.TouchEvent.TOUCH_TAP,
          () => {
            utils.copyToClipboard(this._gameData.hashedcardsList[this._cardIndex - 1]);
            if (this._message) {
              this._message.showMessage(ui.InGameMessage.INFO,i18n.t('message.keycopied'));
            }
          },
          this
        );
        this._copySsn.addEventListener(
          egret.TouchEvent.TOUCH_TAP,
          () => {
            utils.copyToClipboard(this._gameData.maskedcardssnList[this._cardIndex - 1]);
            if (this._message) {
              this._message.showMessage(ui.InGameMessage.INFO,i18n.t('message.keycopied'));
            }
          },
          this
        );
        if(this._backButton){
        this._backButton.addEventListener(
          egret.TouchEvent.TOUCH_TAP,
          () => {
            this.dispatchEvent(new egret.Event('OPEN_DECK_PANEL'));
            this.hide();
          },
          this
        );
        }
        this._helpButton.addEventListener(
          egret.TouchEvent.TOUCH_TAP,
          () => {
            this.dispatchEvent(new egret.Event('OPEN_HELP_PANEL'));
            this.hide();
          },
          this
        );
        this._thirdPartyButton.addEventListener(
          egret.TouchEvent.TOUCH_TAP,
          () => {
            // window.open(env.blockchain.thirdPartySHA256);
            utils.copyToClipboard(env.blockchain.thirdPartySHA256);
            if (this._message) {
              this._message.showMessage(ui.InGameMessage.INFO,i18n.t('message.urlcopied'));
            }
          },
          this
        );

        //mobile Help Group
        if(env.isMobile){
          this.changeFontSize();

          this.closeAllHint();

          this._cardHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openIndexHint, this);
          this._encryptedHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openEncryptedKeyHint, this);
          this._ssnHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openSsnHint, this);
          this._decryptedHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openDecryptedKeyHint, this);

          this.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeFontSize, this);
        }
      }

      public setValue(gameData: any, index: number) {
        this._gameData = gameData;
        this._cardIndex = index;

        // set cardImage
        this._cardImage.dataUpdate(this._gameData.maskedcardssnList[this._cardIndex - 1], this._cardIndex);
        // set cardIndexLabel
        this._cardIndexLabel.text = this._cardIndex.toString();

        // set Key
        this._encryptedKeyLabel.text = this._gameData.hashedcardsList[this._cardIndex - 1];
        if (this._gameData.maskedcardssnList[this._cardIndex - 1][0] === '*') {
          this._decryptedKeyLabel.renderText = ()=>i18n.t('baccarat.announceAfterDisclose');
        } else {
          this._decryptedKeyLabel.renderText = ()=>this._gameData.hashedcardsList[this._cardIndex - 1];
        }
        this._ssnLabel.text = this._gameData.maskedcardssnList[this._cardIndex - 1];

        // set sha256 Group
        if (this._gameData.maskedcardssnList[this._cardIndex - 1][0] === '*') {
          this._sha256SuccessfulGroup.visible = false;
          this._sha256FailGroup.visible = false;
        } else if (we.utils.SHA256(this._gameData.maskedcardssnList[this._cardIndex - 1]) === this._gameData.hashedcardsList[this._cardIndex - 1]) {
          this._sha256SuccessfulGroup.visible = true;
          this._sha256FailGroup.visible = false;
        } else {
          this._sha256SuccessfulGroup.visible = false;
          this._sha256FailGroup.visible = true;
        }

        // enable/disable next/prev Button
        this._prevButton.active = true;
        this._nextButton.active = true;
        this._prevButton.enabled = true;
        this._nextButton.enabled = true;
        if (utils.stat.ba.translateCardToNumber(this._gameData.firstcard) + 1 >= this._cardIndex - 1) {
          this._prevButton.active = false;
          this._prevButton.enabled = false;
        }
        if (this._cardIndex + 1 > this._gameData.maskedcardssnList.length || this._cardIndex === 1) {
          this._nextButton.active = false;
          this._nextButton.enabled = false;
        }
      }

      protected changeFontSize(){
        if(env.language === "en"){
          this._helpLabel.size = 34;
          this._encryptedKeyHelpLabel.size = 34;
          this._ssnHelpLabel.size = 34;
          this._decryptedKeyHelpLabel.size = 34;
          this._helpLabel.lineSpacing = 12;
          this._encryptedKeyHelpLabel.lineSpacing = 12;
          this._ssnHelpLabel.lineSpacing = 12;
          this._decryptedKeyHelpLabel.lineSpacing = 12;
        }else{
          this._helpLabel.size = 36;
          this._encryptedKeyHelpLabel.size = 36;
          this._ssnHelpLabel.size = 36;
          this._decryptedKeyHelpLabel.size = 36;
          this._helpLabel.lineSpacing = 15;
          this._encryptedKeyHelpLabel.lineSpacing = 15;
          this._ssnHelpLabel.lineSpacing = 15;
          this._decryptedKeyHelpLabel.lineSpacing = 15;
        }
      }

      protected closeAllHint(){
          this._indexHelpGroup.visible = false;
          this._encryptedKeyHelpGroup.visible = false;
          this._ssnHelpGroup.visible = false;
          this._decryptedKeyHelpGroup.visible = false;
      }

      protected openIndexHint(){
        if(this._indexHelpGroup.visible){
          this._indexHelpGroup.visible = false;
        }else{
          // if(env.orientation === "portrait"){
          //   this._helpArrow.visible = true;
          //   this._helpArrow.left = this._cardIndexGroup.x + this._cardIndexLabel.width + (this._cardHelp.width / 2) - this._indexHelpGroup.x;
          // }else{
          //   this._helpArrow.visible = false;
          //}

          this.stage.once(egret.TouchEvent.TOUCH_BEGIN, this.closeAllHint, this);

          this._encryptedKeyHelpGroup.visible = false;
          this._ssnHelpGroup.visible = false;
          this._decryptedKeyHelpGroup.visible = false;

          this._indexHelpGroup.visible = true;
        }
      }

      protected openEncryptedKeyHint(){
        if(this._encryptedKeyHelpGroup.visible){
          this._encryptedKeyHelpGroup.visible = false;
        }else{
          // this._encryptedKeyHelpArrow.left = this._encryptedAreaGroup.x + this._encryptedAreaGroup.x + this._encryptedLabel.width + (this._encryptedHelp.width / 2) - this._encryptedKeyHelpGroup.x;
          // if(env.orientation === "portrait"){
          //   this._encryptedKeyHelpArrow.visible = true;
          //   this._encryptedKeyHelpArrow.left = this._encryptedAreaGroup.x + this._encryptedAreaGroup.x + this._encryptedLabel.width - this._encryptedKeyHelpGroup.x;
          // }else{
          //   this._encryptedKeyHelpArrow.visible = false;
          //}

          this.stage.once(egret.TouchEvent.TOUCH_BEGIN, this.closeAllHint, this);

          this._indexHelpGroup.visible = false;
          this._ssnHelpGroup.visible = false;
          this._decryptedKeyHelpGroup.visible = false;
          
          this._encryptedKeyHelpGroup.visible = true;
        }
      }

      protected openSsnHint(){
        if(this._ssnHelpGroup.visible){
          this._ssnHelpGroup.visible = false;
        }else{
          // this._ssnHelpArrow.left = this._ssnDeGroup.x + this._ssnGroup.x + this._ssnRuntimeLabel.width + (this._ssnHelp.width / 2) - this._ssnHelpGroup.x;
          // if(env.orientation === "portrait"){
          //   this._ssnHelpArrow.visible = true;
          //   this._ssnHelpArrow.left = this._ssnDeGroup.x + this._ssnGroup.x + this._ssnRuntimeLabel.width - this._ssnHelpGroup.x;
          // }else{
          //   this._ssnHelpArrow.visible = false;
          //}
                      
          this.stage.once(egret.TouchEvent.TOUCH_BEGIN, this.closeAllHint, this);

          this._indexHelpGroup.visible = false;
          this._encryptedKeyHelpGroup.visible = false;
          this._decryptedKeyHelpGroup.visible = false;

          this._ssnHelpGroup.visible = true;
        }
      }

      protected openDecryptedKeyHint(){
        if(this._decryptedKeyHelpGroup.visible){
          this._decryptedKeyHelpGroup.visible = false;
        }else{
          // this._decryptedKeyArrow.left = this._ssnDeGroup.x + this._ssnGroup.x + this._decryptedRuntimeLabel.width + (this._decryptedHelp.width / 2) - this._decryptedKeyHelpGroup.x;
          // if(env.orientation === "portrait"){
          //   this._decryptedKeyArrow.visible = true;
          //   this._decryptedKeyArrow.left = this._ssnDeGroup.x + this._ssnGroup.x + this._decryptedRuntimeLabel.width - this._decryptedKeyHelpGroup.x;
          // }else{
          //   this._decryptedKeyArrow.visible = false;
          //}

          this.stage.once(egret.TouchEvent.TOUCH_BEGIN, this.closeAllHint, this);

          this._indexHelpGroup.visible = false;
          this._encryptedKeyHelpGroup.visible = false;
          this._ssnHelpGroup.visible = false;

          this._decryptedKeyHelpGroup.visible = true;
        }
      }
    }
  }
}
