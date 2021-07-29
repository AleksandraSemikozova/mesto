import './index.css';

import Card from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithSubmit from '../components/PopupWithSubmit';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {
  EscKey,
  popupImage,
  popupImageSelector,
  popupDeleteImg,
  popupProfileSelector,
  popupDeleteImgSelector,
  elementsContainer,
  popupUpdateAvatarSelector,
  templateElement,
  popupProfile,
  formAvatarElement,
  popupAddImageSelector,
  formLinkAvatar,
  openPopupProfileBtn,
  closePopupProfileBtn,
  popupAddImg,
  openPopupImgBtn,
  openPopupUpdateAvatarBtn,
  popupUpdateAvatar,
  closePopupImgBtn,
  closePopupImage,
  formProfileElement,
  formNameInput,
  formJobInput,
  profileSelectors,
  formImgElement,
  formNameImg,
  formLinkImg,
  validConfig,
  imageTitle,
  imageElement,
} from '../utils/constants.js';
import { elements } from '../utils/initial-cards.js';

const api = new Api({
  address: 'https://mesto.nomoreparties.co/v1/cohort-26',
  headers: {
    authorization: 'd147ccf3-fe7d-432e-976a-2d83c2abca13',
    'Content-type': 'application/json',
  },
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([data, element]) => {
    userInfo.setUserInfo(data);
    section.rendererItems(element);
  })
  .catch((err) => {
    console.log(err);
  });

const formProfileValidation = new FormValidator(
  validConfig,
  formProfileElement
);
const formImgValidation = new FormValidator(validConfig, formImgElement);

const formAvatarValidation = new FormValidator(validConfig, formAvatarElement);

const getCardElement = (item) => {
  const card = new Card(item, '.template-element', {
    handleCardClick: (name, link) => {
      popupWithImage.open(name, link);
    },
  });

  const newElement = card.generateCard();

  return newElement;
};

function handleImgFormSubmit(data) {
  section.prependItem(getCardElement(data));
}

// обрабатывает отправку формы профиля
function handleProfileFormSubmit(info) {
  popupEditProfile.renderLoading(true);
  api
    .editUserInfo(info.name, info.about)
    .then(() => {
      userInfo.setUserInfo(info);
      popupEditProfile.close();
    })
    .finally(() => {
      popupEditProfile.renderLoading(false);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
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
  submitForm: (info) => handleProfileFormSubmit(info),
});
popupEditProfile.setEventListeners();

function handleAvatarFormSubmit() {
  popupEditAvatar.renderLoading(true);

  api
    .editUserAvatar(formLinkAvatar.value)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupEditAvatar.close();
    })
    .finally(() => {
      popupEditAvatar.renderLoading(false);
    })
    .catch((err) => {
      console.log(err);
    });
}

const popupEditAvatar = new PopupWithForm({
  popup: popupUpdateAvatar,
  submitForm: () => handleAvatarFormSubmit(),
});
popupEditAvatar.setEventListeners();

const popupConfirmDelete = new PopupWithSubmit(
  popupDeleteImgSelector,
  (event, card) => {
    deleteConfirm(event, card);
  }
);
popupConfirmDelete.setEventListeners();

const deleteConfirm = (event, card) => {
  event.preventDefault();
  api
    .removeCard(card.getIdCard())
    .then((response) => {
      card.removeCard();
      popupConfirmDelete.close();
    })
    .catch((err) => {
      console.log(err);
    });
};

openPopupImgBtn.addEventListener('click', () => {
  popupAddImage.open();
  formImgValidation.clearValidation();
});

openPopupUpdateAvatarBtn.addEventListener('click', () => {
  popupEditAvatar.open();
  formAvatarValidation.clearValidation();
});

const userInfo = new UserInfo(profileSelectors);
openPopupProfileBtn.addEventListener('click', () => {
  popupEditProfile.open();

  const currentInfo = userInfo.getUserInfo();
  formNameInput.value = currentInfo.name;
  formJobInput.value = currentInfo.about;
  formProfileValidation.clearValidation();
});

const section = new Section(
  {
    renderer: (data) => section.addItem(getCardElement(data)),
  },
  '.elements'
);

function renderCards(elements) {
  section.rendererItems(elements);
}

renderCards(elements);

formProfileValidation.enableValidation();
formImgValidation.enableValidation();
formAvatarValidation.enableValidation();
