import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Link } from "react-router-dom";
import "./PersonUserFriends.css";

function FriendComponent({friend}) {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
    const {_id, username, name, profileImage} = friend


  return (
    <>
    <div className="addFriendCard" >
      <div><Link to={"/"+username+"/profile"}><img className = "imgUser" src={profileImage} alt={name}/></Link></div>
      <div className="userInfo">
        <h5 className="username">{username}</h5>
        <p className="name">{name}</p>
      </div>
      <div><Link to={"/"+username+"/profile"} className="btn btn-primary">View Profile</Link></div>
    </div>  
    </>

    
  );
}

export default FriendComponent;