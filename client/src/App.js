import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import Profile from './component/Profile';
import Landing from './component/Landing';
import Home from './component/Home';
import './App.css';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import { LoadUser, LoadComments, LoadAllUsers } from './redux/ActionCreater';
import setAuthToken from './utils/setAuthToken';
import NewPost from './component/NewPost';
import FindFriends from './component/FIndFriends';
import ProfileID from './component/ProfileID';
import PrivateRoute from './component/PrivateRoute';
import UpdatePassword from './component/UpdatePassword';
const store = ConfigureStore();

if (localStorage.token) {
  setAuthToken(localStorage.token);

  store.dispatch(LoadUser());
  store.dispatch(LoadComments());
  store.dispatch(LoadAllUsers());
}
class App extends Component {
  componentDidMount() {
    console.log('App Component running');
  }

  // componentWillReceiveProps(nextProps) {

  //   console.log(nextProps);
  // }
  render() {
    const ProfileUser = ({ match }) => {
      //   console.log(match.params);
      return <ProfileID userID={match.params.profileID} />;
    };
    return (
      <Provider store={store}>
        <Router>
          <Route exact path='/' component={Landing} />
          <Route
            path='/password/reset/:userId/:token'
            render={({ match }) => (
              <UpdatePassword
                userId={match.params.userId}
                token={match.params.token}
              />
            )}
          />
          <Switch>
            <PrivateRoute exact path='/Home' component={Home} />
            <PrivateRoute exact path='/profile' component={Profile} />
            <PrivateRoute exact path='/newPost' component={NewPost} />

            <PrivateRoute exact path='/findFriends' component={FindFriends} />
            <PrivateRoute
              path='/Userprofile/:profileID'
              component={ProfileUser}
            />
          </Switch>
        </Router>
      </Provider>
    );
  }
}
export default App;
