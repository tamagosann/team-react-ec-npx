import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../Header'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import createStore from '../../../redux/store/store';

test('Header test', () => {
    const store = createStore();
  const { getByText } = render(
    <Provider store={store}>
        <BrowserRouter>
            <Header cartLength={2} />
        </BrowserRouter>
    </Provider>,
    );
});