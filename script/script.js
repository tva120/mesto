//Get operands 

const content = document.querySelector('.content');
const editButton = content.querySelector('.profile__button-edit'); 
const closeButton = content.querySelector('.popup-container__button-close');
const popupEdit = content.querySelector('.popup__edit');

let authorInput = content.querySelector('.popup-container__infoform_author'); 
let aboutInput = content.querySelector('.popup-container__infoform_about'); 
let profileAuthor = content.querySelector('.profile__author-name'); 
let profileAbout = content.querySelector('.profile__about'); 



//Define functions
function openForm() {
    const newClass= 'popup_opened';
    popupEdit.classList.add(newClass);

  }


function editForm () {
    openForm(popupEdit);
  
    authorInput.value = profileAuthor.textContent;
    aboutInput.value = profileAbout.textContent;

  }
 
 function formSubmitHandler (evt) {
    evt.preventDefault(); 

    profileAuthor.textContent = authorInput.value;
    profileAbout.textContent = aboutInput.value; 

    closeForm();
}

function closeForm () {

  const newClass= 'popup_opened';
  popupEdit.classList.toggle(newClass);
  if (popupEdit.classList.contains(newClass)) {
    popupEdit.classList.remove(newClass);  
  }
};

//Add some events
editButton.addEventListener('click', editForm);
closeButton.addEventListener('click', closeForm);
popupEdit.addEventListener('submit', formSubmitHandler);

