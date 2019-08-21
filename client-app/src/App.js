import React, { useReducer } from 'react';
import './App.scss';
import Header from './ui/static/Header';
import Footer from './ui/static/Footer';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './ui/Views/Login/Login';
import Home from './ui/Views/Home/Home';
import ScrollToTop from './ui/static/ScrollToTop';
import State from './State';
import AdminDashboard from './ui/Views/Admin/AdminDashboard/AdminDashboard';
import ProtectedRoute from './ui/static/ProtectedRoute';
import MatCatForm from './ui/Views/Admin/MatCatForm/MatCatForm';
import ProductForm from './ui/Views/Admin/ProductForm/ProductForm';

export const AppContext = React.createContext(undefined);

function stateReducer(state, action) {
  switch (action.type) {
    case 'updateAccountData':
      return { ...state, accountData: action.data };
    default:
      throw new Error();
  }
}

function App() {

  const [appState, dispatch] = useReducer(stateReducer, State);

  return (

    <BrowserRouter>
      <AppContext.Provider value={{ ...appState, dispatch }}>
        <Header />
        <ScrollToTop>
          <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route path="/Dist-Login" component={Login} />
            <ProtectedRoute isAdminPage={true} path="/Admin-Dashboard" component={<AdminDashboard />} />
            <ProtectedRoute isAdminPage={true} path="/Add-Material-Category" component={<MatCatForm />} />
            <ProtectedRoute isAdminPage={true} path="/Product-Form" component={<ProductForm />} />
          </Switch>
          <Footer />
        </ScrollToTop>
      </AppContext.Provider>
    </BrowserRouter>

  );
}

export default App;
