
export class Card {
    constructor(data, selector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = selector;
        this._handleCardClick = () => handleCardClick(data);
    }

    _getTemplate() {
        const cardSelector = document.getElementsByClassName(this._cardSelector)[0]
            .content;
        const cardElement = cardSelector.querySelector('.element')
            .cloneNode(true);
        return cardElement;
    }

    _setEventListeners() {

        this._elementButton.addEventListener('click', () => { this._likeHandler(); });
        this._elementTrash.addEventListener('click', () => { this._removeHandler(); });
        this._elementImage.addEventListener('click', () => { this._handleCardClick(); });
    }

    _likeHandler() {
        this._element.querySelector('.element__button').classList.toggle('element__button_like-active');
    }

    _removeHandler() {
        this._element.remove();
        this._element = null;
    }
    
    addSingleCard() {
        this._element = this._getTemplate();

        this._elementButton = this._element.querySelector(".element__button"); 
        this._elementImage = this._element.querySelector(".element__image"); 
        this._elementTrash = this._element.querySelector(".element__trash"); 

        this._setEventListeners();
        const imageElement = this._element.querySelector('.element__image');
        imageElement.src = this._link;
        imageElement.alt = this._name;
        this._element.querySelector('.element__place').textContent = this._name;
        return this._element;
    }
}
