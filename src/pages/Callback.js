import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";

import * as userApi from "../api/userApi";

const Callback = (props) => {
  const { isLoading, getAccessTokenSilently, user, logout } = useAuth0();

  useEffect(() => {
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
                    props.history.push("/profile");
                  })
                  .catch((err) => console.log(err));
              } else {
                props.history.push("/");
              }
            })
            .catch((error) => console.log(error));
        })
        .catch((err) => {
          toast.error(err.message);
          setTimeout(() => {
            logout();
          }, 5000);
        });
    }
  }, [isLoading, getAccessTokenSilently, user, props.history, logout]);

  return (
    <main className="container-fluid">
      <div className="my-md-5" style={{ height: "5rem" }}></div>
      <h2>One more step...</h2>
    </main>
  );
};

export default Callback;
