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

function render() {
  const elementsList = elements.map(getCardElement);
  elementsContainer.append(...elementsList);
}

const getCardElement = (element) => {
  const newElement = templateElement.content.cloneNode(true);
  const newElementDeleteBtn = newElement.querySelector('.element__remove-btn');
  const newElementLikeBtn = newElement.querySelector('.element__like-btn');
  const newElementName = newElement.querySelector('.element__text');
  const newElementImg = newElement.querySelector('.element__img');
  newElementName.textContent = element.name;
  newElementImg.src = element.link;
  newElementImg.alt = element.name;

  newElementDeleteBtn.addEventListener('click', handleDeleteCard);
  newElementLikeBtn.addEventListener('click', handleLikeIcon);
  newElementImg.addEventListener('click', () =>
    handlePreviewPicture(newElementImg, newElementName)
  );

  return newElement;
};

const handleDeleteCard = function (event) {
  event.target.closest('.element').remove(); //Повесили слушатель с функцией удалять элемент на который был клик
};

const handleLikeIcon = (event) => {
  event.target.classList.toggle('element__like-btn_active'); // Слушатель с функцией менять внешний вид кнопки на которой был клик
};

const handlePreviewPicture = (newElementImg, newElementName) => {
  openPopup(popupImage);
  imageElement.src = newElementImg.src;
  imageElement.alt = newElementImg.alt;
  imageTitle.textContent = newElementName.textContent;
};

render();

function addNewElement(evt) {
  evt.preventDefault();

  //Выполняем функцию добавления нового элемента с новыми значениями (введенными пользователем)
  elementsContainer.prepend(
    getCardElement({
      name: formNameImg.value,
      link: formLinkImg.value,
    })
  );
  formImgElement.reset(); //Обнуляем поле ввода
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
  const inputImgList = Array.from(popupAddImg.querySelectorAll('.popup__item'));
  const submitImgBtn = popupAddImg.querySelector('.popup__btn');
  toggleButtonState(inputImgList, submitImgBtn, 'popup__btn_inactive');
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
