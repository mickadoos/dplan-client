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
    <div>
      <h1>Profile page</h1>
      <div className="card" style={{ width: "18rem" }}>
        <img src={profile.profileImage} className="card-img-top" alt="..." />
        {isUser && (
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
        )}

        <div className="card-body">
          <h5 className="card-title">{profile.name}</h5>
          <p className="card-text">
            <strong>Username: </strong>
            {profile.username}
          </p>
          <p className="card-text">
            <strong>Birthdate: </strong>
            {profile.birthdate?.slice(0, 10)}
          </p>
          <p className="card-text">
            <strong>Country: </strong>
            {profile.country}
          </p>
          {isUser && (
            <>
              <Link to={`/${profile.username}/profile/edit`}>
                Editar perfil
              </Link>
            </>
          )}
        </div>
      </div>
      <Link to={`/${user.username}/profile/friends`} ><h3>Friends</h3></Link>
      {/* {profile.friends?.length > 0? 
      <div id="carouselExampleControls" className="carousel carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {profile.friends?.map((friend, k) => {
          return <div className={`carousel-item ${k === 0? "active":""}`} data-bs-interval="10000" key={k}>
      <img src={friend.profileImage} className="d-block w-100" alt={friend.name}/>
      <div className="carousel-caption d-none d-md-block">
        <h5>{friend.name}</h5>
        <p>{friend.username}</p>
      </div>
      <Link to={`/${friend.username}/profile`}>
            <button>Profile</button>
          </Link>
    </div>
        })}
        </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div> : <h6>Friends not found</h6>} */}
      {isUser && (
        <>
          <h4>Friends Request: </h4>
          {profile.friendsToAccept?.length > 0 ? (
            profile.friendsToAccept.map((fri, k) => {
              return <PendingFriendComp fri={fri} updateHandler={updateHandler} key={k} />;
            })
          ) : (
            <p>You don't have requests</p>
          )}
        </>
      )}
    </div>
  );
}

export default ProfilePage;
