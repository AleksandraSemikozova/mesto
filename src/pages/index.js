import './index.css';

import Card from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithSubmit from '../components/PopupWithSubmit';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import {
  popupDeleteImg,
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
  const card = new Card(
    item,
    '.template-element',
    {
      handleCardClick: (name, link) => {
        popupWithImage.open(name, link);
      },
      handleCardLike: () => {
        const likedCard = card.likedCard();
        const resultApi = likedCard
          ? api.dislikeCard(card.getIdCard())
          : api.likeCard(card.getIdCard());

        resultApi
          .then((data) => {
            card.setLikes(data.likes);
            card.renderLikes();
          })
          .catch((err) => {
            console.log(err);
          });
      },
      handleCardDelete: () => {
        popupConfirmDelete.open(card);
      },
    },
    userID,
    item._id
  );

  const newElement = card.generateCard();

  return newElement;
};

function handleImgFormSubmit(data) {
  section.prependItem(getCardElement(data));
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

const popupConfirmDelete = new PopupWithSubmit(
  popupDeleteImg,
  (event, card) => {
    confirmDelete(event, card);
  }
);
popupConfirmDelete.addEventListeners();

const confirmDelete = (evt, newCard) => {
  evt.preventDefault();
  api
    .removeCard(newCard.getIdCard())
    .then((res) => {
      newCard.removeCard();
      popupConfirmDelete.close();
    })
    .catch((err) => {
      console.log(err);
    });
};

openPopupProfileBtn.addEventListener('click', () => {
  popupEditProfile.open();
  const userInfoData = userInfo.getUserInfo();
  formNameInput.value = userInfoData.username;
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
