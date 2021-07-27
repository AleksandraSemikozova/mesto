export default class Card {
  constructor(
    data,
    cardSelector,
    { handleCardClick, handleCardDelete, handleCardLike }
  ) {
    this._cardSelector = cardSelector;
    this._name = data.name;
    this._alt = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
    this._countLikes = item.likes;
    this._userID = userId;
    this._ownerID = item.owner._id;
    this._cardID = cardId;
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
    if (this._ownerID !== this._userId) {
      this._removeIcon.style.display = 'none';
    }
    this._likeCounter = this._element.querySelector('.element__like-counter');

    this._renderLikes();

    this._setEventListeners();
    return this._element;
  }

  //Слушатели
  _setEventListeners() {
    this._element
      .querySelector('.element__remove-btn')
      .addEventListener('click', () => {
        this._handleCardDelete();
      });

    this._likeIcon.addEventListener('click', () => {
      this._handleCardLike();
    });

    this._newElementImg.addEventListener('click', () =>
      this._handlePreviewPicture(this._name, this._link)
    );
  }

  // Удаление картинки
  removeCard() {
    this._element.remove();
  }
  // Ставит "Лайк"
  _likedIcon() {
    this._likeIcon.classList.toggle('element__like-btn_active');
  }

  setLikes(list) {
    this._countLikes = list;
  }

  renderLikes() {
    this._likeCounter.textContent = this._countLikes.lenght;
    this.showLikes(this._userID);
  }

  likedCard() {
    return this._countLikes.some((like) => {
      return like._id === this._userId;
    });
  }

  showLikes() {
    if (this.likedCard(this._userID)) {
      this._likeIcon.classList.add('element__like-btn_active');
    } else {
      this._likeIcon.classList.remove('element__like-btn_active');
    }
  }

  getIdCard() {
    return this._cardID;
  }
}
