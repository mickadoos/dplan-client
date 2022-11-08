import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PendingFriendComp from "../../components/PendingReq/PendingFriendComp";
import { AuthContext } from "../../context/auth.context";
import userService from "../../services/user.service";
import "./ProfilePage.css";
import { Navigate, useNavigate } from "react-router-dom";


function ProfilePage() {

  const navigate = useNavigate();

  const { isLoggedIn, user, isLoading, authenticateUser, storeToken } = useContext(AuthContext);

  const [profileImage, setProfileImage] = useState("");

  const handleProfileImage = (e) => setProfileImage(e.target.files[0])

  const [profile, setProfile] = useState({});

  useEffect(() => {
    userService.getUserProfile(user.username).then((resp) => {
      console.log(
        "resp data useEffect userService: ",
        resp.data.friendsToAccept.length
      );
      setProfile(resp.data);
    });
  }, []);

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
        <img src={user.profileImage} className="card-img-top" alt="..." />

        {/* <!-- Button trigger modal --> */}
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Editar foto
</button>

{/* <!-- Modal --> */}
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Editar foto perfil</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form onSubmit={handleImgSubmit} encType="multipart/form-data">
      <div class="modal-body">
      <label>New Profile Image: </label><br/>
      <input type="file" name="profileImage" onChange={handleProfileImage}/>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
      </div>
      </form>
    </div>
  </div>
</div>

        <div className="card-body">
          <h5 className="card-title">{user.name}</h5>
          <p className="card-text">
            <span>Username: {user.username}</span>
          </p>
          <Link to={`/${user.username}/profile/edit`} >Editar perfil</Link>
        </div>
      </div>
      <h4>Friends Request: </h4>
      {profile.friendsToAccept?.length > 0?
        profile.friendsToAccept.map((fri, k) => {
          return <PendingFriendComp fri={fri} key={k} />;
        }): <p>You don't have requests</p>}
    </div>
  );
}

export default ProfilePage;
