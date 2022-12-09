import "./LoginPage.css";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import authService from "../../services/auth.service";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { username, password };

    // Send a request to the server using axios
    /* 
    axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`)
      .then((response) => {})
    */

    // Or using a service
    authService
      .login(requestBody)
      .then((response) => {
        // If the POST request is successful store the authentication token,
        // after the token is stored authenticate the user
        // and at last navigate to the home page
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/plans");
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="LoginPage">
      <h1>Login</h1>

      {/* <form onSubmit={handleLoginSubmit}>
        <label>Username:</label>
        <input type="text" name="username" value={username} onChange={handleUsername} />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <button type="submit">Login</button>
      </form> */}

      <form onSubmit={handleLoginSubmit} className="container">
  {/* <!-- Username input --> */}
  <div className="form-outline mb-4">
    <input type="text" id="form2Example1" className="form-control col-4" name="username" value={username} onChange={handleUsername} />
    <label className="form-label col-4" htmlFor="form2Example1">Username</label>
  </div>

  {/* <!-- Password input --> */}
  <div className="form-outline mb-4">
    <input type="password" id="form2Example2" className="form-control" name="password"
          value={password}
          onChange={handlePassword} />
    <label className="form-label" htmlFor="form2Example2">Password</label>
  </div>

 
  {/* <!-- Submit button --> */}
  <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>

</form>



      {errorMessage && 
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
        {errorMessage}
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      }
      <p>Don't have an account yet?</p>
      <Link to={"/signup"}> Register</Link>
      
    </div>
  );
}

export default LoginPage;
