import Popup from './Popup';

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
  }

  open(name, link) {
    super.open();
    const popupImage = this.popup.querySelector(".popup__img");
    const popupTitle = this.popup.querySelector(".popup__img-title");

    popupImage.src = name;
    popupImage.alt = link;
    popupTitle.textContent = name;
  }
}
