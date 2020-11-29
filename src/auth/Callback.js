import React, { useEffect } from "react";

export default function Callback(props) {
  useEffect(() => {
    if (/access_token|id_token|error/.test(props.location.hash)) {
      props.auth.authenticate();
    } else {
      throw new Error("Invalid URL.");
    }
  }, [props.location.hash, props.auth]);
  return <h2>Loading...</h2>;
}
