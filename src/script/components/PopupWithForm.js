import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup{
    constructor({formSubmit}, popupSelector){
        super (popupSelector);
        this._formSubmit = formSubmit;
    }

    _getInputValues(){
        this._inputList = this._popupSelector.querySelectorAll('.popup-container__infoform');
        this._formValues = {};       
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;        
    }

    setEventListeners(){
        this._popupSelector.addEventListener('submit', (evt) => {
            evt.preventDefault();      
            this._formSubmit(this._getInputValues());      
            this.close();
          });
        super.setEventListeners();       
    }
}