namespace we {
  export namespace blockchain {
    export class CardInfoPanel extends BasePanel {
      protected _gameData: bab.GameData;
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

      protected _sha256SuccessfulLabel: ui.RunTimeLabel;
      protected _sha256FailLabel: ui.RunTimeLabel;

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
          },
          this
        );
        this._copyDecryptedKey.addEventListener(
          egret.TouchEvent.TOUCH_TAP,
          () => {
            utils.copyToClipboard(this._gameData.hashedcardsList[this._cardIndex - 1]);
          },
          this
        );
        this._copySsn.addEventListener(
          egret.TouchEvent.TOUCH_TAP,
          () => {
            utils.copyToClipboard(this._gameData.maskedcardssnList[this._cardIndex - 1]);
          },
          this
        );
        this._backButton.addEventListener(
          egret.TouchEvent.TOUCH_TAP,
          () => {
            this.dispatchEvent(new egret.Event('OPEN_DECK_PANEL'));
            this.hide();
          },
          this
        );
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
          this._encryptedKeyLabel.textColor = 0xffffff;
          this._decryptedKeyLabel.textColor = 0xffffff;
          this._sha256FailGroup.visible = false;
        } else if (we.utils.SHA256(this._gameData.maskedcardssnList[this._cardIndex - 1]) === this._gameData.hashedcardsList[this._cardIndex - 1]) {
          this._sha256SuccessfulGroup.visible = true;
          this._encryptedKeyLabel.textColor = 0x0f9d5d;
          this._decryptedKeyLabel.textColor = 0x0f9d5d;
          this._sha256FailGroup.visible = false;
        } else {
          this._sha256SuccessfulGroup.visible = false;
          this._encryptedKeyLabel.textColor = 0xd83642;
          this._decryptedKeyLabel.textColor = 0xd83642;
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
    }
  }
}
