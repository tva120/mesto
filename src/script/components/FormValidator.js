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

    
/*При добавлении пользовательской карточки на страницу и повторном открытии формы кнопка "Создать" активна и появляется возможность добавления пустой карточки, такого быть не должно
Re: Сброс валидации теперь сделан в классе PopupWithForm функцией resetErrors()
*/
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

    resetFields() {
        
        this._inputs.forEach((inputElement) => {        
            inputElement.value = '';
        });

    }
}
