import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Link } from "react-router-dom";
import "./PersonGuests.css";

function GuestComponent({guest, planId}) {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
    const { username, name, profileImage, plans } = guest //status missing

    let planStatus = ""
    plans.forEach(plan => {
      if (plan._id === planId){
        planStatus = plan.status
      }
    })


  return (
    
    <div className="guestsCard" >
      <div><Link to={"/"+username+"/profile"}><img className = "imgUserGuests profilePicGuests" src={profileImage} alt={name}/></Link></div>
      <div className="userInfoGuests">
        <h5 className="usernameGuests">{username}</h5>
        <p className="status">{planStatus}</p>
      </div>
    </div>  
  );
}

export default GuestComponent;