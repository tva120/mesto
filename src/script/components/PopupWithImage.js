import { Popup } from './Popup.js';

export class PopupWithImage extends Popup{
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(item){
        const previewPicture = this._popupSelector.querySelector('.popup-preview__picture');
        previewPicture.setAttribute('src', item.link);
        previewPicture.setAttribute('alt', item.name);
        this._popupSelector.querySelector('.popup-preview__caption').textContent = item.name;
        super.open();
    }
}