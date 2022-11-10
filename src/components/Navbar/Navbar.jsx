import "./Navbar.css";
import { Link } from "react-router-dom";
import { useEffect, useState, useContext, React } from "react";
import { AuthContext } from "../../context/auth.context";
import logo from "../../assets/DPlan Logo.png"

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  
  return (
    <nav>

    {isLoggedIn && 
      <>
        <nav className="navbar navbar-dark navBarBackground fixed-top">
          <div className="container-fluid"> 
            <div>
              <Link className="nav-link active" aria-current="page" to={"/" + user.username + "/profile"}><img className = "profileImage" src={user.profileImage} alt="logo"></img></Link>
            </div>
            <div>
              <Link to={"/plans"} className="navbar-brand"><img className = "logo" src={logo} alt="logo"></img></Link>
            </div>
            <div>
              <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                <div className="offcanvas-header">
                  <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                  <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                    <li className="nav-item">
                      <Link to={"/plans"} className="nav-link">Plans Overview</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" aria-current="page" to={"/" + user.username + "/profile"}>My Profile</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={"/" + user.usename + "/addFriends"}>Add Friends</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/plans/newPlan">Create a Plan</Link>
                    </li>
                  </ul>
                  <br></br>
                  <button className="btn btn-danger" type="submit" onClick={logOutUser}>Log out</button>

                </div>
              </div>
            </div>
          </div>
        </nav>
      
      </>
            }

            {!isLoggedIn && (
              <>
              </>
            )}
    </nav>
  );
}

export default Navbar;
