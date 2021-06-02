import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ProductList from '../ProductList';
import createStore from '../../redux/store/store';


test('productList test', () => {
  const store = createStore();
  const { getByText } = render(
    <Provider store={store}>
        <BrowserRouter>
            <ProductList />
        </BrowserRouter>
    </Provider>,
    );
});