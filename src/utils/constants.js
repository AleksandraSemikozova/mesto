const EscKey = 'Escape';
const popupImage = document.querySelector('.popup_content_img');

const closePopupEsc = function (event) {
  if (
    event.key === EscKey &&
    document.querySelector('.popup_opened') !== null
  ) {
    closePopup(document.querySelector('.popup_opened'));
  }
};

// Функция открывает попап
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
};

//Функция закрывает попап
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
};

const validConfig = {
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_inactive',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__error_visible',
};

export {
  EscKey,
  popupImage,
  closePopupEsc,
  openPopup,
  closePopup,
  validConfig,
};
