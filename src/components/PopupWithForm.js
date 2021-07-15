import Popup from './Popup';

export default class PopupWithForm extends Popup {
  constructor({ popup, submitForm }) {
    super(popup);
    this._submitForm = submitForm;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._popup.querySelector('.popup__item');
  }

  _getInputValues() {
    const objectInputValues = {};
    this._inputList.forEach((input) => {
      objectInputValues[input.name] = input.value;
    });
    return objectInputValues;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitForm(this._getInputValues());
      this.close();
    });
  }
}
