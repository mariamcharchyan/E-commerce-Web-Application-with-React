import { configureStore } from '@reduxjs/toolkit';
import reducerBoxToys from '../MainComponents/BoxToys/reducerBoxToys';
import reducerBoxToyID from '../MainComponents/BoxToys/reducerBoxToyID';
import reducerLoginForm from '../MainComponents/Subscribe/LogIn/reducerLoginForm';
import reducerBasket from '../MainComponents/Basket/reducerBasket';

export const store = configureStore({
  reducer: {
    boxToys: reducerBoxToys,
    boxToyID: reducerBoxToyID,
    loginForm: reducerLoginForm,
    basket: reducerBasket,
  },
});
