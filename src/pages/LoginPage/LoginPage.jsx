import "./LoginPage.css";
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import authService from "../../services/auth.service";
import logo from "../../assets/DPlan Logo.png";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [isLoading, setisLoading] = useState(false);
  const [displayText, setDisplayText] = useState(false);
  const [loadingText, setLoadingText] = useState("");


  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const loadingMessages = [
    "First time it takes a while...",
    "It takes less than a minute, I swear...",
    "al_ps says: Free plans are noted as having slower deploys...",
    "Thank you so much for your patience, it will be worth it!",
    "We're almost there..........."
  ]

  useEffect(() => {
    if (isLoading) {
      setDisplayText(true);
      let messageIndex = 0;
      const timer = setInterval(() => {
        setLoadingText(loadingMessages[messageIndex++ % loadingMessages.length]);
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { username, password };
    setisLoading(true);

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
        console.log(response.data.authToken);
        storeToken(response.data.authToken);
        authenticateUser();
        setisLoading(false);
        navigate("/plans");
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setisLoading(false);
        setErrorMessage(errorDescription);
      });
  };

  const errorMessageClick = () => {
    setErrorMessage(null);
  };

  return (
    <div className="LoginPage">
      <img className="DPlanLogo" src={logo} alt="DPlan logo"></img>
      <h1>Login</h1>

      {isLoading ? (
        <div className="spinner"></div>
      ) : (
        <form onSubmit={handleLoginSubmit} className="container">
          {/* <!-- Username input --> */}
          <div className="form-outline mb-4">
            <label className="form-label col-4" htmlFor="form2Example1">
              Username
            </label>
            <input
              type="text"
              id="form2Example1"
              className="form-control col-4"
              name="username"
              value={username}
              onChange={handleUsername}
            />
          </div>

          {/* <!-- Password input --> */}
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form2Example2">
              Password
            </label>
            <input
              type="password"
              id="form2Example2"
              className="form-control"
              name="password"
              value={password}
              onChange={handlePassword}
            />
          </div>

          {/* <!-- Submit button --> */}
          <button type="submit" className="btn btn-primary btn-block mb-4">
            Sign in
          </button>
        </form>
      )}

      {displayText && isLoading && <p>{loadingText}</p>}

      {errorMessage && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {errorMessage}
          <button
            type="button"
            onClick={errorMessageClick}
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
      <p>Don't have an account yet?</p>
      <Link to={"/signup"}> Register</Link>
    </div>
  );
}

export default LoginPage;
