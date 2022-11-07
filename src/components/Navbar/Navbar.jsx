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
          

          <Link to="/plans">
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
          <button onClick={logOutUser}>Logout</button>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup">
            {" "}
            <button>Sign Up</button>{" "}
          </Link>
          <Link to="/login">
            {" "}
            <button>Login</button>{" "}
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
