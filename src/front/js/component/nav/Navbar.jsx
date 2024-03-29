import { faHouse, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/nav.css";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <>
      <nav className="nav d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <FontAwesomeIcon
            icon={faHouse}
            className="iconos ms-4"
            onClick={() => navigate("/")}
          />
        </div>
        <div className="d-flex align-items-center">
          <FontAwesomeIcon
            icon={faUser}
            className="iconos me-4"
            onClick={() => navigate("/login")}
          />
        </div>
      </nav>
    </>
  );
};
