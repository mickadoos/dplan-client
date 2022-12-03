import "./PlanPage.css";
import { useEffect, useState, useContext, React} from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import planService from "../../services/plan.service";
import guestsIcon from "../../assets/Guests_icon.png";
import calendarLogo from "../../assets/calendar-icon.png";
import spotifyIcon from "../../assets/spotifyIcon.png";
import picsIcon from "../../assets/picsIcon.png"
import linkIcon from "../../assets/linkIcon.png"

let guestsSearch

function PlanPage() {
  const {isLoggedIn, user } = useContext(AuthContext);
  const {planId} = useParams();
  const [plan, setPlan] = useState({});
  const [update, setUpdate] = useState(0)
  const [status, setStatus] = useState(false)

  const [guests, setGuests] = useState();

  const navigate = useNavigate();

  const updatePlan = (num) => {
    setUpdate(num)
  }

  const acceptHandle = () => {
    planService.acceptPlan(planId, user.username)
    .then(resp => {
        setStatus (true)
        updatePlan(Math.random()*1000)  
    })
  }

  const declineHandle = () => {
    planService.declinePlan(planId, user.username)
    .then(resp => {
        setStatus (true)
        updatePlan(Math.random()*1000)
    })
  }


  useEffect(()=>{
    planService.getPlan(planId)
    .then(response => {
        setPlan(response.data);
    })

  }, [isLoggedIn, planId, update])

  useEffect (() => {
    if(isLoggedIn){
      planService.getGuests(planId)
      .then (resp => {
        guestsSearch = []
        if(resp.data.invited.length > 0){
          resp.data.invited.map(guest => {
            return guestsSearch.push(guest)
          })}
        if(resp.data.accepted.length > 0){
          resp.data.accepted.map(guest1 => {
            return guestsSearch.push(guest1)
          })}
        if(resp.data.declined.length > 0){
          resp.data.declined.map(guest2 => {
            return guestsSearch.push(guest2)
          })}
        setGuests(guestsSearch)
      })}
    
  },[isLoggedIn, planId, update])

const handleEdit = (e) => navigate('/plans/' + planId + '/edit');

const planPhoto = {
    backgroundImage: `url(${plan?.planImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center top",
    height: "60vh",
    // borderRadius: "10px"
};

  return (
    
      <div className="planDiv">
        <div className="headPlan" style = {planPhoto}>
          <div className="titleBgnd">
            <h2 className="title">{plan.title}</h2>
            <div className="planDetDateDiv"><img className="calendarlogoPlanDet" src={calendarLogo} alt="Calendar Icon"/><h6 className="dateInfo">Date: {plan.date} at {plan.time}</h6></div>
            <div className="DIV-BUTTONS buttonsPlan">
          {plan.isAdmin !== user.username && !status && plan.invited?.includes(user._id) && <div className="">
                  <button
                    onClick={acceptHandle} type="button"
                    className="btn btn-primary btn-success">
                    Confirm
                  </button>
                  <button
                    onClick={declineHandle} type="button"
                    className="btn btn-primary btn-danger declineButton">
                    Decline
                  </button>
            </div>}
            { (plan.isAdmin === user.username || user.username === "moderador") &&  <div>
              <button type="button" className="btn btn-secondary editPlanBut" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={handleEdit}>
                Edit this plan
              </button>
            </div>}
          </div>
          <p className="CreatedBy">Created by: <Link className="createdByUser" to={`/${plan.isAdmin}/profile`}>{plan.isAdmin === user.username? "Me" : plan.isAdmin}</Link></p>
          </div>
          <div className="DIV-GUESTSICON guestsPosition">
          {guests?.length > 0 && <img className="guestsGlimpse" src={guests[0].profileImage} alt="guest profImg"/>}
          {guests?.length > 1 && <img className="guestsGlimpse" src={guests[1].profileImage} alt="guest profImg"/>}
          {guests?.length > 2 && <img className="guestsGlimpse" src={guests[2].profileImage} alt="guest profImg"/>}
          {/* <Link to={"/plans/"+planId+"/guests"}><img className="guestsIcon" src={guestsIcon} alt="Plan Guests"/></Link> */}
          <Link to={"/plans/"+planId+"/guests"}><button className="btn guestsIcon">Guests<br/>page</button></Link>
          </div>
        </div>

        <div className="infoPlan">
            <div className="description">
              <h5 className="descriptionTitle">Description</h5>
              <p className="descriptionPlan">{plan.description}</p>
              <h6 className="mediaLinksTitle">Media Resources</h6>
              <div className="linkAnchorDiv">
              {plan.musicList?.length >= 3 && <a href={plan.musicList} className="linkAnchor" target="_blank" rel="noreferrer"><img className="linkIcon" src={spotifyIcon} alt="Spotify List"/></a>}
              {plan.photoCloud?.length >= 3 && <a href={plan.photoCloud} className="linkAnchor" target="_blank" rel="noreferrer"><img className="linkIcon" src={picsIcon} alt="Photos Cloud"/></a>}
              {plan.interestingLinks?.length >= 3 && <a href={plan.interestingLinks} className="linkAnchor" target="_blank" rel="noreferrer"><img className="linkIcon" src={linkIcon} alt="Other Links"/></a>}
              </div>                
            </div>    
              
            <div className="description">
              <h5 className="locationTitle">Location</h5>
              <p className="descriptionPlan">{plan.location}</p>
            </div>              
        </div>

      </div>
    
  );
}

export default PlanPage;