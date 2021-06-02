import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import createStore from '../../redux/store/store';
import OrderComplete from '../OrderComplete';


test('orderComplete test', () => {
  const store = createStore();
  const { getByText } = render(
    <Provider store={store}>
        <BrowserRouter>
            <OrderComplete />
        </BrowserRouter>
    </Provider>,
    );
});