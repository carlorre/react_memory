import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';
import Cards from '../Cards/Cards';
import './Board.css';

const Board = ({
  imageArray, handleClick, active, disabled, complete,
}) => {
  const className = classNames({
    'list-group-item': true,
    small: imageArray.length === 16,
    medium: imageArray.length === 24,
    large: imageArray.length === 32,
  });

  return (
    <main>
      <div className={`card-container ${className}`}>
        {imageArray.map((element) => (
          <Cards
            key={element.index}
            id={element.index}
            url={element.url}
            disabled={disabled}
            active={active.includes(element.index)}
            complete={complete.includes(element.index)}
            handleClick={handleClick}
          />
        ))}
      </div>
    </main>
  );
};

Board.propTypes = {
  imageArray: propTypes.arrayOf(propTypes.object).isRequired,
  handleClick: propTypes.func.isRequired,
  active: propTypes.arrayOf(propTypes.number).isRequired,
  disabled: propTypes.bool.isRequired,
  complete: propTypes.arrayOf(propTypes.number).isRequired,
};

export default Board;
