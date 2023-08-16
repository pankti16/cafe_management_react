import React from "react";
import { Link } from "react-router-dom";
import { CafeText, EmployeeText, HomeText } from "../../utils/Texts";
//Component for navigation bar
export default function Navbar() {

  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <p className="navbar-brand">{HomeText.title}</p>
        <div className="d-flex align-items-center">
          <Link to={`/cafe`} className="text-white mx-3">
            {CafeText.menuText}
          </Link>
          <Link to={`/employee`} className="text-white mx-3">
            {EmployeeText.menuText}
          </Link>
        </div>
      </nav>
    </>
  );
}
