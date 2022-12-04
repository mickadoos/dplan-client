import "./WelcomePage.css";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { useParams, Link } from "react-router-dom";


function WelcomePage() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <div className="welcomePage">
    <h1 className="bigTitle">YOUR PLANS YOUR WAY</h1>
    <p className="DPlanDescription">Planning events has never been easier. <br/><br/>Create, share, experience and organize events quickly, easily and fun.</p>
    <div className="buttonStart">
        <Link className="btn btn-primary buttonDetails" to={"/login"}>Start DPlanning</Link>
    </div>
    </div>
  );
}

export default WelcomePage;