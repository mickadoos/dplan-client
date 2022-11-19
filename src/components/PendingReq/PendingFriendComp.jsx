import userService from "../../services/user.service.js"
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Link } from "react-router-dom";
import "./Pending.css";



function PendingFriendComp({ fri, updateHandler }) {

    const { user } = useContext(AuthContext);
    
    const acceptHandle = () => {
        userService.acceptFriendRequest(user.username, fri._id)
        .then(resp => {
            updateHandler(Math.random()*100000)
        })
    }

    const declinetHandle = () => {
        userService.declineFriendRequest(user.username, fri._id)
        .then(resp => {
            updateHandler(Math.random()*100000)
          })
    }

  return ( 
    <div className="pendingFriendCard" >
      <Link to={"/"+fri.username+"/profile"} className=""><img className = "profilePicPending" src={fri.profileImage} alt={fri.name}/></Link>
      <div className="userInfoPending">
        <h5 className="usernamePending">{fri.username}</h5>
      </div>
      <div className="RequestButtons">
        <button className="btn btn-primary rqButtPending" onClick={acceptHandle}>Accept Request</button>
        <button className="btn btn-secondary rqButtPending" onClick={declinetHandle}>Decline Request</button>
      </div>
      <div className="RequestButtonDecline"></div>
    </div>
  );
}

export default PendingFriendComp;