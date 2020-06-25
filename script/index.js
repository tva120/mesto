//Import classes from another js files

import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

//Get operands 

const content = document.querySelector('.content');
const editButton = content.querySelector('.profile__button-edit');
//close buttons
const closeButton = content.querySelector('.popup-container__button-close_info');
const closePlaceButton = content.querySelector('.popup-container__button-close_place');
const closePreviewButton = content.querySelector('.popup-preview__button-close');
//popup forms
const popupEdit = content.querySelector('.popup_edit_info');
const popupAddPlace = content.querySelector('.popup_add_place');
const popupPreview = content.querySelector('.popup_show_image');

const authorInput = content.querySelector('.popup-container__infoform_author');
const aboutInput = content.querySelector('.popup-container__infoform_about');
const profileAuthor = content.querySelector('.profile__author-name');
const profileAbout = content.querySelector('.profile__about');

const placeName = content.querySelector('.popup-container__infoform_place-name');
const placeLink = content.querySelector('.popup-container__infoform_place-link');


const elements = content.querySelector('.elements'); //this block is used for cards

const addCardButton = content.querySelector('.profile__button-add');


const validationConfig = {
  formSelector: '.popup-container',
  inputSelector: '.popup-container__infoform',
  submitButtonSelector: '.popup-container__button-save',
  inactiveButtonClass: 'popup-container__button-save_inactive',
  inputErrorClass: 'popup-container__infoform_type_error',
  errorClass: 'popup__error_active'
};

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function closeEsc(evt) {

  if (evt.key === 'Escape') {
    document.querySelector('.popup_opened').classList.remove('popup_opened');
    document.removeEventListener('keydown', closeEsc);
  };

}

function editForm() {

  //Fill the fields from the page to the form
  authorInput.value = profileAuthor.textContent;
  aboutInput.value = profileAbout.textContent;

};

//at this place we should reset old mistakes and start our life with place cards from the beginning :)
function resetErrors(popupForm) {
  //these are all inputs from the certain form
  const inputs = Array.from(popupForm.querySelectorAll('.popup-container__infoform'));
  inputs.forEach(inputElement => {
      const errorClass = document.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.remove('popup-container__infoform_type_error');
      errorClass.classList.remove('popup__error_active');
      errorClass.textContent = '';
  });
  //do not forget to disable save button in case of emergency 
  const submitButton = popupForm.querySelector('.popup-container__button-save');
  submitButton.setAttribute('disabled', true);
  submitButton.classList.add('popup-container__button-save_inactive');
}

function togglePopupCommon(popupForm) {

  popupForm.classList.toggle('popup_opened');

  if (popupForm.classList.contains('popup_opened') && popupForm.classList.contains('popup_edit_info')) {
    editForm();
  }

  // Escape listener to close the form
  if (popupForm.classList.contains('popup_opened')) {
    document.addEventListener('keydown', closeEsc);
  }
  else {
    document.removeEventListener('keydown', closeEsc);
  }

  //now we have only two forms where we should reset errors 
  if (!popupForm.classList.contains('popup_show_image'))
    {        
        resetErrors(popupForm);
    }

}
//Submit result
function formSubmitHandler(evt) {

  evt.preventDefault();

  //Put inserted data to the form fields
  profileAuthor.textContent = authorInput.value;
  profileAbout.textContent = aboutInput.value;

  //closeForm();
  togglePopupCommon(popupEdit);
}

function formSubmitPlace(evt) {
  evt.preventDefault();
  const item = {};
  item.name = placeName.value;
  item.link = placeLink.value;
  const card = new Card(item, 'card');
  elements.prepend(card.addSingleCard());
  placeName.value = '';
  placeLink.value = '';
  togglePopupCommon(popupAddPlace);
}







function overlayClose(evt) {
  if (evt.target.classList.contains('popup')) {

    evt.target.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeEsc);

  }
}




//Add some events


editButton.addEventListener('click', function () {
  togglePopupCommon(popupEdit);
});

addCardButton.addEventListener('click', function () {
  togglePopupCommon(popupAddPlace);
});

closeButton.addEventListener('click', function () {
  togglePopupCommon(popupEdit);
});

closePlaceButton.addEventListener('click', function () {
  togglePopupCommon(popupAddPlace);
});
closePreviewButton.addEventListener('click', function () {
  togglePopupCommon(popupPreview);
});

popupAddPlace.addEventListener('submit', formSubmitPlace);

popupEdit.addEventListener('submit', formSubmitHandler);

// click to close the form
popupAddPlace.addEventListener('click', overlayClose);

popupEdit.addEventListener('click', overlayClose);

popupPreview.addEventListener('click', overlayClose);


//Init cards



initialCards.forEach((item) => {
  const card = new Card(item, 'card');
  const cardElement = card.addSingleCard();
  elements.prepend(cardElement);
});

const editFormValidator = new FormValidator(validationConfig, popupEdit); 
editFormValidator.enableValidation();

const addPlaceFormValidator = new FormValidator(validationConfig, popupAddPlace); 
addPlaceFormValidator.enableValidation();

