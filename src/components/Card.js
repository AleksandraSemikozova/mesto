export default class Card {
  constructor(
    data,
    cardSelector,
    { handleCardClick, handleDeleteCard, handleLikeIcon },
    userId,
    cardId
  ) {
    this._cardSelector = cardSelector;
    this._name = data.name;
    this._alt = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeIcon = handleLikeIcon;
    this._countLikes = data.likes;
    this._ownerID = data.owner._id;
    this._cardID = cardId;
    this._userID = userId;
  }

  // Клонирует разметку картинки
  _getTemplate() {
    const newElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.element')
      .cloneNode(true);

    return newElement;
  }

  // Создает новую картинку
  generateCard() {
    this._element = this._getTemplate();
    this._newElementImg = this._element.querySelector('.element__img');
    this._element.querySelector('.element__text').textContent = this._name;
    this._newElementImg.alt = this._name;
    this._newElementImg.src = this._link;
    this._likeIcon = this._element.querySelector('.element__like-btn');
    this._removeIcon = this._element.querySelector('.element__remove-btn');
    this._numberLikes = this._element.querySelector('.element__like-counter');
    if (this._ownerID !== this._userID) {
      this._removeIcon.style.display = 'none';
    }

    this.renderLikes();

    this._setEventListeners();
    return this._element;
  }

  //Слушатели
  _setEventListeners() {
    this._element
      .querySelector('.element__remove-btn')
      .addEventListener('click', () => {
        this._handleDeleteCard();
      });

    this._likeIcon.addEventListener('click', () => {
      this._handleLikeIcon();
    });

    this._newElementImg.addEventListener('click', () =>
      this._handleCardClick(this._name, this._link)
    );
  }

  // Удаление картинки
  removeCard() {
    this._element.remove();
  }

  // Лайк
  _likeIconButton() {
    this._likeIcon.classList.toggle('element__like-btn_active');
  }

  // Счетчик лайков
  renderLikes() {
    this._numberLikes.textContent = this._countLikes.length;
    this.showLikes(this._userID);
  }

  // Получаем Id картинки
  getIdCard() {
    return this._cardID;
  }

  likedCard() {
    return this._countLikes.some((like) => {
      return like._id === this._userID;
    });
  }

  showLikes() {
    if (this.likedCard(this._userID)) {
      this._likeIcon.classList.add('element__like-btn_active');
    } else {
      this._likeIcon.classList.remove('element__like-btn_active');
    }
  }

  setLikes(list) {
    this._countLikes = list;
  }
}
