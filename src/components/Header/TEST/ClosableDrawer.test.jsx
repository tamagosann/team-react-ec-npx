import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../Header'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import createStore from '../../../redux/store/store';
import ClosableDrawer from '../ClosableDrawer';

test('closableDrawer test', () => {
  const store = createStore();
  const { getByText } = render(
    <Provider store={store}>
        <BrowserRouter>
            <ClosableDrawer open={true} onClose={() => {}}/>
        </BrowserRouter>
    </Provider>,
    );
});