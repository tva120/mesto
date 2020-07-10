import { Popup } from './Popup.js';

export class PopupWithImage extends Popup{
    constructor(popupSelector, closeButton, picSelector, capSelector) {
        super(popupSelector,closeButton);
        this._previewPicture = this._popupSelector.querySelector(picSelector);
        this._captionPicture = this._popupSelector.querySelector(capSelector);
    }

    open(item){
       
        this._previewPicture.setAttribute('src', item.link);
        this._previewPicture.setAttribute('alt', item.name);
        this._captionPicture.textContent = item.name;
        super.open();
    }
}