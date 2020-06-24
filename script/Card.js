//define consts
const imageForm = document.querySelector('.popup_show_image');
const popupImage = document.querySelector('.popup-preview__picture');
const popupTitle = document.querySelector('.popup-preview__caption');

//functions to operate forms
function popupOpenHandler(popup){
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeEsc);
}

function closeEsc (evt) {
    if (evt.key === 'Escape') {
      document.querySelector('.popup_opened').classList.remove('popup_opened');
      document.removeEventListener('keydown', closeEsc);
    }
}


export class Card {
    
    constructor(data, selector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = selector;
    }

    _getTemplate() {
        const cardSelector = document.getElementsByClassName(this._cardSelector)[0]
            .content;
        const cardElement = cardSelector.querySelector('.element')
            .cloneNode(true);
        return cardElement;
    }

    _setEventListeners() {
        this._element.querySelector('.element__button').addEventListener('click', () => { this._likeHandler(); });
        this._element.querySelector('.element__trash').addEventListener('click', () => { this._removeHandler(); });
        this._element.querySelector('.element__image').addEventListener('click', () => { this._openHandler(); });
    }

    _likeHandler() {
        this._element.querySelector('.element__button').classList.toggle('element__button_like-active');
    }

    _removeHandler() {
        this._element.remove();
    }

    _openHandler() {
        popupOpenHandler(imageForm);
        popupImage.src = this._link;
        popupTitle.textContent = this._name;
    }    

    addSingleCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__place').textContent = this._name;
        return this._element;
    }
}