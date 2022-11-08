import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Link } from "react-router-dom";

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
    <div className="card" style= {{"width": "18rem"}}>
        <img src={profileImage} alt={name}/>
        <div className="card-body">
            <h5 className="card-title">{username}</h5>
            <p className="card-text">{name}</p>
            <p className="card-text">{planStatus}</p>
            <Link to={"/"+username+"/profile"} className="btn btn-primary">View Profile</Link>
        </div>
    </div>

    
  );
}

export default GuestComponent;