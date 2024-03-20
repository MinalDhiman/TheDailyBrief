import axios from "axios";
import React from "react";
import{Link} from "react-router-dom";

const Navbar = () => {
  const handleLogout=()=>{
    axios.get("http://localhost:8080/logout",{
      withCredentials:true
    }).then(response=>window.location.href="/").catch(error=>{
      console.error("Error while logout",error);
    })
  }
  return (
    <>
    <nav className="navbar sticky-top navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/general">
         The  Daily Brief
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link"  to="/general">
               General
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link"  to="/business">
                Business
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link"  to="entertainment">
                Entertainment
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link"  to="sports">
                Sports
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="technology">
                Technology
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="health">
                Health
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="saved">
                SAVED
              </Link>
            </li>
          </ul>
          <div className="d-flex "> 
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              
              
            />
            <button className="btn btn-outline-success " >
              Search
            </button>
            <button className="btn  bg-primary mx-2" onClick={handleLogout}>
              {/* <Link to="/login" style={{textDecoration:"none",color:"white",padding:"0px 2px  "}}> */}
              logout
              {/* </Link> */}
            </button>
          </div>
        </div>
      </div>
    </nav>
   
    </>
  );
};

export default Navbar;
