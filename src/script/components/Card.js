
export class Card {
    constructor(data, putlike, deletelike, selector, handleCardClick, handleCardDelete, ownerid) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = selector;
        this._likes = data.likes;
        this._id = data._id;
        this._owner = data.owner;
        this._ownerid = ownerid;
        this._putLike = putlike;
        this._deleteLike = deletelike;
        this._handleCardDelete = () => handleCardDelete();
        this._handleCardClick = () => handleCardClick(data);
    }

    _getTemplate() {
        const cardSelector = document.getElementsByClassName(this._cardSelector)[0]
            .content;
        const cardElement = cardSelector.querySelector('.element')
            .cloneNode(true);
        cardElement.id = this._id;
        return cardElement;
    }

    _setEventListeners() {

        this._elementButton.addEventListener('click', () => { this._likeHandler(); });
        this._elementTrash.addEventListener('click', () => { this._handleCardDelete(); });
        this._elementImage.addEventListener('click', () => { this._handleCardClick(); });
    }

    _likeHandler() {

        const elem = this._element.querySelector('.element__button');
        const multiplier = !(elem.classList.contains('element__button_like-active')) ? 1 : -1;
        elem.classList.toggle('element__button_like-active');
        multiplier === 1 ? (this._putLike(this._id)) : (this._deleteLike(this._id));
        this._element.querySelector('.element__likecount').textContent = this._likes.length += multiplier;

    }



    _likeCheck() {
        this._likes.some((item) => {
            if (item._id === 'a2697bbb54506ea8dfa4898d') {
                this._element.querySelector('.element__button').classList.add('element__button_like-active');
            }
        })
    }

    _deleteCheck() {
        if (!(this._owner._id === 'a2697bbb54506ea8dfa4898d')) {
            this._element.querySelector('.element__trash').style.display = 'none';
        }
    }


    addSingleCard() {
        this._element = this._getTemplate();

        this._elementButton = this._element.querySelector(".element__button");
        this._elementImage = this._element.querySelector(".element__image");
        this._elementTrash = this._element.querySelector(".element__trash");
        this._elementLike = this._element.querySelector(".element__likecount");

        this._setEventListeners();
        const imageElement = this._element.querySelector('.element__image');
        imageElement.src = this._link;
        imageElement.alt = this._name;
        this._elementLike.textContent = this._likes.length;
        this._element.querySelector('.element__place').textContent = this._name;

        this._likeCheck();
        this._deleteCheck();

        return this._element;
    }
}
