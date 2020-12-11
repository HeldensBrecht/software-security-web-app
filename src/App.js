import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Auth0Provider, withAuthenticationRequired } from "@auth0/auth0-react";
import { createBrowserHistory } from "history";

import Header from "./common/Header";
import Footer from "./common/Footer";
import Homepage from "./pages/Homepage";
import ProductPage from "./pages/ProductPage";
import VinylPage from "./pages/VinylPage";
import ApparelPage from "./pages/ApparelPage";
import ProductDetail from "./pages/ProductDetail";
import AboutPage from "./pages/AboutPage";
import Profile from "./pages/Profile";

export const history = createBrowserHistory();

const ProtectedRoute = ({ component, ...args }) => (
  <Route component={withAuthenticationRequired(component)} {...args} />
);

const onRedirectCallback = (appState) => {
  // Use the router's history module to replace the url
  history.replace(appState?.returnTo || window.location.pathname);
};

function App(props) {
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      redirectUri={process.env.REACT_APP_AUTH0_CALLBACK_URL}
      audience={process.env.REACT_APP_AUTH0_AUDIENCE}
      scope="openid profile email"
      onRedirectCallback={onRedirectCallback}
    >
      <Router history={history}>
        <Header />
        {/* <div className="container-fluid"> */}
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/vinyl" component={VinylPage} />
          <Route path="/apparel" component={ApparelPage} />
          <Route path="/products/:category" component={ProductPage} />
          <Route path="/products" component={ProductPage} />
          <Route path="/product/:id" component={ProductDetail} />
          <ProtectedRoute path="/profile" component={Profile} />
        </Switch>
        {/* </div> */}
        <Footer />
      </Router>
    </Auth0Provider>
  );
}

export default App;
