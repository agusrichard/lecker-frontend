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

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>  
          <Route exact path="/" component={ Home } />
          <Route path="/auth/login" component={ Login }/>
          <Route path="/auth/register" component={ Register }/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
