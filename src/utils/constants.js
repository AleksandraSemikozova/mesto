const EscKey = 'Escape';
const popupImage = document.querySelector('.popup_content_img');
const elementsContainer = document.querySelector('.elements'); //секция с картинками
const templateElement = document.querySelector('.template-element'); //разметка для картинок, которая будет вставляться
const popupProfile = document.querySelector('.popup_content_profile'); //попап профиля
const openPopupProfileBtn = document.querySelector('.profile__edit-btn'); //кнопка открытия попапа профиля
const closePopupProfileBtn = popupProfile.querySelector('.popup__close-icon'); //кнопка закрытия попапа профиля
const popupAddImg = document.querySelector('.popup_content_addimg'); //попап добаления картинок
const openPopupImgBtn = document.querySelector('.profile__add-btn'); //кнопка открытия попапа добавления картинок
const closePopupImgBtn = popupAddImg.querySelector('.popup__close-icon'); //кнопка закрытия попапа добавления картинок
//Попап просмотра картинки
const closePopupImage = popupImage.querySelector('.popup__close-icon'); //Кнопка закрытия просмотра картинки
const formProfileElement = document.querySelector('.popup__form_profile'); //выбираем форму редактирования профиля
const formNameInput = formProfileElement.querySelector(
  '.popup__item_type_user-name'
); //выбираем поле ввода имени
const formJobInput = formProfileElement.querySelector(
  '.popup__item_type_user-job'
); //выбираем поле ввода работы
const profileSelectors = {
  profileName: '.profile__title', //имя в профиле
  profileJob: '.profile__subtitle', //деятельность в профиле
};
const imageElement = document.querySelector('.popup__img');
const imageTitle = document.querySelector('.popup__img-title');
// const profileNameElement = document.querySelector('.profile__title');
// const profileJobElement = document.querySelector('.profile__subtitle');
const formImgElement = document.querySelector('.popup__form_img'); //Выбираем форму добавления картинок
const formNameImg = formImgElement.querySelector('.popup__item_type_img-name'); //поле ввода названия картинки
const formLinkImg = formImgElement.querySelector('.popup__item_type_img-link'); //поле ввода ссылки на картинку

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
  elementsContainer,
  templateElement,
  popupProfile,
  openPopupProfileBtn,
  closePopupProfileBtn,
  popupAddImg,
  openPopupImgBtn,
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
};
