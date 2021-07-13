import { openPopup, popupImage } from '../utils/constants.js';

const imageElement = document.querySelector('.popup__img');
const imageTitle = document.querySelector('.popup__img-title');

export default class Card {
  constructor(data, cardSelector) {
    this._cardSelector = cardSelector;
    this._name = data.name;
    this._alt = data.name;
    this._link = data.link;
  }

  // Клонирует разметку картинки
  _getTemplate() {
    const newElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.element')
      .cloneNode(true);

    return newElement;
  }

  //Слушатели
  _setEventListeners() {
    this._element
      .querySelector('.element__remove-btn')
      .addEventListener('click', this._handleDeleteCard);

    this._element
      .querySelector('.element__like-btn')
      .addEventListener('click', this._handleLikeIcon);

    this._newElementImg.addEventListener('click', this._handlePreviewPicture);
  }

  // Удаление картинки
  _handleDeleteCard = () => {
    this._element.remove(); //Повесили слушатель с функцией удалять элемент на который был клик
  };

  // Ставит "Лайк"
  _handleLikeIcon = () => {
    this._element
      .querySelector('.element__like-btn')
      .classList.toggle('element__like-btn_active');
    // Слушатель с функцией менять внешний вид кнопки на которой был клик
  };

  // Открыть картинку
  _handlePreviewPicture = () => {
    openPopup(popupImage);
    imageElement.src = this._link;
    imageElement.alt = this._alt;
    imageTitle.textContent = this._name;
  };

  // Создает новую картинку
  generateCard() {
    this._element = this._getTemplate();
    this._newElementImg = this._element.querySelector('.element__img');
    this._element.querySelector('.element__text').textContent = this._name;
    this._newElementImg.alt = this._name;
    this._newElementImg.src = this._link;

    this._setEventListeners();
    return this._element;
  }
}
