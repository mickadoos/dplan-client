import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Link } from "react-router-dom";
import "./PersonUserFriends.css";

function FriendComponent({ friend }) {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const { _id, username, name, profileImage } = friend;

  return (
    <>
      <div className="friendCard">
        <div>
          <Link to={"/" + username + "/profile"}>
            <img
              className="imgUserFriends profilePicfriends"
              src={profileImage}
              alt={name}
            />
          </Link>
        </div>
        <div className="userInfoFriends">
          <h5 className="usernameFriends">{username}</h5>
        </div>
      </div>
    </>
  );
}

export default FriendComponent;
