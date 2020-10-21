import React from 'react';
import propTypes from 'prop-types';
import './Form.css';

const Form = ({
  handleSubmit, setUserInput, setSize, size,
}) => (
  <div>
    <form className="input-form" onSubmit={(e) => handleSubmit(e)}>
      <input className="text-input" placeholder="Chose your theme!" onChange={(e) => setUserInput(e.target.value)} type="text" name="" id="" />
      <select className="drop-down" defaultValue={size} name="size" id="size" onChange={(e) => setSize(e.target.value)}>
        <option value="8">Size: Small</option>
        <option value="12">Size: Medium</option>
        <option value="16">Size: Large</option>
      </select>
      <input className="form-submit" type="submit" value="Create Game!" />
    </form>
  </div>
);

Form.propTypes = {
  handleSubmit: propTypes.func.isRequired,
  setUserInput: propTypes.func.isRequired,
  setSize: propTypes.func.isRequired,
  size: propTypes.number.isRequired,
};

export default Form;
