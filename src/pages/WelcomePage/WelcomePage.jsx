import "./WelcomePage.css";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { useParams, Link } from "react-router-dom";


function WelcomePage() {

  return (
    <div className="welcomePage">
    <h1 className="bigTitle">YOUR PLANS YOUR WAY</h1>
    <p className="DPlanDescription">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
    <div className="buttonStart">
        <Link className="btn btn-primary buttonDetails" to={"/login"}>Start DPlanning</Link>
    </div>
    </div>
  );
}

export default WelcomePage;