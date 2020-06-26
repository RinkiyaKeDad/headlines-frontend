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
        console.log(response.data.headlines);
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
    <div className='container'>
      <h1>Headlines</h1>
      <ul class='list-group'>
        {displayedHeadlines &&
          displayedHeadlines.map(headline => (
            <li class='list-group-item'>{headline}</li>
          ))}
      </ul>
      <ul class='pagination'>
        {array.map(num => (
          <li class='page-item'>
            <a class='page-link' href='#' onClick={() => setCurPage(num)}>
              {num}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default App;
