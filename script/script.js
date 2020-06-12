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

const image = content.querySelector('.popup-preview__picture');
const caption = content.querySelector('.popup-preview__caption');


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

};
function addSingleCard(name, link) {

  const elementTemplate = document.querySelector('.card').content;
  const cardElement = elementTemplate.cloneNode(true);

  cardElement.querySelector('.element__image').setAttribute('src', link);
  cardElement.querySelector('.element__image').setAttribute('alt', name);

  cardElement.querySelector('.element__place').textContent = name;

  cardElement.querySelector('.element__button').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__button_like-active');
  })

  cardElement.querySelector('.element__trash').addEventListener('click', (evt) => {
    evt.target.closest('.element').remove();
  })

  cardElement.querySelector('.element__image').addEventListener('click', (evt) => {

    image.setAttribute('src', evt.target.src);
    caption.textContent = name;
    togglePopupCommon(popupPreview);

  })

  return cardElement;
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
  elements.prepend(addSingleCard(placeName.value, placeLink.value));
  placeName.value = '';
  placeLink.value = '';
  togglePopupCommon(popupAddPlace);
}

//Add cards into elements





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

initialCards.forEach(function (card) {
  elements.append(addSingleCard(card.name, card.link));
})



