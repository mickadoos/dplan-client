import "./PlanPage.css";
import { useEffect, useState, useContext} from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import planService from "../../services/plan.service";

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


  return (
    <div>
      <h1>Plan page</h1>
      <div className="card text-center">
            <div className="card-body">
                <Link to={"/plans/"+planId+"/guests"} className="btn btn-primary">Plan Guests</Link>
                <img className="img-fluid" src={plan.planImage} alt={plan.title} />
                <h5 className="card-title">{plan.title}</h5>
                <p className="card-text">{plan.description}</p>
                <p className="card-text">{plan.date}</p>
                <p className="card-text">{plan.time}</p>
                <p className="card-text">{plan.location}</p>

              {plan.isAdmin !== user.username && !status && plan.invited?.includes(user._id) && <div className="col-sm-6">
                  <button
                    onClick={acceptHandle}
                    className="btn btn-primary text-bg-success">
                    Confirm
                  </button>
                  <button
                    onClick={declineHandle}
                    className="btn btn-primary text-bg-danger ">
                    Decline
                  </button>
                </div>}
              {/* {!status && <div className="col-sm-6">
                  <button
                    onClick={acceptHandle}
                    className="btn btn-primary text-bg-success">
                    Confirm
                  </button>
                  <button
                    onClick={declineHandle}
                    className="btn btn-primary text-bg-danger ">
                    Decline
                  </button>
                </div>} */}

              { plan.isAdmin === user.username && <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={handleEdit}>
                    Edit this plan
                </button>}
              
            </div>

            {/* <div className="card-footer text-muted">
                {plan.pricePerDay} €/day
            </div> */}

            {/* modal */}
            </div>
    </div>
  );
}

export default PlanPage;