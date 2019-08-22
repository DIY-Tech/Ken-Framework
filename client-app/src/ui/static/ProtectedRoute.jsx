import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AppContext } from '../../App';

function ProtectedRoute({ path, isAdminPage = false, component }) {
    const { accountData } = useContext(AppContext);
    return (
        <Route path={path} exact={true} render={(props) => {
            // To pull off this stroke of genius we are using
            // React.cloneElement(component, props, children)
            // https://reactjs.org/docs/react-api.html#cloneelement
            // It is allowing us to add props to a component that is passed
            // as a reference variable
            if (accountData.isLoggedIn) {
                if (accountData.accountType === 'admin' && isAdminPage) {
                    return <div>{React.cloneElement(component, { ...props })}</div>;
                }
                if (!isAdminPage) {
                    return <div>{React.cloneElement(component, { ...props })}</div>;
                }
                return <Redirect to="/dist-login" />
            } else {
                return <Redirect to="/dist-login" />
            }
        }
        } />
    );
};

export default ProtectedRoute;