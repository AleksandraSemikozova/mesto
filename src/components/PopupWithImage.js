import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._popup = popup;
  }

  open(name, link) {
    super.open();
    const popupImage = this._popup.querySelector('.popup__img');
    const popupTitle = this._popup.querySelector('.popup__img-title');

    popupImage.src = link;
    popupImage.alt = name;
    popupTitle.textContent = name;
  }
}
