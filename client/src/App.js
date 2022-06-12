import "./index.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import store from "./store";
import { Provider } from "react-redux";
import Navbar from "./components/layouts/Navbar";
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="h-screen overflow-x-hidden">
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route path="/" component={Dashboard} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
