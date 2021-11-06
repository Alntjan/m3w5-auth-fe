import { Component } from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import Private from "./components/Private"
import authService from './services/auth-service';

class App extends Component {
  state = {
    isLoggedIn: null,
    user: null,
  };

  setUser = (user, loggedInStatus) => {
    this.setState({
      user,
      isLoggedIn: loggedInStatus,
    });
  };

  getUser = () => {
    if (this.state.user === null) {
      authService
        .loggedin()
        .then((response) => {
          this.setState({
            user: response.data.user || null,
            isLoggedIn: true,
          });
        })
        .catch((error) => {
          this.setState({
            isLoggedIn: false,
          });
        });
    }
  };

  componentDidMount() {
    this.getUser();
  }

  render() {
    const { user, isLoggedIn } = this.state;
    return (
      <div>
        <Navbar isLoggedIn={isLoggedIn} user={user} setUser={this.setUser} />
        <Switch>
          <Route
            exact
            path="/signup"
            render={(props) => <Signup {...props} setUser={this.setUser} />}
          />
          <Route
            exact
            path="/login"
            render={(props) => <Login {...props} setUser={this.setUser} />}
          />
          <Route
            exact
            path="/private"
            render={(props) => <Private {...props} isLoggedIn={isLoggedIn}/>}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
