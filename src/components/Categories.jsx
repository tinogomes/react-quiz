import React from 'react';

import Category from './Category';

import CategoryImage from '../img/category.svg';

import './Categories.css';

const Categories = () => {
  return (
    <div id="categories">
        <h2>Escolha uma categoria</h2>
        <p>As perguntas serão referentes a uma das linguagens abaixo</p>
        <div id="categories-container">
          <Category category="HTML" />
          <Category category="CSS" />
          <Category category="JavaScript" />
        </div>
        <img src={CategoryImage} alt="Escolha uma categoria" />
    </div>
  );
}

export default Categories;
