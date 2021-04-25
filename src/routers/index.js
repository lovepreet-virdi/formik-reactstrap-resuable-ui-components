import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "../components/Login";
import ScrollToTop from "./scrollToTop";

export default function Routers() {
  return (
    <Router>
      <ScrollToTop>
        <Switch>
          <Route path="/login" component={Login} />
          <Route render={() => <Redirect to={{ pathname: "/login" }} />} />
        </Switch>
      </ScrollToTop>
    </Router>)

}
