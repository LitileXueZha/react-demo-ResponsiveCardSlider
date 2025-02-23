import {fakeRequest} from 's/utils/fakeRequest.js';
import {randomCards} from 's/utils/randomize.js';

const initialState = [];
const GET_CARDS = 'GET_CARDS';

export function getCards() {
  return (dispatch) => fakeRequest('/cards').then((res) => dispatch({
    type: GET_CARDS,
    payload: randomCards(5),
  }));
}

export default function card(state = initialState, action) {
  switch (action.type) {
    case GET_CARDS:
      return action.payload;
    default:
      return state;
  }
}
