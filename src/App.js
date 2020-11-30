import { Route, Switch } from "react-router-dom";

import Header from "./common/Header";
import Footer from "./common/Footer";
import Homepage from "./pages/Homepage";
import VinylPage from "./pages/VinylPage";
import ApparelPage from "./pages/ApparelPage";
import AboutPage from "./pages/AboutPage";
import Profile from "./pages/Profile";
import Callback from "./auth/Callback";
import Auth from "./auth/Auth";

function App(props) {
  const auth = new Auth(props.history);
  return (
    <>
      <Header auth={auth} />
      {/* <div className="container-fluid"> */}
      <Switch>
        <Route path="/" exact component={Homepage} />
        <Route path="/about" component={AboutPage} />
        <Route
          path="/vinyl"
          render={(props) => <VinylPage auth={auth} {...props} />}
        />
        <Route
          path="/apparel"
          render={(props) => <ApparelPage auth={auth} {...props} />}
        />
        <Route
          path="/profile"
          render={(props) => <Profile auth={auth} {...props} />}
        />
        <Route
          path="/callback"
          render={(props) => <Callback auth={auth} {...props} />}
        />
      </Switch>
      {/* </div> */}
      <Footer />
    </>
  );
}

export default App;
