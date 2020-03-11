import React from 'react';
import './App.css';
import { 
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import CustomNavbar from './components/NavBar';


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>  
          <Route exact path="/" component={ Home } />
          <Route path="/auth/login" component={ Login }/>
          <Route path="/auth/register" component={ Register }/>
          <Route path="/auth/forgot-password" component={ ForgotPassword }/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
