import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";

import Input from "../common/Input";

import * as userApi from "../api/userApi";
import * as productApi from "../api/productApi";

export default function Profile(props) {
  const { user, isLoading, logout, getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState("");
  const [profile, setProfile] = useState(null);
  const [formProfile, setFormProfile] = useState(null);
  const [products, setProducts] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      getAccessTokenSilently()
        .then((res) => {
          setAccessToken(res);
          userApi
            .getYourself(res)
            .then((res) => {
              setProfile(res.user);
              setFormProfile(res.user);
              setProducts(res.products);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  }, [isLoading, getAccessTokenSilently]);

  const updateUser = () => {
    setProfile(formProfile);
    setShowEditForm(false);
    userApi.saveUser(accessToken, formProfile).catch((error) => {
      toast.error(`Could not update user: ${error.message}`);
      props.history.go(0);
    });
  };

  const requestAllData = () => {
    window.confirm(
      "Are you sure you want to request all your data? This might take some time"
    ) &&
      userApi
        .getAllData(accessToken, profile.id)
        .then((res) => {
          let fileURL = window.URL.createObjectURL(
            new Blob([JSON.stringify(res)], {
              type: "application/json",
            })
          );
          let tempLink = document.createElement("a");
          tempLink.href = fileURL;
          tempLink.setAttribute("download", `${profile.username}.json`);
          tempLink.click();
        })
        .catch((error) => {
          toast.error(
            `Could not retrieve your user data: Please contact us at john.doe@example.com to resolve this issue.`
          );
        });
  };

  const deleteUser = () => {
    window.confirm("Are you sure you want to delete your user account?") &&
      userApi
        .deleteUser(accessToken, profile.id)
        .then((res) => {
          logout();
        })
        .catch((error) => {
          toast.error(
            `Could not delete your user: Please contact us at john.doe@example.com to resolve this issue.`
          );
        });
  };

  const deleteProduct = (prodId) => {
    setProducts((prevProducts) => prevProducts.filter((p) => p.id !== prodId));
    productApi.deleteProduct(accessToken, prodId).catch((error) => {
      toast.error(`Could not delete product: ${error.message}`);
    });
  };

  return (
    <main className="container-fluid">
      <div className="my-md-5" style={{ height: "5rem" }}></div>
      <h3 className="mx-md-3 mb-md-3 font-weight-normal">Profile</h3>
      <div className="mx-md-3">
        {profile ? (
          !showEditForm ? (
            <>
              <table>
                <tbody>
                  <tr>
                    <td>Username</td>
                    <td>{profile.username}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{user.email}</td>
                  </tr>
                  <tr>
                    <td>Email Verified</td>
                    <td>
                      {user.email_verified
                        ? String.fromCharCode("0x00002714")
                        : String.fromCharCode("0x00002718")}
                    </td>
                  </tr>
                </tbody>
              </table>
              <button
                onClick={() => setShowEditForm(true)}
                className="btn btn-outline-info py-1 mt-2"
              >
                Edit
              </button>
            </>
          ) : (
            <div className="col-md-3 px-0">
              <Input
                type="text"
                name="username"
                label="Username"
                value={formProfile.username}
                onChange={(e) =>
                  setFormProfile((p) => ({ ...p, username: e.target.value }))
                }
                error={undefined}
              />

              <button
                onClick={updateUser}
                className="btn btn-success py-1 mt-2 mr-2"
              >
                Save
              </button>
              <button
                onClick={() => setShowEditForm(false)}
                className="btn btn-outline-info py-1 mt-2"
              >
                Cancel
              </button>
            </div>
          )
        ) : (
          <h3>Loading...</h3>
        )}
      </div>
      {profile && (
        <>
          <div className="my-md-1" style={{ height: "1rem" }}></div>
          {profile.role === 1 ? (
            <>
              <h3 className="mx-md-3 mb-md-3 font-weight-normal">Products</h3>
              <div className="row mx-0">
                <Link to="/admin">Go To AdminPanel</Link>
              </div>
            </>
          ) : (
            <>
              <h3 className="mx-md-3 mb-md-3 font-weight-normal">
                My Products
              </h3>
              <Link className="mx-md-3 text-decoration-none" to="/product">
                Add Product
              </Link>
              {products.length ? (
                <table className="mx-md-3" style={{ width: "99%" }}>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p.id}>
                        <td>{p.name}</td>
                        <td>{p.description.substring(0, 50)}...</td>
                        <td>&euro;{p.price}</td>
                        <td>{p.stock}</td>
                        <td>
                          <Link
                            className="text-decoration-none text-dark"
                            to={`/edit/product/${p.id}`}
                          >
                            Edit
                          </Link>
                          {" | "}
                          <button
                            className="bg-danger border border-danger text-white"
                            onClick={() => deleteProduct(p.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="mx-md-3">
                  <hr />
                  <p>
                    You do not have any products yet. Perhaps you can create
                    one.
                  </p>
                </div>
              )}
            </>
          )}
        </>
      )}

      <div className="my-md-1" style={{ height: "1rem" }}></div>
      <h3 className="mx-md-3 mb-md-3 font-weight-normal">Manage Account</h3>
      <div className="mx-md-3">
        <button
          onClick={requestAllData}
          className="btn btn-outline-success mr-2"
        >
          Request User Data
        </button>
        <button onClick={deleteUser} className="btn btn-danger">
          Remove Account
        </button>
      </div>
    </main>
  );
}
