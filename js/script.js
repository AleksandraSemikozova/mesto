let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.profile__edit-btn');
let popupCloseButton = popup.querySelector('.popup__close-icon');
let formElement = popup.querySelector('.popup__form');
let nameInput = popup.querySelector('.popup__item_name');
let jobInput = popup.querySelector('.popup__item_job');
let formNameInput = formElement.querySelector('.popup__item_name');
let formJobInput = formElement.querySelector('.popup__item_job');
let name = document.querySelector('.profile__title');
let job = document.querySelector('.profile__subtitle');

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closePopup();
}

popupOpenButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
