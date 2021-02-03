let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.profile__edit-btn');
let popupCloseButton = popup.querySelector('.popup__close-icon');
let formElement = popup.querySelector('.popup__form');
let formNameInput = formElement.querySelector('.popup__item_type_user-name');
let formJobInput = formElement.querySelector('.popup__item_type_user-job');
let profileNameElement = document.querySelector('.profile__title');
let profileJobElement = document.querySelector('.profile__subtitle');

function openPopup() {
  popup.classList.add('popup_opened');
  formNameInput.value = profileNameElement.textContent;
  formJobInput.value = profileJobElement.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileNameElement.textContent = formNameInput.value;
  profileJobElement.textContent = formJobInput.value;
  closePopup();
}

popupOpenButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
