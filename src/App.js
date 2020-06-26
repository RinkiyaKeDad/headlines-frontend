import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [loadedHeadlines, setLoadedHeadlines] = useState([]);
  const [displayedHeadlines, setDisplayedHeadlines] = useState();
  const [curPage, setCurPage] = useState(2);

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

  useEffect(() => {
    setDisplayedHeadlines(
      loadedHeadlines.slice((curPage - 1) * 10, curPage * 10)
    );
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
      <ul className='pagination'>
        <li>
          <a href='#'>1</a>
        </li>
        <li>
          <a href='#' className='btn '>
            2
          </a>
        </li>
        <li>
          <a href='#'>3</a>
        </li>
        <li>
          <a href='#'>4</a>
        </li>
        <li>
          <a href='#'>5</a>
        </li>
      </ul>
    </div>
  );
};
export default App;
