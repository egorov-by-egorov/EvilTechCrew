import * as React from 'react';
import {render} from 'react-dom';
import {App} from './app';

// TODO remove
import smoothScrollPolyfill from 'smoothscroll-polyfill';
smoothScrollPolyfill.polyfill();

window.onload = () => {
    const rootElement = document.getElementById('root');

    render(<App />, rootElement);
};
