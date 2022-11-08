import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { useParams, Link } from "react-router-dom";
import planService from "../../services/plan.service.js"

function PersonInvite({friend, updatePeople}) {
    const {planId} = useParams();
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
    const {_id, username, name, profileImage} = friend

    const inviteHandle = ()=>{
        planService.inviteGuestsFriends(planId, _id)
        .then (resp => {
            console.log("INVITE - FRONT. Resp: ", resp)
            updatePeople (Math.random()*1000)
          })
    }

  return (
    <div className="card" style= {{"width": "18rem"}}>
        <img src={profileImage} alt={name}/>
        <div className="card-body">
            <h5 className="card-title">{username}</h5>
            <p className="card-text">{name}</p>
            {/* <Link to={"/"+username+"/profile"} className="btn btn-primary">View Profile</Link> */}
            <button href="#" className="btn btn-primary" onClick={inviteHandle}>Invite</button>
        </div>
    </div>

    
  );
}

export default PersonInvite;