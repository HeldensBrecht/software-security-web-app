import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";

import * as userApi from "../api/userApi";

import Loading from "../common/Loading";

const Callback = (props) => {
  const [loginError, setLoginError] = useState(undefined);
  const { isLoading, getAccessTokenSilently, user, logout } = useAuth0();

  useEffect(() => {
    if (!isLoading) {
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
          setLoginError(err);
          setTimeout(() => {
            toast.error(err.message);
            logout();
          }, 5000);
        });
    }
  }, [isLoading, getAccessTokenSilently, user, props.history, logout]);

  return (
    <main className="container-fluid">
      <div className="my-md-5" style={{ height: "5rem" }}></div>
      {loginError ? (
        <h2>{loginError.message}</h2>
      ) : (
        <div className="row">
          <Loading />
        </div>
      )}
    </main>
  );
};

export default Callback;
