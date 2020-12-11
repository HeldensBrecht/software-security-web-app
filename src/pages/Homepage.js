import React from "react";
import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <>
      <div
        className="cover-container d-flex h-100 p-3 mx-auto flex-column"
        style={{
          backgroundImage: "url('/images/bg.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      ></div>

      <main className="container-fluid">
        <div className="d-md-flex flex-md-equal w-100 mt-4 mt-md-5 mb-md-3 py-md-5 px-md-3">
          <Link
            to="/about"
            className="mr-md-5 my-3 my-md-0 w-100 text-decoration-none"
            style={{ color: "inherit" }}
          >
            <img
              className="card-img-top rounded-0"
              src="/images/craft-black-white-square1.jpg"
              alt="Fenton lp player"
            />
            <p className="card-subtitle mt-1 mt-sm-3 text-uppercase">
              How it's made
            </p>
            <p className="card-text text-muted">Authentic craftsmanship</p>
          </Link>
          <div style={{ width: "35%" }}></div>
          <Link
            to="/products/vinyl"
            className="mx-md-5 my-3 my-md-0 w-100 text-decoration-none"
            style={{ color: "inherit" }}
          >
            <img
              className="card-img-top rounded-0"
              src="/images/holding-album-square.jpg"
              alt="Phono lp player"
            />
            <p className="card-subtitle mt-1 mt-sm-3 text-uppercase">Vinyl</p>
            <p className="card-text text-muted">
              Wide selection for young and old
            </p>
          </Link>
          <div style={{ width: "35%" }}></div>
          <Link
            to="/products/apparel"
            className="ml-md-5 my-3 my-md-0 w-100 text-decoration-none"
            style={{ color: "inherit" }}
          >
            <img
              className="card-img-top rounded-0"
              src="/images/girls-sweatshirt-square.jpg"
              alt="Phono lp player"
            />
            <h6 className="card-subtitle mt-1 mt-sm-3 mb-sm-1 text-muted">
              Apparel
            </h6>
            <p className="card-text text-muted">
              Find your favourite artist's merch
            </p>
          </Link>
          <div style={{ width: "35%" }}></div>
        </div>

        <div className="d-md-flex flex-md-equal w-100 mt-md-3 mb-md-5 py-md-5 px-md-3">
          <div className="mr-md-3 my-3 my-md-0 w-100">
            <img
              className="card-img-top rounded-0"
              src="/images/refurb-store-front-rect1.jpg"
              alt="Fenton lp player"
            />
            <h6 className="card-subtitle mt-1 mt-sm-3 mb-sm-1 text-muted">
              E W J Refurbishment Store
            </h6>
            <p className="card-text text-muted">
              Let us refurbish your vinyl player
            </p>
          </div>
          <div className="ml-md-3 my-3 my-md-0 w-100">
            <img
              className="card-img-top rounded-0"
              src="/images/store-front-rect2.jpg"
              alt="Phono lp player"
            />
            <h6 className="card-subtitle mt-1 mt-sm-3 mb-sm-1 text-muted">
              Eppegem Herby's Store
            </h6>
            <p className="card-text text-muted">Find us at Cardijnstraat 12</p>
          </div>
        </div>
      </main>
    </>
  );
}
