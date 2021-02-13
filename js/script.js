const elements = [
  {
    name: 'Архыз',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

const elementsContainer = document.querySelector('.elements'); //секция с картинками
const templateElement = document.querySelector('.template-element'); //разметка для картинок, которая будет вставляться
const popup = document.querySelector('.popup'); //попап
const popupProfile = document.querySelector('.popup__form-profile'); //попап профиля
const popupAddImg = document.querySelector('.popup__form-img'); //попап добаления картинок
const popupImage = document.querySelector('.popup__opened-img'); //Попап открытой картинки
const openPopupProfileBtn = document.querySelector('.profile__edit-btn'); //кнопка открытия попапа профиля
const openPopupImgBtn = document.querySelector('.profile__add-btn'); //кнопка открытия попапа добавления картинок
const closePopupProfileBtn = document.querySelector(
  '.popup__close_profile-popup'
); //кнопка закрытия попапа профиля
const closePopupImgBtn = document.querySelector('.popup__close_add-img-popup'); //кнопка закрытия попапа добавления картинок
const closePopupImage = document.querySelector(
  '.popup__close_opened-img-popup'
);
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

// Функция открывает попап
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
};

//Функция закрывает попап
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
};

function render() {
  const elementsList = elements.map(addElement);
  elementsContainer.append(...elementsList);
}

function addElement(element) {
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

  const imageElement = document.querySelector('.popup__img');
  const imageTitle = document.querySelector('.popup__img-title');

  //Отрытие картинки
  newElementImg.addEventListener('click', () => {
    openPopup(popupImage);
    imageElement.src = newElementImg.src;
    imageElement.alt = newElementImg.alt;
    imageTitle.textContent = newElementName.textContent;
  });

  closePopupImage.addEventListener('click', () => {
    closePopup(popupImage);
  });

  return newElement;
}

render();

function addNewElement(evt) {
  evt.preventDefault();

  const imgName = formNameImg.value; //Название картинки = знаение инпута
  const imgLink = formLinkImg.value; //Ссылка на картинку из инпута

  elementsContainer.prepend(addElement({ name: imgName, link: imgLink })); //Выполняем функцию добавления нового элемента с новыми значениями (введенными пользователем)
  formNameImg.value = ''; //Обнуляем поле ввода
  formLinkImg.value = '';
  closePopup(popupAddImg);
}

function submitFormHandler(evt) {
  evt.preventDefault();
  profileNameElement.textContent = formNameInput.value; //Берем значение из инпута и вставляем в профиль (имя пользователя)
  profileJobElement.textContent = formJobInput.value; //Значение инпута в профиль (деятельность)
  closePopup(popup); //Закрываем попап
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

formProfileElement.addEventListener('submit', submitFormHandler);
formImgElement.addEventListener('submit', addNewElement);
