import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav>

      {isLoggedIn && (
        <>
        <nav className="navbar navbar-dark bg-dark fixed-top">
  <div className="container-fluid">
  <Link to={"/plans"} className="navbar-brand">Home Page</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">{user.username}</h5>
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to={"/" + user.usename + "/profile"}>My Profile</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"/" + user.usename + "/addFriends"}>Add Friends</Link>
          </li>
          <li className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Plan
            </Link>
            <ul className="dropdown-menu dropdown-menu-dark">
              <li><Link className="dropdown-item" to="/plans/newPlan">Create a Plan</Link></li>
              <li><a className="dropdown-item" href="#">Another action</a></li>
              <li>
                <hr className="dropdown-divider"></hr>
              </li>
              <li><a className="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
        </ul>
        <form className="d-flex mt-3" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-success" type="submit">Search</button>
        </form>
        <br></br>
        <button className="btn btn-danger" type="submit" onClick={logOutUser}>Log out</button>

      </div>
    </div>
  </div>
</nav>
<br></br>
<br></br>
          {/* <Link to="/plans">
            <button>Plans</button>
          </Link>
          <Link to="/plans/newPlan">
            <button>New Plan</button>
          </Link>
          <br></br>
          <Link to={`/${user.username}/profile`}>
            <button>User Profile</button>
          </Link>
          <Link to={`/${user.username}/addFriends`}>
            <button>Add Friends</button>
          </Link>
          <Link to={`/${user.username}/invite`}>
            <button>Invite</button>
          </Link> 
           <span>{user && user.name}</span>
          <br></br>
          <button onClick={logOutUser}>Logout</button> */}

        </>
      )}

      {!isLoggedIn && (
        <>
          {/* <Link to="/signup">
            {" "}
            <button>Sign Up</button>{" "}
          </Link>
          <Link to="/login">
            {" "}
            <button>Login</button>{" "}
          </Link> */}
        </>
      )}
    </nav>
  );
}

export default Navbar;
