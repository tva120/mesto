import { Popup } from "./Popup.js";


export class PopupWithForm extends Popup {
    constructor({ formSubmit }, popupSelector, closeButton, validationObj) {
        super(popupSelector, closeButton);
        this._formSubmit = formSubmit;
        this._validationObj = validationObj;
        this._inputList = this._popupSelector.querySelectorAll(this._validationObj.validationConfig.inputSelector);
        
        
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
            this.resetErrors();            
        });
        super.setEventListeners();
        
    }

    //at this place we should reset old mistakes and start our life with place cards from the beginning :)
    resetErrors() {

        this._inputList.forEach(inputElement => {
            const errorIds = document.querySelector(`#${inputElement.id}-error`);
            inputElement.classList.remove(this._validationObj.validationConfig.inputErrorClass);
            errorIds.classList.remove(this._validationObj.validationConfig.errorClass);
            errorIds.textContent = '';
        });
        //do not forget to disable save button in case of emergency 
        const submitButton = this._popupSelector.querySelector(this._validationObj.validationConfig.submitButtonSelector);
        submitButton.setAttribute('disabled', true);
        submitButton.classList.add(this._validationObj.validationConfig.inactiveButtonClass);

        this._validationObj.resetFields();

    }
}