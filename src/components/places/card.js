const initialCard = (cardTemplate, cardData, cardFunction, profileInfo, popupDeleteCardClass) => {
  const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardTitle = cardItem.querySelector('.card__title');
  const cardImage = cardItem.querySelector('.card__image');
  const cardButtonDelete = cardItem.querySelector('.card__delete-button');
  const cardButtonLike = cardItem.querySelector('.card__like-button');
  const cardLikeReactions = cardItem.querySelector('.card__like-reactions');
  // @todo:  Заполнение карточки
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  // @todo:  id профиля
  const profileId = profileInfo.id;
  // Добавление id карточке
  cardItem.setAttribute('id', `${cardData._id}`);
  // @todo:  Отображение кол-ва лайков
  cardLikeReactions.textContent = cardData.likes.length;
  // @todo:  Добавление класса active ранее понравившихся карточек
  cardFunction.cardLikeMyReactions(cardData, profileId, cardButtonLike, cardFunction);
  // @todo:  Слушатель постановки лайка карточке, или удаление лайка
  cardButtonLike.addEventListener('click', () => {
    if(!cardButtonLike.classList.contains('card__like-button_is-active')) {
      cardFunction.putAddCardLike(cardData._id)
      .then(card => {
        cardLikeReactions.textContent = card.likes.length;
        cardFunction.toggleCardLike(cardButtonLike);
      });
    }
    else {
      cardFunction.deleteCardLike(cardData._id)
      .then(card => {
        cardLikeReactions.textContent = card.likes.length;
        cardFunction.toggleCardLike(cardButtonLike);
      });
    };
  });   
  // @todo:  Проверка пользователь = создатель карточки, если да то появится функция удаления карточки
  if(cardData.owner._id === profileId) {
    cardButtonDelete.addEventListener('click', () => {
      cardFunction.openPopup(popupDeleteCardClass.popupCardDelete);
      popupDeleteCardClass.popupButton.addEventListener('click', () => {
        cardFunction.cardDelete(cardFunction, cardData._id, cardItem, popupDeleteCardClass.popupCardDelete);
      });
    });
  }
  else {
    cardButtonDelete.style.opacity = '0';
  }
  // @todo:  Слушатель клика по изображению карточки, открывающий попап
  cardImage.addEventListener('click', () => {
    cardFunction.populatePopupImage(cardTitle.textContent, cardImage.src);
  });
  return cardItem;
};

// @todo: Функция удаления карточки
const cardDelete = (cardFunction, cardId, cardItem, popupCardDelete) => {
  cardFunction.cardDeleteRequestServer(cardId)
  .then(res => {
    if(res === 'ok') {
      cardItem.remove();
      cardFunction.closePopup(popupCardDelete)
    }
    else {
      console.log('Что-то пошло не так не так');
    }
  });
};

// @todo:  Функция добавление лайка ранее понравившимся карточкам
const cardLikeMyReactions = (cardData, profileId, cardButtonLike, cardFunction) => {
  const profileLikeCard = cardData.likes.some(profileReactionCard => profileReactionCard._id === profileId);
  if(profileLikeCard) {
    cardFunction.toggleCardLike(cardButtonLike);
  };
};

// @todo:  Добавление и удаление лайка
const toggleCardLike = (cardButtonLike) => {
  cardButtonLike.classList.toggle('card__like-button_is-active');
};

export {initialCard, cardDelete, cardLikeMyReactions, toggleCardLike};