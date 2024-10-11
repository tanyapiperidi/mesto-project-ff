import {cardTemplate} from '../index.js';

export function listItemCardAdd(name, link, onDelete, like, popup) {
  const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardTitle = cardItem.querySelector('.card__title');
  const cardImage = cardItem.querySelector('.card__image');
  const cardButtonDelete = cardItem.querySelector('.card__delete-button');
  const cardButtonLike = cardItem.querySelector('.card__like-button');
  cardTitle.textContent = name;
  cardImage.setAttribute('src', link);
  cardImage.setAttribute('alt', name);
  cardButtonDelete.addEventListener('click', () => {
    onDelete(cardItem);
  });
  cardButtonLike.addEventListener('click', like)     
  cardImage.addEventListener('click', () => {
    popup(name, link)
  })
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


// function likeCardAdd(evt) {
// };

// function likeCardRemove(evt) {
//   
// };

export function likeCard(evt) {
  if (evt.target.classList.contains('card__like-button_is-active')) {
    evt.target.classList.remove('card__like-button_is-active');
  }
  else {
    evt.target.classList.add('card__like-button_is-active');
  }
}
// Увеличить картинку



// Проверка события. 1-лайк; 2-по лайку лайкнутому; 3-на картинку;

// export function listCardEvent(evt) {
//   
//   }
//   else if(evt.target.classList.contains('card__image')) {
//     imageEnlarge(evt.target);
//   }
// };