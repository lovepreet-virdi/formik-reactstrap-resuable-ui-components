import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import Login from "../components/Login";
import ScrollToTop from "./scrollToTop";

export default function Routers() {
  return (
    <Router>
      <ScrollToTop>
        <Switch>
          <Route exact path="/login" component={Login} />
      
        </Switch>
      </ScrollToTop>
    </Router>)

}
