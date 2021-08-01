import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popup, submitForm }) {
    super(popup);
    this._popup = popup;
    this._submitForm = submitForm;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._popup.querySelectorAll('.popup__item');
    this._popupSubmitButton = this._popup.querySelector('.popup__btn');
    this._defaultSubmitButtonText = this._popupSubmitButton.textContent;
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  close() {
    super.close();
    this._form && this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitForm(this._getInputValues());
    });
  }

  renderLoading(isLoading, initialMessage = 'Сохранение...') {
    if (isLoading) {
      this._popupSubmitButton.textContent = initialMessage;
    } else {
      this._popupSubmitButton.textContent = this._defaultSubmitButtonText;
    }
  }
}
