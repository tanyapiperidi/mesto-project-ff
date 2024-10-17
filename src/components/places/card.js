import {cardTemplate} from '../../scripts/index.js';

function initialCard(name, link, onDelete, toglleLike, openPopupImage) {
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
  cardButtonLike.addEventListener('click', toglleLike);   
  cardImage.addEventListener('click', () => {
    openPopupImage(name, link);
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

// @todo: Вывести карточки на страницу
 
function cardRender(container, cardData, position = 'append') {
  if (position === 'prepend') {
  container.prepend(cardData);
  }
  else {
  container.append(cardData);
  };
};

export {initialCard, cardDelete, toggleCardLike, cardRender}