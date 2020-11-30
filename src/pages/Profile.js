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
  }, [props]);

  // const loadUserProfile = () => {
  //   console.log(props);
  //   props.auth.getProfile((profile, err) => {
  //     setProfile(profile);
  //     setError(err);
  //   });
  // };
  console.log(profile);

  return (
    <main className="container-fluid">
      <div className="my-md-5" style={{ height: "5rem" }}></div>
      <h3 className="mx-md-3 mb-md-3 font-weight-normal">Profile</h3>
      <div className="mx-md-3">
        {profile ? (
          <table>
            <tbody>
              <tr>
                <td>First Name</td>
                <td>{profile.given_name}</td>
              </tr>
              <tr>
                <td>Last Name</td>
                <td>{profile.family_name}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{profile.email}</td>
              </tr>
              <tr>
                <td>Email Verified</td>
                <td>{profile.email_verified ? <>&check;</> : "&cross;"}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <h3>Loading...</h3>
        )}
      </div>
    </main>
  );
}
