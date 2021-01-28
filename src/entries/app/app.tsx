import * as React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Router} from './router';

const App: React.FC<{}> = () => {
    return (
        <div className={'App'}>
            <BrowserRouter>
                <Router />
            </BrowserRouter>
        </div>
    );
};

export {App};
