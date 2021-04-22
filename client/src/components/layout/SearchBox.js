import React, { useState, useRef, useEffect } from 'react';

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('');
  const [active, setActive] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/dashboard');
    }

    setKeyword('');
  };

  const searchRef = useRef(null);

  const handleSearchRef = (e) => {
    searchRef.current && !searchRef.current.contains(e.target) && setActive(!active);
  };

  const handleSearchTransition = () => {
    setActive(!active);
    const input = document.querySelector('.search__input');
    if (!active) input.value = '';
  };

  useEffect(() => {
    active
      ? document.addEventListener('click', handleSearchRef)
      : document.removeEventListener('click', handleSearchRef);

    return () => document.removeEventListener('click', handleSearchRef);
  }, [active]);

  return (
    <>
      <form
        className={`search ${active ? 'active' : ''} hide-for-mobile`}
        ref={searchRef}
        onSubmit={submitHandler}
      >
        <input
          className='search__input'
          type='text'
          placeholder='search posts...'
          onChange={(e) => setKeyword(e.target.value)}
        ></input>
        <button type='submit' className='search__btn' onClick={handleSearchTransition}>
          <i className='fas fa-search' />
        </button>
      </form>
    </>
  );
};

export default SearchBox;
