import React, { useState, useEffect } from "react";

export default function Profile(props) {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadUserProfile();
  }, [props]);

  const loadUserProfile = () => {
    console.log(props);
    props.auth.getProfile((profile, err) => {
      setProfile(profile);
      setError(err);
    });
  };

  return (
    <>
      <h2>Profile</h2>
      {profile ? <p>{profile.nickname}</p> : <h3>Loading...</h3>}
    </>
  );
}
