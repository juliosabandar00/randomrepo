import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import store from './store';
import { Provider } from 'react-redux';
import Home from './pages/Home';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Switch>
              <Route exact path="/">
                <Home/>
              </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
