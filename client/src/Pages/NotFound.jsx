import React from "react";
import coinImage from "./../assets/img/coin-loading.png"; 

const NotFound = () => {
  return (
    <div className="notfound-wrapper d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="text-center px-3 px-md-5">
        <div className="d-flex justify-content-center align-items-center gap-4 flex-wrap mb-4">
          <span className="display-1 fw-bold text-warning">4</span>
          <img src={coinImage} alt="Coin" className="coin-img" />
          <span className="display-1 fw-bold text-warning">4</span>
        </div>
        <h2 className="fw-semibold mb-3">Page Not Found</h2>
        <p className="text-muted mb-4 fs-5">
          The page you're looking for might have been removed or temporarily unavailable.
        </p>
        <a href="/" className="btn btn-lg btn-warning shadow px-4 py-2 fw-semibold">
          ⬅ Back to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;