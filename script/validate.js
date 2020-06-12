//functions to change the class list of elements 
const toggleInputError = (formSelector, inputElement, errorMessage, formObject) => {
    //span elements. if something went wrong we should light them up
    const errorElement = formSelector.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.toggle(formObject.inputErrorClass, errorMessage);
    errorElement.textContent = errorMessage;
    errorElement.classList.toggle(formObject.errorClass, errorMessage);
};


//if something went wrong with inputs
function hasWrongInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

function toggleButton(inputList, buttonElement, formObject) {

    const error = hasWrongInput(inputList);

    buttonElement.classList.toggle(formObject.inactiveButtonClass, error);
    buttonElement.disabled = error;

};


const isValid = (formSelector, inputElement, formObject) => {
    toggleInputError(formSelector, inputElement, inputElement.validationMessage, formObject);
};

const setEventListeners = (formSelector, formObject) => {
    //make an array from elements on form ('.popup-container__item')
    const inputs = Array.from(formSelector.querySelectorAll(formObject.inputSelector));

    //find the button, in our case, to submit the form
    const buttonElement = formSelector.querySelector(formObject.submitButtonSelector);

    toggleButton(inputs, buttonElement, formObject);


    inputs.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            //first: check
            isValid(formSelector, inputElement, formObject);
            //second: change the class luist
            toggleButton(inputs, buttonElement, formObject);
        });
    });
};




const enableValidation = (formObject) => {

    //make an array from elements on form
    const formSelectors = Array.from(document.querySelectorAll(formObject.formSelector));

    //pass through the array to add some listeners on submit
    formSelectors.forEach((formSelector) => {

        formSelector.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        setEventListeners(formSelector, formObject);
    });
};


//the function recieves an object to enable validation on forms
enableValidation({

    formSelector: '.popup-container',
    inputSelector: '.popup-container__infoform',
    submitButtonSelector: '.popup-container__button-save',
    inactiveButtonClass: 'popup-container__button-save_inactive',
    inputErrorClass: 'popup-container__infoform_type_error',
    errorClass: 'popup__error_active'


});