import "./Plan.css"
import { Link } from "react-router-dom";

export default function Plan ({plan}) {
    console.log("plan: ", plan)
    return(
        <div className="card col-3 m-3">
            <img src={plan._id.planImage} className="card-img-top" alt={plan._id.title} />
            <div className="card-body">
                <h5 className="card-title">{plan._id.title}</h5>
                <p className="card-text">{plan._id.description}</p>
                <p className="card-text">{plan._id.date}</p>
                <p className="card-text">{plan._id.time}</p>
                <p className="card-text">{plan._id.location}</p>
                <p className="card-text">Status: {plan.status}</p>
                <Link to={"/plans/"+plan._id._id}>View details</Link>
            </div>
        </div>
    );
}