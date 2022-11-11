import "./PlanPage.css";
import { useEffect, useState, useContext, React} from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import planService from "../../services/plan.service";
import guestsIcon from "../../assets/Guests_icon.png"

function PlanPage() {
  const {isLoggedIn, user } = useContext(AuthContext);
  const {planId} = useParams();
  const [plan, setPlan] = useState({});
  const [update, setUpdate] = useState(0)
  const [status, setStatus] = useState(false)

  const navigate = useNavigate();

  const updatePlan = (num) => {
    setUpdate(num)
  }

  const acceptHandle = () => {
    planService.acceptPlan(planId, user.username)
    .then(resp => {
        console.log(resp.data)
        setStatus (true)
        updatePlan(Math.random()*1000)  
    })
  }

  const declineHandle = () => {
    planService.declinePlan(planId, user.username)
    .then(resp => {
        console.log(resp.data)
        setStatus (true)
        updatePlan(Math.random()*1000)
    })
  }


  useEffect(()=>{
    planService.getPlan(planId)
    .then(response => {
      console.log("USER: ",user._id)
      console.log("isAdmin: ",response.data)
      console.log("STATUS: ",status)
        setPlan(response.data);
    })

}, [isLoggedIn, planId, update])

const handleEdit = (e) => navigate('/plans/' + planId + '/edit');

const planPhoto = {
    backgroundImage: `url(${plan.planImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center top",
    height: "60vh"
};

  return (
    
      <div className="DIV-GLOBAL">
        <div className="DIV-IMAGE-INFO headPlan" style = {planPhoto}>
          <div className="titleBgnd">
            <h2 className="title">Plan: {plan.title}</h2>
            <h6 className="dateInfo">Date: {plan.date} at {plan.time}</h6>
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
              <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={handleEdit}>
                Edit this plan
              </button>
            </div>}
          </div>
          <p className="CreatedBy">Created by: <Link to={`/${plan.isAdmin}/profile`}>{plan.isAdmin === user.username? "Me" : plan.isAdmin}</Link></p>
          </div>
          <div className="DIV-GUESTSICON guestsPosition">
          <Link to={"/plans/"+planId+"/guests"}><img className="guestsIcon" src={guestsIcon} alt="Plan Guests"/></Link>
          </div>
        </div>

        <div className="infoPlan">
            <div className="description">
              <h2 className="descriptionTitle">Description</h2>
              <p className="descriptionPlan">{plan.description}</p>
            </div>
            <div className="description">
              <h2 className="descriptionTitle">Location</h2>
              <p className="descriptionPlan">{plan.location}</p>
            </div>              
        </div>

      </div>
    
  );
}

export default PlanPage;