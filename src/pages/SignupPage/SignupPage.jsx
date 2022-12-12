import "./SignupPage.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);
  const handleGender = (e) => setGender(e.target.value);
  const handleCountry = (e) => setCountry(e.target.value);
  const handlePhoneNumber = (e) => setPhoneNumber(e.target.value);
  const handleBirthdate = (e) => setBirthdate(e.target.value);
  const handleProfileImage = (e) => setProfileImage(e.target.files[0])
  
  
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    // const requestBody = { email, password, name, username, gender, country, phoneNumber, birthdate, profileImage: uploadData}; //UPDATE MODEL

    const uploadData = new FormData();
    uploadData.append('email', email)
    uploadData.append('password', password)
    uploadData.append('name', name)
    uploadData.append('username', username)
    uploadData.append('gender', gender)
    uploadData.append('country', country)
    uploadData.append('phoneNumber', phoneNumber)
    uploadData.append('birthdate', birthdate)
    uploadData.append('profileImage', profileImage)

    // Send a request to the server using axios
    /* 
    const authToken = localStorage.getItem("authToken");
    axios.post(
      `${process.env.REACT_APP_SERVER_URL}/auth/signup`, 
      requestBody, 
      { headers: { Authorization: `Bearer ${authToken}` },
    })
    .then((response) => {})
    */

    // Or using a service
    authService
      .signup(uploadData)
      .then((response) => {
        // If the POST request is successful redirect to the login page
        navigate("/login");
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  const errorMessageClick = () => {
    setErrorMessage(null)
  }

  return (
    <div className="SignupPage">
      <h1>Sign Up</h1>

      <form className="container" onSubmit={handleSignupSubmit} encType="multipart/form-data">
        <label>Email:</label>
        <input className="form-control col-4" type="email" name="email" value={email} onChange={handleEmail} />
    <br></br>
    <br></br>
        <label>Password:</label>
        <input
        className="form-control col-4"
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />
        <br></br>
        <br></br>
        <label>Name:</label>
        <input className="form-control col-4" type="text" name="name" value={name} onChange={handleName} />
        <br></br>
        <br></br>
        <label>Username:</label>
        <input className="form-control col-4" type="text" name="username" value={username} onChange={handleUsername} />
        <br></br>
        <br></br>


        {/* <label htmlFor="gender">Gender:</label>
        <select name="gender" id="gender" multiple>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select> */}
        
      <label htmlFor="gender"> Select you gender: </label>
      <select name="gender" onChange={handleGender}>
        <option value="">Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <br></br>
      <br></br>

      <label>Country:</label>
      <input className="form-control col-4" type="text" name="country" value={country} onChange={handleCountry} />
    <br></br>
    <br></br>
       
      <label>Phone Number:</label>
      <input className="form-control col-4" type="tel" name="phoneNumber" pattern="[0-9]{9}" onChange={handlePhoneNumber}></input>
      <br></br>
      <br></br>

      <label>Birthdate:</label>
      <input  className="form-control col-4" type="date" id="datePickerId" onChange={handleBirthdate}/>
    <br></br>
    <br></br>
      
      <label>Profile Image:</label>
      <input type="file" name="profileImage" onChange={handleProfileImage}/>
      <br></br>
      <br></br>

        <button type="submit" className="btn btn-primary btn-block mb-4">Sign Up</button>
      </form>

      

      {errorMessage && 
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
        {errorMessage}
        <button type="button" onClick={errorMessageClick} className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      }


      <p>Already have account?</p>
      <Link to={"/login"}> Login</Link>
    </div>
  );
}

export default SignupPage;
