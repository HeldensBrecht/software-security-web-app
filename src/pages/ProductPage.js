import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import * as productApi from "../api/productApi";

import Loading from "../common/Loading";

const ProductPage = (props) => {
  const [products, setProducts] = useState([]);
  const category = props.match.params.category;

  useEffect(() => {
    const queryParams = {};
    if (category) queryParams.category = category;

    productApi
      .getProducts(queryParams)
      .then((products) => {
        setProducts(products);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }, [category]);

  return (
    <main className="container-fluid">
      <div className="my-md-5" style={{ height: "5rem" }}></div>
      <h3 className="mx-md-3 mb-md-3 font-weight-normal">
        {category
          ? category.charAt(0).toUpperCase() + category.slice(1)
          : "Products"}
      </h3>
      <div className="row mx-0 mt-4 mt-md-0 mb-md-3">
        {products ? (
          products.map((p, i) => {
            return (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                className="col-md-3 px-md-2 mb-4 w-100 text-decoration-none"
                style={{ color: "inherit" }}
              >
                <img
                  className="card-img-top rounded-0"
                  src={`/images/${p.image}`}
                  alt={p.name}
                />
                <p className="card-subtitle mt-1 mt-sm-3 text-uppercase">
                  {p.name}
                </p>
                <p className="card-text text-muted">&euro;{p.price}</p>
              </Link>
            );
          })
        ) : (
          <Loading />
        )}
      </div>
    </main>
  );
};

export default ProductPage;
