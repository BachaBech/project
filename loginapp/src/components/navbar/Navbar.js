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
                src="https://static.wixstatic.com/media/558f8a_0d3e12a204df406380fcee16f35f23aa~mv2.jpg/v1/fit/w_2500,h_1330,al_c/558f8a_0d3e12a204df406380fcee16f35f23aa~mv2.jpg"
                alt="ISET Logo"
                loading="lazy"
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
                  &nbsp; Login &nbsp;&nbsp; &nbsp;
                </a>
                <a className="dropdown-item" href="/register">
                  <i className="fa fa-user-plus" aria-hidden="true" />
                  &nbsp; Registre &nbsp;&nbsp;
                </a>
              </>

            ) : (
              <>
                {isAdmin && (
                  <a className="dropdown-item" href="/dashboard">
                    <i className="fa fa-tachometer" aria-hidden="true" />
                    &nbsp; Dashboard &nbsp; &nbsp;
                  </a>

                )}

                {!isAdmin && (<>
                  <a className="dropdown-item"
                    href="/mychildren"
                  >
                    <i className="fa fa-user" aria-hidden="true" />
                    &nbsp; Profile &nbsp; &nbsp;
                  </a></>)}


                <a
                  className="dropdown-item"
                  onClick={handleLogout}
                  href="/logout"
                >
                  <i className="fa fa-sign-out" aria-hidden="true" />
                  &nbsp; Logout &nbsp;
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
