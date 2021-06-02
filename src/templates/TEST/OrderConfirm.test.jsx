import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import createStore from '../../redux/store/store';
import OrderConfirm from '../OrderConfirm';


test('orderConfirm test', () => {
  const store = createStore();
  const { getByText } = render(
    <Provider store={store}>
        <BrowserRouter>
            <OrderConfirm />
        </BrowserRouter>
    </Provider>,
    );
});