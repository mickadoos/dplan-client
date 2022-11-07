import "./PlanPage.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import planService from "../../services/plan.service";

function PlanPage() {

  const {planId} = useParams();
  const [plan, setPlan] = useState({});
  const navigate = useNavigate();

  useEffect(()=>{
    planService.getPlan(planId)
    .then(response => {
        setPlan(response.data);
    })

}, [planId])

  return (
    <div>
      <h1>Plan page</h1>
      <div className="card text-center">
            <div className="card-body">
                <img src={plan.planImage} alt={plan.title} />
                <h5 className="card-title">{plan.title}</h5>
                <p className="card-text">{plan.description}</p>
                {/* <a href="#" className="btn btn-danger">Go somewhere</a> */}

                <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Update
                </button>
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