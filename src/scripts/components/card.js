
// Добавление и удаление лайка

function likeCardAdd(evt) {
  evt.classList.add('card__like-button_is-active')
}

function likeCardRemove(evt) {
  evt.classList.remove('card__like-button_is-active')
}

// Увеличить картинку

function imageEnlarge(evt) {
  const cardImagePopup = document.querySelector('.popup_type_image');
  const imagePopup = cardImagePopup.querySelector('.popup__image');
  const imageSrc = evt.getAttribute('src')
  cardImagePopup.setAttribute('style', 'display: flex;')
  imagePopup.setAttribute('src', imageSrc)
}

// Проверка события. 1-лайк; 2-по лайку лайкнутому; 3-на картинку;

export function listCardEvent(evt) {
  if (evt.target.classList.contains('card__like-button')) {
    if (evt.target.classList.contains('card__like-button_is-active')) {
      likeCardRemove(evt.target)
    }
    else {
      likeCardAdd(evt.target)
    }
  }
  else if(evt.target.classList.contains('card__image')) {
    imageEnlarge(evt.target)
  }
}