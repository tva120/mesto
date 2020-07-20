import { Popup } from "./Popup.js";


export class PopupWithForm extends Popup {
    constructor({ formSubmit }, popupSelector, closeButton, validationObj) {
        super(popupSelector, closeButton);
        this._formSubmit = formSubmit;
        this.validationObj = validationObj;
        this._submitButton = this._popupSelector.querySelector(this.validationObj.validationConfig.submitButtonSelector);
        this._defaultText = this._submitButton.textContent;
        this._errorsList = this._popupSelector.querySelectorAll('.popup__error');
        this._inputList = this._popupSelector.querySelectorAll(this.validationObj.validationConfig.inputSelector);
        
        
    }

    open(){
        super.open();
        this._errorsList.forEach(error => {
            error.textContent = '';
            error.classList.remove(this.validationObj.validationConfig.errorClass);
        });
        this._inputList.forEach(input => {
            input.classList.remove(this.validationObj.validationConfig.inputErrorClass);
        });
        if(this._popupSelector.classList.contains('popup_type_info')){
            this._submitButton.removeAttribute('disabled');
            this._submitButton.classList.remove(this.validationObj.validationConfig.inactiveButtonClass);
        }
        else{
            this._submitButton.setAttribute('disabled', true);
            this._submitButton.classList.add(this.validationObj.validationConfig.inactiveButtonClass);
        }  
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

    setLoadingButton(){
        this._submitButton.textContent = 'Сохранение...';
    }

    setDefaultButton(){
        this._submitButton.textContent = this._defaultText;
    }

    getCardForDelete(item){
        this._cardForDelete = item;
    }

    returnCard(){
        return (this._cardForDelete);
    }

    
}