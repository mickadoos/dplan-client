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
  const [profileImage, setProfileImage] = useState("");


  const handleEmail = (e) => setEmail(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);
  const handleGender = (e) => setGender(e.target.value);
  const handleCountry = (e) => setCountry(e.target.value);
  const handlePhoneNumber = (e) => setPhoneNumber(e.target.value);
  const handleBirthdate = (e) => setBirthdate(e.target.value);
  const handleProfileImage = (e) => setProfileImage(e.target.files[0])


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

  const handleImgSubmit = (e) => {
    e.preventDefault();
    const uploadData = new FormData();
    uploadData.append('profileImage', profileImage)

    userService.editProfile(user.username, uploadData)
    .then(resp => {
      console.log("resp edit prof. post service: ", resp)
      storeToken(resp.data)
      authenticateUser()
      navigate(`/${user.username}/profile`);
    })
  }
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
    <div className="card" style={{ width: "18rem" }}>
        <img src={user.profileImage} className="card-img-top" alt={user.username} />
        
          <>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Editar foto
            </button>
            <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                      Editar foto perfil
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <form
                    onSubmit={handleImgSubmit}
                    encType="multipart/form-data"
                  >
                    <div className="modal-body">
                      <label>New Profile Image: </label>
                      <br />
                      <input
                        type="file"
                        name="profileImage"
                        onChange={handleProfileImage}
                      />
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        data-bs-dismiss="modal"
                      >
                        Save changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        
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
    </div>
  );
}

export default ProfileEditPage;