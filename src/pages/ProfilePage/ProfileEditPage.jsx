import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import authService from "../../services/auth.service";
import userService from "../../services/user.service";
import "./ProfileEditPage.css";

function ProfileEditPage() {

  const { isLoading ,user, authenticateUser, storeToken } = useContext(AuthContext)

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const handleEmail = (e) => setEmail(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);
  const handleGender = (e) => setGender(e.target.value);
  const handleCountry = (e) => setCountry(e.target.value);
  const handlePhoneNumber = (e) => setPhoneNumber(e.target.value);
  const handleBirthdate = (e) => setBirthdate(e.target.value);

  useEffect(() => {
    if(user){
      console.log("user: ", user)
    userService.getUserProfile(user.username)
    .then((resp) => {
      console.log(
        "resp data useEffect prof.Edit.Page: ",
        resp
      );
      setEmail(resp.data.email);
      setName(resp.data.name);
      setUsername(resp.data.username);
      setGender(resp.data.gender);
      setCountry(resp.data.country);
      setPhoneNumber(resp.data.phoneNumber);
      setBirthdate(resp.data.birthdate);
    })
    .catch(err => {
      console.log("err, ", err)
    })
  }
  },[isLoading]);

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const bodyEdit = {
      email,
      name,
      username,
      gender,
      country,
      phoneNumber,
      birthdate
    }

    userService.editProfile(user.username, bodyEdit)
    .then(resp => {
      console.log("resp edit prof. post service: ", resp)
      storeToken(resp.data)
      authenticateUser()
      navigate(`/${username}/profile`);
    })
  }

  return (
    <div>
    <h1>Edit Profile</h1>
    <form onSubmit={handleSignupSubmit} encType="multipart/form-data">
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmail} />

        <label>Name:</label>
        <input type="text" name="name" value={name} onChange={handleName} />

        <label>Username:</label>
        <input type="text" name="username" value={username} onChange={handleUsername} />
        
      <label htmlFor="gender"> Select you gender: </label>
      <select name="gender" onChange={handleGender}>
        <option value="">Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <br></br>

      <label>Country:</label>
      <input type="text" name="country" value={country} onChange={handleCountry} />
       
      <label>Phone Number:</label>
      <input type="tel" name="phoneNumber" pattern="[0-9]{9}" value={phoneNumber} onChange={handlePhoneNumber}></input>

      <label>Birthdate:</label>
      <input type="date" id="datePickerId" onChange={handleBirthdate}/>
      
      <br></br>

        <button type="submit">Confirm changes</button>
      </form>
    </div>
  );
}

export default ProfileEditPage;