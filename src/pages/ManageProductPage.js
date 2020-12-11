import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";

import * as productApi from "../api/productApi";
import ProductForm from "./ProductForm";

const ManageProductPage = (props) => {
  const { getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState("");
  const [product, setProduct] = useState(
    !props.match.params.id
      ? {
          name: "",
          description: "",
          price: "",
          stock: "",
          category: "vinyl",
        }
      : undefined
  );
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getAccessTokenSilently({
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      scope: "openid profile email",
    })
      .then((res) => setAccessToken(res))
      .catch((err) => console.log(err));

    props.match.params.id &&
      productApi
        .getProduct(props.match.params.id)
        .then((product) => {
          setProduct(product);
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
  }, [props.match.params.id, getAccessTokenSilently]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const formIsValid = () => {
    const { name, description, price, stock, category } = product;
    const errors = {};

    if (!name) errors.name = "Name is required.";
    if (!description) errors.description = "Description is required";
    if (!price) errors.price = "Price is required";
    if (!stock) errors.stock = "Stock is required";
    if (!category) errors.category = "Category is required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = (event) => {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    productApi
      .saveProduct(accessToken, product)
      .then(() => {
        toast.success("Product saved.");
        props.history.push("/admin");
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  };

  return (
    <main className="container-fluid">
      <div className="my-md-5" style={{ height: "5rem" }}></div>
      {product !== undefined ? (
        <ProductForm
          product={product}
          errors={errors}
          onChange={handleChange}
          onSave={handleSave}
          saving={saving}
        />
      ) : (
        <h3>Loading...</h3>
      )}
    </main>
  );
};

export default ManageProductPage;
