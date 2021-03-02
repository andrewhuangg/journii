import axios from 'axios';
import { QUOTE_LIST_REQUEST, QUOTE_LIST_SUCCESS, QUOTE_LIST_FAIL } from './types';

export const listQuotes = () => async (dispatch) => {
  try {
    dispatch({
      type: QUOTE_LIST_REQUEST,
    });

    const { data } = await axios.get('/api/v1/quotes');

    dispatch({
      type: QUOTE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: QUOTE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message.split(',').join(' ')
          : error.message,
    });
  }
};
