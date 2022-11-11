import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import userService from "../../services/user.service.js"
import { Link } from "react-router-dom";
import "./PersonAddFriends.css";

function PersonAddFriends({person, updatePeople}) {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
    const {_id, username, name, profileImage} = person

    const friendRequestHandle = ()=>{
        userService.sendFriendRequest(user.username, _id)
        .then (resp => {
          updatePeople (Math.random()*1000)
        })
    }

  return (
    <div className="addFriendCard" >
      <div><Link to={"/"+username+"/profile"}><img className = "imgUser" src={profileImage} alt={name}/></Link></div>
      <div className="userInfo">
        <h5 className="username">{username}</h5>
        <p className="name">{name}</p>
      </div>
      <div><button className="btn btn-primary" onClick={friendRequestHandle}>Send Friend Request</button></div>
    </div>
  );
}

export default PersonAddFriends;