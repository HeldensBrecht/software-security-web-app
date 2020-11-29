import auth0 from "auth0-js";

export default class Auth {
  constructor(history) {
    this.history = history;
    this.profile = null;
    this.auth0 = new auth0.WebAuth({
      domain: process.env.REACT_APP_AUTH0_DOMAIN,
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
      responseType: "token id_token",
      scope: "openid profile email",
    });
  }

  login = () => {
    this.auth0.authorize();
  };

  authenticate = () => {
    this.auth0.parseHash((err, res) => {
      if (res && res.accessToken && res.idToken) {
        this.setSession(res);
        this.history.push("/");
      } else if (err) {
        this.history.push("/");
        alert(`Error: ${err.error}. Check the console for further details.`);
        console.log(err);
      }
    });
  };

  setSession = (res) => {
    const expiresAt = JSON.stringify(
      res.expiresIn * 1000 + new Date().getTime()
    );

    const scopes = res.scope || "";

    localStorage.setItem("access_token", res.accessToken);
    localStorage.setItem("id_token", res.idToken);
    localStorage.setItem("expires_at", expiresAt);
    localStorage.setItem("scopes", JSON.stringify(scopes));
  };

  logout = () => {
    localStorage.removeItem("expires_at");
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("scopes");
    this.profile = null;
    this.auth0.logout({
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      returnTo: "http://localhost:3000",
    });
  };

  isAuthenticated = () => {
    const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  };

  getAccessToken = () => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      throw new Error("No access token found.");
    }
    return accessToken;
  };

  getProfile = (callback) => {
    if (this.profile) return callback(this.profile);
    this.auth0.client.userInfo(this.getAccessToken(), (err, profile) => {
      if (profile) this.profile = profile;
      callback(profile, err);
    });
  };
}
