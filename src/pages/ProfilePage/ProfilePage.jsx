import { useContext, useEffect, useState } from "react";
import PendingFriendComp from "../../components/PendingReq/PendingFriendComp";
import { AuthContext } from "../../context/auth.context";
import userService from "../../services/user.service";
import "./ProfilePage.css";

function ProfilePage() {
  const { isLoggedIn, user, isLoading } = useContext(AuthContext);

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

  return (
    <div>
      <h1>Profile page</h1>
      <div className="card" style={{ width: "18rem" }}>
        <img src={user.profileImage} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{user.name}</h5>
          <p className="card-text">
            <span>Username: {user.username}</span>
          </p>
        </div>
      </div>
      <h4>Friends Request: </h4>
      {profile.friendsToAccept?.length > 0?
        profile.friendsToAccept.map((fri, k) => {
          return <PendingFriendComp fri={fri} key={k} />;
        }): <p>You don't have friends</p>}
    </div>
  );
}

export default ProfilePage;
