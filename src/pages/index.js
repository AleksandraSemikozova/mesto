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

const getCardElement = (item) => {
  const card = new Card(item, ".template-element", {
    handleCardClick: (name, link) => {
      popupWithImage.open(name, link);
    },
  });

  const newElement = card.generateCard();

  return newElement;
};

function handleImgFormSubmit(data) {
  elementsContainer.prepend(
    getCardElement({
      name: data.name,
      link: data.link,
    })
  );
}

// обрабатывает отправку формы профиля
function handleProfileFormSubmit(values) {
  userInfo.setUserInfo(values.username, values.job);
}

const popupWithImage = new PopupWithImage(popupImage);
popupWithImage.setEventListeners();

const popupAddImage = new PopupWithForm({
  popup: popupAddImg,
  submitForm: (data) => handleImgFormSubmit(data),
});
popupAddImage.setEventListeners();

const popupEditProfile = new PopupWithForm({
  popup: popupProfile,
  submitForm: (values) => handleProfileFormSubmit(values),
});
popupEditProfile.setEventListeners();

openPopupProfileBtn.addEventListener("click", () => {
  popupEditProfile.open();
  const userInfoData = userInfo.getUserInfo();
  formNameInput.value = userInfoData.username;
  formJobInput.value = userInfoData.job;
  formProfileValidation.clearValidation();
});

openPopupImgBtn.addEventListener("click", () => {
  popupAddImage.open();
  formImgValidation.clearValidation();
});

const userInfo = new UserInfo({
  profileName: profileSelectors.profileName,
  profileJob: profileSelectors.profileJob,
});

const section = new Section({ renderer: getCardElement }, ".elements");

function renderCards(elements) {
  section.rendererItems(elements);
}

renderCards(elements);

formProfileValidation.enableValidation();
formImgValidation.enableValidation();
