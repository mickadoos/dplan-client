import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PendingFriendComp from "../../components/PendingReq/PendingFriendComp";
import { AuthContext } from "../../context/auth.context";
import userService from "../../services/user.service";
import "./ProfilePage.css";
import { Navigate, useNavigate } from "react-router-dom";
import { prettyFormat } from "@testing-library/react";


function ProfilePage() {
  const {username} = useParams();

  const navigate = useNavigate();

  const { isLoggedIn, user, isLoading, authenticateUser, storeToken } = useContext(AuthContext);
  
  const [profileImage, setProfileImage] = useState("");
  const [profile, setProfile] = useState({});

  const [isUser, setIsUser] = useState(false)
  const [update, setUpdate] = useState(0)
  
  console.log("isUser: ", isUser)
  const handleProfileImage = (e) => setProfileImage(e.target.files[0])


  // useEffect(() => {
  //   userService.getUserProfile(username).then((resp) => {
  //     console.log(
  //       "resp data useEffect userService: ",
  //       resp.data.friendsToAccept.length
  //     );
  //     setProfile(resp.data);
  //   });
  // }, []);

  const updateHandler = (num) => {
    setUpdate(num)
  }
  
  useEffect(() => {
    userService.getUserProfile(username)
    .then((resp) => {
      console.log(
        "resp data useEffect userService: ",
        resp.data.friendsToAccept.length
      );
      setProfile(resp.data)
      if(user.username === resp.data.username ) setIsUser(true)
      if(user.username !== resp.data.username ) setIsUser(false)
    })
  }, [username, user, update]);

  console.log("profile: ", profile)

  const handleImgSubmit = (e) => {
    e.preventDefault();
    const uploadData = new FormData();
    uploadData.append('profileImage', profileImage)

    userService.editProfile(user.username, uploadData)
    .then(resp => {
      console.log("resp edit prof. post service: ", resp)
      storeToken(resp.data)
      authenticateUser()
      navigate(`/${profile.username}/profile`);
    })

  }

  return (
    <div className="divGen">
      <h1>Profile page</h1>
      <div className="profile" style={{ width: "18rem" }}>
        <img src={profile.profileImage} className="card-img-top profileImg" alt="..." />
        {isUser && (
          <>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Edit Profile Picture
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
                      Edit Profile Picture
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
        )}

        <div className="card-body">
        <div className="margins">
          <h5 className="card-text">
            {profile.username}
          </h5>
          <p className="card-title">{profile.name}</p>
        </div>
        <div className="margins">
          <p className="card-text">
            <strong>Birthdate: </strong>
            {profile.birthdate?.slice(0, 10)}
          </p>
        </div>
        <div className="margins">
          <p className="card-text">
            <strong>Country: </strong>
            {profile.country}
          </p>
        </div>
        <div className="margins"></div>
    
          {isUser && (
            <div className="btn btn-primary">Edit Profile
              <Link to={`/${profile.username}/profile/edit`}>
              </Link>
            </div>
          )}
        </div>
      </div>
      <Link to={`/${user.username}/profile/friends`} ><h3 className="btn btn-primary margins">Friends</h3></Link>
    
      {isUser && (
        <>
          <h4 className="colorText margins">Friends Request: </h4>
          {profile.friendsToAccept?.length > 0 ? (
            profile.friendsToAccept.map((fri, k) => {
              return <PendingFriendComp fri={fri} updateHandler={updateHandler} key={k} />;
            })
          ) : (
            <p className="colorText">You don't have requests</p>
          )}
        </>
      )}
    </div>
  );
}

export default ProfilePage;
