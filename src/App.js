import React from 'react';
import { 
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'
import UserProfile from './pages/user/UserProfile'
import Restaurants from './pages/restaurant/Restaurants'
import RestaurantDetail from './pages/restaurant/RestaurantDetail'
import CreateRestaurant from './pages/restaurant/CreateRestaurant'
import Items from './pages/item/Items'
import CreateItem from './pages/item/CreateItem'
import Cart from './pages/Cart'


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>  
          <Route exact path="/" component={ Home } />
          <Route path="/auth/login" component={ Login } />
          <Route path="/auth/register" component={ Register } />
          <Route path="/auth/forgot-password" component={ ForgotPassword } />
          <Route path="/users/profile" component={ UserProfile } />
          <Route path="/restaurants/create-restaurant" component={ CreateRestaurant } />
          <Route path="/restaurants/:restaurantId/new-menu" component={ CreateItem }/>
          <Route path="/restaurants/:restaurantId" component={ RestaurantDetail } />
          <Route path="/restaurants" component={ Restaurants } />
          <Route path="/menus" component={ Items }/>
          <Route path="/cart" component={ Cart } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
