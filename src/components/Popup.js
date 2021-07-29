import { EscKey } from '../utils/constants.js';

export default class Popup {
  constructor(popup) {
    this._popup = document.querySelector('.popup');
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
  }

  open() {
    !this._popup.classList.contains('popup_opened') &&
      this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.contains('popup_opened') &&
      this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
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
    this._popup.addEventListener('mousedown', (event) =>
      this._handleOverlayClose(event)
    );
  }
}
