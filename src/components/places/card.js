const initialCard = (cardTemplate, cardData, cardFunction, profileId, popupDeleteCardClass) => {
  const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardTitle = cardItem.querySelector('.card__title');
  const cardImage = cardItem.querySelector('.card__image');
  const cardButtonDelete = cardItem.querySelector('.card__delete-button');
  const cardButtonLike = cardItem.querySelector('.card__like-button');
  const cardLikeReactions = cardItem.querySelector('.card__like-reactions');
  // передача кол-ва лайков, Функцию вывода кол-ва лайков,
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardLikeReactions.textContent = cardFunction.cardLikeReactions(cardData.likes);
  
  cardButtonLike.addEventListener('click', (evt) => {
    cardFunction.putAddCardLike(cardData._id)
    .then(likes => {
      cardLikeReactions(likes)
      cardFunction.toggleCardLike(evt);
    })
  });   
  // ---------------
  // нужно сделать проверку пользователь = создатель карточки, если да то появится функция удаления карточки
  if(cardData.owner._id === profileId) {
    cardButtonDelete.addEventListener('click', () => {
      cardFunction.openPopup(popupDeleteCardClass.popupCardDelete);
      popupDeleteCardClass.popupButton.addEventListener('click', () => {
        cardFunction.cardDelete(cardFunction, cardData._id, cardItem, popupDeleteCardClass.popupCardDelete);
      })
    });
  }
  else {
    cardButtonDelete.style.opacity = '0';
    console.log(profileId)
  }
  // cardButtonDelete.addEventListener('click', () => {
  //   cardFunction.cardDelete(cardItem);
  // });
  // ---------------
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
      console.log('успех');
      cardItem.remove();
      cardFunction.closePopup(popupCardDelete)
    }
    else {
      console.log('Что-то пошло не так не так');
    }
  })
};

// Функция подсчета кол-ва лайков

const cardLikeReactions = (likes) => {
  let i = 0;
  likes.forEach(() => {
    i++
  });
  return i;
};

// Добавление и удаление лайка

const toggleCardLike = (evt) => {
  evt.target.classList.toggle('card__like-button_is-active');
};

export {initialCard, cardDelete, cardLikeReactions, toggleCardLike};