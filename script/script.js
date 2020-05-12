//Get operands 

const content = document.querySelector('.content');
const editButton = content.querySelector('.profile__button-edit');
const closeButton = content.querySelector('.popup-container__button-close');
const popupEdit = content.querySelector('.popup');

let authorInput = content.querySelector('.popup-container__infoform_author');
let aboutInput = content.querySelector('.popup-container__infoform_about');
let profileAuthor = content.querySelector('.profile__author-name');
let profileAbout = content.querySelector('.profile__about');



function editForm() {
  //Fill the fields from the page to the form
  authorInput.value = profileAuthor.textContent;
  aboutInput.value = profileAbout.textContent;
  //Change the form with proper classList
  togglePopup(popupEdit);
};

function togglePopup(popupElement) {
  popupElement.classList.toggle('popup_opened'); 
};

//Submit result
function formSubmitHandler(evt) {

  evt.preventDefault();

  //Put inserted data to the form fields
  profileAuthor.textContent = authorInput.value;
  profileAbout.textContent = aboutInput.value;

  //closeForm();
  togglePopup(popupEdit);
}




//Add some events


editButton.addEventListener('click', editForm);
closeButton.addEventListener('click', editForm);

popupEdit.addEventListener('submit', formSubmitHandler);

