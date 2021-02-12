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
const popup = document.querySelector('.popup'); //попап общий
const popupProfile = document.querySelector('.popup__form-profile'); //попап профиля
const popupAddImg = document.querySelector('.popup__form-img'); //попап добаления картинок
const openPopupProfileBtn = document.querySelector('.profile__edit-btn'); //кнопка открытия попапа профиля
const openPopupImgBtn = document.querySelector('.profile__add-btn'); //кнопка открытия попапа добавления картинок
const closePopupProfileBtn = document.querySelector(
  '.popup__close_profile-popup'
); //кнопка закрытия попапа профиля
const closePopupImgBtn = document.querySelector('.popup__close_add-img-popup'); //кнопка закрытия попапа добавления картинок
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

// Функция открывает попап (добавляет стили модификатора)
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
};

//Функция закрывает попап (удаляет стили)
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
};

//Обрабатывает массив
function render() {
  const elementsList = elements.map(addElement);
  elementsContainer.append(...elementsList);
}

//Добавляет новый елемент/("собирает" элемент)
function addElement(element) {
  const newElement = templateElement.content.cloneNode(true); //Берем разметку template
  newElement.querySelector('.element__text').textContent = element.name; //Берем название картинки из массива и вставляем в новый элемент
  newElement.querySelector('.element__img').src = element.link; //Берем ссылку на картинки из массива и вставляем в новый элемент
  newElement.querySelector('.element__img').alt = element.name; //Новый альт из названия
  newElement //Удалить картинку
    .querySelector('.element__remove-btn') //Выбираем кнопку "удалить"
    .addEventListener('click', function (event) {
      event.target.closest('.element').remove(); //Повесили слушатель с функцией удалять элемент на который был клик
    });
  newElement //Поставить лайк
    .querySelector('.element__like-btn') //Выбираем кнопку "лайк"
    .addEventListener('click', function (event) {
      event.target.classList.toggle('element__like-btn_active'); // Слушатель с функцией менять внешний вид кнопки на которой был клик
    });

  return newElement;
}

//Обрабатывает форму отправки
function submitFormHandler(evt) {
  evt.preventDefault();
  profileNameElement.textContent = formNameInput.value; //Берем значение из инпута и вставляем в профиль (имя пользователя)
  profileJobElement.textContent = formJobInput.value; //Значение инпута в профиль (деятельность)
  closePopup(popup); //Закрываем попап
}

function addNewElement(evt) {
  evt.preventDefault();

  const imgName = formNameImg.value; //Название картинки = знаение инпута
  const imgLink = formLinkImg.value; //Ссылка на картинку из инпута

  elementsContainer.prepend(addElement({ name: imgName, link: imgLink })); //Выполняем функцию добалвения нового элемента с новыми значениями (введенными пользователем)
  formNameImg.value = ''; //Обнуляем поле ввода
  formLinkImg.value = '';
  closePopup(popupAddImg);
}

render();

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
