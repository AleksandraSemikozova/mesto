let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.profile__edit-btn');
let popupCloseButton = popup.querySelector('.popup__close-icon');
let formElement = popup.querySelector('.popup__form');
let nameInput = popup.querySelector('.popup__item-name');
let jobInput = popup.querySelector('.popup__item-job');


popupOpenButton.addEventListener("click", function() {
          if (!popup.classList.contains("popup_opened")) {
              popup.classList.add("popup_opened");
          } else {
              popup.classList.remove("popup_opened");
          }
   });

   popupCloseButton.addEventListener("click", function() {
    if (!popup.classList.contains("popup_opened")) {
        popup.classList.add("popup_opened");
    } else {
        popup.classList.remove("popup_opened");
    }
  });

popupOpenButton.addEventListener('click', function(){
});
popupCloseButton.addEventListener('click', function(){
});

function formSubmitHandler (evt) {
  evt.preventDefault();
  let name = document.querySelector('.profile__title');
  let job = document.querySelector('.profile__subtitle');

    nameInput.textContent = (nameInput.value)
    jobInput.textContent = (jobInput.value)

    name.textContent = (nameInput.value);
    job.textContent = (jobInput.value);
}

formElement.addEventListener('submit', formSubmitHandler);


