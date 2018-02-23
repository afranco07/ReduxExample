import React, { Component } from 'react';
import ExpenseList from './components/ExpenseList';
import ExpenseListFilters from './components/ExpenseListFilters';

const App = () => (
  <div>
    <ExpenseListFilters />
    <ExpenseList />
  </div>
);

export default App;
