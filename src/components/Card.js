export default class Card {
  constructor(data, cardSelector, { handleCardClick }) {
    this._cardSelector = cardSelector;
    this._name = data.name;
    this._alt = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
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
      .addEventListener('click', this._handleDeleteCard.bind(this));

    this._element
      .querySelector('.element__like-btn')
      .addEventListener('click', this._handleLikeIcon);

    this._newElementImg.addEventListener('click', () =>
      this._handlePreviewPicture()
    );
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  _handleLikeIcon() {
    this.classList.toggle('element__like-btn_active');
  }

  _handlePreviewPicture() {
    this._handleCardClick(this._name, this._link);
  }

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
