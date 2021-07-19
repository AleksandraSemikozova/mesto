import { EscKey } from '../utils/constants.js';

export default class Popup {
  constructor(popup) {
    this._popup = popup;
  }

  open() {
    !this._popup.classList.contains('popup_opened') &&
      this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    document.addEventListener('mousedown', this._handleOverlayClose.bind(this));
  }

  close() {
    this._popup.classList.contains('popup_opened') &&
      this._popup.classList.remove('popup_opened');

    document.removeEventListener('keydown', this._handleEscClose.bind(this));
    document.removeEventListener(
      'mousedown',
      this._handleOverlayClose.bind(this)
    );
  }

  _handleEscClose(event) {
    if (event.key === EscKey) {
      this.close();
    }
  }

  _handleOverlayClose(event) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup
      .querySelector('.popup__close-icon')
      .addEventListener('click', () => this.close());
  }
}
