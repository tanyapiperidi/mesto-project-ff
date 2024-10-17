import {cardTemplate} from '../../index.js';

function initialCard(name, link, onDelete, like, openPopup) {
  const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardTitle = cardItem.querySelector('.card__title');
  const cardImage = cardItem.querySelector('.card__image');
  const cardButtonDelete = cardItem.querySelector('.card__delete-button');
  const cardButtonLike = cardItem.querySelector('.card__like-button');
  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;
  cardButtonDelete.addEventListener('click', () => {
    onDelete(cardItem);
  });
  cardButtonLike.addEventListener('click', like);   
  cardImage.addEventListener('click', () => {
    openPopup(name, link);
  });
  return cardItem;
};

// @todo: Вывести карточки на страницу
 
function cardRender(container, cardData, position = 'append') {
  if (position === 'prepend') {
  container.prepend(cardData);
  }
  else {
  container.append(cardData);
  };
};

// @todo: Функция удаления карточки

function cardDelete(cardItem) {
  cardItem.remove();
};

// Добавление и удаление лайка

function toggleCardLike(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
};

export {initialCard, cardRender, cardDelete, toggleCardLike}