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
    <div className="addFriendCard1" >
      <Link to={"/"+username+"/profile"} className=""><img className = "imgUserAddF profilePic" src={profileImage} alt={name}/></Link>
      <div className="userInfo1">
        <h5 className="username1">{username}</h5>
        <p className="name1">{name}</p>
      </div>
      <div className="RequestButton1"><button className="btn btn-primary rqButt" onClick={friendRequestHandle}>Send Friend Request</button></div>
    </div>
  );
}

export default PersonAddFriends;