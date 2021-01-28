import React, {lazy} from 'react';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';

const MainPage = lazy(
    () => import(/*
        webpackChunkName: "MainPage",
        webpackMode: "lazy"
    */ '../pages/Main')
);

export const Router = withRouter(props => {
    let previousLocation;

    React.useEffect(() => {
        previousLocation = props.location;
    }, []);

    const renderSuspendedComponent = React.useCallback(Component => {
        // eslint-disable-next-line react/display-name
        return () => (
            <React.Suspense fallback={<div />}>
                <Component />
            </React.Suspense>
        );
    }, []);

    return (
        <>
            <Switch location={previousLocation || props.location}>
                {/* Modal */}
                <Route path="/Auth" render={renderSuspendedComponent(MainPage)} />

                <Route exact path="/" render={renderSuspendedComponent(MainPage)} />
                <Redirect to="/" />
            </Switch>
        </>
    );
});
