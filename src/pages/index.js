
//Import classes from another js files



import '../pages/index.css';
import { Card } from '../script/components/Card.js';
import { FormValidator } from '../script/components/FormValidator.js';
import { Section } from '../script/components/Section.js';
import { PopupWithForm } from '../script/components/PopupWithForm.js';
import { PopupWithImage } from '../script/components/PopupWithImage.js';
import { UserInfo } from '../script/components/UserInfo.js';
import { elements,
  editButton,
  popupEdit,
  popupAddPlace,
  popupPreview,
  authorInput,
  aboutInput,
  profileAuthor,
  profileAbout,
  addCardButton,
  validationConfig,
  initialCards } from "../script/utils/constants.js";


//Validation of input fields
const editFormValidator = new FormValidator(validationConfig, popupEdit); 
editFormValidator.enableValidation();

const addPlaceFormValidator = new FormValidator(validationConfig, popupAddPlace); 
addPlaceFormValidator.enableValidation();


//Create a class of profile data
const profileCard = new UserInfo ({name: profileAuthor, about: profileAbout});


//popup with profile data
const openFormInfo = new PopupWithForm({formSubmit: (formData) => {
  console.log(formData);          
  profileCard.setUserInfo(formData);
            openFormInfo.close();
        }
}, popupEdit,'.close-button', editFormValidator);
//set the listeners
openFormInfo.setEventListeners();

//Popup for image preview
const previewPopup = new PopupWithImage(popupPreview,'.close-button','.popup-preview__picture','.popup-preview__caption');
previewPopup.setEventListeners();

function openImagePopup(card){
  previewPopup.open(card);
}


const photoCard = new PopupWithForm({formSubmit: (formData)=>{
  const card = new Card(formData, 'card', openImagePopup);
  const cardElement = card.addSingleCard();
  cardList.setItem(cardElement);
}}, popupAddPlace,'.close-button', addPlaceFormValidator);
photoCard.setEventListeners();

function editProfileHandler() {
  const infoUser = profileCard.getUserInfo();
  authorInput.value = infoUser.name;
  aboutInput.value = infoUser.about;
  openFormInfo.open();
}

function addPhotoCardHandler() {
  photoCard.open();
  photoCard.resetErrors();
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


