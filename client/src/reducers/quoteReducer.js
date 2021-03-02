import { QUOTE_LIST_REQUEST, QUOTE_LIST_SUCCESS, QUOTE_LIST_FAIL } from '../actions/types';

export const quoteListReducer = (state = { quotes: [] }, action) => {
  const { type, payload } = action;

  switch (type) {
    case QUOTE_LIST_REQUEST:
      return {
        loading: true,
        quotes: [],
      };
    case QUOTE_LIST_SUCCESS:
      return {
        loading: false,
        quotes: payload,
      };
    case QUOTE_LIST_FAIL:
      return {
        loading: false,
        quotes: [],
      };
    default:
      return state;
  }
};
