import { popupImage, validConfig } from '../utils/constants.js';
import { elements } from '../components/initial-cards.js';
import Card from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';



const formProfileValidation = new FormValidator(
  validConfig,
  formProfileElement
);
const formImgValidation = new FormValidator(validConfig, formImgElement);

function handleImgFormSubmit(evt) {
  evt.preventDefault();

  elementsContainer.prepend(
    getCardElement({
      name: formNameImg.value,
      link: formLinkImg.value,
    })
  );
  formImgElement.reset(); //Обнуляем поле ввода
  closePopup(popupAddImg);
}

function render() {
  const elementsList = elements.map(getCardElement);
  elementsContainer.append(...elementsList);
}

const getCardElement = (item) => {
  const card = new Card(item, '.template-element');
  const newElement = card.generateCard();

  return newElement;
};
render();

// обрабатывает отправку формы профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileSelectors.profileName.textContent = formNameInput.value; //Берем значение из инпута и вставляем в профиль (имя пользователя)
  profileSelectors.profileJob.textContent = formJobInput.value; //Значение инпута в профиль (деятельность)
  closePopup(popupProfile); //Закрываем попап
}

openPopupProfileBtn.addEventListener('click', () => {
  openPopup(popupProfile);
  formNameInput.value = profileNameElement.textContent;
  formJobInput.value = profileJobElement.textContent;
  formProfileValidation.clearValidation();
});

openPopupImgBtn.addEventListener('click', () => {
  open(popupAddImg);
  formImgValidation.clearValidation();
});

closePopupProfileBtn.addEventListener('click', () => {
  closePopup(popupProfile);
});
closePopupImgBtn.addEventListener('click', () => {
  closePopup(popupAddImg);
});
closePopupImage.addEventListener('click', () => {
  closePopup(popupImage);
});

document.addEventListener('click', (evt) => {
  if (evt.target === document.querySelector('.popup_opened')) {
    closePopup(document.querySelector('.popup_opened'));
  }
});

formProfileElement.addEventListener('submit', handleProfileFormSubmit);
formImgElement.addEventListener('submit', handleImgFormSubmit);
formProfileValidation.enableValidation();
formImgValidation.enableValidation();
