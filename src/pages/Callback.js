import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import * as userApi from "../api/userApi";

const Callback = () => {
  const history = useHistory();
  const { isLoading, getAccessTokenSilently, user } = useAuth0();

  if (!isLoading) {
    console.log(user);
    getAccessTokenSilently()
      .then((accessToken) => {
        userApi
          .getYourself(accessToken)
          .then((res) => {
            if (res.status && res.status === 404) {
              userApi
                .saveUser(accessToken, { username: user.nickname })
                .then((res) => {
                  history.push("/profile");
                })
                .catch((err) => console.log(err));
            } else {
              history.push("/");
            }
          })
          .catch((error) => console.log(error));
      })
      .catch((err) => console.log(err));
  }

  return (
    <main className="container-fluid">
      <div className="my-md-5" style={{ height: "5rem" }}></div>
      <h2>One more step...</h2>
      {/*  */}
    </main>
  );
};

export default Callback;
