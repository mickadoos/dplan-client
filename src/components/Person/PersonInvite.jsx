import { useParams, Link } from "react-router-dom";
import planService from "../../services/plan.service.js"
import "./PersonInvite.css";

function PersonInvite({friend, updatePeople}) {
    const {planId} = useParams();
    const {_id, username, name, profileImage} = friend

    const inviteHandle = ()=>{
        planService.inviteGuestsFriends(planId, _id)
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
        <button href="#" className="btn btn-primary" onClick={inviteHandle}>Invite</button>
      </div>
    </div>  
  );
}

export default PersonInvite;