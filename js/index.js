import { elements } from './initial-сards.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const elementsContainer = document.querySelector('.elements'); //секция с картинками
const templateElement = document.querySelector('.template-element'); //разметка для картинок, которая будет вставляться
const popupProfile = document.querySelector('.popup_content_profile'); //попап профиля
const openPopupProfileBtn = document.querySelector('.profile__edit-btn'); //кнопка открытия попапа профиля
const closePopupProfileBtn = popupProfile.querySelector('.popup__close-icon'); //кнопка закрытия попапа профиля
const popupAddImg = document.querySelector('.popup_content_addimg'); //попап добаления картинок
const openPopupImgBtn = document.querySelector('.profile__add-btn'); //кнопка открытия попапа добавления картинок
const closePopupImgBtn = popupAddImg.querySelector('.popup__close-icon'); //кнопка закрытия попапа добавления картинок
const popupImage = document.querySelector('.popup_content_img'); //Попап просмотра картинки
const closePopupImage = popupImage.querySelector('.popup__close-icon'); //Кнопка закрытия просмотра картинки
const formProfileElement = document.querySelector('.popup__form_profile'); //выбираем форму редактирования профиля
const formNameInput = formProfileElement.querySelector(
  '.popup__item_type_user-name'
); //выбираем поле ввода имени
const formJobInput = formProfileElement.querySelector(
  '.popup__item_type_user-job'
); //выбираем поле ввода работы
const profileNameElement = document.querySelector('.profile__title'); //имя в профиле
const profileJobElement = document.querySelector('.profile__subtitle'); //деятельность в профиле
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
const formProfileValidation = new FormValidator(
  validConfig,
  formProfileElement
);
const formImgValidation = new FormValidator(validConfig, formImgElement);

const closePopupEsc = function (event) {
  if (
    event.key === 'Escape' &&
    document.querySelector('.popup_opened') !== null
  ) {
    closePopup(document.querySelector('.popup_opened'));
  }
};

// Функция открывает попап
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
};

//Функция закрывает попап
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
};

//добавляет initial-cards на страницу
function render() {
  const elementsList = elements.map(getCardElement);
  elementsContainer.append(...elementsList);
}

function getCardElement(element) {
  const card = new Card(element, templateElement);
  const newElement = card.generateCard();
  return newElement;
}

render();

// Добавляет новую картинку на страницу
function addNewElement(evt) {
  evt.preventDefault();

  //Выполняем функцию добавления нового элемента с новыми значениями (введенными пользователем)
  elementsContainer.prepend(
    generateCard({
      name: formNameImg.value,
      link: formLinkImg.value,
    })
  );
  formImgElement.reset(); //Обнуляем поле ввода
  closePopup(popupAddImg);
}

// обрабатывает отправку формы профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileNameElement.textContent = formNameInput.value; //Берем значение из инпута и вставляем в профиль (имя пользователя)
  profileJobElement.textContent = formJobInput.value; //Значение инпута в профиль (деятельность)
  closePopup(popupProfile); //Закрываем попап
}

openPopupProfileBtn.addEventListener('click', () => {
  openPopup(popupProfile);
  formNameInput.value = profileNameElement.textContent;
  formJobInput.value = profileJobElement.textContent;
});

openPopupImgBtn.addEventListener('click', () => {
  openPopup(popupAddImg);
  const inputImgList = Array.from(popupAddImg.querySelectorAll('.popup__item'));
  const submitImgBtn = popupAddImg.querySelector('.popup__btn');
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
formImgElement.addEventListener('submit', addNewElement);
formProfileValidation.enableValidation();
formImgValidation.enableValidation();
