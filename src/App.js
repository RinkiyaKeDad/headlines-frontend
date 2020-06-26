import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [loadedHeadlines, setLoadedHeadlines] = useState([]);
  const [displayedHeadlines, setDisplayedHeadlines] = useState();
  const [curPage, setCurPage] = useState(1);
  const [array, setArray] = useState([]);

  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const response = await axios.get(
          `https://sleepy-garden-81515.herokuapp.com/headlines/`
        );
        //console.log(response.data.headlines);
        setLoadedHeadlines(response.data.headlines);
      } catch (err) {
        console.log(err);
      }
    };
    fetchHeadlines();
  }, []);

  let a = [];

  useEffect(() => {
    setDisplayedHeadlines(
      loadedHeadlines.slice((curPage - 1) * 10, curPage * 10)
    );
    for (let i = 1; i < loadedHeadlines.length / 10; i++) a.push(i);
    setArray(a);
    //console.log(a);
  }, [loadedHeadlines, curPage]);

  return (
    <div className='container main-wrapper'>
      <h1 style={{ margin: '1rem 1rem .1rem 1rem' }}>Headlines</h1>
      <p>
        Web Scrapping using Node.js and Express. Pagation using Hooks in React.
      </p>
      <ul className='list-group' style={{ margin: '.4rem 1rem 1rem 1rem' }}>
        {displayedHeadlines &&
          displayedHeadlines.map((headline, index) => (
            <li key={index} className='list-group-item'>
              {headline}
            </li>
          ))}
      </ul>
      <ul
        className='pagination flex-list'
        style={{ margin: '.4rem 1rem 1rem 1rem' }}
      >
        {array.map(num => {
          if (num === curPage)
            return (
              <li
                key={num}
                className='page-item active'
                style={{ margin: '.1rem' }}
              >
                <a
                  className='page-link'
                  href='#'
                  onClick={() => setCurPage(num)}
                >
                  {num}
                </a>
              </li>
            );
          return (
            <li key={num} className='page-item' style={{ margin: '.1rem' }}>
              <a className='page-link' href='#' onClick={() => setCurPage(num)}>
                {num}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default App;
