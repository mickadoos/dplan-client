import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Link } from "react-router-dom";

function GuestComponent({guest}) {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
    const {_id, username, name, profileImage} = guest //status missing


  return (
    <div className="card" Style= "width: 18rem;">
        <img src={profileImage} alt={name}/>
        <div className="card-body">
            <h5 className="card-title">{username}</h5>
            <p className="card-text">{name}</p>
            {/* <Link to={"/"+username+"/profile"} className="btn btn-primary">View Profile</Link> */}
        </div>
    </div>

    
  );
}

export default GuestComponent;