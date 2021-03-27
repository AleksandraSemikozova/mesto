export class FormValidator {
  constructor(validConfig, form) {
    this._form = form;
    this._inputSelector = validConfig.inputSelector;
    this._submitButtonSelector = validConfig.submitButtonSelector;
    this._inactiveButtonClass = validConfig.inactiveButtonClass;
    this._inputErrorClass = validConfig.inputErrorClass;
    this._errorClass = validConfig.errorClass;
    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
  }

  _showInputError() {
    this._inputElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = this._inputElement.validationMessage;
    this._errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    this._inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.classList.remove(this._errorClass);
    this._errorElement.textContent = '';
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _checkInputValidity(inputElement) {
    this._inputElement = inputElement;
    this._errorElement = this._form.querySelector(
      `.${this._inputElement.id}-error`
    );
    if (!this._inputElement.validity.valid) {
      this._showInputError();
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  _setEventListeners() {
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._toggleButtonState();
    });
    this._setEventListeners();
  }
}

// класс Card
const openImagePopup = document.querySelector('.opened-image');
const imageLink = document.querySelector('.popup__image');
const titleLink = document.querySelector('.popup__phototitle');

const handlePopupOpen = (popupEl) => {
  popupEl.classList.add('popup__opened');
  document.addEventListener('keydown', closeEsc);
}; // Функция открытия попапа

export class Card {
  constructor(item, cardSelector) {
    this._name = item.name;
    this._link = item.link;
    this._cardSelector = cardSelector;
    this._alt = item.name;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }
  generateCard() {
    this._element = this._getTemplate();
    this._imgElement = this._element.querySelector('.elements__photo');
    this._element.querySelector(
      '.elements__paragraph'
    ).textContent = this._name; // Добавляем название
    this._imgElement.src = this._link; // Добавляем ссылку
    this._imgElement.alt = this._name; // Добавляем alt

    this._setEventListeners();
    return this._element;
  }
  _setEventListeners() {
    this._element
      .querySelector('.elements__button-delete')
      .addEventListener('click', this._removeCard);
    this._element
      .querySelector('.elements__button-like')
      .addEventListener('click', this._likeButton);
    this._imgElement.addEventListener('click', this._openImage);
  }

  _removeCard = () => {
    this._element.remove();
  };
  _likeButton = () => {
    this._element
      .querySelector('.elements__button-like')
      .classList.toggle('elements__button-like-active');
  };
  _openImage = () => {
    imageLink.src = this._link;
    imageLink.alt = this._alt;
    titleLink.textContent = this._name;
    handlePopupOpen(openImagePopup);
    // closeEsc();
  };
}

function closeEsc(evt) {
  if (evt.key === 'Escape') {
    openImagePopup.classList.remove('popup__opened');
  }
} // Функция закрытия попапа по нажатию на клавишу ESC

function submitPopupFormPicture(e) {
  e.preventDefault();
  addCard(
    createCard({ name: namePicture.value, link: linkPicture.value }),
    elementsList
  );
  clearInput();
  closePopup(popupAddition);
  popupSubmitButtonPicture.disabled = true;
}

function renderInitialCards(data) {
  data.forEach((item) => {
    addCard(createCard(item), elementsList);
  });
}

renderInitialCards(initialCards);

function createCard(item) {
  const card = new Card(item, ClassElementsTemplate);
  const cardElement = card.generateCard();
  return cardElement;
}

function addCard(cardElement, inserted) {
  inserted.prepend(cardElement);
}
