import './App.css';
import { Component } from 'react';
import {
  Switch,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Register from './screen/register/register.Container';
import Login from './screen/login/login.Container';
import Chat from './screen/chat/chat.Container';
import { ToastContainer } from 'react-toastify';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <ToastContainer />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={(props) => <Login {...props} />} />
            <Route component={Register} path="/Register" />
            <Route component={Login} path="/Login" />
            <Route component={Chat} path="/Chat" />
          </Switch>
        </BrowserRouter>
      </>
    );
  }

}

export default App;
