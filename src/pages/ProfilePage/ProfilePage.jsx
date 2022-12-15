import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PendingFriendComp from "../../components/PendingReq/PendingFriendComp";
import { AuthContext } from "../../context/auth.context";
import userService from "../../services/user.service";
import "./ProfilePage.css";
import editIcon from "../../assets/edit_icon.png";
import guestsIcon from "../../assets/Guests_icon.png";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const { username } = useParams();

  const navigate = useNavigate();

  const { user, authenticateUser, storeToken } = useContext(AuthContext);

  const [profileImage, setProfileImage] = useState("");
  const [profile, setProfile] = useState({});

  const [isUser, setIsUser] = useState(false);
  const [update, setUpdate] = useState(0);

  const handleProfileImage = (e) => setProfileImage(e.target.files[0]);

  const updateHandler = (num) => {
    setUpdate(num);
  };

  useEffect(() => {
    userService.getUserProfile(username).then((resp) => {
      setProfile(resp.data);
      if (user.username === resp.data.username) setIsUser(true);
      if (user.username !== resp.data.username) setIsUser(false);
    });
  }, [username, user, update]);

  const handleImgSubmit = (e) => {
    e.preventDefault();
    const uploadData = new FormData();
    uploadData.append("profileImage", profileImage);

    userService.editProfile(user.username, uploadData).then((resp) => {
      storeToken(resp.data);
      authenticateUser();
      navigate(`/${profile.username}/profile`);
    });
  };

  return (
    <div className="divGen">
      <h1>Profile page</h1>
      <div className="profile">
        <div className="usernameEdit">
          <div className="emptyDiv"></div>
          <div>
            <h4 className="card-text usernameInfo">{profile.username}</h4>
          </div>
          {isUser && (
            <div>
              <Link to={`/${profile.username}/profile/edit`} className="">
                <img src={editIcon} alt="edit icon" className="editIcon" />
              </Link>
            </div>
          )}
          {!isUser && <div className="emptyDiv"></div>}
        </div>
        <div className="rowInfo">
          <div className="margins">
            <img
              src={profile.profileImage}
              className="card-img-top profileImgProfile"
              alt="..."
            />
          </div>
          <div className="card-body infoProfile">
            <div className="margins">
              <p className="card-title colorText">{profile.name}</p>
            </div>
            <div className="margins">
              <p className="card-text colorText">
                <strong className="colorText">Birthdate: </strong>
                {profile.birthdate?.slice(0, 10)}
              </p>
            </div>
            <div className="margins">
              <p className="card-text colorText">
                <strong className="colorText">Country: </strong>
                {profile.country}
              </p>
            </div>
            <Link to={`/${profile.username}/profile/friends`}>
              <img
                className="friendsIcon"
                src={guestsIcon}
                alt="User Friends icon"
              />
            </Link>
          </div>
        </div>
      </div>

      <p className="margins2" />
      {isUser && (
        <>
          <h5 className="colorText margins">
            Friend Requests ({profile.friendsToAccept?.length}):{" "}
          </h5>
          <div className="contentContainerFriendReqs">
            {profile.friendsToAccept?.length > 0 ? (
              profile.friendsToAccept.map((fri, k) => {
                return (
                  <PendingFriendComp
                    fri={fri}
                    updateHandler={updateHandler}
                    key={k}
                  />
                );
              })
            ) : (
              <p className="colorText"></p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default ProfilePage;
