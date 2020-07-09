

export const content = document.querySelector('.content');
export const editButton = content.querySelector('.profile__button-edit');
//close buttons
export const closeButton = content.querySelector('.popup-container__button-close_info');
export const closePlaceButton = content.querySelector('.popup-container__button-close_place');
export const closePreviewButton = content.querySelector('.popup-preview__button-close');
//popup forms
export const popupEdit = content.querySelector('.popup_edit_info');
export const popupAddPlace = content.querySelector('.popup_add_place');
export const popupPreview = content.querySelector('.popup_show_image');

export const authorInput = content.querySelector('.popup-container__infoform_author');
export const aboutInput = content.querySelector('.popup-container__infoform_about');
export const profileAuthor = content.querySelector('.profile__author-name');
export const profileAbout = content.querySelector('.profile__about');

export const placeName = content.querySelector('.popup-container__infoform_place-name');
export const placeLink = content.querySelector('.popup-container__infoform_place-link');

export const elements = content.querySelector('.elements'); //this block is used for cards
export const addCardButton = content.querySelector('.profile__button-add');

//define consts
export const imageForm = document.querySelector('.popup_show_image');
export const popupImage = document.querySelector('.popup-preview__picture');
export const popupTitle = document.querySelector('.popup-preview__caption');

export const placeErrorField = popupAddPlace.querySelector('#place-input-error');
export const urlErrorField = popupAddPlace.querySelector('#url-input-error');


export const validationConfig = {
  formSelector: '.popup-container',
  inputSelector: '.popup-container__infoform',
  submitButtonSelector: '.popup-container__button-save',
  inactiveButtonClass: 'popup-container__button-save_inactive',
  inputErrorClass: 'popup-container__infoform_type_error',
  errorClass: 'popup__error_active'
};

export const initialCards = [
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