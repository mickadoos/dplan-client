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
            <Link to={"/plans"} className="navbar-brand"><img className = "logo" src={logo} alt="logo"></img></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse burgerOpen" id="navbarSupportedContent" data-bs-toggle="collapse" data-bs-target=".navbar-collapse">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item active">
                  <Link className="nav-link" aria-current="page" to={"/" + user.username + "/profile"}><img className = "profileImageNav profilePicNav" src={user.profileImage} alt="logo"></img></Link>
                </li>
                <li className="nav-item active">
                  <Link to={"/plans"} className="nav-link" aria-current="page"><p>{user.username} Plans</p></Link>
                </li>
                <li className="nav-item active">
                  <Link className="nav-link" to={"/" + user.usename + "/addFriends"}><p>Add Friends</p></Link>
                </li>
                <li className="nav-item active">
                      <Link className="nav-link" to="/plans/newPlan"><p>Create a Plan</p></Link>
                    </li>
                {/* <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li><a className="dropdown-item" href="#">Another action</a></li>
                    <li><hr className="dropdown-divider"/></li>
                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                  </ul>
                </li> */}
                <li className="nav-item dropdown logOutDiv">
                    <button className="btn btn-danger" type="submit" onClick={logOutUser}>Log out</button>
                </li>
              </ul>
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
