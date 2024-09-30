import {cardTemplate} from '../index.js';
import {imageEnlarge} from './modal.js';

export function listItemCardAdd(name, link, onDelete) {
  const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardTitle = cardItem.querySelector('.card__title');
  const cardImage = cardItem.querySelector('.card__image');
  const cardButtonDelete = cardItem.querySelector('.card__delete-button');
  cardTitle.textContent = name;
  cardImage.setAttribute('src', link);
  cardImage.setAttribute('alt', name);
  cardButtonDelete.addEventListener('click', () => {
    onDelete(cardItem);
  });
  return cardItem;
};

// @todo: Функция удаления карточки

export function cardDelete(cardItem) {
  cardItem.remove();
};

// @todo: Вывести карточки на страницу
 
export function cardRender(container, cardData) {
  container.append(cardData);
};

// Добавление и удаление лайка


function likeCardAdd(evt) {
  evt.classList.add('card__like-button_is-active');
};

function likeCardRemove(evt) {
  evt.classList.remove('card__like-button_is-active');
};

// Увеличить картинку



// Проверка события. 1-лайк; 2-по лайку лайкнутому; 3-на картинку;

export function listCardEvent(evt) {
  if (evt.target.classList.contains('card__like-button')) {
    if (evt.target.classList.contains('card__like-button_is-active')) {
      likeCardRemove(evt.target);
    }
    else {
      likeCardAdd(evt.target);
    }
  }
  else if(evt.target.classList.contains('card__image')) {
    imageEnlarge(evt.target);
  }
};