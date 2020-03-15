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
import ItemsPage from './pages/ItemsPage'
import RestaurantsPage from './pages/RestaurantsPage'
import CreateRestaurant from './pages/CreateRestaurant'
import UserProfile from './pages/UserProfile'
import ChangeProfile from './pages/ChangeProfile'
import RestaurantDetail from './pages/RestaurantDetail'
import UpdateRestaurant from './pages/UpdateRestaurant'
import Cart from './pages/Cart'


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>  
          <Route exact path="/" component={ Home } />
          <Route path="/auth/login" component={ Login } />
          <Route path="/auth/register" component={ Register }/>
          <Route path="/auth/forgot-password" component={ ForgotPassword } />
          <Route path="/users/profile" component={ UserProfile } />
          <Route path="/users/change-profile" component={ ChangeProfile } />
          <Route path="/restaurants/:restaurantId/update" component={ UpdateRestaurant } />
          <Route path="/restaurants/:restaurantId" component={ RestaurantDetail } />
          <Route path="/restaurants" component={ RestaurantsPage } />
          <Route path="/create-restaurant" component={ CreateRestaurant } />
          <Route path="/items" component={ ItemsPage }/>
          <Route path="/cart" component={ Cart } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
