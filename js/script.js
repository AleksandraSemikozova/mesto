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

const elementsContainer = document.querySelector('.elements');
const templateElement = document.querySelector('.template-element');
const popup = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup__form-profile');
const popupAddImg = document.querySelector('.popup__form-img');
const popupOpenProfBtn = document.querySelector('.profile__edit-btn');
const popupOpenImgBtn = document.querySelector('.profile__add-btn');
const popupCloseProfBtn = document.querySelector('.popup__close_profile-popup');
const popupCloseImgBtn = document.querySelector('.popup__close_add-img-popup');
const formElement = document.querySelector('.popup__form');
const formNameInput = formElement.querySelector('.popup__item_type_user-name');
const formJobInput = formElement.querySelector('.popup__item_type_user-job');
const profileNameElement = document.querySelector('.profile__title');
const profileJobElement = document.querySelector('.profile__subtitle');

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
};

// function openPopup() {
//   popup.classList.add('popup_opened');
// formNameInput.value = profileNameElement.textContent;
// formJobInput.value = profileJobElement.textContent;
// }

// function closePopup() {
//   popup.classList.remove('popup_opened');
// }

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
};

function render() {
  const elementsList = elements.map(addElement);
  elementsContainer.append(...elementsList);
}

function addElement(element) {
  const newElement = templateElement.content.cloneNode(true);
  newElement.querySelector('.element__text').textContent = element.name;
  newElement.querySelector('.element__img').src = element.link;
  newElement.querySelector('.element__img').alt = element.name;
  newElement
    .querySelector('.element__remove-btn')
    .addEventListener('click', function (event) {
      event.target.closest('.element').remove();
    });
  newElement
    .querySelector('.element__like-btn')
    .addEventListener('click', function (event) {
      event.target.classList.toggle('element__like-btn_active');
    });

  return newElement;
}

function submitFormHandler(evt) {
  evt.preventDefault();
  profileNameElement.textContent = formNameInput.value;
  profileJobElement.textContent = formJobInput.value;
  closePopup(popup);
}

render();

popupOpenProfBtn.addEventListener('click', () => {
  openPopup(popupProfile);
  formNameInput.value = profileNameElement.textContent;
  formJobInput.value = profileJobElement.textContent;
});
popupOpenImgBtn.addEventListener('click', () => {
  openPopup(popupAddImg);
});
popupCloseProfBtn.addEventListener('click', () => {
  closePopup(popupProfile);
});
popupCloseImgBtn.addEventListener('click', () => {
  closePopup(popupAddImg);
});

formElement.addEventListener('submit', submitFormHandler);
