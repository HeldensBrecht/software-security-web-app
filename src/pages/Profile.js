import React, { useState, useEffect } from "react";

export default function Profile(props) {
  const [profile, setProfile] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState("");

  useEffect(() => {
    props.auth.getProfile((profile, err) => {
      setProfile(profile);
      setError(err);
    });
  }, [props.auth]);

  // const loadUserProfile = () => {
  //   console.log(props);
  //   props.auth.getProfile((profile, err) => {
  //     setProfile(profile);
  //     setError(err);
  //   });
  // };

  return (
    <>
      <h2>Profile</h2>
      {profile ? <p>{profile.nickname}</p> : <h3>Loading...</h3>}
    </>
  );
}
