
//Import classes from another js files



import '../pages/index.css';
import { Card } from '../script/components/Card.js';
import { Api } from '../script/components/Api.js';
import { FormValidator } from '../script/components/FormValidator.js';
import { Section } from '../script/components/Section.js';
import { Popup } from '../script/components/Popup.js';
import { PopupWithForm } from '../script/components/PopupWithForm.js';
import { PopupWithImage } from '../script/components/PopupWithImage.js';
import { UserInfo } from '../script/components/UserInfo.js';
import { elements,
  editButton,
  popupEdit,
  popupAddPlace,
  popupPreview,
  avatarForm,
  deleteForm,
  authorInput,
  aboutInput,
  avatarInput,
  profileAuthor,
  profileAbout,
  profileAvatar,
  addCardButton,
  validationConfig,
  avaButton } from "../script/utils/constants.js";


//Api config
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-13',
  headers: {
      authorization: '624c4e77-b79e-4ce9-9f2d-48e259657516',
      'Content-Type': 'application/json'
  }
});




//Validation of input fields
const editFormValidator = new FormValidator(validationConfig, popupEdit); 
editFormValidator.enableValidation();

const addPlaceFormValidator = new FormValidator(validationConfig, popupAddPlace); 
addPlaceFormValidator.enableValidation();

const avatarValidator = new FormValidator(validationConfig, avatarForm);
avatarValidator.enableValidation();

//Download user info
api.getUserInfo()
    .then((item) => {
      profileAuthor.textContent = item.name;
      profileAbout.textContent = item.about;
      profileAvatar.src = item.avatar;
    })
    .catch((err) => {
        console.log(err);
    });

//Create a class of profile data
const profileCard = new UserInfo ({name: profileAuthor, about: profileAbout});
//popup with profile data
const openFormInfo = new PopupWithForm({
    formSubmit: (formData) => {
        openFormInfo.setLoadingButton();
        api.changeProfileInfo(formData)
            .then(() => {
                profileCard.setUserInfo(formData);
                openFormInfo.setDefaultButton();
                openFormInfo.close();
            })
            .catch((err) => {
                openFormInfo.setDefaultButton();
                console.log(err);
            });
    }
}, popupEdit,'.close-button', editFormValidator);
openFormInfo.setEventListeners();



// Change avatar in profile
const avatarCard = new PopupWithForm({
  formSubmit: (formData) => {
      avatarCard.setLoadingButton();
      api.changeAvatar(formData)
          .then((item) => {
              document.querySelector('.profile__avatar').setAttribute('src', item.avatar);
              avatarCard.setDefaultButton();
              avatarCard.close();
          })
          .catch((err) => {
              avatarCard.setDefaultButton();
              console.log(err);
          });
  }
}, avatarForm,'.close-button', avatarValidator);
avatarCard.setEventListeners();

//Popup for image preview
const previewPopup = new PopupWithImage(popupPreview,'.close-button','.popup-preview__picture','.popup-preview__caption');
previewPopup.setEventListeners();

function openImagePopup(card){
  previewPopup.open(card);
}

//Popup to add card
const photoCard = new PopupWithForm({
  formSubmit: (formData) => {
      photoCard.setLoadingButton();
      api.addNewCard(formData)
          .then((item) => {
              const card = new Card(item,
                  () => api.putLike(item._id)
                      .then(() => {

                      })
                      .catch((err) => {
                          console.log(err);
                      })
                  ,
                  () => api.deleteLike(item._id)
                      .then(() => {

                      })
                      .catch((err) => {
                          console.log(err);
                      }),
                  'card',
                  openImagePopup,
                  () => deleteCardForm.submit(item._id));

              const cardElement = card.addSingleCard();
              cardList.setItem(cardElement);
              photoCard.setDefaultButton();
              photoCard.close();
          })
          .catch((err) => {
              photoCard.setDefaultButton();
              console.log(err);
          });
  }
},popupAddPlace,'.close-button', addPlaceFormValidator);
photoCard.setEventListeners();



//Popup with delete form

const deleteCardForm = new Popup(deleteForm,'.close-button');
deleteCardForm.submit = function (deleteId) {
    deleteCardForm.open();
    deleteForm.addEventListener('submit', function listener (evt){
        evt.preventDefault();
        api.deleteCard(deleteId)
            .then(() => {
                const el = document.getElementById(deleteId);
                el.remove();
                deleteForm.removeEventListener('submit', listener);
                deleteCardForm.close();
            })
            .catch((err) => {
                console.log(err);
            });
    });
};
deleteCardForm.setEventListeners();

//Making a section with a card list


const cardList = new Section({
  renderer: (item) => {
      const card = new Card(item,
          () => api.putLike(item._id)
              .then(() => {

              })
              .catch((err) => {
                  console.log(err);
              })
          ,
          () => api.deleteLike(item._id)
              .then(() => {

              })
              .catch((err) => {
                  console.log(err);
              }),
          'card',
          openImagePopup,
          () => deleteCardForm.submit(item._id));
      const cardElement = card.addSingleCard();
      cardList.setItem(cardElement);
  }
}, elements);

api.getInitialCards()
  .then((items) => {
      cardList.addItem(items);
  })
  .catch((err) => {
      console.log(err);
  });






  
//Add some events

editButton.addEventListener('click', editProfileHandler);
addCardButton.addEventListener('click', addPhotoCardHandler);
avaButton.addEventListener('click', changeAvatarHandler);


function editProfileHandler() {
  const infoUser = profileCard.getUserInfo();
  authorInput.value = infoUser.name;
  aboutInput.value = infoUser.about;
  openFormInfo.open();
}

function addPhotoCardHandler() {
  photoCard.open();
  photoCard.validationObj.resetErrors();
}

function changeAvatarHandler() {
  avatarCard.open();
  avatarInput.value = '';
}








