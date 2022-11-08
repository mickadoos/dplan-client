import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Link } from "react-router-dom";

function FriendComponent({friend}) {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
    const {_id, username, name, profileImage} = friend


  return (
    <div className="card" style={{"width": "18rem"}}>
        <img src={profileImage} alt={name}/>
        <div className="card-body">
            <h5 className="card-title">{username}</h5>
            <p className="card-text">{name}</p>
            <Link to={"/"+username+"/profile"} className="btn btn-primary">View Profile</Link>
        </div>
    </div>

    
  );
}

export default FriendComponent;