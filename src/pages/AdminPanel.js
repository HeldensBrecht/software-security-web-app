import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import * as userApi from "../api/userApi";
import * as productApi from "../api/productApi";

import Loading from "../common/Loading";

export default function AdminPanel() {
  const history = useHistory();
  const { getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAccessTokenSilently()
      .then((res) => {
        setAccessToken(res);
        userApi
          .getYourself(res)
          .then((profile) => {
            if (profile.user.role === 0) {
              toast.error(`You are not allowed to access this page`);
              history.replace("/profile");
            } else {
              productApi
                .getProducts()
                .then((products) => {
                  setProducts(products);
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
      <div className="mx-md-3">
        <h3 className="font-weight-normal">Admin Panel</h3>
        <h4 className="font-weight-normal">Products</h4>
        {products ? (
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
              {products.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.description.substring(0, 50)}...</td>
                  <td>&euro;{p.price}</td>
                  <td>{p.stock}</td>
                  <td>
                    <button
                      className="btn btn-danger px-1 py-0"
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
          <div className="row mx-0">
            <Loading />
          </div>
        )}
      </div>
    </main>
  );
}
