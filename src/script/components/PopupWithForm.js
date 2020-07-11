import { Popup } from "./Popup.js";


export class PopupWithForm extends Popup {
    constructor({ formSubmit }, popupSelector, closeButton, validationObj) {
        super(popupSelector, closeButton);
        this._formSubmit = formSubmit;
        this.validationObj = validationObj;
        this._inputList = this._popupSelector.querySelectorAll(this.validationObj.validationConfig.inputSelector);
        
        
    }

    _getInputValues() {

        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    setEventListeners() {
        this._popupSelector.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._formSubmit(this._getInputValues());
            this.close();
            this.validationObj.resetErrors();            
        });
        super.setEventListeners();
        
    }

    
}