import { createStore, combineReducers } from 'redux';
import filtersReducer from '../reducers/filters';
import expensesReducer from '../reducers/expenses';

export default () => {
  const store = createStore(combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  }));
  return store;
};
