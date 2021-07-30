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
  userId,
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

//----------------Валидация форм--------------------

const formProfileValidation = new FormValidator(
  validConfig,
  formProfileElement
); //Валидация формы профиля
const formImgValidation = new FormValidator(validConfig, formImgElement); //Валидация формы добавления картинки

const formAvatarValidation = new FormValidator(validConfig, formAvatarElement); //Валидация формы редактирования аватара

//--------------------------------------------------------------

// Генерация картинок
const getCardElement = (item) => {
  const card = new Card(
    item,
    '.template-element',
    {
      handleCardClick: (name, link) => {
        popupWithImage.open(name, link);
      },
      handleLikeIcon: () => {
        const likedCard = card.likedCard();
        const resultApi = likedCard
          ? api.dislikeCard(card.getIdCard())
          : api.likeCard(card.getIdCard());

        resultApi
          .then((item) => {
            card.setLikes(item.likes);
            card.renderLikes();
          })
          .catch((err) => {
            console.log(err);
          });
      },
      handleDeleteCard: () => {
        popupConfirmDelete.open(card);
      },
    },
    userId,
    item._id
  );

  const newElement = card.generateCard();

  return newElement;
};

//------------------------------Попап Профиля--------------------------------------------------------

// Обрабатываем отправку формы профиля
function handleProfileFormSubmit(info) {
  popupEditProfile.renderLoading(true);
  api
    .editUserInfo(info.username, info.job)
    .then(() => {
      userInfo.setUserInfo(info);
      popupEditProfile.close();
    })
    .finally(() => {
      popupEditProfile.renderLoading(false);
    })
    .catch((err) => {
      console.log(err);
    });
}
// Создаем экземпляр Попапа Профиля
const popupEditProfile = new PopupWithForm({
  popup: popupProfile,
  submitForm: (info) => handleProfileFormSubmit(info),
});
popupEditProfile.setEventListeners();

// Открываем Попап Профиля с Информацией о пользователе
const userInfo = new UserInfo(profileSelectors);
openPopupProfileBtn.addEventListener('click', () => {
  popupEditProfile.open();

  const currentInfo = userInfo.getUserInfo();
  formNameInput.value = currentInfo.name;
  formJobInput.value = currentInfo.about;
  formProfileValidation.clearValidation();
});

//------------------------------Попап Добавления картинок------------------------------------------------------------
// Обрабатываем форму добавления картинок
function handleImgFormSubmit(data) {
  popupAddImage.renderLoading(true);
  api
    .addCard(data.name, data.link)
    .then((data) => {
      const newCard = getCardElement(data);
      section.prependItem(newCard);
      popupAddImage.close();
    })
    .finally(() => {
      popupAddImage.renderLoading(false);
    })
    .catch((err) => {
      console.log(err);
    });
}

// Создаем экземпляр Попапа Добавления картинок
const popupAddImage = new PopupWithForm({
  popup: popupAddImg,
  submitForm: (data) => handleImgFormSubmit(data),
});
popupAddImage.setEventListeners();

openPopupImgBtn.addEventListener('click', () => {
  popupAddImage.open();
  formImgValidation.clearValidation();
});

//------------------------Попап Открытой картинки--------------------------

const popupWithImage = new PopupWithImage(popupImage);
popupWithImage.setEventListeners();

//---------------------------Попап Обновления аватара------------------------------
// Обрабатывем форму обновления аватара
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

// Создаем Попап Обновления ававтара
const popupEditAvatar = new PopupWithForm({
  popup: popupUpdateAvatar,
  submitForm: () => handleAvatarFormSubmit(),
});
popupEditAvatar.setEventListeners();

// Открываем попап обновления аватара
openPopupUpdateAvatarBtn.addEventListener('click', () => {
  popupEditAvatar.open();
  formAvatarValidation.clearValidation();
});

//----------------------------------Попап Удаления картинки---------------------------

// Создаем Попап подтвеждения удаления картинки
const popupConfirmDelete = new PopupWithSubmit(
  popupDeleteImg,
  (event, card) => {
    deleteConfirm(event, card);
  }
);
popupConfirmDelete.setEventListeners();

// Удаляем картинку
const deleteConfirm = (event, card) => {
  event.preventDefault();
  api
    .removeCard(card.getIdCard()) // Передаем Id картинки, которую нужно удалить
    .then((response) => {
      card.removeCard(); // Удаляем картинку
      popupConfirmDelete.close(); // Закрываем Попап
    })
    .catch((err) => {
      console.log(err);
    });
};

//-------------------Секция для добавления картинок--------------------------------------------------

const section = new Section(
  {
    renderer: (data) => {
      const card = getCardElement(data);
      section.addItem(card);
    },
  },
  '.elements'
);

// function renderCards(elements) {
//   section.rendererItems(elements);
// }

// renderCards(elements);

formProfileValidation.enableValidation();
formImgValidation.enableValidation();
formAvatarValidation.enableValidation();
