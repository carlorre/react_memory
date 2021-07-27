import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Board from './components/Board/Board';
import Form from './components/Form/Form';

const App = () => {
  const [imageArray, setImageArray] = useState([]);
  const [userInput, setUserInput] = useState('Cat');
  const [active, setActive] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [complete, setComplete] = useState([]);
  const [size, setSize] = useState(8);
  const [currentTheme, setCurrentTheme] = useState(userInput);

  const shuffleArray = (arr) => {
    const newArr = [];
    while (arr.length) {
      const randomIndex = Math.floor(Math.random() * arr.length);
      const element = arr.splice(randomIndex, 1);
      newArr.push(element[0]);
    }
    setImageArray(newArr);
  };

  const createImageArray = (data) => {
    let counter = 0;
    const newArray = [];
    data.forEach((element) => {
      newArray.push({ index: counter += 1, url: element.urls.small });
    });
    data.forEach((element) => {
      newArray.push({ index: counter += 1, url: element.urls.small });
    });
    shuffleArray(newArray);
  };

  const getDataFromAPI = () => {
    const page = Math.floor(Math.random() * 10);
    axios.get('https://api.unsplash.com/search/photos/', {
      params: { query: userInput, page, size },
      headers: { Authorization: 'Client-ID BH6Y3NRJ0W31zYjZdwzr1lc3rdFbuIerxjpDR1IGW0s' },
    })
      .then((res) => createImageArray(res.data.results));
  };

  const isMatch = (index) => {
    const clicked = imageArray.find((card) => card.index === index);
    const flipped = imageArray.find((card) => active[0] === card.index);
    return flipped.url === clicked.url;
  };

  const resetCards = () => {
    setActive([]);
    setDisabled(false);
  };

  const newGame = () => {
    setActive([]);
    setComplete([]);
    setDisabled(false);
    getDataFromAPI();
  };

  const duplicateClick = (id) => active.includes(id) || complete.includes(id);

  const handleClick = (index) => {
    if (duplicateClick(index)) return;
    setDisabled(true);
    if (active.length === 0) {
      setActive([index]);
      setDisabled(false);
    } else {
      setActive([active[0], index]);
      if (isMatch(index)) {
        setComplete([...complete, active[0], index]);
        resetCards();
        if ((complete.length + 2) === imageArray.length) {
          setTimeout(() => {
            newGame();
          }, 1200);
        }
      } else setTimeout(resetCards, 1200);
    }
  };

  const getCurrentTheme = () => {
    setCurrentTheme(userInput.charAt(0).toUpperCase() + userInput.slice(1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getCurrentTheme();
    newGame();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getDataFromAPI(), []);

  return (
    <div>
      <header className="header">
        <h1 className="title">
          {currentTheme}
          <span> Themed Memory Game</span>
        </h1>
        <Form
          handleSubmit={handleSubmit}
          setUserInput={setUserInput}
          setSize={setSize}
          newGame={newGame}
          size={size}
        />
      </header>
      <Board
        imageArray={imageArray}
        active={active}
        handleClick={handleClick}
        disabled={disabled}
        complete={complete}
      />
    </div>
  );
};

export default App;
