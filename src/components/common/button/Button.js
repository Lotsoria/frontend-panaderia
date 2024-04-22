// src/components/common/Button.js
import React from 'react';
import './css/Button.css';
function Button({ children, onClick }) {
  return (
    <button className='button' onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
