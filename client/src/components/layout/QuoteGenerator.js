import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listQuotes } from '../../actions/quoteAction';
import useInterval from '../customHooks/useInterval';

const QuoteGenerator = () => {
  const dispatch = useDispatch();
  const quoteList = useSelector((state) => state.common.quotes);
  const { quotes } = quoteList;
  const [delay] = useState(8000);

  useEffect(() => {
    dispatch(listQuotes());
  }, [dispatch]);

  useInterval(() => {
    generateRandomQuote(quotes.length);
  }, [delay]);

  const generateRandomQuote = (idx) => {
    const quoteText = document.querySelector('.quote__text');
    const quoteAuthor = document.querySelector('.quote__author');
    const randomNumber = Math.floor(Math.random() * Math.floor(idx));

    const { quote, author } = quotes[randomNumber];
    quoteText.innerHTML = quote;
    quoteAuthor.innerHTML = '-' + author;
  };

  return (
    <>
      <div className='quote container'>
        <div className='fas fa-quote-right fa-quote'></div>
        <div className='fas fa-quote-left fa-quote'></div>
        <div className='quote__body'>
          <div className='quote__text'>{quotes.length && quotes[0].quote}</div>
          <div className='quote__author'>-{quotes.length && quotes[0].author}</div>
          <div className='quote__bar'></div>
        </div>
      </div>
    </>
  );
};

export default QuoteGenerator;
