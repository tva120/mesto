
//Import classes from another js files



import '../pages/index.css';
import { Card } from '../script/components/Card.js';
import { FormValidator } from '../script/components/FormValidator.js';
import { Section } from '../script/components/Section.js';
import { PopupWithForm } from '../script/components/PopupWithForm.js';
import { PopupWithImage } from '../script/components/PopupWithImage.js';
import { UserInfo } from '../script/components/UserInfo.js';
import { content,
  elements,
  editButton,
  popupEdit,
  popupAddPlace,
  popupPreview,
  authorInput,
  aboutInput,
  profileAuthor,
  profileAbout,
  placeName,
  placeLink,
  addCardButton,
  placeErrorField,
  urlErrorField,
  validationConfig,
  initialCards } from "../script/utils/constants.js";

//Create a class of profile data
const profileCard = new UserInfo ({name: profileAuthor, about: profileAbout});

//popup with profile data
const openFormInfo = new PopupWithForm({formSubmit: (formData) => {
            profileCard.setUserInfo(formData);
            openFormInfo.close();
        }
}, popupEdit);
//set the listeners
openFormInfo.setEventListeners();

//Popup for image preview
const previewPopup = new PopupWithImage(popupPreview);
previewPopup.setEventListeners();

function openImagePopup(card){
  previewPopup.open(card);
}


const photoCard = new PopupWithForm({formSubmit: (formData)=>{
  const card = new Card(formData, 'card', openImagePopup);
  const cardElement = card.addSingleCard();
  cardList.setItem(cardElement);
}}, popupAddPlace);
photoCard.setEventListeners();

function editProfileHandler() {
  const infoUser = profileCard.getUserInfo();
  authorInput.value = infoUser.name;
  aboutInput.value = infoUser.about;
  openFormInfo.open();
}

function addPhotoCardHandler() {
  photoCard.open();
  placeName.value = '';
  placeLink.value = '';
  placeErrorField.textContent = placeInput.validationMessage;
  placeErrorField.classList.toggle('popup__error_active');
  urlErrorField.textContent = linkInput.validationMessage;
  urlErrorField.classList.toggle('popup__error_active');
}

//Add some events

editButton.addEventListener('click', editProfileHandler);
addCardButton.addEventListener('click', addPhotoCardHandler);


//Making a section with a card list
const cardList = new Section({
  items: initialCards, renderer: (item) => {
      const card = new Card(item, 'card', openImagePopup);
      const cardElement = card.addSingleCard();
      cardList.setItem(cardElement);
  }
}, elements);
cardList.addItem();

//Validation of input fields
const editFormValidator = new FormValidator(validationConfig, popupEdit); 
editFormValidator.enableValidation();

const addPlaceFormValidator = new FormValidator(validationConfig, popupAddPlace); 
addPlaceFormValidator.enableValidation();

