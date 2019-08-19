import React from 'react';
import './App.scss';
import Header from './ui/static/Header';
import Footer from './ui/static/Footer';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './ui/Views/Login/Login';
import Home from './ui/Views/Home/Home';
import ScrollToTop from './ui/static/ScrollToTop';

function App() {
  return (

    <BrowserRouter>
      <Header />
      <ScrollToTop>
        <Switch>
          <Route exact={true} path="/" component={Home} />
          <Route path="/Dist-Login" component={Login} />
        </Switch>
        <Footer />
      </ScrollToTop>
    </BrowserRouter>
    
  );
}

export default App;
