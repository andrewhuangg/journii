import React, { useState } from 'react';

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    }
    // else {

    //   history.push('/dashboard');
    // }

    setKeyword('');
  };

  const handleSearchTransition = () => {
    const search = document.querySelector('.search');
    const input = document.querySelector('.search__input');
    search.classList.toggle('active');
    input.focus();
  };

  return (
    <form className='search hide-for-mobile' onSubmit={submitHandler}>
      <input
        className='search__input'
        type='text'
        placeholder='Search...'
        onChange={(e) => setKeyword(e.target.value)}
      ></input>
      <button type='submit' className='search__btn' onClick={handleSearchTransition}>
        <i className='fas fa-search' />
      </button>
    </form>
  );
};

export default SearchBox;
