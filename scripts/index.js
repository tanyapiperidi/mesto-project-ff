// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const listCard = document.querySelector('.places__list');
const buttonAddCard = document.querySelector('.profile__add-button');

// счётчик карточек 

let cardIndex = 0;

// @todo: Функция создания карточки

function listItemCardAdd() {
  
    const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardTitle = cardItem.querySelector('.card__title');
    const cardImage = cardItem.querySelector('.card__image');
    if (cardIndex < initialCards.length) {
    cardTitle.textContent = initialCards[cardIndex].name;
    cardImage.setAttribute('src', initialCards[cardIndex].link);
    cardIndex++;
  };
  cardItem.querySelector('.card__delete-button').addEventListener('click', function() {
    cardDelete(cardItem);
  });
  return cardItem;
};

// @todo: Функция удаления карточки

function cardDelete(cardItem) {
  cardItem.remove();
}

// @todo: Вывести карточки на страницу

function cardRender() {
  listCard.append(listItemCardAdd());
}

initialCards.forEach(function() {
  cardRender();
})