const EscKey = 'Escape';
const popupImage = document.querySelector('.popup_content_img');



// Функция открывает попап


//Функция закрывает попап


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
  validConfig,
};
