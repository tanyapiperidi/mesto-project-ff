const config = {
  baseUrl: 'https://nomoreparties.co/v1/pwff-cohort-1',
  headers: {
    authorization: 'c781ff1a-30f1-4e19-b0bb-300048dada70',
    'Content-Type': 'application/json'
  },
};
  
const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(res => {
    if(res.ok) {
      return res.json();
    }
  });
};

const getUserProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(res => {
    if(res.ok) {
      return res.json();
    };
  });
};

const postAddCard = (cardData) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(cardData)
  })
  .then(res => {
    if(res.ok) {
      return res.json();
    };
  })
  // .catch(error)
};

const patchUserProfile = (userData) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(userData)
  })
  .then(res => {
    if(res.ok) {
      return res.json();
    };
  });
};

const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(res => {
    if(res.ok) {
      return 'ok';
    };
  });
};

const putAddCardLike = (cardId) =>{
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
  .then(res => {
    if(res.ok) {
      return res.json();
    };
  });
};

const deleteCardLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(res => {
    if(res.ok) {
      return res.json();
    };
  });
};


export {getInitialCards, getUserProfile, postAddCard, patchUserProfile, deleteCard, putAddCardLike, deleteCardLike};