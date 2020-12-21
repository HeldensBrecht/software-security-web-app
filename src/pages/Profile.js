import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function Profile() {
  const { user, isLoading } = useAuth0();
  const [profile, setProfile] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState("");

  useEffect(() => {
    setProfile(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  console.log(profile);

  return (
    <main className="container-fluid">
      <div className="my-md-5" style={{ height: "5rem" }}></div>
      <h3 className="mx-md-3 mb-md-3 font-weight-normal">Profile</h3>
      <div className="mx-md-3">
        {profile ? (
          <>
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
                  <td>
                    {profile.email_verified
                      ? String.fromCharCode("0x00002714")
                      : String.fromCharCode("0x00002718")}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="row">
              <Link to="/admin">Go To AdminPanel</Link>
            </div>
          </>
        ) : (
          <h3>Loading...</h3>
        )}
      </div>
    </main>
  );
}
