import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import * as userApi from "../api/userApi";
import * as productApi from "../api/productApi";

export default function AdminPanel() {
  const history = useHistory();
  const { getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAccessTokenSilently({
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      scope: "openid profile email",
    })
      .then((res) => {
        setAccessToken(res);
        userApi
          .getYourself(res)
          .then((profile) => {
            if (profile.data.user.role === 0) {
              toast.error(`You are not allowed to access this page`);
              history.push("/profile");
            } else {
              productApi
                .getProducts()
                .then((products) => {
                  setProducts(products.data);
                })
                .catch((error) => {
                  console.log(error);
                  alert(error);
                });
            }
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, [getAccessTokenSilently, history]);

  const deleteProduct = (prodId) => {
    setProducts((prevProducts) => prevProducts.filter((p) => p.id !== prodId));
    productApi
      .deleteProduct(accessToken, prodId)
      .then(() => {
        // toast.success("Product deleted successfully.");
        // Update: Do nothing, only warn when the product could not be deleted
        // (optimistic delete)
      })
      .catch((error) => {
        toast.error(`Could not delete product: ${error.message}`);
      });
  };

  return (
    <main className="container-fluid">
      <div className="my-md-5" style={{ height: "5rem" }}></div>
      <div className="row mx-0">
        <div className="col-xs-12 col-sm-12 col-md-4 mt-1 mt-md-5 pt-md-5 pl-0">
          <h3 className="font-weight-normal">Admin Panel</h3>
        </div>

        <div className="col-xs-12 col-sm-12 col-md-8 pr-0">
          <h4 className="font-weight-normal">Products</h4>
          <table className="w-100">
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
              {products ? (
                products.map((p) => (
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td>{p.description.substring(0, 50)}...</td>
                    <td>&euro;{p.price}</td>
                    <td>{p.stock}</td>
                    <td>
                      <button
                        className="bg-danger border border-danger text-white"
                        onClick={() => deleteProduct(p.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>Loading...</td>
                  <td>Loading...</td>
                  <td>Loading...</td>
                  <td>Loading...</td>
                  <td>Loading...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
