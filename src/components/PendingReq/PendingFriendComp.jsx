import { useEffect } from "react";
import { useState } from "react";
import userService from "../../services/user.service.js"
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";


function PendingFriendComp({ fri }) {

    const { user } = useContext(AuthContext);
    
    const acceptHandle = () => {
        userService.acceptFriendRequest(user.username, fri._id)
        .then(resp => {
            console.log(resp.data)
        })
    }

    const declinetHandle = () => {
        userService.declineFriendRequest(user.username, fri._id)
        .then(resp => {
            console.log(resp.data)
        })
    }

  return (
    <div className="col-sm-6">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{fri.name}</h5>
          <p className="card-text">
            {fri.username}
          </p>
          <button
            onClick={acceptHandle}
            className="btn btn-primary text-bg-success">
            Aceptar amistad
          </button>
          <button
            onClick={declinetHandle}
            className="btn btn-primary text-bg-danger ">
            Rechazar amistad
          </button>
        </div>
      </div>
    </div>
  );
}

export default PendingFriendComp;