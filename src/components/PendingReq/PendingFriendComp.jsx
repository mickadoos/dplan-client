import userService from "../../services/user.service.js"
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
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
    <div className="col-sm-6">
      <div className="cardA">
        <div className="card-body">
          <h5 className="card-text">
            {fri.username}
          </h5>
          <button
            onClick={acceptHandle}
            className="btn btn-success">
            Aceptar amistad
          </button>
          <button
            onClick={declinetHandle}
            className="btn btn-danger">
            Rechazar amistad
          </button>
        </div>
      </div>
    </div>
  );
}

export default PendingFriendComp;