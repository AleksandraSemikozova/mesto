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
const imageElement = document.querySelector('.popup__img');
const imageTitle = document.querySelector('.popup__img-title');

// Функция открывает попап
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
};

//Функция закрывает попап
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
};

function render() {
  const elementsList = elements.map(createElement);
  elementsContainer.append(...elementsList);
}

function createElement(element) {
  const newElement = templateElement.content.cloneNode(true);
  const newElementName = newElement.querySelector('.element__text');
  const newElementImg = newElement.querySelector('.element__img');
  newElementName.textContent = element.name;
  newElementImg.src = element.link;
  newElementImg.alt = element.name;

  newElement
    .querySelector('.element__remove-btn') //Выбираем кнопку "удалить"
    .addEventListener('click', function (event) {
      event.target.closest('.element').remove(); //Повесили слушатель с функцией удалять элемент на который был клик
    });

  newElement //Поставить лайк
    .querySelector('.element__like-btn') //Выбираем кнопку "лайк"
    .addEventListener('click', function (event) {
      event.target.classList.toggle('element__like-btn_active'); // Слушатель с функцией менять внешний вид кнопки на которой был клик
    });

  //Отрытие картинки
  newElementImg.addEventListener('click', () => {
    openPopup(popupImage);
    imageElement.src = newElementImg.src;
    imageElement.alt = newElementImg.alt;
    imageTitle.textContent = newElementName.textContent;
  });

  return newElement;
}

render();

function addNewElement(evt) {
  evt.preventDefault();

  //Выполняем функцию добавления нового элемента с новыми значениями (введенными пользователем)
  elementsContainer.prepend(
    createElement({
      name: formNameImg.value,
      link: formLinkImg.value,
    })
  );
  formNameImg.value = ''; //Обнуляем поле ввода
  formLinkImg.value = '';
  closePopup(popupAddImg);
}

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

formProfileElement.addEventListener('submit', handleProfileFormSubmit);
formImgElement.addEventListener('submit', addNewElement);