import React from 'react';
import propTypes from 'prop-types';
import './Cards.css';

const Cards = ({
  url, id, handleClick, active, disabled, complete,
}) => (
  <div
    role="button"
    tabIndex={0}
    className="card"
    type="button"
    aria-label="Press to flip"
    onClick={disabled ? null : () => handleClick(id)}
    style={{ backgroundImage: `url(${url})` }}
    onKeyPress={() => handleClick(id)}
  >
    <div className={active || complete ? '' : 'cover'} />
  </div>
);

Cards.propTypes = {
  url: propTypes.string.isRequired,
  id: propTypes.number.isRequired,
  handleClick: propTypes.func.isRequired,
  active: propTypes.bool.isRequired,
  disabled: propTypes.bool.isRequired,
  complete: propTypes.bool.isRequired,
};

export default Cards;
