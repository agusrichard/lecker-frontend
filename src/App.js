import React from 'react';
import './App.css';
import Home from './pages/Home'
import CustomNavbar from './components/NavBar'
import { 
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <CustomNavbar />
      <Switch>  
        <Route exact path="/" component={ Home } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
