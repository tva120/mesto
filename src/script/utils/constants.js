

//export const content = document.querySelector('.content');
export const editButton = document.querySelector('.profile__button-edit');
//close buttons
export const closeButton = document.querySelector('.popup-container__button-close_info');
export const closePlaceButton = document.querySelector('.popup-container__button-close_place');
export const closePreviewButton = document.querySelector('.popup-preview__button-close');
//popup forms
export const popupEdit = document.querySelector('.popup_edit_info');
export const popupAddPlace = document.querySelector('.popup_add_place');
export const popupPreview = document.querySelector('.popup_show_image');
export const avatarForm = document.querySelector('.popup_type_avatar');
export const deleteForm = document.querySelector('.popup_type_delete');

export const authorInput = document.querySelector('.popup-container__infoform_author');
export const aboutInput = document.querySelector('.popup-container__infoform_about');
export const avatarInput = document.querySelector('.popup-container__infoform_avatar');
export const profileAuthor = document.querySelector('.profile__author-name');
export const profileAbout = document.querySelector('.profile__about');
export const profileAvatar = document.querySelector('.profile__avatar');

export const placeName = document.querySelector('.popup-container__infoform_place-name');
export const placeLink = document.querySelector('.popup-container__infoform_place-link');


export const elements = document.querySelector('.elements'); //this block is used for cards
export const addCardButton = document.querySelector('.profile__button-add');
export const avaButton = document.querySelector('.profile__edit');

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