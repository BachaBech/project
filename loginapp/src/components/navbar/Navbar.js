import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { CurrentUser } from "../../apis/UserApi";
import { Avatar } from "@chakra-ui/react";
const Navbar = ({ ping }) => {
  const [user, setUser] = useState({});
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin");
  const isTeacher = localStorage.getItem("isTeacher");
  const isStd = localStorage.getItem("isStd");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("isTeacher");
    localStorage.removeItem("isStd");
  };

  const isLoggedIn = async () => {
    const userLg = await CurrentUser();
    setUser(userLg.data.user);
  };

  useEffect(() => {
    isLoggedIn();
  }, [ping]);

  return (

    <div>
      <nav class="navbar fixed-top  navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <button
            class="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="fas fa-bars"></i>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <a class="navbar-brand mt-2 mt-lg-0" href={!isAdmin && token && "/"}>
              <img
                className="drr"
                src="data:image/png;base64,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"
                alt="ISET Logo"
                loading="lazy"
                width="20%"
              />
            </a>

            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              {!isAdmin &&
                <>
                  <li class="nav-item">
                    <a class="nav-link" href="/">
                      Home
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/emp">
                      Emplois
                    </a>
                  </li>

                </>}

            </ul>
          </div>
          <div class="d-flex align-items-center">
            {!token ? (
              <>
                <a className="dropdown-item" href="/login">
                  <i className="fa fa-sign-in" aria-hidden="true" />
                  &nbsp; Login   &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                </a>
                <a className="dropdown-item" href="/register">
                  <i className="fa fa-user-plus" aria-hidden="true" />
                  &nbsp; Registre &nbsp; &nbsp; 
                </a>
              </>

            ) : (
              <>
                {isAdmin && (
                  <a className="dropdown-item" href="/dashboard">
                    <i className="fa fa-tachometer" aria-hidden="true" />
                    &nbsp; Dashboard &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  </a>

                )}

                {!isAdmin && (<>
                  <a className="dropdown-item"
                    href="/mychildren"
                  >
                    <i className="fa fa-user" aria-hidden="true" />
                    &nbsp; Profile &nbsp; &nbsp; &nbsp; 
                  </a></>)}


                <a
                  className="dropdown-item"
                  onClick={handleLogout}
                  href="/logout"
                >
                  <i className="fa fa-sign-out" aria-hidden="true" />
                  &nbsp; Logout &nbsp;&nbsp;
                </a>

              </>
            )}

          </div>

        </div>
      </nav>
    </div>
  );
};

export default Navbar;
