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
    
    <div className="addFriendCard" >
      <div><Link to={"/"+username+"/profile"}><img className = "imgUser" src={profileImage} alt={name}/></Link></div>
      <div className="userInfo">
        <h5 className="username">{username}</h5>
        <p className="name">{name}</p>
        <p className="status">{planStatus}</p>
      </div>
      <div><Link to={"/"+username+"/profile"} className="btn btn-primary">View Profile</Link></div>
    </div>  
  );
}

export default GuestComponent;