// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const listCard = document.querySelector('.places__list');
const buttonAddCard = document.querySelector('.profile__add-button');

// переменная чтобы вывести сразу 6 карточек

const minOutputCardItem = 6;

// счётчик карточек 

let cardIndex = 0;

// @todo: Функция создания карточки

function listItemCardAdd(name, link) {
  if (cardIndex < initialCards.length) {
    const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
    listCard.append(cardItem);
    const cardTitle = cardItem.querySelector('.card__title');
    const cardImage = cardItem.querySelector('.card__image');
    cardTitle.textContent = name;
    cardImage.setAttribute('src', link);
    cardIndex++;

    // @todo: Функция удаления карточки

    cardItem.querySelector('.card__delete-button').addEventListener('click', function() {
      cardItem.remove();
    });
  };
};

// цикл чтобы вывести сразу 6 карточек

for (let i = 0; i < minOutputCardItem; i++) {
listItemCardAdd(initialCards[cardIndex].name, initialCards[cardIndex].link);
};

// @todo: Вывести карточки на страницу по нажатию кнопки buttonAddCard

buttonAddCard.addEventListener('click', function() {
  listItemCardAdd(initialCards[cardIndex].name, initialCards[cardIndex].link);
})