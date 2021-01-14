import React, { useState, useEffect } from "react";

import * as productApi from "../api/productApi";

const ProductDetail = (props) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    productApi
      .getProduct(props.match.params.id)
      .then((product) => {
        setProduct(product);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }, [props.match.params.id]);

  return (
    <main className="container-fluid">
      {product ? (
        <>
          <div className="my-md-5" style={{ height: "5rem" }}></div>
          <div className="row mx-0">
            <div className="col-xs-12 pl-0 col-sm-12 col-md-7">
              <div className="row mx-0">
                {product.images.map((i, index) => (
                  <div key={index} className="col-md-6 px-1">
                    <img
                      src={`/images/${i.image}`}
                      alt=""
                      className="d-block w-100"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-5 mt-1 mt-md-5 pt-md-5">
              <h4 className="text-uppercase font-weight-normal">
                {product.name}
              </h4>
              <p className="text-muted">By {product.username}</p>
              <h6 className="text-muted mt-3">&euro;{product.price}</h6>
              <p className="mt-2 mt-sm-5 mr-md-5">{product.description}</p>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <div></div>
    </main>
  );
};

export default ProductDetail;
