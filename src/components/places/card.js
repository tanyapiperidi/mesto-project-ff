function initialCard(cardData) {
  const cardItem = cardData.cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardTitle = cardItem.querySelector('.card__title');
  const cardImage = cardItem.querySelector('.card__image');
  const cardButtonDelete = cardItem.querySelector('.card__delete-button');
  const cardButtonLike = cardItem.querySelector('.card__like-button');
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardButtonDelete.addEventListener('click', () => {
    cardData.cardDelete(cardItem);
  });
  cardButtonLike.addEventListener('click', cardData.toggleCardLike);   
  cardImage.addEventListener('click', () => {
    cardData.openPopup(cardData.popupImage);
    cardData.populatePopupImage(cardTitle.textContent, cardImage.src);
  });
  return cardItem;
};

// @todo: Функция удаления карточки

function cardDelete(cardItem) {
  cardItem.remove();
};

// Добавление и удаление лайка

function toggleCardLike(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
};

export {initialCard, cardDelete, toggleCardLike};