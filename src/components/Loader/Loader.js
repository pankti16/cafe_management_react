import React from "react";
import "./Loader.scss";
//Component to show loader till component loads
const Loader = () => {
  return (
    <div className="spinnerContainer d-flex justify-content-center align-items-center h-100 mt-5">
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
