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
    // <div className="card" style= {{"width": "18rem"}}>
    //     <img src={profileImage} alt={name}/>
    //     <div className="card-body">
    //         <h5 className="card-title">{username}</h5>
    //         <p className="card-text">{name}</p>
    //         <Link to={"/"+username+"/profile"} className="btn btn-primary">View Profile</Link>
    //         <button href="#" className="btn btn-primary" onClick={friendRequestHandle}>Send Friend Request</button>
    //     </div>
    // </div>

    <div className="addFriendCard" >
      <div><Link to={"/"+username+"/profile"}><img className = "imgUser" src={profileImage} alt={name}/></Link></div>
      <div className="userInfo">
        <h5 className="username">{username}</h5>
        <p className="name">{name}</p>
      </div>
      <div><button className="btn btn-primary" onClick={friendRequestHandle}>Send Friend Request</button></div>
    </div>
/* <div> GLOBAL
    <div>TITLE</div>
    <div>SEARCH BAR</div>
    <div>CONTENT CONTAINER

      <div>SINGLE PERSON
        <div>IMG</div>
        <div>USERNAME</div>
        <div>NAME</div>
        <div>BUTTON REQUEST</div>
      </div>

    </div>

</div> */
    

  );
}

export default PersonAddFriends;