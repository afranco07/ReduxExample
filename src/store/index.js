import { createStore, combineReducers } from 'redux';
import rootReducer from '../reducers/index';

/*const incrementCount = ({ incrementBy = 1} = {}) => {
  return { type: 'INCREMENT', incrementBy };
};

const decrementCount = ({ decrementBy = 1 } = {}) => {
  return { type: 'DECREMENT', decrementBy };
}

const setCount = ({ count }) => {
  return { type: 'SET', count };
}

const resetCount = () => {
  return { type: 'RESET' };
}

// Reducers
const countReducer = (state = { count: 0 }, action) => {
  switch(action.type) {
    case 'INCREMENT':
      return { count: state.count + action.incrementBy };
    case 'DECREMENT':
      return { count: state.count - action.decrementBy };
    case 'RESET':
      return { count: 0 };
    case 'SET': 
      return { count: action.count };
    default:
      return state;
  }
};

// const store = createStore(rootReducer)
const store = createStore(countReducer);

store.dispatch({ type: 'INCREMENT', incrementBy: 5 });
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
})
store.dispatch(incrementCount({ incrementBy: 2 }));
store.dispatch(incrementCount());
store.dispatch(decrementCount());
store.dispatch(setCount({ count: 101 }));
*/

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter((expense) => {
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return a.createdAt < b.createdAt ? 1 : -1;
    } else if (sortBy === 'amount') {
      return a.amount < b.amount ? 1 : -1;
    }
  });
};

const addExpense = (
  { 
    description = '', 
    note = '', 
    amount = 0, 
    createdAt = 0 
  } = {}
) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: 'asdfl',
    description,
    note,
    amount,
    createdAt
  }
});

const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id: 'asdfl'
});

const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
})

// Expenses reducer
const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch(action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.expense];
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates
          };
        } else {
          return expense;
        }
      });
    default:
      return state;
  }
};

const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined,
};

const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
});

const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT',
});

const sortByDate = () => ({
  type: 'SORT_BY_DATE',
});

const setStartDate = (date = undefined) => ({
  type: 'SET_START_DATE',
  date
});

const setEndDate = (date = undefined) => ({
  type: 'SET_END_DATE',
  date
});

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch(action.type) {
    case 'SET_TEXT_FILTER':
      return { ...state, text: action.text };
    case 'SORT_BY_AMOUNT':
      return { ...state, sortBy: 'amount' };
    case 'SORT_BY_DATE':
      return { ...state, sortBy: 'date' };
    case 'SET_START_DATE':
      return { ...state, startDate: action.date };
    case 'SET_END_DATE':
      return { ...state, endDate: action.date };
    default:
      return state;
  }
};

const store = createStore(combineReducers({
  expenses: expensesReducer,
  filters: filtersReducer
}));

// store.dispatch(addExpense({ description: 'Rent', amount: 100 }));
// store.dispatch(removeExpense({ id: 'asdfl' }))
// store.dispatch(addExpense({ description: 'Rent', amount: 100 }));
// store.dispatch(editExpense('asdfl', { amount: 500 }));
// store.dispatch(setTextFilter('rent'));
// store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

store.dispatch(setStartDate(125));
store.dispatch(setStartDate());
store.dispatch(setEndDate(1000));
store.dispatch(setEndDate());

console.log(store.getState());

const demoState = {
  expenses: [{
    id: 'asdf',
    description: 'January Rent',
    note: 'This was the final payment for that address',
    amount: 54500,
    createdAt: 0
  }],
  filters: {
    text: 'rent',
    sortBy: 'amount', // date or amount
    startDate: undefined,
    endDate: undefined
  }
};

const user = {
  name: 'Jen',
  age: 24
}


export default store;
