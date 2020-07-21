export class FormValidator {
   
   
    constructor(object, form) {
        this._formElement = form;
        this._inputSelector = object.inputSelector;
        this._submitButtonSelector = object.submitButtonSelector;
        this._inactiveButtonClass = object.inactiveButtonClass;
        this._inputErrorClass = object.inputErrorClass;
        this._errorClass = object.errorClass;
        this._inputs = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this.validationConfig = object;
    }

    _toggleInputError(formElement, inputElement, errorMessage) {
        //span elements. if something went wrong we should light them up
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.toggle(this._inputErrorClass, errorMessage);
        errorElement.textContent = errorMessage;
        errorElement.classList.toggle(this._errorClass, errorMessage);
    }

    _hasWrongInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _isValid(formElement, inputElement) {
        this._toggleInputError(formElement, inputElement, inputElement.validationMessage);
    }

    
    _toggleButton(inputList, buttonElement) {
        buttonElement.classList.toggle(this._inactiveButtonClass, this._hasWrongInput(inputList));
        buttonElement.disabled = this._hasWrongInput(inputList);
    }

    _setEventListeners(formElement) {

        //find the button, in our case, to submit the form;
        const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        
        this._toggleButton(this._inputs, buttonElement);
        
        this._inputs.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(formElement, inputElement);
                this._toggleButton(this._inputs, buttonElement);
            });
        });
    }

    enableValidation() {
        this._setEventListeners(this._element);
    }

    
    //at this place we should reset old mistakes and start our life with place cards from the beginning :)
    resetErrors() {

    

        this._inputs.forEach(inputElement => {
            const errorIds = document.querySelector(`#${inputElement.id}-error`);
            inputElement.classList.remove(this._inputErrorClass);
            errorIds.classList.remove(this._errorClass);
            errorIds.textContent = '';
            inputElement.value = '';
        });
        //do not forget to disable save button in case of emergency 
        const submitButton = this._formElement.querySelector(this._submitButtonSelector);
        submitButton.setAttribute('disabled', true);
        submitButton.classList.add(this._inactiveButtonClass);


    }
}

