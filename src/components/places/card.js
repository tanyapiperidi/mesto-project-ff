function initialCard(cardTemplate, cardData, cardFunction) {
  const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardTitle = cardItem.querySelector('.card__title');
  const cardImage = cardItem.querySelector('.card__image');
  const cardButtonDelete = cardItem.querySelector('.card__delete-button');
  const cardButtonLike = cardItem.querySelector('.card__like-button');
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardButtonDelete.addEventListener('click', () => {
    cardFunction.cardDelete(cardItem);
  });
  cardButtonLike.addEventListener('click', cardFunction.toggleCardLike);   
  cardImage.addEventListener('click', () => {
    cardFunction.populatePopupImage(cardTitle.textContent, cardImage.src);
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