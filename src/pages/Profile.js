import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";

import * as userApi from "../api/userApi";
import * as productApi from "../api/productApi";

export default function Profile() {
  const { user, getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState("");
  const [profile, setProfile] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAccessTokenSilently()
      .then((res) => {
        setAccessToken(res);
        userApi
          .getYourself(res)
          .then((res) => {
            console.log(res);
            setProfile(res.data.user);
            setProducts(res.data.products);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, [getAccessTokenSilently]);

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
            {profile.role === 1 && (
              <div className="row mx-0">
                <Link to="/admin">Go To AdminPanel</Link>
              </div>
            )}
          </>
        ) : (
          <h3>Loading...</h3>
        )}
      </div>
      {profile && profile.role === 0 && (
        <>
          <div className="my-md-1" style={{ height: "1rem" }}></div>
          <h3 className="mx-md-3 mb-md-3 font-weight-normal">My Products</h3>
          <Link className="mx-md-3 text-decoration-none" to="/product">
            Add Product
          </Link>
          {products.length ? (
            <table className="mx-md-3 w-100">
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
                You do not have any products yet. Perhaps you can create one.
              </p>
            </div>
          )}
        </>
      )}
    </main>
  );
}
