import './index.css';
import Card from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import {
  closePopupImage,
  closePopupImgBtn,
  closePopupProfileBtn,
  elementsContainer,
  EscKey,
  formImgElement,
  formJobInput,
  formLinkImg,
  formNameImg,
  formNameInput,
  formProfileElement,
  imageElement,
  imageTitle,
  openPopupImgBtn,
  openPopupProfileBtn,
  popupAddImg,
  popupImage,
  popupProfile,
  profileSelectors,
  templateElement,
  validConfig,
} from '../utils/constants.js';
import { elements } from '../utils/initial-cards.js';

const formProfileValidation = new FormValidator(
  validConfig,
  formProfileElement
);
const formImgValidation = new FormValidator(validConfig, formImgElement);

function handleImgFormSubmit() {
  elementsContainer.prepend(
    getCardElement({
      name: formNameImg.value,
      link: formLinkImg.value,
    })
  );
  formImgElement.reset(); //Обнуляем поле ввода
}

const getCardElement = (item) => {
  const card = new Card(item, '.template-element', {
    handleCardClick: (name, link) => {
      popupWithImage.open(name, link);
    },
  });

  const newElement = card.generateCard();

  return newElement;
};

// обрабатывает отправку формы профиля
function handleProfileFormSubmit() {
  userInfo.setUserInfo(formNameInput.value, formJobInput.value);
}

const popupWithImage = new PopupWithImage(popupImage);
popupWithImage.setEventListeners();

const popupAddImage = new PopupWithForm({
  popup: popupAddImg,
  submitForm: handleImgFormSubmit,
});
popupAddImage.setEventListeners();

const popupEditProfile = new PopupWithForm({
  popup: popupProfile,
  submitForm: handleProfileFormSubmit,
});
popupEditProfile.setEventListeners();

openPopupProfileBtn.addEventListener('click', () => {
  popupEditProfile.open();
  const userInfoData = userInfo.getUserInfo();
  formNameInput.value = userInfoData.name;
  formJobInput.value = userInfoData.job;
  formProfileValidation.clearValidation();
});

openPopupImgBtn.addEventListener('click', () => {
  popupAddImage.open();
  formImgValidation.clearValidation();
});

const userInfo = new UserInfo({
  profileName: profileSelectors.profileName,
  profileJob: profileSelectors.profileJob,
});

const section = new Section(
  { items: elements, renderer: getCardElement },
  '.elements'
);

section.rendererItems();

document.addEventListener('click', (evt) => {
  if (evt.target === document.querySelector('.popup_opened')) {
    evt.target.classList.remove('popup_opened');
  }
});

formProfileValidation.enableValidation();
formImgValidation.enableValidation();
