import { useEffect } from "react";
import { useState } from "react";
import userService from "../../services/user.service.js"
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Navigate, useNavigate } from "react-router-dom";



function PendingFriendComp({ fri, updateHandler }) {
    const navigate = useNavigate();

    const { user } = useContext(AuthContext);
    
    const acceptHandle = () => {
        userService.acceptFriendRequest(user.username, fri._id)
        .then(resp => {
            console.log(resp.data)
            updateHandler(Math.random()*100000)
        })
    }

    const declinetHandle = () => {
        userService.declineFriendRequest(user.username, fri._id)
        .then(resp => {
            console.log(resp.data)
            updateHandler(Math.random()*100000)
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